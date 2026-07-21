import { useEffect, useState } from "react";
import { DollarSign, ShoppingCart, Package, Users } from "lucide-react";

import { useUser } from "../../context/UserContext";
import DashboardCard from "../../components/dashboard/DashboardCard";
import SalesChart from "../../components/dashboard/SalesChart";
import RecentOrders from "../../components/dashboard/RecentOrders";
import LowStock from "../../components/dashboard/LowStock";

const Dashboard = () => {
  const { user } = useUser();

  const isStaff = user?.role === "staff";

  // Mobile Sidebar
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hour = currentTime.getHours();

  const greeting =
    hour < 12
      ? "Good Morning ☀️"
      : hour < 17
        ? "Good Afternoon 🌤️"
        : "Good Evening 🌙";

  const formattedDate = currentTime.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <>
      {/* Main */}

        <div className="space-y-6 lg:space-y-8">
          {/* Hero */}
          <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-white to-slate-50 p-5 shadow-sm sm:p-6 lg:p-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
                    Dashboard Overview
                  </span>

                  <span className="text-sm font-medium text-slate-500">
                    {greeting}
                  </span>
                </div>

                <h2 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
                  Everything looks good today 🚀
                </h2>

                <p className="mt-3 max-w-2xl text-sm text-slate-500 sm:text-base">
                  Track your daily sales, orders, inventory and customers from
                  one powerful dashboard.
                </p>

                {/* Hero Stats */}
                <div className="mt-6 flex flex-wrap gap-3">
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2">
                    <p className="text-xs font-medium uppercase text-emerald-600">
                      Revenue
                    </p>

                    <p className="text-lg font-bold text-emerald-700">
                      ₹15,250
                    </p>
                  </div>

                  <div className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-2">
                    <p className="text-xs font-medium uppercase text-blue-600">
                      Orders
                    </p>

                    <p className="text-lg font-bold text-blue-700">56</p>
                  </div>

                  <div className="rounded-xl border border-violet-200 bg-violet-50 px-4 py-2">
                    <p className="text-xs font-medium uppercase text-violet-600">
                      Products
                    </p>

                    <p className="text-lg font-bold text-violet-700">120</p>
                  </div>

                  <div className="rounded-xl border border-orange-200 bg-orange-50 px-4 py-2">
                    <p className="text-xs font-medium uppercase text-orange-600">
                      Customers
                    </p>

                    <p className="text-lg font-bold text-orange-700">89</p>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-slate-500 lg:gap-6">
                  <div>
                    <span className="font-semibold text-slate-700">
                      📅 {formattedDate}
                    </span>
                  </div>

                  <div>
                    <span className="font-semibold text-slate-700">
                      🕒 {formattedTime}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto lg:flex lg:items-center">
                <button className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105 lg:w-auto">
                  + Create Bill
                </button>

                {!isStaff && (
                  <button className="w-full rounded-2xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100 lg:w-auto">
                    Export Report
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            <DashboardCard
              title="Today's Sales"
              value="₹15,250"
              trend="+8.2%"
              subtitle="₹1,120 more than yesterday"
              color="from-emerald-500 to-green-600"
              icon={<DollarSign size={26} />}
            />

            <DashboardCard
              title="Orders"
              value="56"
              trend="+12%"
              subtitle="24 orders pending"
              color="from-blue-500 to-cyan-500"
              icon={<ShoppingCart size={26} />}
            />

            <DashboardCard
              title="Products"
              value="120"
              trend="+3"
              subtitle="12 low stock items"
              color="from-violet-500 to-purple-600"
              icon={<Package size={26} />}
            />

            <DashboardCard
              title="Customers"
              value="89"
              trend="+6%"
              subtitle="8 new customers today"
              color="from-orange-500 to-red-500"
              icon={<Users size={26} />}
            />
          </div>

          {/* Dashboard Widgets */}
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 xl:col-span-8">
              <SalesChart />
            </div>

            <div className="col-span-12 xl:col-span-4">
              <LowStock />
            </div>

            <div className="col-span-12">
              <RecentOrders />
            </div>
          </div>
        </div>
    
    </>
  );
};

export default Dashboard;
