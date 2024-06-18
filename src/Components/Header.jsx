import React from 'react';

const Header = ({ stockName, positionValue, todayGainLoss, positionGainLoss }) => {
  return (
    <div className="flex justify-between items-center p-4 bg-black text-white">
      <h1 className="text-3xl">{stockName}</h1>
      <div>
        <span className="text-2xl">${positionValue.toFixed(2)}</span>
        <span className={`ml-4 ${todayGainLoss < 0 ? 'text-red-500' : 'text-green-500'}`}>
          (${todayGainLoss.toFixed(2)})
        </span>
        <span className={`ml-2 ${positionGainLoss < 0 ? 'text-red-500' : 'text-green-500'}`}>
          (${positionGainLoss.toFixed(2)})
        </span>
      </div>
    </div>
  );
};

export default Header;
