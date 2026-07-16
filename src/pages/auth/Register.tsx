import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Store, User } from "lucide-react";
import toast from "react-hot-toast";

import { supabase } from "../../services/supabase";

import AuthLayout from "../../components/auth/AuthLayout";
import BrandPanel from "../../components/auth/BrandPanel";
import AuthInput from "../../components/auth/AuthInput";
import PasswordInput from "../../components/auth/PasswordInput";
import GradientButton from "../../components/auth/GradientButton";

const Register = () => {
  const [storeName, setStoreName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!storeName || !username || !password) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    // Check if username already exists
    const { data: existingUser } = await supabase
      .from("users")
      .select("*")
      .eq("username", username)
      .maybeSingle();

    if (existingUser) {
      toast.error("Username already exists");
      setLoading(false);
      return;
    }

    // Create Owner
    const { error } = await supabase.from("users").insert({
      store_name: storeName,
      username,
      password,
      role: "owner",
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    toast.success("Account Created Successfully");

    setLoading(false);

    navigate("/login");
  };

  return (
    <AuthLayout
      left={<BrandPanel />}
      right={
        <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-2xl">
          <h1 className="text-4xl font-bold text-gray-900">Create Account</h1>

          <p className="mt-2 text-gray-500">Create your HDK POS workspace.</p>

          <div className="mt-8 space-y-5">
            <AuthInput
              icon={<Store size={18} />}
              type="text"
              placeholder="Store Name"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
            />

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
              text={loading ? "Creating Account..." : "Create Account"}
              onClick={handleRegister}
            />

            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-blue-600 hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      }
    />
  );
};

export default Register;
