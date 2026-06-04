import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function CustomerHome() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/product")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log("Gabim gjatë marrjes së produkteve:", err));

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  const categories = [
    ...new Set(
      products
        .map((p) => p.category_name || p.kategoria || p.category || p.emri_kategorise)
        .filter(Boolean)
    ),
  ];

  const totalStock = products.reduce((sum, p) => sum + Number(p.stoku || 0), 0);
  const cartTotal = cartItems.reduce(
    (sum, item) =>
      sum + Number(item.quantity || 1) * Number(item.cmimi_shitjes || item.price || 0),
    0
  );

  const featuredProducts = products.slice(0, 4);

  return (
    <div style={page}>
      <section style={hero}>
        <div>
          <h1 style={heroTitle}>Welcome to Supermarket</h1>
          <p style={heroText}>
            Browse real products from the supermarket system, check categories,
            view offers and manage your cart easily.
          </p>

          <div style={buttonGroup}>
            <Link to="/customer/products" style={primaryBtn}>Shop Products</Link>
            <Link to="/customer/offers" style={secondaryBtn}>View Offers</Link>
            <Link to="/customer/cart" style={secondaryBtn}>Open Cart</Link>
          </div>
        </div>

        <div style={heroBox}>
          <h3>Cart Summary</h3>
          <h2>{cartItems.length} items</h2>
          <p>Total: {cartTotal.toFixed(2)}€</p>
          <Link to="/customer/cart" style={miniWhiteBtn}>View Cart</Link>
        </div>
      </section>

      <section style={statsGrid}>
        <Link to="/customer/products" style={statLink}>
          <div style={statCard}>
            <h2>{products.length}</h2>
            <p>Available Products</p>
          </div>
        </Link>

        <Link to="/customer/categories" style={statLink}>
          <div style={statCard}>
            <h2>{categories.length}</h2>
            <p>Product Categories</p>
          </div>
        </Link>

        <Link to="/customer/products" style={statLink}>
          <div style={statCard}>
            <h2>{totalStock}</h2>
            <p>Total Stock</p>
          </div>
        </Link>

        <Link to="/customer/cart" style={statLink}>
          <div style={statCard}>
            <h2>{cartItems.length}</h2>
            <p>Items in Cart</p>
          </div>
        </Link>
      </section>

      <section>
        <div style={sectionHeader}>
          <h2 style={sectionTitle}>Featured Products</h2>
          <Link to="/customer/products" style={greenLink}>View all products →</Link>
        </div>

        <div style={productGrid}>
          {featuredProducts.length > 0 ? (
            featuredProducts.map((product) => (
              <div key={product.produkti_id || product.id} style={card}>
                <span style={badge}>
                  {product.category_name || product.kategoria || "Product"}
                </span>
                <h3>{product.emri || product.name}</h3>
                <p style={muted}>Stock: {product.stoku || 0}</p>
                <p style={price}>
                  {Number(product.cmimi_shitjes || product.price || 0).toFixed(2)}€
                </p>
                <Link to="/customer/products" style={smallBtn}>View Product</Link>
              </div>
            ))
          ) : (
            <div style={emptyBox}>
              No products found. Please check if backend is running.
            </div>
          )}
        </div>
      </section>

      <section>
        <div style={sectionHeader}>
          <h2 style={sectionTitle}>Categories</h2>
          <Link to="/customer/categories" style={greenLink}>View categories →</Link>
        </div>

        <div style={categoryGrid}>
          {categories.length > 0 ? (
            categories.slice(0, 6).map((category, index) => (
              <Link key={index} to="/customer/categories" style={categoryCard}>
                {category}
              </Link>
            ))
          ) : (
            <div style={emptyBox}>
              Categories will appear here when products have category data.
            </div>
          )}
        </div>
      </section>

      <section style={offerSection}>
        <div>
          <h2>Special Offers</h2>
          <p>
            View supermarket discounts and promotional products prepared for customers.
          </p>
        </div>
        <Link to="/customer/offers" style={darkButton}>Check Offers</Link>
      </section>

      <section>
        <h2 style={sectionTitle}>Customer Actions</h2>
        <div style={serviceGrid}>
          <div style={card}>
            <h3>Browse Products</h3>
            <p style={muted}>View all available products from the database.</p>
            <Link to="/customer/products" style={smallBtn}>Products</Link>
          </div>

          <div style={card}>
            <h3>Check Categories</h3>
            <p style={muted}>See product groups and supermarket sections.</p>
            <Link to="/customer/categories" style={smallBtn}>Categories</Link>
          </div>

          <div style={card}>
            <h3>Manage Cart</h3>
            <p style={muted}>Review selected products before placing an order.</p>
            <Link to="/customer/cart" style={smallBtn}>Cart</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

const page = {
  background: "#f8fafc",
  minHeight: "100vh",
  padding: "30px",
};

const hero = {
  background: "linear-gradient(135deg, #16a34a, #22c55e)",
  color: "white",
  padding: "45px",
  borderRadius: "24px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "25px",
  boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
};

const heroTitle = {
  fontSize: "42px",
  marginBottom: "12px",
};

const heroText = {
  fontSize: "18px",
  maxWidth: "650px",
  lineHeight: "1.6",
};

const heroBox = {
  background: "rgba(255,255,255,0.18)",
  padding: "25px",
  borderRadius: "20px",
  textAlign: "center",
  minWidth: "230px",
};

const buttonGroup = {
  display: "flex",
  gap: "14px",
  marginTop: "25px",
  flexWrap: "wrap",
};

const primaryBtn = {
  background: "white",
  color: "#16a34a",
  padding: "12px 20px",
  borderRadius: "12px",
  textDecoration: "none",
  fontWeight: "700",
};

const secondaryBtn = {
  border: "1px solid white",
  color: "white",
  padding: "12px 20px",
  borderRadius: "12px",
  textDecoration: "none",
  fontWeight: "700",
};

const miniWhiteBtn = {
  display: "inline-block",
  marginTop: "10px",
  background: "white",
  color: "#16a34a",
  padding: "9px 14px",
  borderRadius: "10px",
  textDecoration: "none",
  fontWeight: "700",
};

const statsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "18px",
  marginTop: "25px",
};

const statLink = {
  textDecoration: "none",
  color: "#0f172a",
};

const statCard = {
  background: "white",
  padding: "22px",
  borderRadius: "18px",
  textAlign: "center",
  boxShadow: "0 8px 25px rgba(15,23,42,0.08)",
};

const sectionHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "35px",
  marginBottom: "18px",
};

const sectionTitle = {
  color: "#0f172a",
  margin: 0,
};

const greenLink = {
  color: "#16a34a",
  fontWeight: "700",
  textDecoration: "none",
};

const productGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "20px",
};

const card = {
  background: "white",
  padding: "24px",
  borderRadius: "18px",
  boxShadow: "0 8px 25px rgba(15,23,42,0.08)",
};

const badge = {
  background: "#dcfce7",
  color: "#166534",
  padding: "6px 10px",
  borderRadius: "20px",
  fontSize: "13px",
  fontWeight: "700",
};

const muted = {
  color: "#64748b",
};

const price = {
  fontSize: "22px",
  color: "#16a34a",
  fontWeight: "800",
};

const smallBtn = {
  display: "inline-block",
  marginTop: "10px",
  background: "#16a34a",
  color: "white",
  padding: "10px 14px",
  borderRadius: "10px",
  textDecoration: "none",
  fontWeight: "700",
};

const categoryGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(6, 1fr)",
  gap: "15px",
};

const categoryCard = {
  background: "white",
  padding: "18px",
  borderRadius: "16px",
  textAlign: "center",
  textDecoration: "none",
  color: "#0f172a",
  fontWeight: "700",
  boxShadow: "0 8px 25px rgba(15,23,42,0.08)",
};

const offerSection = {
  marginTop: "35px",
  background: "#0f172a",
  color: "white",
  padding: "30px",
  borderRadius: "22px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const darkButton = {
  background: "#16a34a",
  color: "white",
  padding: "12px 20px",
  borderRadius: "12px",
  textDecoration: "none",
  fontWeight: "700",
};

const serviceGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "20px",
};

const emptyBox = {
  background: "white",
  padding: "22px",
  borderRadius: "18px",
  color: "#64748b",
  boxShadow: "0 8px 25px rgba(15,23,42,0.08)",
};

export default CustomerHome;