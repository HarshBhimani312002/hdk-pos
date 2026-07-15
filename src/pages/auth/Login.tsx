const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">

      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-center">
          HDK POS
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Retail Billing Software
        </p>

        <input
          type="email"
          placeholder="Email"
          className="w-full mt-8 border rounded-lg p-3"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mt-4 border rounded-lg p-3"
        />

        <button
          className="w-full mt-6 bg-blue-600 text-white rounded-lg p-3"
        >
          Login
        </button>

      </div>

    </div>
  );
};

export default Login;