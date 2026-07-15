import { Link } from "react-router-dom";

function Register() {
  return (
    <div style={{ padding: "40px" }}>
      <h1>Register Page</h1>

      <br />

      <Link to="/login">
        Already have an account? Login
      </Link>
    </div>
  );
}

export default Register;