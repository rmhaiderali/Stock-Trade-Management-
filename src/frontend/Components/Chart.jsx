import Loading from "./Loading";

export default function Chart({ selectedPosition }) {
  if (!selectedPosition.name)
    return (
      <div className="flex flex-col md:flex-row justify-between p-4 bg-[#2563eb] text-white rounded-lg min-h-[196px]">
        <div className="text-white flex justify-center items-center grow">
          <Loading />
        </div>
      </div>
    );

  const stockName = selectedPosition.name;
  const positionValue = selectedPosition.value;
  const todayGainLoss = selectedPosition.change * selectedPosition.shares;
  const positionGainLoss =
    selectedPosition.change_percent * selectedPosition.shares;
  const shares = selectedPosition.shares;

  return (
    <div className="flex flex-col md:flex-row justify-between p-4 bg-[#2563eb] text-white rounded-lg">
      <div className="flex flex-col gap-5">
        <div className="flex items-center">
          <h1 className="text-4xl md:text-5xl font-bold">{stockName}</h1>
          <div className="ml-2 mt-1 md:mt-0 text-xl">{shares} shares</div>
        </div>
        <span className="text-3xl md:text-5xl font-bold">
          ${positionValue.toFixed(2)}
        </span>
        <div className="text-lg">Position value</div>
      </div>
      <div className="flex flex-col gap-5 md:flex-col  md:items-center md:ml-auto">
        <div
          className={`flex flex-col ${
            todayGainLoss < 0 ? "text-red-500" : "text-green-500"
          }`}
        >
          <span className="text-2xl md:text-4xl font-bold">
            ${Math.abs(todayGainLoss.toFixed(2))}
          </span>
          <span className="text-sm md:text-lg text-white text-right">
            Today's Gain/Loss
          </span>
        </div>
        <div
          className={`flex flex-col ${
            positionGainLoss < 0 ? "text-red-500" : "text-green-500"
          }`}
        >
          <span className="text-2xl md:text-4xl font-bold">
            ${Math.abs(positionGainLoss.toFixed(2))}
          </span>
          <span className="text-sm md:text-lg text-white text-right">
            Position Gain/Loss
          </span>
        </div>
      </div>
    </div>
  );
}
