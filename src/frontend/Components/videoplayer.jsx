// src/components/VideoPlayer.jsx

import React from "react";
// import TradingViewWidget, { Themes } from "react-tradingview-widget";

const VideoPlayer = ({ selectedStock }) => {
  return (
    <div className="">
      <div className="h-[400px] rounded-2xl">
        {/* Replace video player with TradingView chart */}
        {/* <TradingViewWidget
          symbol={selectedStock} // Dynamic symbol based on selected stock
          theme={Themes.DARK} // Adjust theme as needed
          locale="en" // Adjust locale as needed
          autosize
        /> */}
      </div>
    </div>
  );
};

export default VideoPlayer;
