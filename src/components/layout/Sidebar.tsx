import {
  LayoutDashboard,
  Receipt,
  Boxes,
  Settings,
  Users,
  UsersRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <div className="w-64 h-screen bg-blue-700 text-white flex flex-col">
      <div className="text-3xl font-bold p-6 border-b border-blue-600">
        HDK POS
      </div>

      <nav className="flex flex-col p-4 gap-2">
        <button
          onClick={() =>
            navigate(user?.role === "staff" ? "/staff-dashboard" : "/dashboard")
          }
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-600"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </button>

        <button
          onClick={() => navigate("/billing")}
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-600"
        >
          <Receipt size={20} />
          Billing
        </button>

        <button
          onClick={() => navigate("/inventory")}
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-600"
        >
          <Boxes size={20} />
          Inventory
        </button>
        <button
          onClick={() => navigate("/customers")}
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-600"
        >
          <UsersRound size={20} />
          Customers
        </button>

        {/* Owner Only */}
        {user?.role === "owner" && (
          <>
            <button
              onClick={() => navigate("/staff-management")}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-600"
            >
              <Users size={20} />
              Staff Management
            </button>

            <button
              onClick={() => navigate("/settings")}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-600"
            >
              <Settings size={20} />
              Settings
            </button>
          </>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
