import { useState } from "react";
import axios from "axios";

function CustomerRegister() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    phone: "",
    address: ""
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
        "http://localhost:5000/api/customer-auth/register",
        formData
      );

      alert(res.data.message);

      setFormData({
        full_name: "",
        email: "",
        password: "",
        phone: "",
        address: ""
      });
    } catch (error) {
      console.log(error);
      alert("Gabim ne regjistrim");
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
        maxWidth: "430px",
        background: "white",
        padding: "32px",
        borderRadius: "24px",
        boxShadow: "0 20px 40px rgba(15, 23, 42, 0.12)"
      }}>
        <div style={{ textAlign: "center", marginBottom: "25px" }}>
          <div style={{ fontSize: "45px" }}>🛒</div>
          <h2 style={{ margin: "10px 0 5px", fontSize: "28px", color: "#0f172a" }}>
            Create Customer Account
          </h2>
          <p style={{ color: "#64748b", fontSize: "14px" }}>
            Register to order supermarket products online
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="full_name"
            placeholder="Full Name"
            value={formData.full_name}
            onChange={handleChange}
            style={inputStyle}
          />

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

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="text"
            name="address"
            placeholder="Delivery Address"
            value={formData.address}
            onChange={handleChange}
            style={inputStyle}
          />

          <button
            type="submit"
            style={{
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
            }}
          >
            Register
          </button>
        </form>

        <p style={{
          textAlign: "center",
          marginTop: "18px",
          color: "#64748b",
          fontSize: "14px"
        }}>
          Already have an account? Login
        </p>
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

export default CustomerRegister;