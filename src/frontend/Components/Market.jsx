export default function Market({ markets }) {
  return (
    <div className="py-4 rounded-lg ">
      <h2 className="text-3xl mb-4 font-bold">Markets</h2>
      <div className="max-h-[390px] overflow-y-auto scrollbar-thin scrollbar-thumb-white scrollbar-track-[#2563eb] scrollbar-thumb-rounded-full">
        {markets.map((market, index) => (
          <div
            key={index}
            className={`flex justify-between gap-4 border-b-2 border-black p-2 ${
              index === 0 ? "border-t-2" : ""
            }`}
          >
            <div className="flex flex-col flex-grow">
              <marquee scrollamount="4" className="text-2xl font-bold">
                {market.name}
              </marquee>
              <span className="text-xl font-semibold">
                ${market.value.toFixed(2)}
              </span>
            </div>
            <span
              className={`font-bold text-xl ${
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
                  <div className="text-center">${Math.abs(market.change)}</div>
                  <div className="text-center">{Math.abs(market.percent)}%</div>
                </div>
              </div>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
