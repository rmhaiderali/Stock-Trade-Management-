import React from "react";

const Header = ({
  stockName,
  positionValue,
  todayGainLoss,
  positionGainLoss,
  shares,
}) => {
  return (
<div className="flex flex-col md:flex-row justify-between p-4 bg-[#2257D6] text-white rounded-lg">
      <div className="flex flex-col gap-5">
        <div className="flex items-center">
          <h1 className="text-4xl md:text-5xl font-bold">{stockName}</h1>
          <div className="ml-2 mt-1 md:mt-0 text-xl">{shares} shares</div>
        </div>
        <span className="text-3xl md:text-5xl font-bold">${positionValue.toFixed(2)}</span>
        <div className="text-lg">Position value</div>
      </div>
      <div className="flex flex-col gap-5 md:flex-col  md:items-center md:ml-auto">
        <div className={`flex flex-col ${todayGainLoss < 0 ? "text-red-500" : "text-green-500"}`}>
          <span className="text-2xl md:text-4xl font-bold">${todayGainLoss.toFixed(2)}</span>
          <span className="text-sm md:text-lg text-white text-right">Today's Gain/Loss</span>
        </div>
        <div className={`flex flex-col ${positionGainLoss < 0 ? "text-red-500" : "text-green-500"}`}>
          <span className="text-2xl md:text-4xl font-bold">${positionGainLoss.toFixed(2)}</span>
          <span className="text-sm md:text-lg text-white text-right">Position Gain/Loss</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
