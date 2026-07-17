const SalesChart = () => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
            Sales Analytics
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Revenue overview for this week
          </p>
        </div>

        <select className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm outline-none hover:border-blue-400 sm:w-auto">
          <option>This Week</option>
          <option>This Month</option>
          <option>This Year</option>
        </select>
      </div>

      {/* Fake Chart */}
      <div className="flex h-64 items-end justify-between gap-2 rounded-2xl bg-slate-50 p-4 sm:h-72 sm:gap-3 sm:p-5 lg:h-80 lg:p-6">
        {[45, 70, 55, 90, 65, 100, 80].map((height, index) => (
          <div
            key={index}
            className="flex flex-1 flex-col items-center"
          >
            <div
              className="w-full rounded-t-xl bg-gradient-to-t from-blue-600 to-cyan-400 transition-all duration-300 hover:opacity-80"
              style={{ height: `${height * 2}px` }}
            />

            <span className="mt-2 text-[10px] font-medium text-slate-500 sm:mt-3 sm:text-xs">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesChart;