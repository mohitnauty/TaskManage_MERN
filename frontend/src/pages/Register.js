import { useState } from "react";
import API from "../api/api";

export default function Register() {
  const [data, setData] = useState({});

  const handleRegister = async () => {
    try {
      await API.post("/auth/register", data);
      alert("Registered successfully");
      window.location.href = "/";
    } catch (err) {
      alert(err.response?.data?.error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Register</h2>

      <input
        placeholder="Name"
        onChange={(e) => setData({ ...data, name: e.target.value })}
      /><br /><br />

      <input
        placeholder="Email"
        onChange={(e) => setData({ ...data, email: e.target.value })}
      /><br /><br />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setData({ ...data, password: e.target.value })}
      /><br /><br />

      <button onClick={handleRegister}>Register</button>
    </div>
  );
}