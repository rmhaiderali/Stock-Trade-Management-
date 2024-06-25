import OpenAI from "openai";
import format from "../utils/formatResponse.js";

export default async function suggestUsingAI(req, res) {
  const { message } = req.body;

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const result = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    response_format: { type: "json_object" },
    messages: [
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

        You must genrate 6 to 8 strategies.
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
    // temperature: 0.7,
    // max_tokens: 256,
    // top_p: 1,
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
