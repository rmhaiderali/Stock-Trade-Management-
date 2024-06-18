import React from "react";

const Header = ({
  stockName,
  positionValue,
  todayGainLoss,
  positionGainLoss,
  shares,
}) => {
  return (
    <div className="flex justify-between p-4 bg-black text-white ">
      <div className="flex flex-col  gap-5">
        <div className="flex  ">
          {" "}
          <h1 className="text-5xl font-bold">{stockName}</h1>{" "}
          <div className="text-end ml-2 mt-5 text-xl">{shares} shares</div>
        </div>
        <span className="text-5xl font-bold">${positionValue.toFixed(2)}</span>
        <div>Position value</div>
      </div>

      <div className="flex gap-5 flex-col">
        <span
          className={`ml-4 flex flex-col  ${
            todayGainLoss < 0 ? "text-red-500 " : "text-green-500"
          }`}
        >
          <span className="text-4xl font-bold"> (${todayGainLoss.toFixed(2)})</span>
          <span className="text-white text-right">Todays Gain/Loss</span>
        </span>
        <span
          className={`ml-2 flex flex-col  ${
            positionGainLoss < 0 ? "text-red-500" : "text-green-500"
          }`}
        >
          <span className="text-4xl font-bold"> (${positionGainLoss.toFixed(2)})</span>
          <span className="text-white text-right">Todays Gain/Loss</span>
        </span>
      </div>
    </div>
  );
};

export default Header;
