import React, { useState } from "react";
import Positions from "./Components/Positions";
import Chart from "./Components/Chart";
import Strategy from "./Components/Strategy";
import Market from "./Components/Market";
import VideoPlayer from "./Components/videoplayer";
import Navbar from "./Components/Header/Navbar";
import Login from "./Components/Login/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Singup from "./Components/Signup/singup";

const App = () => {
  const [headerData, setHeaderData] = useState({
    stockName: "APPL",
    positionValue: 17523.75,
    todayGainLoss: -106.55,
    positionGainLoss: -613.01,
    shares: 100,
  });

  const [positions, setPositions] = useState([
    { name: "APPL", price: 175.23, change: 1.06, percent: 0.6 },
    { name: "NVDA", price: 175.23, change: -1.06, percent: -0.6 },
    { name: "ARM", price: 175.23, change: 1.06, percent: 0.6 },
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
    { name: "Protective Put", maxProfit: 100000, maxLoss: 1500 },
    { name: "Covered Call", maxProfit: 5525, maxLoss: 775 },
    { name: "Collar", maxProfit: 9400, maxLoss: 1250 },
    { name: "Iron condor", maxProfit: 100, maxLoss: 1550 },
  ]);
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<div className="min-h-screen">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/4">
                <Positions positions={positions} />
              </div>
              <div className="lg:w-1/2 p-4">
                <Chart
                  stockName={headerData.stockName}
                  positionValue={headerData.positionValue}
                  todayGainLoss={headerData.todayGainLoss}
                  positionGainLoss={headerData.positionGainLoss}
                  shares={headerData.shares}
                />
                <Strategy strategies={strategies} />
              </div>
              <div className="lg:w-1/4 p-4">
                <div className="my-3 rounded-lg">
                  <VideoPlayer />
                </div>
                <Market markets={markets} />
              </div>
            </div>
          </div>} />
    <Route path="/login" element={<Login />}/>    
    <Route path="/signup" element={<Singup />}/>    

        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
