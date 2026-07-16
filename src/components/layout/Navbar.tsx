import { useState } from "react";
import {
  Bell,
  Search,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Store,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useUser } from "../../context/UserContext";

const Navbar = () => {
  const { user } = useUser();

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");

    toast.success("Logged Out Successfully");

    if (user?.role === "staff") {
      navigate("/staff-login");
    } else {
      navigate("/login");
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/95 px-8 backdrop-blur">
      {/* Left */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Welcome back, {user?.username} 👋
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage your store efficiently with HDK POS
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden lg:block">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search products, customers..."
            className="h-12 w-72 max-w-sm rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-700 outline-none transition-all duration-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
          />
        </div>

        {/* Notification */}
        <button className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:bg-slate-100 hover:shadow-md">
          <Bell size={20} className="text-slate-700" />

          <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-red-500"></span>
        </button>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-2 transition-all duration-300 hover:border-blue-200 hover:bg-slate-50 hover:shadow-md"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-lg font-bold text-white shadow">
              {user?.username?.charAt(0).toUpperCase()}
            </div>

            <div className="hidden text-left sm:block">
              <p className="font-semibold text-slate-900">{user?.username}</p>

              <p className="text-xs capitalize text-slate-500">{user?.role}</p>
            </div>

            <ChevronDown
              size={18}
              className={`text-slate-500 transition-transform duration-300 ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>

          {open && (
            <div className="absolute right-0 mt-3 w-72 max-w-sm overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl ring-1 ring-slate-200/60">
              {/* Header */}
              <div className="border-b border-slate-100 p-5">
                {/* Store */}
                <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                  <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-400">
                    Active Store
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                        <Store size={18} />
                      </div>

                      <div>
                        <h3 className="font-semibold text-slate-900">
                          {user?.store_name} Store
                        </h3>

                        <p className="text-xs text-slate-500">Retail Store</p>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                      <span className="h-2 w-2 rounded-full bg-green-500"></span>
                      Active
                    </span>
                  </div>
                </div>
              </div>

              {/* Menu */}
              <div className="p-3">
                <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-slate-700 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600">
                  <User size={18} />
                  My Profile
                </button>

                <button className="mt-1 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-slate-700 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600">
                  <Settings size={18} />
                  Settings
                </button>

                <div className="my-3 border-t border-slate-200"></div>

                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left font-medium text-red-600 transition-all duration-200 hover:bg-red-50"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
