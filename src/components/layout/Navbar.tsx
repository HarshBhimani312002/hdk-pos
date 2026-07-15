import { Bell, UserCircle } from "lucide-react";

const Navbar = () => {
  return (
    <div className="h-16 bg-white border-b flex items-center justify-between px-6 shadow-sm">
      <h2 className="text-xl font-semibold">
        Dashboard
      </h2>

      <div className="flex items-center gap-4">
        <Bell className="cursor-pointer" size={22} />

        <div className="flex items-center gap-2">
          <UserCircle size={28} />
          <span className="font-medium">Owner</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;