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

export default function ({ current_price }) {
  return {
    buy_price: current_price + getRandomFloat(-20, 40),
    trend: getRandomElement(trends),
    past_duration: getRandomInt(0, 1)
      ? getRandomInt(1, 30) + " days"
      : getRandomInt(1, 12) + " months",
    future_duration: getRandomInt(0, 1)
      ? getRandomInt(1, 30) + " days"
      : getRandomInt(1, 12) + " months",
    market_sentiment: getRandomElement(sentiments),
    implied_volatility: getRandomFloat(0, 100) + "%",
    historical_volatility_average: getRandomFloat(0, 100) + "%",
  };
}
