import { useState } from "react";
import axios from "axios";

function CustomerLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/customer-auth/login",
        formData
      );

      localStorage.setItem("customerToken", res.data.token);
      localStorage.setItem("customer", JSON.stringify(res.data.customer));

      alert("Login me sukses");
      window.location.href = "/customer-home";
    } catch (error) {
      console.log(error);
      alert("Email ose password gabim");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #dcfce7, #f8fafc)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "30px"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "400px",
        background: "white",
        padding: "32px",
        borderRadius: "24px",
        boxShadow: "0 20px 40px rgba(15, 23, 42, 0.12)"
      }}>
        <div style={{ textAlign: "center", marginBottom: "25px" }}>
          <div style={{ fontSize: "45px" }}>🛒</div>
          <h2 style={{ margin: "10px 0 5px", fontSize: "28px", color: "#0f172a" }}>
            Customer Login
          </h2>
          <p style={{ color: "#64748b", fontSize: "14px" }}>
            Login to continue shopping
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={inputStyle}
          />

          <button type="submit" style={buttonStyle}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "13px",
  marginBottom: "12px",
  borderRadius: "14px",
  border: "1px solid #dbe3ee",
  outline: "none",
  fontSize: "14px"
};

const buttonStyle = {
  width: "100%",
  padding: "13px",
  border: "none",
  borderRadius: "14px",
  background: "#16a34a",
  color: "white",
  fontWeight: "bold",
  fontSize: "15px",
  cursor: "pointer",
  marginTop: "8px"
};

export default CustomerLogin;