import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import toast from "react-hot-toast";

import { supabase } from "../../services/supabase";
import { useUser } from "../../context/UserContext";

import AuthLayout from "../../components/auth/AuthLayout";
import BrandPanel from "../../components/auth/BrandPanel";
import AuthInput from "../../components/auth/AuthInput";
import PasswordInput from "../../components/auth/PasswordInput";
import GradientButton from "../../components/auth/GradientButton";
import Divider from "../../components/auth/Divider";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleLogin = async () => {
    if (!username || !password) {
      toast.error("Please enter username and password");
      return;
    }

    setLoading(true);

    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", username)
      .eq("password", password)
      .eq("role", "owner")
      .maybeSingle();

    if (error || !user) {
      toast.error("Invalid Username or Password");
      setLoading(false);
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));
    setUser(user);

    toast.success("Login Successful!");

    setLoading(false);

    navigate("/dashboard");
  };

  return (
    <AuthLayout
      left={<BrandPanel />}
      right={
        <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8 lg:p-10">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Welcome back
          </h1>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Sign in to your HDK POS workspace to continue.
          </p>

          <div className="mt-6 space-y-5 sm:mt-8">
            <AuthInput
              icon={<User size={18} />}
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <PasswordInput
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" className="rounded" />
                Remember me
              </label>

              <button
                type="button"
                className="text-left text-blue-600 hover:underline sm:text-right"
              >
                Forgot Password?
              </button>
            </div>

            <GradientButton
              text={loading ? "Signing In..." : "Sign In"}
              onClick={handleLogin}
            />

            <p className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-blue-600 hover:underline"
              >
                Create one
              </Link>
            </p>

            <Divider />

            <Link
              to="/staff-login"
              className="block w-full rounded-xl border-2 border-green-600 py-3 text-center text-sm font-semibold text-green-600 transition hover:bg-green-600 hover:text-white sm:text-base"
            >
              Continue as Staff
            </Link>
          </div>
        </div>
      }
    />
  );
};

export default Login;