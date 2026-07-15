import { LayoutDashboard, Receipt, Boxes, Settings } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-blue-700 text-white flex flex-col">
      <div className="text-3xl font-bold p-6 border-b border-blue-600">
        HDK POS
      </div>

      <nav className="flex flex-col p-4 gap-2">
        <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-600">
          <LayoutDashboard size={20} />
          Dashboard
        </button>

        <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-600">
          <Receipt size={20} />
          Billing
        </button>

        <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-600">
          <Boxes size={20} />
          Inventory
        </button>

        <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-600">
          <Settings size={20} />
          Settings
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;