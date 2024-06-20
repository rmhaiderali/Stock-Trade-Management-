import React, { useState } from 'react';
import Positions from './Components/Positions';
import Chart from './Components/Chart';
import Strategy from './Components/Strategy';
import Market from './Components/Market';
// import VideoPlayer from './Components/VideoPlayer';
import Navbar from './Components/Header/Navbar';
import Login from './Components/Login/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './Components/Signup/singup';
import Profile from './Components/Profilesection/Profile';
import VideoPlayer from './Components/videoplayer';
import Contact from './Components/Contact/Contact';
import ContactForm from './Components/Contact/Contact';

const App = () => {
  const initialHeaderData = {
    stockName: 'ARM',
    positionValue: 17523.75,
    todayGainLoss: -106.55,
    positionGainLoss: -613.01,
    shares: 100,
  };

  const [headerData, setHeaderData] = useState(initialHeaderData);

  const [positions, setPositions] = useState([
    { name: 'ARM', price: 175.23, change: 1.06, percent: 0.6 },
    { name: 'APPL', price: 175.23, change: 1.06, percent: 0.6 },
    { name: 'NVDA', price: 175.23, change: -1.06, percent: -0.6 },
    { name: 'MSFT', price: 175.23, change: 1.06, percent: 0.6 },
    { name: 'JPM', price: 175.23, change: 1.06, percent: 0.6 },
    { name: 'GOOG', price: 175.23, change: 1.06, percent: 0.6 },
    { name: 'TSLA', price: 175.23, change: 1.06, percent: 0.6 },
    { name: 'COIN', price: 175.23, change: 1.06, percent: 0.6 },
    { name: 'GOOG', price: 175.23, change: 1.06, percent: 0.6 },
    { name: 'TSLA', price: 175.23, change: 1.06, percent: 0.6 },
    { name: 'COIN', price: 175.23, change: 1.06, percent: 0.6 },
  ]);

  const [markets, setMarkets] = useState([
    { name: 'S&P', value: 5440.25, change: 10.25, percent: 0.15 },
    { name: 'NASDAQ', value: 17718.3, change: 35.1, percent: 0.2 },
    { name: 'DOW', value: 38591.75, change: 25.8, percent: 0.07 },
    { name: '10 yr US', value: 4.291, change: -0.04, percent: -0.01 },
    { name: 'BTC', value: 65331.25, change: -125.3, percent: -0.21 },
    { name: 'VIX', value: 12.75, change: -0.35, percent: -0.25 },
    { name: '10 yr US', value: 4.291, change: -0.04, percent: -0.01 },
    { name: 'BTC', value: 65331.25, change: -125.3, percent: -0.21 },
    { name: 'VIX', value: 12.75, change: -0.35, percent: -0.25 },
  ]);

  const [strategies, setStrategies] = useState([
    { name: 'Protective Put', maxProfit: 100000, maxLoss: 1500 },
    { name: 'Covered Call', maxProfit: 5525, maxLoss: 775 },
    { name: 'Collar', maxProfit: 9400, maxLoss: 1250 },
    { name: 'Iron condor', maxProfit: 100, maxLoss: 1550 },
  ]);

  const [selectedStock, setSelectedStock] = useState('ARM'); // Initial selected stock

  const handleSelectStock = (stockName) => {
    setSelectedStock(stockName); // Update selected stock

    // Update header data based on selected stock
    const selectedPosition = positions.find(position => position.name === stockName);
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

  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <div className="min-h-screen">
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-1/4">
                    <Positions positions={positions} onSelectStock={handleSelectStock} />
                  </div>
                  <div className="lg:w-1/2 px-4">
                    <Chart
                      stockName={selectedStock} // Pass selected stock to Chart component
                      positionValue={headerData.positionValue}
                      todayGainLoss={headerData.todayGainLoss}
                      positionGainLoss={headerData.positionGainLoss}
                      shares={headerData.shares}
                    />
                    <Strategy strategies={strategies} />
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
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path='/contact' element={<ContactForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
