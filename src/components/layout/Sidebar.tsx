const Sidebar = () => {
  return (
    <aside className="w-64 bg-blue-700 text-white p-5">
      <h1 className="text-2xl font-bold">
        HDK POS
      </h1>

      <ul className="mt-10 space-y-4">
        <li>Dashboard</li>
        <li>Billing</li>
        <li>Inventory</li>
        <li>Settings</li>
      </ul>
    </aside>
  );
};

export default Sidebar;