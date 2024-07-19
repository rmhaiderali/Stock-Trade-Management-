import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";
import format from "../utils/formatResponse.js";

function toFixed(number, digits = 2) {
  return +number.toFixed(digits);
}

function getPercentage(part, total) {
  return (part / total) * 100;
}

const config = new Configuration({
  basePath: PlaidEnvironments[process.env.PLAID_ENV || "sandbox"],
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
      "PLAID-SECRET": process.env.PLAID_SECRET,
      "Plaid-Version": "2020-09-14",
    },
  },
});

export const client = new PlaidApi(config);

export async function createLinkToken(req, res) {
  const tokenResponse = await client.linkTokenCreate({
    user: { client_user_id: req.user._id },
    client_name: "Stock Trade Management",
    language: "en",
    products: ["investments"],
    country_codes: ["US"],
    redirect_uri: process.env.PLAID_SANDBOX_REDIRECT_URI,
  });
  res.json(tokenResponse.data);
}

export async function exchangePublicToken(req, res) {
  const exchangeResponse = await client.itemPublicTokenExchange({
    public_token: req.body.public_token,
  });

  req.user.plaidAccessToken = exchangeResponse.data.access_token;

  req.user.isPlaidLinked = true;

  await req.user.save();

  res.json(true);
}

export async function investmentHoldings(req, res) {
  const access_token = req.user.plaidAccessToken;

  const holdingsResponse = await client.investmentsHoldingsGet({
    access_token,
  });

  res.json({ Holdings: holdingsResponse.data });
}

export async function getPositions(req, res) {
  const access_token = req.user.plaidAccessToken;

  const holdingsResponse = await client.investmentsHoldingsGet({
    access_token,
  });
  const positions = {};

  holdingsResponse.data.securities
    .filter((security) => security.ticker_symbol?.length < 6)
    .forEach((security) => {
      positions[security.security_id] = {
        name: security.ticker_symbol,
        current_price: security.close_price,
      };
    });

  for (const holding of holdingsResponse.data.holdings) {
    const position = positions[holding.security_id];
    if (!position) continue;

    position.shares = holding.quantity;
    position.value = holding.institution_value;
    position.buy_price = holding.cost_basis;
    position.change = toFixed(position.current_price - position.buy_price);
    position.change_percent = toFixed(
      getPercentage(position.change, position.buy_price)
    );
  }

  res.json(
    format(
      true,
      null,
      Object.values(positions)
        .filter((security) => security.shares)
        .sort((a, b) => b.name.localeCompare(a.name))
    )
  );
}
