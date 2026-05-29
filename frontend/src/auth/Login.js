import React, {
  useState,
} from "react";

import axios from "axios";

import {
  useNavigate,
} from "react-router-dom";

import "./auth.css";

const Login = () => {
  const [email, setEmail] =
    useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const navigate =
    useNavigate();

  const handleLogin =
    async (e) => {
      e.preventDefault();

      try {
        const res =
          await axios.post(
            "http://localhost:5000/api/auth/login",
            {
              email,
              password,
            }
          );

        if (
          res.data.success
        ) {
          // SAVE USER
          localStorage.setItem(
            "user",
            JSON.stringify(
              res.data.user
            )
          );

          const user =
            res.data.user;

          // ROLE REDIRECT
          if (
            user.role ===
            "admin"
          ) {
            navigate(
              "/dashboard"
            );
          } else if (
            user.role ===
            "manager"
          ) {
            navigate(
              "/dashboard"
            );
          } else if (
            user.role ===
            "cashier"
          ) {
            navigate(
              "/sales"
            );
          } else if (
            user.role ===
            "customer"
          ) {
            navigate(
              "/customer-home"
            );
          } else {
            navigate("/");
          }
        } else {
          alert(
            res.data.message
          );
        }
      } catch (err) {
        alert(
          "Login failed"
        );

        console.log(err);
      }
    };

  return (
    <div className="auth-container">
      <form
        onSubmit={
          handleLogin
        }
        className="auth-form"
      >
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          required
        />

        <button
          type="submit"
        >
          Login
        </button>

        <p
          onClick={() =>
            navigate(
              "/register"
            )
          }
          style={{
            cursor:
              "pointer",
          }}
        >
          Don't have an
          account?
          Register
        </p>
      </form>
    </div>
  );
};

export default Login;