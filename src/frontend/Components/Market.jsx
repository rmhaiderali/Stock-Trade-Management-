export default function Market({ markets }) {
  return (
    <div className="p-4 rounded-lg ">
      <h2 className="text-3xl mb-4 font-bold">Markets</h2>
      <div className="max-h-[390px] overflow-y-auto scrollbar-thin scrollbar-thumb-white scrollbar-track-[#2563eb] scrollbar-thumb-rounded-full">
        {markets.map((market, index) => (
          <div
            key={index}
            className="flex justify-between mb-2 border-b-2 pb-3 cursor-pointer pl-2 border-l-4 border-white rounded-b-md"
          >
            <div className="flex flex-col">
              <marquee scrollamount="4" className="text-2xl font-bold">
                {market.name}
              </marquee>
              <span className="text-xl font-semibold">
                ${market.value.toFixed(2)}
              </span>
            </div>
            <span
              className={`ml-4 font-bold text-xl w-24 mr-5 ${
                market.change > 0
                  ? "text-green-500  rounded-2xl"
                  : "text-red-500 rounded-2xl"
              }`}
            >
              <div className="flex items-center">
                {market.change > 0 ? (
                  <span className="mr-2">▲</span>
                ) : (
                  <span className="mr-2">▼</span>
                )}
                <div className="flex flex-col">
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
}
