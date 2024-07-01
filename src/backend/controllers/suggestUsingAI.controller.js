import OpenAI from "openai";
import format from "../utils/formatResponse.js";
import genrateRandomStocks from "../utils/genrateRandomStocks.js";

export default async function suggestUsingAI(req, res) {
  const {
    message,
    stock = "stock",
    buy_ago,
    sell_in,
    buy_ago_ms,
    sell_in_ms,
  } = req.body;

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const d = genrateRandomStocks();

  const past_duration = buy_ago ?? d.past_duration;
  const future_duration = sell_in ?? d.future_duration;

  console.log({ message, stock, randomGenratedStocks: d });

  const result = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `
        You are providing strategies to help me manage a stock trade I'm in.
        I purchased ${stock} at ${d.buy_price}. The price has ${d.trend} in
        the past ${past_duration} to ${d.current_price}. I'm look for options
        layer strategies with a goal of the position becoming profitable in the
        next ${future_duration}. My market sentiment is ${d.market_sentiment}.
        Implied volatility for ${stock} is at ${d.implied_volatility} vs the
        historical volatility average of ${d.historical_volatility_average}.
        `,
      },
      {
        role: "system",
        content: `
        You must follow JSON Format for Response:
        {
          strategies: [
            {
              "name":           {type: string}
              "maxProfit":      {type: number (grater then 100 dollars)}
              "maxLoss":        {type: number (grater then 100 dollars)}
              "strikePrice":    {type: number (grater then 100 dollars)}
              "expirationDate": {type: string (DD/MM/YYYY)}
              "optionPrice":    {type: number}
            },
            .
            .
            .
          ]
        }

        You must genrate 8 strategies.
        You must provide only one value for each property in each strategy.
        `,
      },
      {
        role: "system",
        content: `
        Current Date Fromat: DD/MM/YYYY
        Current Date: ${new Date().toLocaleDateString("en-PK")}
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
