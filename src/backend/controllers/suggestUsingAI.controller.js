import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function suggestUsingAI(req, res) {
  // Ensure the API key is set
  if (!process.env.OPENAI_API_KEY) {
    throw new Error(
      "Missing OpenAI API key. Please set the OPENAI_API_KEY environment variable."
    );
  }

  try {
    // Ensure request body has the necessary data
    // const { content } = req.body;
    const content =
      "I purchased SOFI at $7.10. The price is now at $6.42. I'm looking for options layer strategies to protect my downside risk with a goal of the position becoming profitable in the next 1 month. My market sentiment is bullish. Implied volatility for SOFI is at 84.5% vs the historical volatility average of 29.5%.";
    if (!content) {
      res.status(400).json({ error: "Request body must contain 'content'" });
      return;
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a high-growth hedge fund manager. You are providing strategies to help manage a stock trade. Provide suggestions in the following format:
          [Strategy Idea]: [strategy description]
          [Strategy Execution Parameter]: [description of what the user should do to carry out the strategy]
          [Specific Example]: [Buy/Sell Execution] [strike price] [expiration date] [break-even point]
          Your response must be in JSON format.`,
        },
        {
          role: "user",
          content: content,
        },
      ],
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error generating GPT-4 suggestion:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
