import { Link } from "react-router-dom";

function CustomerFooter() {
  const year = new Date().getFullYear();

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer style={footer}>
      <div style={topSection}>
        <div>
          <h2 style={logo}>Supermarket</h2>
          <p style={text}>
            Fresh products, special offers and easy online shopping for every customer.
          </p>
        </div>

        <div>
          <h3 style={heading}>Quick Links</h3>
          <Link style={link} to="/customer/home">Home</Link>
          <Link style={link} to="/customer/products">Products</Link>
          <Link style={link} to="/customer/categories">Categories</Link>
          <Link style={link} to="/customer/offers">Offers</Link>
          <Link style={link} to="/customer/cart">Cart</Link>
        </div>

        <div>
          <h3 style={heading}>Customer Support</h3>
          <p style={text}>Phone: +383 44 000 000</p>
          <p style={text}>Email: supermarket@gmail.com</p>
          <p style={text}>Location: Ferizaj, Kosovo</p>
          <p style={text}>Working hours: 08:00 - 22:00</p>
        </div>

        <div>
          <h3 style={heading}>Services</h3>
          <p style={text}>Online product browsing</p>
          <p style={text}>Cart management</p>
          <p style={text}>Daily discounts</p>
          <p style={text}>Fast customer access</p>
        </div>
      </div>

      <div style={middleSection}>
        <span>Secure shopping</span>
        <span>Fresh products</span>
        <span>Best prices</span>
        <span>Customer friendly system</span>
      </div>

      <div style={bottomSection}>
        <p style={{ margin: 0 }}>
          © {year} Supermarket Management System. All rights reserved.
        </p>

        <button onClick={scrollTop} style={topButton}>
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}

const footer = {
  background: "linear-gradient(135deg, #0f172a, #14532d)",
  color: "white",
  padding: "45px 40px 20px",
  marginTop: "50px",
};

const topSection = {
  display: "grid",
  gridTemplateColumns: "2fr 1fr 1.5fr 1.5fr",
  gap: "35px",
};

const logo = {
  color: "#22c55e",
  fontSize: "30px",
  marginBottom: "12px",
};

const heading = {
  fontSize: "18px",
  marginBottom: "15px",
  color: "#ffffff",
};

const text = {
  color: "#cbd5e1",
  lineHeight: "1.7",
  margin: "6px 0",
};

const link = {
  display: "block",
  color: "#cbd5e1",
  textDecoration: "none",
  marginBottom: "10px",
};

const middleSection = {
  display: "flex",
  flexWrap: "wrap",
  gap: "15px",
  marginTop: "30px",
  paddingTop: "22px",
  borderTop: "1px solid rgba(255,255,255,0.15)",
  color: "#bbf7d0",
  fontWeight: "600",
};

const bottomSection = {
  marginTop: "25px",
  paddingTop: "18px",
  borderTop: "1px solid rgba(255,255,255,0.15)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  color: "#94a3b8",
};

const topButton = {
  background: "#22c55e",
  color: "white",
  border: "none",
  padding: "10px 16px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "700",
};

export default CustomerFooter;