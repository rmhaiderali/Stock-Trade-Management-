import React, { useState } from 'react';
import { FaAngleDown, FaArrowUp, FaArrowDown, FaMinus } from 'react-icons/fa'; // Importing icons from react-icons/fa

const Strategy = ({ strategies }) => {
  const [mode, setMode] = useState('maxGain'); // State to track current mode

  // Define modes and their corresponding labels
  const modes = [
    { key: 'maxGain', label: 'Max Gain' },
    { key: 'balanced', label: 'Balanced' },
    { key: 'protect', label: 'Protect' }
  ];

  // Function to handle mode change
  const handleModeChange = (modeKey) => {
    setMode(modeKey);
  };

  // Define an array of background colors
  const bgColors = ['bg-[#38B6FF]', 'bg-[#FF66C4]', 'bg-[#FFBD59]', 'bg-[#7ED957]'];



  return (
    <div className="p-4">
      {/* Modes section */}
      <div className='flex justify-between'>
        <div className="flex gap-4 mb-4 bg-gray-300 p-1 rounded-lg justify-between">
          {modes.map((m) => (
            <div
              key={m.key}
              className={`cursor-pointer flex items-center justify-between gap-10 ${mode === m.key ? 'bg-gray-700 px-1 text-white rounded-md' : 'text-gray-700'}`}
              onClick={() => handleModeChange(m.key)}
            >
              <span className={`ml-2 ${mode === m.key ? 'font-bold' : ''}`}>{m.label}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between gap-10">
          <span className="mr-2">Market Outlet</span>
          <div className="rounded-full bg-red-500 p-1">

         <FaArrowDown className="text-white text-xl " />
         </div>
         <div className="rounded-full bg-gray-500 p-1">

         <FaMinus className="text-white text-xl" />
         </div>
         <div className="rounded-full bg-green-500 p-1">

          <FaArrowUp className="text-white text-xl" />
          </div>
        </div>
      </div>

      {/* Strategies */}
      {strategies.map((strategy, index) => (
        <div key={index} className={`mb-4 ${bgColors[index % bgColors.length]} text-white rounded-full p-2`}>
          <div className="flex justify-between items-center">
            <h3 className="text-lg">{strategy.name}</h3>
            <div className="flex gap-3">
              <div className="flex flex-col">
                <p>${strategy.maxProfit.toLocaleString()}K</p>
                <p>Max Profit</p>
              </div>
              <div className="flex flex-col">
                <p>${strategy.maxLoss.toLocaleString()}</p>
                <p>Max Loss</p>
              </div>
              {/* Optional: You can keep the dropdown icon if needed */}
              <FaAngleDown className="dropdown-icon text-xl mt-4" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Strategy;
