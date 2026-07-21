import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import toast from "react-hot-toast";

import Divider from "../../components/auth/Divider";
import AuthLayout from "../../components/auth/AuthLayout";
import BrandPanel from "../../components/auth/BrandPanel";
import AuthInput from "../../components/auth/AuthInput";
import PasswordInput from "../../components/auth/PasswordInput";
import GradientButton from "../../components/auth/GradientButton";

import { supabase } from "../../services/supabase";
import { useUser } from "../../context/UserContext";

const StaffLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      toast.error("Please enter username and password");
      return;
    }

    try {
      setLoading(true);

      const { data: user, error } = await supabase
        .from("users")
        .select("*")
        .eq("username", username.trim())
        .eq("password", password)
        .eq("role", "staff")
        .maybeSingle();

      if (error || !user) {
        toast.error("Invalid username or password.");
        return;
      }

      // Prevent inactive staff from logging in
      if (user.status === "Inactive") {
        toast.error("Your account is inactive. Please contact the store owner.");
        return;
      }

      localStorage.setItem("currentUser", JSON.stringify(user));

      setUser(user);

      toast.success(`Welcome ${user.username}!`);

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      left={<BrandPanel />}
      right={
        <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-2xl">
          <h1 className="text-4xl font-bold text-gray-900">
            Staff Login
          </h1>

          <p className="mt-2 text-gray-500">
            Login with your staff account.
          </p>

          <div className="mt-8 space-y-5">
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

            <GradientButton
              text={loading ? "Signing In..." : "Sign In"}
              onClick={handleLogin}
            />

            <Divider />

            <Link
              to="/login"
              className="block w-full rounded-xl border-2 border-green-600 py-3 text-center font-semibold text-green-600 transition hover:bg-green-600 hover:text-white"
            >
              Continue as Owner
            </Link>
          </div>
        </div>
      }
    />
  );
};

export default StaffLogin;