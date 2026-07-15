import { useState } from "react";
import { supabase } from "../../services/supabase";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    console.log(data);
    console.log(error);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Registration Successful!");
    navigate("/login");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Register</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
