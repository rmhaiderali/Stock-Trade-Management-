### Documentation for `yahooFinanceMarketData` Endpoint

#### Endpoint: `GET /api/yahooFinance`

#### Description:
This endpoint fetches and returns the latest market data for a set of predefined financial symbols from Yahoo Finance. The data includes major indices, treasury yield, Bitcoin, and volatility indices.

#### Example Response:
```json
{
  "success": true,
  "message": null,
  "data": [
    {
      "name": "S&P 500",
      "value": 4321.56,
      "change": 12.34,
      "percent": 0.29
    },
    {
      "name": "NASDAQ Composite",
      "value": 14431.24,
      "change": -56.78,
      "percent": -0.39
    },
    ...
  ]
}
```

#### Internal Workflow:
1. **Predefined Symbols**: The following financial symbols are fetched:
   - `^GSPC`: S&P 500
   - `^IXIC`: NASDAQ Composite
   - `^DJI`: Dow Jones Industrial Average
   - `^TNX`: 10-Year US Treasury Yield
   - `BTC-USD`: Bitcoin
   - `^VIX`: CBOE Volatility Index (VIX)
   - `^RUT`: Russell 2000 Index
   - `^FTSE`: FTSE 100 Index (London)
   - `^N225`: Nikkei 225 Index (Japan)
2. **Fetch Data**: Use Yahoo Finance API to fetch the latest quotes for these symbols.
3. **Transform Data**: Map the fetched data to include:
   - `name`: The short name of the financial symbol.
   - `value`: The current market price, rounded to two decimal places.
   - `change`: The change in market price, rounded to two decimal places.
   - `percent`: The percentage change in market price, calculated and rounded to two decimal places.
4. **Cache Control**: Set the response to be cacheable for 300 seconds (5 minutes) to reduce load and improve performance.
5. **Send Response**: Return the formatted market data as a JSON response.

### Dependencies:
- `yahoo-finance2`: Library for fetching financial data from Yahoo Finance.
- `formatResponse`: Custom utility for formatting the API response.