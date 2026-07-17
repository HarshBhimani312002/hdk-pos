const BrandPanel = () => {
  return (
   <div className="hidden h-full w-full flex-col justify-between bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500 p-8 text-white lg:flex xl:p-10">
      <div className="max-w-xl">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-2xl">
            ✨
          </div>

          <div>
            <h1 className="text-3xl font-bold">HDK POS</h1>

            <p className="text-sm text-blue-100">
              Built for Modern Retail
            </p>
          </div>
        </div>

        <h2 className="max-w-lg text-3xl font-bold leading-snug">
          The complete retail operating system for modern businesses.
        </h2>

        <p className="mt-5 max-w-lg text-base leading-7 text-blue-100">
          Manage billing, inventory, customers, sales and analytics from one
          powerful dashboard.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="mt-8 space-y-3">
        <div className="rounded-2xl bg-white/10 p-3 backdrop-blur-md">
          <h3 className="font-semibold">✓ Smart Billing</h3>

          <p className="mt-2 text-sm text-blue-100">
            Create invoices in seconds with lightning-fast checkout.
          </p>
        </div>

        <div className="rounded-2xl bg-white/10 p-3 backdrop-blur-md">
          <h3 className="font-semibold">✓ Inventory Control</h3>

          <p className="mt-2 text-sm text-blue-100">
            Track stock levels, low inventory alerts and warehouse movement.
          </p>
        </div>

        <div className="rounded-2xl bg-white/10 p-3 backdrop-blur-md">
          <h3 className="font-semibold">✓ Business Analytics</h3>

          <p className="mt-2 text-sm text-blue-100">
            Monitor sales, profit and business performance in real time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BrandPanel;