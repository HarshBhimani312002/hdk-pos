type AuthLayoutProps = {
  left: React.ReactNode;
  right: React.ReactNode;
};

const AuthLayout = ({ left, right }: AuthLayoutProps) => {
  return (
    <div className="relative h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-cyan-50">
      {/* Background Blur */}
      <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-blue-300 opacity-20 blur-3xl sm:-left-40 sm:-top-40 sm:h-96 sm:w-96" />

      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-300 opacity-20 blur-3xl sm:h-96 sm:w-96" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right,#000 1px,transparent 1px),
            linear-gradient(to bottom,#000 1px,transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col lg:flex-row">
        {/* Left Panel */}
        <div className="hidden h-full lg:flex lg:w-1/2">
          {left}
        </div>

        {/* Right Panel */}
        <div className="flex h-full w-full items-center justify-center px-4 py-6 sm:px-6 md:px-8 lg:w-1/2 lg:px-10">
          {right}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;