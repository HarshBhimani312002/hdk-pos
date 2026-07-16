import {
  Plus,
  Receipt,
  Package,
  Users,
} from "lucide-react";

const actions = [
  {
    title: "Create Bill",
    icon: <Receipt size={22} />,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Add Product",
    icon: <Package size={22} />,
    color: "from-violet-500 to-purple-500",
  },
  {
    title: "Add Customer",
    icon: <Users size={22} />,
    color: "from-orange-500 to-red-500",
  },
  {
    title: "New Sale",
    icon: <Plus size={22} />,
    color: "from-emerald-500 to-green-500",
  },
];

const QuickActions = () => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900">
        Quick Actions
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Frequently used shortcuts
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4">
        {actions.map((action) => (
          <button
            key={action.title}
            className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
          >
            <div
              className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r ${action.color} text-white shadow`}
            >
              {action.icon}
            </div>

            <p className="mt-4 font-semibold text-slate-800">
              {action.title}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;