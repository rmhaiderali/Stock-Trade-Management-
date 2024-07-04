import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";

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

const client = new PlaidApi(config);

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

export async function balance(req, res) {
  const access_token = req.user.plaidAccessToken;
  const balanceResponse = await client.accountsBalanceGet({ access_token });
  res.json({ Balance: balanceResponse.data });
}

export async function investmentHoldings(req, res) {
  const access_token = req.user.plaidAccessToken;

  const holdingsResponse = await client.investmentsHoldingsGet({
    access_token,
  });

  res.json({ Holdings: holdingsResponse.data });
}
