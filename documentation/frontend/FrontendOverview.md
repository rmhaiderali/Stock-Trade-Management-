### Frontend Documentation for Stock Trading Dashboard

#### Overview
This documentation provides an overview of the various sections of the Stock Trading Dashboard and details on how to use each part effectively.

### Sections Overview

1. **Positions**
2. **Market Overview**
3. **Top Center Blue Card (Selected Position)**
4. **Strategies**

---

### 1. Positions

**Description:**
The "Positions" section displays a list of stocks or funds that the user currently holds. Each entry includes the ticker symbol, current price, and the percentage change.

**API Endpoint:**
- **URL:** `/api/getPositions`
- **Method:** `GET`

**How to Use:**
- **Data Fetch:** Fetch data from the `/api/getPositions` endpoint on component mount or refresh.
- **Display:** Map through the positions data to display each position in the list format.
- **Update:** Set up a periodic update (e.g., every 5 minutes) to refresh the data.

### 2. Market Overview

**Description:**
The "Market Overview" section displays key market indices, including their current values and percentage changes.

**API Endpoint:**
- **URL:** `/api/yahooFinance`
- **Method:** `GET`

**How to Use:**
- **Data Fetch:** Fetch data from the `/api/yahooFinance` endpoint on component mount or refresh.
- **Display:** Map through the market data to display each index and its performance.
- **Update:** Set up a periodic update (e.g., every 5 minutes) to refresh the data.

### 3. Top Center Blue Card (Selected Position)

**Description:**
The blue card at the top center of the dashboard provides detailed information about the selected position, including the position value, today's gain/loss, and total position gain/loss.

**API Source:**
Data for this section comes from the Plaid API integrated within your backend.

**How to Use:**
- **Data Fetch:** Fetch the detailed position data using your backend that communicates with Plaid's API.
- **Display:** Show the name, number of shares, position value, today's gain/loss, and total position gain/loss.
- **Interactivity:** When a position is selected from the "Positions" section, update this card with the corresponding data.

### 4. Strategies

**Description:**
The "Strategies" section displays suggested trading strategies based on AI analysis. Each strategy includes the type, strike price, expiration date, option price, and potential profit and loss.

**API Endpoint:**
- **URL:** `/api/suggestUsingAI`
- **Method:** `GET`

**How to Use:**
- **Data Fetch:** Fetch strategy suggestions from the `/api/suggestUsingAI` endpoint on component mount or refresh.
- **Display:** Show each strategy's details, including buy and sell positions, max profit, and max loss.
- **Update:** Update strategies periodically based on user preference or market changes.

---

### How to Use

1. **Initial Data Load:**
   - When the component mounts, fetch data from the relevant endpoints.
   - Use `useEffect` in React to fetch data and store it in the component state.

2. **Interactivity:**
   - Ensure that clicking on a position in the "Positions" section updates the "Top Center Blue Card" with detailed information about the selected position.
   - Allow users to interact with the strategies and view detailed information.

3. **Error Handling:**
   - Handle errors gracefully by showing appropriate error messages if the API call fails.
   - Ensure the user interface remains responsive and informative even during loading states or errors.

4. **Styling and Responsiveness:**
   - Ensure the dashboard is styled consistently and is responsive across different screen sizes.
   - Use CSS frameworks or custom styles to maintain a clean and user-friendly interface.