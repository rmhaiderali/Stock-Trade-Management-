export default function Positions({
  positions,
  selectedPosition,
  setSelectedPosition,
}) {
  return (
    <div className="p-4 rounded-b-lg rounded-r-md">
      <h2 className="text-3xl mb-4 font-bold">Positions</h2>
      <div className="max-h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-white scrollbar-track-[#2563eb] scrollbar-thumb-rounded-full">
        {positions.map((position, index) => (
          <div
            key={index}
            onClick={() => setSelectedPosition(position)}
            className={`flex justify-between border-b-2 cursor-pointer border-black py-2 ${
              selectedPosition.name === position.name
                ? "bg-[#2563eb] text-white"
                : ""
            } ${index === 0 ? "border-t-2" : ""}`}
          >
            <div className="flex flex-col pl-2">
              <span className="text-2xl font-bold">{position.name}</span>
              <span className="text-xl  font-semibold">
                ${position.current_price}
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
                  <div>${position.change}</div>
                  <div className="ml-2">{position.change_percent}%</div>
                </div>
              </div>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
