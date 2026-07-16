import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useUser } from "../../context/UserContext";

import Sidebar from "../../components/layout/Sidebar";
import Navbar from "../../components/layout/Navbar";
import DashboardCard from "../../components/layout/DashboardCard";

const StaffDashboard = () => {
  const navigate = useNavigate();

  const { user, setUser } = useUser();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");

    setUser(null);

    toast.success("Logged Out Successfully");

    navigate("/staff-login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <div className="p-6">
          <div className="mb-6 rounded-xl bg-white p-5 shadow">
            <h2 className="text-2xl font-bold">
              Welcome, {user?.username} 👋
            </h2>

            <p className="mt-2 text-gray-600">
              Store : {user?.store_name}
            </p>

            <p className="text-gray-600">
              Role : Staff
            </p>
          </div>

          <div className="grid grid-cols-4 gap-6">
            <DashboardCard title="Today's Sales" value="₹0" />
            <DashboardCard title="Orders" value="0" />
            <DashboardCard title="Products" value="0" />
            <DashboardCard title="Customers" value="0" />
          </div>

          <button
            onClick={handleLogout}
            className="mt-8 rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;