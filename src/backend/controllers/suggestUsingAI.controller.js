import OpenAI from "openai";
import format from "../utils/formatResponse.js";
import getStocks, { getRandomElement } from "../utils/getStocks.js";
import dateandtime from "date-and-time";
import axios from "axios";
import pc from "picocolors";
import bluebird from "bluebird";

export default async function suggestUsingAI(req, res) {
  const {
    message,
    stock = "stock",
    buy_price,
    buy_ago,
    sell_in,
    mode = "Max Gain",
    current_price,
  } = req.body;

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  console.log({
    message,
    stock,
    mode,
    buy_price,
    current_price,
    buy_ago,
    sell_in,
  });

  const s = getStocks();

  const result = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "user",
        content: `
        You are a high growth hedge fund manager. You are providing strategies
        to help me manage a stock trade I'm in. I purchased ${stock} at 
        ${buy_price}. The price has ${s.trend} in the past ${buy_ago} to
        ${current_price}. I'm looking for options layer strategies with a goal
        of the position becoming profitable in the next ${sell_in}. My market 
        sentiment is ${s.market_sentiment}. Implied volatility for ${stock}
        is at ${s.implied_volatility} vs the historical volatility average of
        ${s.historical_volatility_average}. Provide me suggestions in following
        JSON format:

        {
          "strategies": [
            {
              "strategyName": "string",
              "buySell": [
                {
                  "type": "string",
                  "description": "Should be either 'buy' or 'sell'."
                },
                {
                  "type": "string",
                  "description": "Should be either 'buy' or 'sell'."
                }
              ],
              "positionType": [
                {
                  "type": "string",
                  "description": "Describes the type of position."
                },
                {
                  "type": "string",
                  "description": "Describes the type of position."
                }
              ],
              "maxProfit": {
                "type": "number",
                "description": "Maximum profit expected from the strategy."
              },
              "maxLoss": {
                "type": "number",
                "description": "Maximum loss expected from the strategy."
              },
              "strikePrice": [
                {
                  "type": "number",
                  "description": "Strike price for the first option."
                },
                {
                  "type": "number",
                  "description": "Strike price for the second option."
                }
              ],
              "expirationDate": [
                {
                  "type": "string",
                  "format": "YYYY/MM/DD",
                  "description": "Expiration date for the first option."
                },
                {
                  "type": "string",
                  "format": "YYYY/MM/DD",
                  "description": "Expiration date for the second option."
                }
              ],
              "optionPrice": [
                {
                  "type": "number",
                  "description": "Price of the first option."
                },
                {
                  "type": "number",
                  "description": "Price of the second option."
                }
              ]
            }
          ]
        }
        

        Here is an example output:
        strategies: [
          {
            "strategyName": "Protective Put",
            "buySell": ["Buy"],
            "positionType": ["Put"],
            "maxProfit": 4000,
            "maxLoss": 3555,
            "strikePrice": [130],
            "expirationDate": ["2024-07-26"],
            "optionPrice": [5.50]
          }
        ]

        If it is a spread that requires two assets (a buy and a sell of options)
        please adjust this to include multiple "buySell" and "positionType" in
        order to accurately outline the instructions that I need to do in order
        to place the trade.  

        Here is an example of the output for a spread:
        {
          "strategyName": "Bull Call Spread",
          "buySell": ["Buy", "Sell"],
          "positionType": ["Call", "Call"],
          "maxProfit": 1500,
          "maxLoss": 500,
          "strikePrice": [135, 150],
          "expirationDate": ["2024-07-26", "2024-08-10"],
          "optionPrice": [7.50, 3.00]
        },

        
        You must genrate 4 strategies.
        maxProfit must be greater than maxLoss.
        maxLoss must be greater than 0.
        `,
      },
      {
        role: "user",
        content: `
        There are total 3 modes of strategies: "Max Gain", "Balanced" and "Protect".
        For this scenario, you must provide strategies only for "${mode}" mode.
        `,
      },
      {
        role: "user",
        content: `
        Current Date Fromat: YYYY/MM/DD
        Current Date: ${dateandtime.format(new Date(), "YYYY/MM/DD")}
        `,
      },
      {
        role: "user",
        content: message || "",
      },
    ],
  });

  const strategies = JSON.parse(result.choices[0].message.content).strategies;

  const isDateValid = (date) => !isNaN(date);

  if (stock !== "stock")
    await bluebird.map(
      strategies,
      async (strategy) =>
        await bluebird.map(strategy.expirationDate, async (date, index) => {
          const expirationDate = new Date(strategy.expirationDate[index]);

          console.log();

          if (!isDateValid(expirationDate)) {
            console.log(
              pc.yellow(
                `using gpt optionPrice strikePrice because date provided by GPT (${strategy.expirationDate[index]}) is invalid `
              )
            );
            if (!strategy.pricesFrom) strategy.pricesFrom = [];
            strategy.pricesFrom[index] = "GPT";
            return;
          }

          const polygonExpirationDateGt = dateandtime.format(
            dateandtime.addDays(expirationDate, -15),
            "YYYY-MM-DD"
          );
          const polygonExpirationDateLt = dateandtime.format(
            dateandtime.addDays(expirationDate, 15),
            "YYYY-MM-DD"
          );

          const url = `https://api.polygon.io/v3/snapshot/options/${stock}?expiration_date.gt=${polygonExpirationDateGt}&expiration_date.lt=${polygonExpirationDateLt}&limit=200&apiKey=${process.env.POLYGON_API_KEY}`;

          console.log(url);

          const { data: polygonResponse } = await axios.get(url, {
            validateStatus: () => true,
          });

          const filteredPolygonResponse = polygonResponse.results.filter(
            (e) =>
              e.day.close &&
              strategy.positionType[index]
                .toLowerCase()
                .includes(e.details.contract_type)
          );

          const final = getRandomElement(filteredPolygonResponse);

          if (!final) {
            console.log(
              pc.yellow(
                `using gpt optionPrice strikePrice because no data found in polygon where day.close have value and details.contract_type is ${strategy.positionType[index]}`
              )
            );
            if (!strategy.pricesFrom) strategy.pricesFrom = [];
            strategy.pricesFrom[index] = "GPT";
            return;
          }

          strategy.optionPrice[index] = final.day.close;
          strategy.strikePrice[index] = final.details.strike_price;
          strategy.expirationDate[index] = final.details.expiration_date;

          if (!strategy.pricesFrom) strategy.pricesFrom = [];
          strategy.pricesFrom[index] = "Polygon";

          console.log(pc.green("form polygon"), {
            optionPrice: final.day.close,
            strikePrice: final.details.strike_price,
            expirationDate: final.details.expiration_date,
          });
        })
    );

  res.status(200).json(format(true, null, strategies));
}
