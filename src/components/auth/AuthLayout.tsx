type AuthLayoutProps = {
  left: React.ReactNode;
  right: React.ReactNode;
};

const AuthLayout = ({ left, right }: AuthLayoutProps) => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-cyan-50">

      {/* Background Blur */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-blue-300 opacity-20 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-300 opacity-20 blur-3xl" />

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
      <div className="relative z-10 flex min-h-screen">
        <div className="hidden lg:flex lg:w-1/2">
          {left}
        </div>

        <div className="flex w-full items-center justify-center p-8 lg:w-1/2">
          {right}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;