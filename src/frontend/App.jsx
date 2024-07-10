import React, { useState, useEffect } from "react";
import Positions from "./Components/Positions";
import Chart from "./Components/Chart";
import Strategy from "./Components/Strategy";
import Market from "./Components/Market";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Signup from "./Components/Signup";
import Profile from "./Components/Profile";
import VideoPlayer from "./Components/videoplayer";
import ContactForm from "./Components/Contact";
import LinkPlaid from "./Components/LinkPlaid";
import axios from "./custom-axios";
import "./App.css";
import Loading from "./Components/Loading";

const App = () => {
  const defaultMarkets = [
    { name: "S&P", value: 5440.25, change: 10.25, percent: 0.15 },
    { name: "NASDAQ", value: 17718.3, change: 35.1, percent: 0.2 },
    { name: "DOW", value: 38591.75, change: 25.8, percent: 0.07 },
    { name: "10 yr US", value: 4.291, change: -0.04, percent: -0.01 },
    { name: "BTC", value: 65331.25, change: -125.3, percent: -0.21 },
    { name: "VIX", value: 12.75, change: -0.35, percent: -0.25 },
    { name: "10 yr US", value: 4.291, change: -0.04, percent: -0.01 },
    { name: "BTC", value: 65331.25, change: -125.3, percent: -0.21 },
    { name: "VIX", value: 12.75, change: -0.35, percent: -0.25 },
  ];

  const [positions, setPositions] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState({});

  const [markets, setMarkets] = useState([]);

  const [strategies, setStrategies] = useState([]);

  const handleSelectStock = (name) => {
    setSelectedPosition(positions.find((position) => position.name === name));
  };

  useEffect(() => {
    let localPositions = localStorage.getItem("positions")
      ? JSON.parse(localStorage.getItem("positions"))
      : null;

    const localStrategiesDate = localStorage.getItem("positionsDate")
      ? JSON.parse(localStorage.getItem("positionsDate"))
      : 0;

    // 2 minutes
    if (Date.now() - localStrategiesDate > 1000 * 60 * 2) localPositions = null;

    if (localPositions) {
      setPositions(localPositions);
      setSelectedPosition(localPositions[0]);
    } else
      axios.get("/api/plaid/getPositions").then((response) => {
        if (response.data.data) {
          setPositions(response.data.data);
          setSelectedPosition(response.data.data[0]);
          localStorage.setItem("positions", JSON.stringify(response.data.data));
          localStorage.setItem("positionsDate", Date.now());
        }
      });
  }, []);

  const [isSignedIn, setIsSignedIn] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (["/signup"].includes(location.pathname)) return;

      const response = await axios("/api/validateUser");
      if (!response.data.success) return navigate("/login");
      setIsSignedIn(true);
      setUserInfo(response.data.data);
      if (!response.data.data?.isPlaidLinked) return navigate("/linkPlaid");
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const response = await axios("/api/yahooFinance");
      if (!response.data.success) return 1;
      setMarkets(response.data.data);
    })();
  }, []);

  return (
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
                <div
                  className={
                    "lg:w-1/4" +
                    (positions.length
                      ? ""
                      : " flex justify-center items-center")
                  }
                >
                  {positions.length ? (
                    <Positions
                      positions={positions}
                      onSelectStock={handleSelectStock}
                    />
                  ) : (
                    <div className="translate-y-[-200px] text-blue-600">
                      <Loading />
                    </div>
                  )}
                </div>
                <div className="lg:w-1/2 px-4">
                  <Chart selectedPosition={selectedPosition} />
                  <Strategy
                    strategies={strategies}
                    setStrategies={setStrategies}
                    selectedPosition={selectedPosition}
                  />
                </div>
                <div className="lg:w-1/4 px-4">
                  <div className="mb-3 rounded-lg">
                    <VideoPlayer selectedStock={selectedPosition.name} />
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
        <Route
          path="/profile"
          element={<Profile userInfo={userInfo} setUserInfo={setUserInfo} />}
        />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/linkPlaid" element={<LinkPlaid userInfo={userInfo} />} />
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
  );
};

const AppWrapper = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWrapper;
