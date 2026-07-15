import { Link } from "react-router-dom";

function Login() {
  return (
    <div style={{ padding: "40px" }}>
      <h1>Login Page</h1>

      <br />

      <Link to="/register">
        Don't have an account? Register
      </Link>
    </div>
  );
}

export default Login;