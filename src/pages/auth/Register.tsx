import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, User } from "lucide-react";
import toast from "react-hot-toast";

import { supabase } from "../../services/supabase";

import AuthLayout from "../../components/auth/AuthLayout";
import BrandPanel from "../../components/auth/BrandPanel";
import AuthInput from "../../components/auth/AuthInput";
import PasswordInput from "../../components/auth/PasswordInput";
import GradientButton from "../../components/auth/GradientButton";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        navigate("/");
      }
    });
  }, [navigate]);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    console.log(data);
    console.log(error);

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    toast.success("Registration Successful!");

    await supabase.auth.signOut();

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
              icon={<User size={18} />}
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

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

            <PasswordInput
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
