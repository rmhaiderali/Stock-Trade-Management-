import React, { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import axios from "../custom-axios";

const Strategy = ({ strategies, setStrategies }) => {
  const [expandedStrategy, setExpandedStrategy] = useState(null);

  const toggleExpand = (strategyName) => {
    if (expandedStrategy === strategyName) {
      setExpandedStrategy(null);
    } else {
      setExpandedStrategy(strategyName);
    }
  };

  function textAreaAdjust({ target: element }) {
    element.style.height = "1px";
    element.style.height = element.scrollHeight + "px";
  }

  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   (async () => {
  //     setIsLoading(true);
  //     const response = await axios("/api/suggestUsingAI");
  //     if (response.data.success) setStrategies(response.data.data);
  //     setIsLoading(false);
  //   })();
  // }, []);

  return (
    <div className="p-4">
      {isLoading ? (
        <div className="text-center mb-2">Loading</div>
      ) : (
        strategies.map((strategy, index) => (
          <div
            key={index}
            className="mb-4 bg-[#2257D6] text-white rounded-lg p-2"
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
                <FaAngleDown
                  className={`dropdown-icon text-xl cursor-pointer ${
                    expandedStrategy === strategy.name
                      ? "transform rotate-180"
                      : ""
                  }`}
                  onClick={() => toggleExpand(strategy.name)}
                />
              </div>
            </div>
            {expandedStrategy === strategy.name && (
              <div className="mt-3  p-3 rounded-lg">
                <div className="flex  gap-2 justify-between align-middle">
                  <div className="mt-5 pl-3 space-y-6">
                    <p>
                      <strong>Strike Price:</strong> {strategy.strikePrice}
                    </p>
                    <p>
                      <strong>Expiration Date:</strong>{" "}
                      {strategy.expirationDate}
                    </p>
                    <p>
                      <strong>Option Price:</strong> ${strategy.optionPrice}
                    </p>
                  </div>
                  {strategy.image && (
                    <img
                      src={strategy.image}
                      alt={`Image for ${strategy.name}`}
                      className="w-56 rounded-lg"
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        ))
      )}
      <div className="bg-blue-600 rounded-lg flex p-3 flex-col justify-between max-h-[330px] text-white ">
        <div className="pb-1 border-b flex flex-row justify-between items-center">
          <div className="">Redefine Strategies</div>
          <button
            className="px-2 py-1 bg-white text-black rounded-md border font-bold"
            onClick={async () => {
              setIsLoading(true);
              const response = await axios.post("/api/suggestUsingAI", {
                message: value,
              });
              if (response.data.success)
                 console.log(response.data.data);
              setIsLoading(false);
            }}
            disabled={isLoading}
          >
            →
          </button>
        </div>

        <textarea
          value={value}
          className="pt-2 bg-[#0000] min-h-0 outline-none placeholder-blue-200"
          onKeyDown={textAreaAdjust}
          rows={1}
          style={{ overflow: "hidden" }}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Whats in your mind"
        ></textarea>
      </div>
    </div>
  );
};

export default Strategy;
