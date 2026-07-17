import {
  LayoutDashboard,
  Receipt,
  Boxes,
  Settings,
  Users,
  UsersRound,
  Store,
  X,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../../context/UserContext";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();

  const navigateTo = (path: string) => {
    navigate(path);
    setSidebarOpen(false);
  };

  const menuClass = (path: string) =>
    `group flex w-full items-center gap-4 rounded-2xl px-4 py-3 text-[15px] font-semibold transition-all duration-300 ${
      location.pathname === path
        ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-slate-200 bg-white shadow-xl transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 lg:shadow-sm`}
      >
        {/* Logo */}
        <div className="border-b border-slate-200 px-6 py-7">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 shadow-md">
                <Store className="text-white" size={24} />
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                  HDK POS
                </h1>

                <p className="text-sm text-slate-500">Retail Management</p>
              </div>
            </div>

            {/* Mobile Close */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="rounded-xl p-2 hover:bg-slate-100 lg:hidden"
            >
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Menu */}
        <nav className="mt-8 flex-1 space-y-2 overflow-y-auto px-5 pb-6">
          {/* MAIN */}
          <p className="mb-2 px-4 text-xs font-bold uppercase tracking-widest text-slate-400">
            Main
          </p>

          <button
            onClick={() => navigateTo("/dashboard")}
            className={menuClass("/dashboard")}
          >
            <LayoutDashboard size={19} />
            <span>Dashboard</span>
          </button>

          <div className="my-4 border-t border-slate-200"></div>

          {/* MANAGEMENT */}
          <p className="mb-2 px-4 text-xs font-bold uppercase tracking-widest text-slate-400">
            Management
          </p>

          <button
            onClick={() => navigateTo("/billing")}
            className={menuClass("/billing")}
          >
            <Receipt size={19} />
            <span>Billing</span>
          </button>

          <button
            onClick={() => navigateTo("/inventory")}
            className={menuClass("/inventory")}
          >
            <Boxes size={19} />
            <span>Inventory</span>
          </button>

          <button
            onClick={() => navigateTo("/customers")}
            className={menuClass("/customers")}
          >
            <UsersRound size={19} />
            <span>Customers</span>
          </button>
          {/* OWNER ONLY */}
          {user?.role === "owner" && (
            <>
              <div className="my-4 border-t border-slate-200"></div>

              <p className="mb-2 px-4 text-xs font-bold uppercase tracking-widest text-slate-400">
                Administration
              </p>

              <button
                onClick={() => navigateTo("/staff-management")}
                className={menuClass("/staff-management")}
              >
                <Users size={19} />
                <span>Staff Management</span>
              </button>

              <button
                onClick={() => navigateTo("/settings")}
                className={menuClass("/settings")}
              >
                <Settings size={19} />
                <span>Settings</span>
              </button>
            </>
          )}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
