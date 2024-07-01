import React, { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import axios from "../custom-axios";

const Strategy = ({ strategies, setStrategies, selectedStock }) => {
  const [expandedStrategy, setExpandedStrategy] = useState(null);

  const toggleExpand = (strategyName) => {
    if (expandedStrategy === strategyName) {
      setExpandedStrategy(null);
    } else {
      setExpandedStrategy(strategyName);
    }
  };

  function textAreaAdjust(element) {
    element.style.height = "1px";
    element.style.height = element.scrollHeight + "px";
  }

  const [value, setValue] = useState("");
  const [past, setPast] = useState(2);
  const [pastScale, setPastScale] = useState("d");
  const [future, setFuture] = useState(1);
  const [futureScale, setFutureScale] = useState("m");
  const [isLoading, setIsLoading] = useState(false);

  function getMSbyScale(scale) {
    switch (scale) {
      case "d":
        return 86400000;
      case "m":
        return 2592000000;
      case "y":
        return 31536000000;
    }
  }

  function getFullScale(scale, plural = false) {
    switch (scale) {
      case "d":
        return " day" + (plural ? "s" : "");
      case "m":
        return " month" + (plural ? "s" : "");
      case "y":
        return " year" + (plural ? "s" : "");
    }
  }

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      const buy_ago_ms = past * getMSbyScale(pastScale);
      const sell_in_ms = future * getMSbyScale(futureScale);

      const buy_ago = past + getFullScale(pastScale, past > 1);
      const sell_in = future + getFullScale(futureScale, future > 1);

      const response = await axios.post("/api/suggestUsingAI", {
        stock: selectedStock,
        buy_ago,
        sell_in,
        buy_ago_ms,
        sell_in_ms,
      });
      if (response.data.success) setStrategies(response.data.data);
      setIsLoading(false);
    })();
  }, [selectedStock]);

  function bgColor(index) {
    switch (index % 4) {
      case 0:
        return "bg-pink-600";
      case 1:
        return "bg-[#f59e0b]";
      case 2:
        return "bg-blue-600";
      case 3:
        return "bg-green-600";
    }
  }

  return (
    <div className="p-4">
      {isLoading ? (
        <div className="text-center mb-2">Loading</div>
      ) : (
        strategies.map((strategy, index) => (
          <div
            key={index}
            className={"mb-4 text-white rounded-lg p-2 bg-blue-600"}
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
          <div>Redefine Strategies</div>
          <button
            className="px-2 py-1 bg-white text-black rounded-md border font-bold"
            onClick={async () => {
              setIsLoading(true);

              if (!past) return alert("Please enter valid past duration.");
              if (!future) return alert("Please enter valid future duration.");

              const buy_ago_ms = past * getMSbyScale(pastScale);
              const sell_in_ms = future * getMSbyScale(futureScale);

              const buy_ago = past + getFullScale(pastScale, past > 1);
              const sell_in = future + getFullScale(futureScale, future > 1);

              const response = await axios.post("/api/suggestUsingAI", {
                message: value,
                stock: selectedStock,
                buy_ago,
                sell_in,
                buy_ago_ms,
                sell_in_ms,
              });
              if (response.data.success) setStrategies(response.data.data);
              setIsLoading(false);
            }}
            disabled={isLoading}
          >
            →
          </button>
        </div>
        <div className="py-1 border-b items-center">
          <div>
            Bought {selectedStock} stock
            <input
              className="outline-none text-black w-12 bg-white rounded-sm ml-2 pl-1"
              type="number"
              value={past}
              onChange={(e) => {
                if (e.target.value === "" || e.target.value > 0)
                  setPast(e.target.value);
              }}
            />
            <select
              className="outline-none text-black w-22 bg-white rounded-sm mx-2"
              value={pastScale}
              onChange={(e) => setPastScale(e.target.value)}
            >
              <option value="d">day{past > 1 ? "s" : ""}</option>
              <option value="m">month{past > 1 ? "s" : ""}</option>
              <option value="y">year{past > 1 ? "s" : ""}</option>
            </select>
            ago
          </div>
          <div className="mt-2">
            Suggest me strategies for next
            <input
              className="outline-none text-black w-12 bg-white rounded-sm mx-2 pl-1"
              type="number"
              value={future}
              onChange={(e) => {
                if (e.target.value === "" || e.target.value > 0)
                  setFuture(e.target.value);
              }}
            />
            <select
              className="outline-none text-black w-22 bg-white rounded-sm"
              value={futureScale}
              onChange={(e) => setFutureScale(e.target.value)}
            >
              <option value="d">day{future > 1 ? "s" : ""}</option>
              <option value="m">month{future > 1 ? "s" : ""}</option>
              <option value="y">year{future > 1 ? "s" : ""}</option>
            </select>
          </div>
        </div>

        <textarea
          value={value}
          className="pt-2 bg-[#0000] min-h-0 outline-none placeholder-blue-200"
          rows={1}
          style={{ overflow: "hidden" }}
          onChange={(e) => {
            setValue(e.target.value);
            textAreaAdjust(e.target);
          }}
          placeholder="Whats in your mind"
        ></textarea>
      </div>
    </div>
  );
};

export default Strategy;
