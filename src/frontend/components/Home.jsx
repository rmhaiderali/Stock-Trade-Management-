import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Positions from "./Positions";
import Chart from "./Chart";
import Strategy from "./Strategy";
import Market from "./Market";
import Loading from "./Loading";
import axios from "./Libraries/custom-axios";
import TradingViewWidget, {
  Themes,
} from "./Libraries/react-tradingview-widget";

export default function Home({ isSignedIn, isValidatingUser }) {
  const navigate = useNavigate();

  const [positions, setPositions] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState({});
  const [markets, setMarkets] = useState([]);
  const [strategies, setStrategies] = useState([]);

  useEffect(() => {
    if (isValidatingUser) return;
    if (!isSignedIn) return navigate("/login");

    axios("/api/plaid/getPositions").then((response) => {
      if (response.data.data) {
        setPositions(response.data.data);
        setSelectedPosition(response.data.data[0]);
      }
    });

    axios("/api/yahooFinance").then((response) => {
      if (response.data.success) setMarkets(response.data.data);
    });
  }, [isSignedIn]);

  if (isValidatingUser)
    return (
      <div
        className="text-blue-500 flex justify-center items-center h-[--height]"
        style={{ "--height": "calc(100vh - 80px)" }}
        key="loading"
      >
        <Loading />
      </div>
    );

  return (
    <div className="min-h-screen">
      <div className="flex flex-col lg:flex-row">
        {!selectedPosition ? (
          <div
            className="lg:w-3/4 flex flex-col justify-center items-center lg:h-[--height] pb-4"
            style={{ "--height": "calc(100vh - 80px)" }}
          >
            <span>No investments found on currently linked account.</span>
            <span>Invest in stocks to see your investments here.</span>
            <br />
            <span>OR</span>
            <br />
            <button
              className="flex text-white border-0 py-2 px-8 focus:outline-none rounded text-md bg-blue-500 hover:bg-blue-600"
              onClick={() => navigate("/linkPlaid")}
            >
              Change Linked Account
            </button>
          </div>
        ) : (
          <>
            <div
              className={`lg:w-1/4 ${
                positions.length
                  ? ""
                  : "lg:h-[--height] flex justify-center items-center mb-4"
              }`}
              style={{ "--height": "calc(100vh - 80px)" }}
            >
              {positions.length ? (
                <Positions
                  positions={positions}
                  selectedPosition={selectedPosition}
                  setSelectedPosition={setSelectedPosition}
                />
              ) : (
                <div className="text-blue-600">
                  <Loading />
                </div>
              )}
            </div>
            <div className="lg:w-1/2 px-4">
              <Chart selectedPosition={selectedPosition} />
              <Strategy
                isSignedIn={isSignedIn}
                strategies={strategies}
                setStrategies={setStrategies}
                selectedPosition={selectedPosition}
              />
            </div>
          </>
        )}
        <div className="lg:w-1/4 px-4 flex flex-col">
          <div className="mb-3 rounded-lg">
            <div className="h-[400px] rounded-2xl overflow-hidden">
              <TradingViewWidget
                symbol={selectedPosition?.name || ""}
                theme={Themes.DARK}
                locale="en"
                autosize
              />
            </div>
          </div>

          {markets.length ? (
            <Market markets={markets} />
          ) : (
            <div className="text-blue-600 grow flex justify-center items-center mb-4">
              <Loading />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
