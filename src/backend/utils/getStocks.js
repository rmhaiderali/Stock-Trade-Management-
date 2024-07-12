function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloat(min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
}

export function getRandomElement(arr) {
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

export default function () {
  return {
    trend: getRandomElement(trends),
    market_sentiment: getRandomElement(sentiments),
    implied_volatility: getRandomFloat(0, 100) + "%",
    historical_volatility_average: getRandomFloat(0, 100) + "%",
  };
}
