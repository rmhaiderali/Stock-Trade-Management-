// Positions.jsx

import React, { useState } from "react";

const Positions = ({ positions, onSelectStock }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleClick = (index) => {
    setSelectedIndex(index);
    onSelectStock(positions[index].name); // Pass selected stock symbol to parent component
  };

  return (
    <div className="p-4 rounded-b-lg rounded-r-md">
      <h2 className="text-3xl mb-4 font-bold">Positions</h2>
      <div className="max-h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-white rounded-l-lg scrollbar-track-[#2563eb] scrollbar-thumb-rounded-full">
        {positions.map((position, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            className={`flex justify-between mb-2 border-b-2 pb-3 cursor-pointer ${
              selectedIndex === index
                ? "border-l-4 border-white rounded-b-md"
                : " border-black"
            }`}
          >
            <div className="flex flex-col pl-2">
              <span className="text-2xl font-bold">{position.name}</span>
              <span className="text-xl  font-semibold">
                ${position.price.toFixed(2)}
              </span>
            </div>
            <span
              className={`ml-4 font-bold text-xl w-28 ${
                position.change > 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              <div className="flex items-center ">
                {position.change > 0 ? (
                  <span className="mr-2">▲</span>
                ) : (
                  <span className="mr-2">▼</span>
                )}
                <div className="flex flex-col">
                  <div>${position.change.toFixed(2)}</div>
                  <div className="ml-2">{position.percent}%</div>
                </div>
              </div>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Positions;
