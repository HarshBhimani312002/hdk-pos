const SalesChart = () => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Sales Analytics
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Revenue overview for this week
          </p>
        </div>

        <select className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm outline-none hover:border-blue-400">
          <option>This Week</option>
          <option>This Month</option>
          <option>This Year</option>
        </select>
      </div>

      {/* Fake Chart */}
      <div className="flex h-80 items-end justify-between gap-3 rounded-2xl bg-slate-50 p-6">
        {[45, 70, 55, 90, 65, 100, 80].map((height, index) => (
          <div
            key={index}
            className="flex flex-1 flex-col items-center"
          >
            <div
              className="w-full rounded-t-xl bg-gradient-to-t from-blue-600 to-cyan-400 transition-all duration-300 hover:opacity-80"
              style={{ height: `${height * 2}px` }}
            />

            <span className="mt-3 text-xs font-medium text-slate-500">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesChart;