import { supabase } from "../../services/supabase";

const Dashboard = () => {
  const handleLogout = async () => {
    await supabase.auth.signOut();

    alert("Logged Out!");

    window.location.href = "/login";
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;