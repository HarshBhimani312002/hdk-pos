import { useState, useEffect } from "react";
import {
  Bell,
  Search,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Store,
  Menu,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useUser } from "../../context/UserContext";

interface NavbarProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar = ({ sidebarOpen, setSidebarOpen }: NavbarProps) => {
  const { user } = useUser();

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

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
    <>
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-200 bg-white/95 px-4 py-4 backdrop-blur sm:h-20 sm:px-6 lg:px-8">
        {/* Left */}
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white transition hover:bg-slate-100 lg:hidden"
          >
            <Menu size={22} />
          </button>

          <div className="min-w-0">
            <h1 className="truncate text-lg font-bold tracking-tight text-slate-900 sm:text-3xl">
              Welcome back, {user?.username} 👋
            </h1>

            <p className="mt-1 hidden text-sm text-slate-500 lg:block">
              Manage your store efficiently with HDK POS
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="ml-3 flex flex-shrink-0 items-center gap-2 sm:gap-3">
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

          <button className="relative hidden h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:bg-slate-100 hover:shadow-md lg:flex">
            <Bell size={20} className="text-slate-700" />

            <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-red-500"></span>
          </button>

          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 transition-all duration-300 hover:border-blue-200 hover:bg-slate-50 hover:shadow-md lg:gap-3 lg:px-4"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 font-bold text-white">
                {user?.username?.charAt(0).toUpperCase()}
              </div>

              <div className="hidden text-left lg:block">
                <p className="font-semibold text-slate-900">{user?.username}</p>

                <p className="text-xs capitalize text-slate-500">
                  {user?.role}
                </p>
              </div>

              <ChevronDown
                size={18}
                className={`transition ${
                  open ? "rotate-180" : ""
                } hidden lg:block`}
              />
            </button>

            {/* Desktop Dropdown */}
            {open && (
              <div className="absolute right-0 top-full mt-3 hidden w-72 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl lg:block">
                {/* Header */}
                <div className="border-b border-slate-100 p-5">
                  <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                    <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-400">
                      Active Store
                    </p>

                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                        <Store size={18} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="truncate font-semibold text-slate-900">
                          {user?.store_name} Store
                        </h3>

                        <p className="text-xs text-slate-500">Retail Store</p>
                      </div>

                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                        Active
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-3">
                  <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-slate-700 transition hover:bg-blue-50 hover:text-blue-600">
                    <User size={18} />
                    My Profile
                  </button>

                  <button className="mt-1 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-slate-700 transition hover:bg-blue-50 hover:text-blue-600">
                    <Settings size={18} />
                    Settings
                  </button>

                  <div className="my-3 border-t border-slate-200"></div>

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left font-medium text-red-600 transition hover:bg-red-50"
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

      {/* Mobile Full Screen Profile */}
      {open && (
        <div className="fixed inset-0 z-50 bg-white lg:hidden">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                {user?.username}
              </h2>

              <p className="text-sm capitalize text-slate-500">{user?.role}</p>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="rounded-xl p-2 transition hover:bg-slate-100"
            >
              <X size={24} />
            </button>
          </div>

          <div className="p-5">
            <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-400">
                Active Store
              </p>

              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white">
                  <Store size={24} />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-lg font-semibold text-slate-900">
                    {user?.store_name} Store
                  </h3>

                  <p className="text-sm text-slate-500">Retail Store</p>
                </div>
              </div>

              <div className="mt-4">
                <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500"></span>
                  Active
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <button className="flex w-full items-center gap-4 rounded-2xl px-4 py-4 text-left text-slate-700 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600">
                <User size={22} />
                <span className="text-base font-medium">My Profile</span>
              </button>

              <button className="flex w-full items-center gap-4 rounded-2xl px-4 py-4 text-left text-slate-700 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600">
                <Settings size={22} />
                <span className="text-base font-medium">Settings</span>
              </button>

              <div className="my-4 border-t border-slate-200"></div>

              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-4 rounded-2xl px-4 py-4 text-left font-medium text-red-600 transition-all duration-200 hover:bg-red-50"
              >
                <LogOut size={22} />
                <span className="text-base">Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
