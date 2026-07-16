import type { ReactNode } from "react";
import { TrendingUp } from "lucide-react";

type DashboardCardProps = {
  title: string;
  value: string;
  icon?: ReactNode;
  color?: string;
  trend?: string;
  subtitle?: string;
};

const DashboardCard = ({
  title,
  value,
  icon,
  trend = "+12%",
  subtitle = "Compared to yesterday",
  color = "from-blue-500 to-cyan-500",
}: DashboardCardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-2xl">
      {/* Background Glow */}
      <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-blue-50 opacity-0 transition-all duration-300 group-hover:opacity-100"></div>

      {/* Top */}
      <div className="relative z-10 mb-6 flex items-start justify-between">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r ${color} text-white shadow-lg`}
        >
          {icon}
        </div>

        <div className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
          <TrendingUp size={13} />
          {trend}
        </div>
      </div>

      {/* Title */}
      <p className="text-sm font-semibold tracking-wide text-slate-500">
        {title}
      </p>

      {/* Value */}
      <h2 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
        {value}
      </h2>

      {/* Footer */}
      <div className="mt-6 border-t border-slate-100 pt-4">
        <p className="text-sm text-slate-400">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default DashboardCard;