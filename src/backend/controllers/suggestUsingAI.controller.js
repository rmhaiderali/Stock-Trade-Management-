import OpenAI from "openai";
import format from "../utils/formatResponse.js";
import getStocks from "../utils/getStocks.js";
import date from "date-and-time";

export default async function suggestUsingAI(req, res) {
  const {
    message,
    stock = "stock",
    buy_price,
    buy_ago,
    sell_in,
    mode = "Max Gain", // if not provided, default to "Max Gain"
    current_price,
  } = req.body;

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  console.log({
    message,
    stock,
    buy_price,
    buy_ago,
    sell_in,
    mode,
    current_price,
  });

  const s = getStocks({ stock, current_price });

  const past_duration = buy_ago;
  const future_duration = sell_in;

  console.log({ message, stock, s });

  const result = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "user",
        content: `
        You are a high growth hedge fund manager. You are providing strategies
        to help me manage a stock trade I'm in. I purchased ${stock} at 
        ${buy_price}. The price has ${s.trend} in the past ${past_duration} to
        ${current_price}. I'm looking for options layer strategies with a goal
        of the position becoming profitable in the next ${future_duration}. My
        market sentiment is ${s.market_sentiment}. Implied volatility for ${stock}
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
        Current Date: ${date.format(new Date(), "YYYY/MM/DD")}
        `,
      },
      {
        role: "user",
        content: message || "",
      },
    ],
  });

  console.log(result.choices[0].message.content);

  res
    .status(200)
    .json(
      format(
        true,
        null,
        JSON.parse(result.choices[0].message.content).strategies
      )
    );
}
