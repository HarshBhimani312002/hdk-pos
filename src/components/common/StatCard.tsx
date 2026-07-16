import type { ReactNode } from "react";

type StatCardProps = {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  badge?: string;
};

const StatCard = ({
  title,
  value,
  subtitle,
  icon,
  badge,
}: StatCardProps) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-5 flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
          {icon}
        </div>

        {badge && (
          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-600">
            {badge}
          </span>
        )}
      </div>

      <p className="text-sm text-slate-500">
        {title}
      </p>

      <h2 className="mt-2 text-3xl font-bold text-slate-900">
        {value}
      </h2>

      {subtitle && (
        <p className="mt-2 text-sm text-slate-400">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default StatCard;