import React, { useState, useEffect } from "react";
import Positions from "./Components/Positions";
import Chart from "./Components/Chart";
import Strategy from "./Components/Strategy";
import Market from "./Components/Market";
// import VideoPlayer from './Components/VideoPlayer';
import Navbar from "./Components/Header/Navbar";
import Login from "./Components/Login/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./Components/Signup/singup";
import Profile from "./Components/Profilesection/Profile";
import VideoPlayer from "./Components/videoplayer";
import Contact from "./Components/Contact/Contact";
import ContactForm from "./Components/Contact/Contact";
import axios from "./custom-axios";

const App = () => {
  const initialHeaderData = {
    stockName: "ARM",
    positionValue: 17523.75,
    todayGainLoss: -106.55,
    positionGainLoss: -613.01,
    shares: 100,
  };

  const [headerData, setHeaderData] = useState(initialHeaderData);

  const [positions, setPositions] = useState([
    { name: "ARM", price: 175.23, change: 1.06, percent: 0.6 },
    { name: "APPL", price: 175.23, change: 1.06, percent: 0.6 },
    { name: "NVDA", price: 175.23, change: -1.06, percent: -0.6 },
    { name: "MSFT", price: 175.23, change: 1.06, percent: 0.6 },
    { name: "JPM", price: 175.23, change: 1.06, percent: 0.6 },
    { name: "GOOG", price: 175.23, change: 1.06, percent: 0.6 },
    { name: "TSLA", price: 175.23, change: 1.06, percent: 0.6 },
    { name: "COIN", price: 175.23, change: 1.06, percent: 0.6 },
    { name: "GOOG", price: 175.23, change: 1.06, percent: 0.6 },
    { name: "TSLA", price: 175.23, change: 1.06, percent: 0.6 },
    { name: "COIN", price: 175.23, change: 1.06, percent: 0.6 },
  ]);

  const [markets, setMarkets] = useState([
    { name: "S&P", value: 5440.25, change: 10.25, percent: 0.15 },
    { name: "NASDAQ", value: 17718.3, change: 35.1, percent: 0.2 },
    { name: "DOW", value: 38591.75, change: 25.8, percent: 0.07 },
    { name: "10 yr US", value: 4.291, change: -0.04, percent: -0.01 },
    { name: "BTC", value: 65331.25, change: -125.3, percent: -0.21 },
    { name: "VIX", value: 12.75, change: -0.35, percent: -0.25 },
    { name: "10 yr US", value: 4.291, change: -0.04, percent: -0.01 },
    { name: "BTC", value: 65331.25, change: -125.3, percent: -0.21 },
    { name: "VIX", value: 12.75, change: -0.35, percent: -0.25 },
  ]);

  const [strategies, setStrategies] = useState([
    {
      name: "Protective Put",
      maxProfit: 100000,
      maxLoss: 1500,
      strikePrice: 180,
      expirationDate: "2024-12-31",
      optionPrice: 2.5,
      image:
        "https://www.projectfinance.com/wp-content/uploads/2022/01/married-put.png.webp",
    },
    {
      name: "Covered Call",
      maxProfit: 5525,
      maxLoss: 775,
      strikePrice: 160,
      expirationDate: "2024-10-15",
      optionPrice: 1.75,
      image:
        "https://images.prismic.io/premia-academy/279a62aa-bbb5-4ac1-8c7f-5333a1da373b_premia-academy-covered-call.png?auto=compress%2Cformat&fit=max&w=1920",
    },
    {
      name: "Collar",
      maxProfit: 9400,
      maxLoss: 1250,
      strikePrice: 175,
      expirationDate: "2024-11-30",
      optionPrice: 2.0,
      image:
        "https://www.projectfinance.com/wp-content/uploads/2022/01/collar-trade-options.png.webp",
    },
    {
      name: "Iron Condor",
      maxProfit: 100,
      maxLoss: 1550,
      strikePrice: 190,
      expirationDate: "2025-01-15",
      optionPrice: 3.25,
      image:
        "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*rOqG_EeRJJGxc8erdLTsFA.jpeg",
    },
  ]);

  const [selectedStock, setSelectedStock] = useState("ARM"); // Initial selected stock

  const handleSelectStock = (stockName) => {
    setSelectedStock(stockName); // Update selected stock

    // Update header data based on selected stock
    const selectedPosition = positions.find(
      (position) => position.name === stockName
    );
    if (selectedPosition) {
      setHeaderData({
        stockName: selectedPosition.name,
        positionValue: selectedPosition.price * headerData.shares, // Assuming position value is price * shares
        todayGainLoss: selectedPosition.change * headerData.shares, // Assuming today's gain/loss is change * shares
        positionGainLoss: selectedPosition.percent * headerData.shares, // Assuming position gain/loss is percent * shares
        shares: headerData.shares,
      });
    }
  };

  const [isSignedIn, setIsSignedIn] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await axios("/api/validateuser");
      if (response.data.success) {
        setIsSignedIn(true);
        setUserInfo(response.data.data);
      }
    })();
  }, []);

  return (
    <BrowserRouter>
      <div>
        <Navbar
          setIsSignedIn={setIsSignedIn}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
        />
        <Routes>
          <Route
            path="/"
            element={
              <div className="min-h-screen">
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-1/4">
                    <Positions
                      positions={positions}
                      onSelectStock={handleSelectStock}
                    />
                  </div>
                  <div className="lg:w-1/2 px-4">
                    <Chart
                      stockName={selectedStock} // Pass selected stock to Chart component
                      positionValue={headerData.positionValue}
                      todayGainLoss={headerData.todayGainLoss}
                      positionGainLoss={headerData.positionGainLoss}
                      shares={headerData.shares}
                    />
                    <Strategy
                      strategies={strategies}
                      setStrategies={setStrategies}
                      selectedStock={selectedStock}
                    />
                  </div>
                  <div className="lg:w-1/4 px-4">
                    <div className="mb-3 rounded-lg">
                      <VideoPlayer selectedStock={selectedStock} />
                    </div>
                    <Market markets={markets} />
                  </div>
                </div>
              </div>
            }
          />
          <Route
            path="/login"
            element={
              <Login
                isSignedIn={isSignedIn}
                setIsSignedIn={setIsSignedIn}
                setUserInfo={setUserInfo}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <Signup
                isSignedIn={isSignedIn}
                setIsSignedIn={setIsSignedIn}
                setUserInfo={setUserInfo}
              />
            }
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route
            path="/*"
            element={
              <div className="flex-grow flex justify-center items-center">
                <div>404 - PAGE NOT FOUND</div>
              </div>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
