### Documentation for Plaid Integration Endpoints

#### Endpoint: `POST /api/createLinkToken`

#### Description:
Generates a Plaid link token to initiate the Plaid Link flow for the user. This token is used to link the user's bank account to the application.

#### Request Body:
No specific body parameters are required as it relies on the authenticated user context.

#### Response:
A JSON object containing the Plaid link token and related metadata.

#### Example Response:
```json
{
  "link_token": "link-sandbox-12345678-abcdefg",
  "expiration": "2024-08-01T00:00:00Z"
}
```

#### Internal Workflow:
1. **Initialize Plaid Client**: Use the Plaid client configuration to create a link token.
2. **Generate Link Token**: Call the `linkTokenCreate` method with user and app details.
3. **Send Response**: Return the link token and other relevant data to the client.

---

#### Endpoint: `POST /api/exchangePublicToken`

#### Description:
Exchanges a public token received from the Plaid Link flow for an access token, which is then saved in the user's profile.

#### Request Body:
- `public_token` (string, required): The public token received from Plaid Link.

#### Example Request:
```json
{
  "public_token": "public-sandbox-12345678-abcdefg"
}
```

#### Response:
A boolean indicating the success of the operation.

#### Example Response:
```json
true
```

#### Internal Workflow:
1. **Extract Public Token**: Retrieve the public token from the request body.
2. **Exchange Public Token**: Call `itemPublicTokenExchange` to exchange the public token for an access token.
3. **Save Access Token**: Save the access token in the user's profile and mark the Plaid link as complete.
4. **Send Response**: Return a success response to the client.

---

#### Endpoint: `GET /api/investmentHoldings`

#### Description:
Retrieves the investment holdings for the authenticated user from Plaid.

#### Request Body:
No specific body parameters are required as it relies on the authenticated user context.

#### Response:
A JSON object containing the user's investment holdings.

#### Example Response:
```json
{
  "Holdings": {
    "accounts": [ ... ],
    "holdings": [ ... ],
    "securities": [ ... ]
  }
}
```

#### Internal Workflow:
1. **Get Access Token**: Retrieve the user's Plaid access token from their profile.
2. **Fetch Holdings**: Call `investmentsHoldingsGet` to get the user's investment holdings from Plaid.
3. **Send Response**: Return the holdings data to the client.

---

#### Endpoint: `GET /api/getPositions`

#### Description:
Fetches and processes the user's investment positions, including current prices, shares, value, buy prices, and performance metrics.

#### Request Body:
No specific body parameters are required as it relies on the authenticated user context.

#### Response:
A JSON array of processed positions, sorted by ticker symbol in descending order.

#### Example Response:
```json
[
  {
    "name": "AAPL",
    "current_price": 150.25,
    "shares": 10,
    "value": 1502.50,
    "buy_price": 140.00,
    "change": 10.25,
    "change_percent": 7.32
  },
  ...
]
```

#### Internal Workflow:
1. **Get Access Token**: Retrieve the user's Plaid access token from their profile.
2. **Fetch Holdings**: Call `investmentsHoldingsGet` to get the user's investment holdings from Plaid.
3. **Process Positions**:
   - Filter securities with valid ticker symbols.
   - Map securities to their respective holdings, calculating current price, shares, value, buy price, change, and change percentage.
4. **Cache Results**: Set a cache-control header to cache the response for 5 minutes.
5. **Send Response**: Return the processed positions to the client.

#### Utility Functions:
- **toFixed(number, digits = 2)**: Rounds a number to a fixed number of decimal places.
- **getPercentage(part, total)**: Calculates the percentage of `part` relative to `total`.

### Dependencies:
- `Configuration`, `PlaidApi`, `PlaidEnvironments`: Plaid SDK for interacting with Plaid API.
- `formatResponse`: Custom utility for formatting the API response.
- `axios`: For making HTTP requests to the Plaid API.
- `date-and-time`: For handling date formatting and manipulation.
- `picocolors`: For colored console output during debugging.