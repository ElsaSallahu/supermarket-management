import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./auth.css";

const Register = () => {
  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [role, setRole] =
    useState("cashier");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Empty fields
if (!fullName || !email || !password) {
  alert("Please fill all fields");
  return;
}

// Email
const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {
  alert("Please enter a valid email");
  return;
}

// Password
if (password.length < 6) {
  alert(
    "Password must be at least 6 characters"
  );
  return;
}

    try {
      await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          full_name: fullName,
          email,
          password,
          role,
        }
      );

      alert("Registered successfully");

      navigate("/login");
    } catch (err) {
      console.log(err);
      alert("Register failed");
    }
  };

  return (
    <div className="auth-container">
      <form
        onSubmit={handleRegister}
        className="auth-form"
      >
        <h2>Register</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) =>
            setFullName(e.target.value)
          }
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <select
          value={role}
          onChange={(e) =>
            setRole(e.target.value)
          }
        >
          <option value="admin">
            Admin
          </option>

          <option value="manager">
            Manager
          </option>

          <option value="cashier">
            Cashier
          </option>

        </select>

        <button type="submit">
          Register
        </button>

        <p
          onClick={() =>
            navigate("/login")
          }
          style={{ cursor: "pointer" }}
        >
          Already have account?
          Login
        </p>
      </form>
    </div>
  );
};

export default Register;