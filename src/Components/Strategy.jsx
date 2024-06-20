import React, { useState } from "react";
import { FaAngleDown, FaArrowUp, FaArrowDown, FaMinus } from "react-icons/fa"; // Importing icons from react-icons/fa

const Strategy = ({ strategies }) => {
  const [mode, setMode] = useState("maxGain"); // State to track current mode

  // Define modes and their corresponding labels
  const modes = [
    { key: "maxGain", label: "Max Gain" },
    { key: "balanced", label: "Balanced" },
    { key: "protect", label: "Protect" },
  ];

  // Function to handle mode change
  const handleModeChange = (modeKey) => {
    setMode(modeKey);
  };

  // Define an array of background colors


  return (
    <div className="p-4">
    {/* Modes section */}
    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
      <div className="flex gap-4 mb-4 md:mb-0 bg-gray-200 md:p-1 md:rounded-lg md:justify-between">
        {modes.map((m) => (
          <div
            key={m.key}
            className={`cursor-pointer flex items-center gap-4 ${
              mode === m.key
                ? "bg-[#2257D6] px-3 py-1 text-white rounded-md"
                : "text-gray-700 "
            }`}
            onClick={() => handleModeChange(m.key)}
          >
            <span className={`${mode === m.key ? "font-bold" : ""}`}>
              {m.label}
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <span className="hidden md:block">Market Outlet</span>
        <div className="rounded-full bg-red-500 p-2">
          <FaArrowDown className="text-white text-xl" />
        </div>
        <div className="rounded-full bg-gray-300 p-2">
          <FaMinus className=" text-xl" />
        </div>
        <div className="rounded-full bg-green-500 p-2">
          <FaArrowUp className="text-white text-xl" />
        </div>
      </div>
    </div>

    {/* Strategies */}
    {strategies.map((strategy, index) => (
      <div
        key={index}
        className={`mb-4 bg-[#2257D6] text-white rounded-lg p-2`}
      >
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
            {/* Optional: You can keep the dropdown icon if needed */}
            <FaAngleDown className="dropdown-icon text-xl  md:mt-0" />
          </div>
        </div>
      </div>
    ))}
  </div>
  );
};

export default Strategy;
