const BrandPanel = () => {
  return (
    <div className="hidden lg:flex flex-col justify-between h-screen bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500 text-white p-12">

      <div>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-2xl">
            ✨
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              HDK POS
            </h1>

            <p className="text-sm text-blue-100">
              Built for Modern Retail
            </p>
          </div>
        </div>

        <h2 className="text-3xl font-bold leading-tight">
          The complete retail operating system for modern businesses.
        </h2>

        <p className="my-3 text-blue-100 text-lg leading-8">
          Manage billing, inventory, customers, sales and analytics from one powerful dashboard.
        </p>

      </div>

      <div className="space-y-4">

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5">
          <h3 className="font-semibold">
            ✓ Smart Billing
          </h3>

          <p className="text-blue-100 mt-2 text-sm">
            Create invoices in seconds with lightning-fast checkout.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5">
          <h3 className="font-semibold">
            ✓ Inventory Control
          </h3>

          <p className="text-blue-100 mt-2 text-sm">
            Track stock levels, low inventory alerts and warehouse movement.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5">
          <h3 className="font-semibold">
            ✓ Business Analytics
          </h3>

          <p className="text-blue-100 mt-2 text-sm">
            Monitor sales, profit and business performance in real time.
          </p>
        </div>

      </div>

    </div>
  );
};

export default BrandPanel;