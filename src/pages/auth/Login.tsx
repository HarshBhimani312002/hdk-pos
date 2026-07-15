import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";
import toast from "react-hot-toast";

import { supabase } from "../../services/supabase";

import AuthLayout from "../../components/auth/AuthLayout";
import BrandPanel from "../../components/auth/BrandPanel";
import AuthInput from "../../components/auth/AuthInput";
import PasswordInput from "../../components/auth/PasswordInput";
import GradientButton from "../../components/auth/GradientButton";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        navigate("/");
      }
    });
  }, [navigate]);

  const handleLogin = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    toast.success("Login Successful!");

    setLoading(false);

    navigate("/");
  };

  return (
    <AuthLayout
      left={<BrandPanel />}
      right={
        <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-2xl">
          <h1 className="text-4xl font-bold text-gray-900">Welcome back</h1>

          <p className="mt-2 text-gray-500">
            Sign in to your HDK POS workspace to continue.
          </p>

          <div className="mt-8 space-y-5">
            <AuthInput
              icon={<Mail size={18} />}
              type="email"
              placeholder="Work email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" className="rounded" />
                Remember me
              </label>

              <button type="button" className="text-blue-600 hover:underline">
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
          </div>
        </div>
      }
    />
  );
};

export default Login;
