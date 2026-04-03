import { useState } from "react";
import API from "../api/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", {
        email,
        password
      });

      // ✅ Save token
      localStorage.setItem("token", res.data.token);

      alert("Login successful");

      // redirect
      window.location.href = "/dashboard";
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Login</h2>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      /><br /><br />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      /><br /><br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}