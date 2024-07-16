import yahooFinance from "yahoo-finance2";
import format from "../utils/formatResponse.js";

export default async function yahooFinanceMarketData(req, res) {
  const symbols = [
    "^GSPC", // S&P 500
    "^IXIC", // NASDAQ Composite
    "^DJI", // Dow Jones Industrial Average
    "^TNX", // 10-Year US Treasury Yield
    "BTC-USD", // Bitcoin
    "^VIX", // CBOE Volatility Index (VIX)
    "^RUT", // Russell 2000 Index
    "^FTSE", // FTSE 100 Index (London)
    "^N225", // Nikkei 225 Index (Japan)
  ];

  const quotes = await Promise.all(
    symbols.map((symbol) => yahooFinance.quote(symbol))
  );

  const marketData = quotes.map((quote) => ({
    name: quote.shortName,
    value: +quote.regularMarketPrice.toFixed(2),
    change: +quote.regularMarketChange.toFixed(2),
    percent: +(
      (quote.regularMarketChange / quote.regularMarketPrice) *
      100
    ).toFixed(2),
  }));

  res.set("Cache-Control", "public, max-age=300");

  res.json(format(true, null, marketData));
}
