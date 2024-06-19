import React, { useState } from 'react';

const Market = ({ markets }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <div className="p-4 rounded-lg">
      <h2 className="text-3xl mb-4 font-bold">Markets</h2>
      <div className="max-h-[390px] overflow-y-auto scrollbar-thin scrollbar-thumb-white scrollbar-track-gray-800 scrollbar-thumb-rounded-full">
        {markets.map((market, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            className={`flex justify-between mb-2 border-b-2 pb-3 cursor-pointer ${selectedIndex === index ? 'border-l-4 border-blue-500' : ''}`}
          >
            <div className='flex flex-col'>
              <span className='text-2xl font-bold'>{market.name}</span>
              <span className='text-xl font-semibold'>${market.value.toFixed(2)}</span>
            </div>
            <span className={`ml-4 font-bold text-xl w-24 mr-5 ${market.change > 0 ? 'text-green-500  rounded-2xl' : 'text-red-500 rounded-2xl'}`}>
              <div className="flex items-center">
              {market.change > 0 ? (
                  <span className="mr-2">▲</span>
                ) : (
                  <span className="mr-2">▼</span>
                )}
                <div className='flex flex-col'>
                <div>${market.change.toFixed(2)}</div>
                <div className="ml-2">{market.percent}%</div>
                </div>
                
              </div>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Market;
