import React, { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';

const Strategy = ({ strategies }) => {
  const [expandedStrategy, setExpandedStrategy] = useState(null);

  const toggleExpand = (strategyName) => {
    if (expandedStrategy === strategyName) {
      setExpandedStrategy(null);
    } else {
      setExpandedStrategy(strategyName);
    }
  };

  return (
    <div className="p-4">
      {strategies.map((strategy, index) => (
        <div key={index} className="mb-4 bg-[#2257D6] text-white rounded-lg p-2">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <h3 className="text-lg">{strategy.name}</h3>
            <div className="flex gap-3 mt-2 md:mt-0">
              <div className="flex flex-col justify-center items-center align-middle text-center">
                <p>${strategy.maxProfit.toLocaleString()}K</p>
                <p>Max Profit</p>
              </div>
              <div className="flex flex-col">
                <p>${strategy.maxLoss.toLocaleString()}</p>
                <p>Max Loss</p>
              </div>
              <FaAngleDown
                className={`dropdown-icon text-xl cursor-pointer ${
                  expandedStrategy === strategy.name ? 'transform rotate-180' : ''
                }`}
                onClick={() => toggleExpand(strategy.name)}
              />
            </div>
          </div>
          {expandedStrategy === strategy.name && (
            <div className="mt-3  p-3 rounded-lg">
              <div className="flex  gap-2 justify-between align-middle">
                <div className='mt-5 pl-3 space-y-6'>
                <p><strong>Strike Price:</strong> {strategy.strikePrice}</p>
                <p><strong>Expiration Date:</strong> {strategy.expirationDate}</p>
                <p><strong>Option Price:</strong> ${strategy.optionPrice}</p>
              </div>
                <img
                  src={strategy.image}
                  alt={`Image for ${strategy.name}`}
                  className="w-56 rounded-lg"
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Strategy;
