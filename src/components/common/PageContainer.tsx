type PageContainerProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

const PageContainer = ({
  title,
  subtitle,
  children,
}: PageContainerProps) => {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-2 text-slate-500">
            {subtitle}
          </p>
        )}
      </div>

      {children}
    </div>
  );
};

export default PageContainer;