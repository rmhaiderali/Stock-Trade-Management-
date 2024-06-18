import React, { useState } from 'react';

const Positions = ({ positions }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg">
      <h2 className="text-3xl mb-4 font-bold text-blue-500">Positions</h2>
      <div className="max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-800 scrollbar-thumb-rounded-full">
        {positions.map((position, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            className={`flex justify-between mb-2 border-b-2 pb-3 cursor-pointer ${selectedIndex === index ? 'border-l-4 border-blue-500' : ''}`}
          >
            <div className='flex flex-col'>
              <span className='text-2xl font-bold'>{position.name}</span>
              <span className='text-xl text-gray-300 font-semibold'>${position.price.toFixed(2)}</span>
            </div>
            <span className={`ml-4 font-bold text-xl w-24 ${position.change > 0 ? 'bg-green-500 text-white px-4 rounded-2xl' : 'bg-red-500 text-white px-4 rounded-2xl'}`}>
              <div>
                <div>${position.change.toFixed(2)}</div>
                <div>{position.percent}%</div>
              </div>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Positions;
