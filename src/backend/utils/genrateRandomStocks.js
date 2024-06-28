function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloat(min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
}

function getRandomElement(arr) {
  return arr[getRandomInt(0, arr.length - 1)];
}

const trends = ["risen", "fallen"];
const sentiments = [
  "bullish",
  "bearish",
  "neutral",
  "optimistic",
  "pessimistic",
];

// Schema
// {
//   buy_price: "", // type: number (dollars)
//   trend: "", // "risen" || "fallen"
//   past_duration: "", // in days or months (in days if less then 30)
//   current_price: "", // type: number (dollars)
//   future_duration: "", // in days or months (in days if less then 30)
//   market_sentiment: "", // "bullish" || "bearish" || "neutral" || "optimistic" || "pessimistic"
//   implied_volatility: "", // in percentage (0-100)
//   historical_volatility_average: "", // in percentage (0-100)
// }

export default function () {
  return {
    buy_price: getRandomFloat(10, 200),
    trend: getRandomElement(trends),
    past_duration: getRandomInt(0, 1)
      ? getRandomInt(1, 30) + " days"
      : getRandomInt(1, 12) + " months",
    current_price: getRandomFloat(10, 200),
    future_duration: getRandomInt(0, 1)
      ? getRandomInt(1, 30) + " days"
      : getRandomInt(1, 12) + " months",
    market_sentiment: getRandomElement(sentiments),
    implied_volatility: getRandomFloat(0, 100) + "%",
    historical_volatility_average: getRandomFloat(0, 100) + "%",
  };
}
