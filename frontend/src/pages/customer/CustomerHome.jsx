import { Link } from "react-router-dom";

function CustomerHome() {
  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh", padding: "30px" }}>
      <div
        style={{
          background: "linear-gradient(135deg, #16a34a, #22c55e)",
          color: "white",
          padding: "40px",
          borderRadius: "22px",
          boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
        }}
      >
        <h1 style={{ fontSize: "38px", marginBottom: "10px" }}>
          Welcome to Supermarket
        </h1>
        <p style={{ fontSize: "18px", maxWidth: "650px" }}>
          Browse fresh products, discover daily offers and add your favorite
          items to the cart easily.
        </p>

        <div style={{ marginTop: "25px", display: "flex", gap: "15px" }}>
          <Link to="/customer/products" style={btnWhite}>Shop Products</Link>
          <Link to="/customer/offers" style={btnOutline}>View Offers</Link>
        </div>
      </div>

      <h2 style={{ marginTop: "35px", marginBottom: "18px", color: "#0f172a" }}>
        Customer Services
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        <div style={card}>
          <h3>Fresh Products</h3>
          <p>Find fruits, vegetables, drinks, snacks and daily essentials.</p>
          <Link to="/customer/products" style={link}>View products →</Link>
        </div>

        <div style={card}>
          <h3>Special Offers</h3>
          <p>Check discounts and save more on selected supermarket items.</p>
          <Link to="/customer/offers" style={link}>See offers →</Link>
        </div>

        <div style={card}>
          <h3>Shopping Cart</h3>
          <p>Add products to your cart and prepare your order quickly.</p>
          <Link to="/customer/cart" style={link}>Open cart →</Link>
        </div>
      </div>

      <div style={infoBox}>
        <h2>Why shop with us?</h2>
        <p>
          Our supermarket system helps customers browse products online, view
          categories, check offers and manage their cart in a simple and modern way.
        </p>
      </div>
    </div>
  );
}

const card = {
  background: "white",
  padding: "25px",
  borderRadius: "18px",
  boxShadow: "0 8px 25px rgba(15,23,42,0.08)",
  color: "#0f172a",
};

const link = {
  display: "inline-block",
  marginTop: "12px",
  color: "#16a34a",
  fontWeight: "700",
  textDecoration: "none",
};

const btnWhite = {
  background: "white",
  color: "#16a34a",
  padding: "12px 20px",
  borderRadius: "12px",
  textDecoration: "none",
  fontWeight: "700",
};

const btnOutline = {
  border: "1px solid white",
  color: "white",
  padding: "12px 20px",
  borderRadius: "12px",
  textDecoration: "none",
  fontWeight: "700",
};

const infoBox = {
  marginTop: "30px",
  background: "white",
  padding: "28px",
  borderRadius: "18px",
  boxShadow: "0 8px 25px rgba(15,23,42,0.08)",
  color: "#334155",
};

export default CustomerHome;