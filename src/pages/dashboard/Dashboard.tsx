import Sidebar from "../../components/layout/Sidebar";
import Navbar from "../../components/layout/Navbar";
import DashboardCard from "../../components/layout/DashboardCard";
import { supabase } from "../../services/supabase";

const Dashboard = () => {
  const handleLogout = async () => {
    await supabase.auth.signOut();

    alert("Logged Out!");

    window.location.href = "/login";
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Navbar />

        <div className="p-6">
          <div className="grid grid-cols-4 gap-6">
            <DashboardCard
              title="Today's Sales"
              value="₹15,250"
            />

            <DashboardCard
              title="Orders"
              value="56"
            />

            <DashboardCard
              title="Products"
              value="120"
            />

            <DashboardCard
              title="Customers"
              value="89"
            />
          </div>

          <button
            onClick={handleLogout}
            className="mt-8 bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;