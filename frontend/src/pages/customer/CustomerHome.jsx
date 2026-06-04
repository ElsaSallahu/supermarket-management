import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../api/products";

function CustomerHome() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    getProducts()
      .then((res) => setProducts(res.data))
      .catch((err) => console.log("Gabim products:", err));

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  const getCategory = (name = "") => {
    const n = name.toLowerCase();

    if (["coca", "fanta", "sprite", "juice", "water"].some((x) => n.includes(x)))
      return "Drinks";

    if (["apple", "banana", "cherry", "tomato"].some((x) => n.includes(x)))
      return "Fruits & Vegetables";

    if (["milk", "cheese", "eggs"].some((x) => n.includes(x)))
      return "Dairy";

    if (["bread", "chocolate", "chips"].some((x) => n.includes(x)))
      return "Snacks";

    if (["rice", "sugar", "coffee"].some((x) => n.includes(x)))
      return "Food";

    return "Other";
  };

  const categories = [...new Set(products.map((p) => getCategory(p.emri)))];

  const totalStock = products.reduce(
    (sum, p) => sum + Number(p.stoku || 0),
    0
  );

  const cartTotal = cartItems.reduce(
    (sum, item) =>
      sum + Number(item.quantity || 1) * Number(item.cmimi_shitjes || 0),
    0
  );

  const featuredProducts = products.slice(0, 4);

  return (
    <div style={page}>
      <section style={hero}>
        <div>
          <h1 style={heroTitle}>Welcome to Supermarket</h1>
          <p style={heroText}>
            Browse products, check daily offers and manage your cart easily.
          </p>

          <div style={buttonGroup}>
            <Link to="/customer/products" style={primaryBtn}>Shop Products</Link>
            <Link to="/customer/offers" style={secondaryBtn}>View Offers</Link>
            <Link to="/customer/cart" style={secondaryBtn}>Open Cart</Link>
          </div>
        </div>

        <div style={heroBox}>
  <h3 style={{ margin: "0 0 8px" }}>Cart Summary</h3>
  <h2 style={{ margin: "0 0 6px", fontSize: "28px" }}>
    {cartItems.length} items
  </h2>
  <p style={{ margin: "0 0 16px", fontSize: "16px" }}>
    Total: {cartTotal.toFixed(2)}€
  </p>
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

      <div style={sectionHeader}>
        <h2>Featured Products</h2>
        <Link to="/customer/products" style={greenLink}>View all products →</Link>
      </div>

      <div style={productGrid}>
        {featuredProducts.map((p) => (
          <div key={p.produkti_id} style={card}>
            <img
              src={p.foto || "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600"}
              alt={p.emri}
              style={image}
            />
            <h3>{p.emri}</h3>
            <p style={muted}>Stock: {p.stoku}</p>
            <h2 style={price}>{Number(p.cmimi_shitjes || 0).toFixed(2)}€</h2>
            <Link to="/customer/products" style={smallBtn}>View Product</Link>
          </div>
        ))}
      </div>

      <div style={sectionHeader}>
        <h2>Categories</h2>
        <Link to="/customer/categories" style={greenLink}>View categories →</Link>
      </div>

      <div style={categoryGrid}>
        {categories.map((cat, index) => (
          <Link key={index} to="/customer/categories" style={categoryCard}>
            {cat}
          </Link>
        ))}
      </div>
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
  boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
};

const heroTitle = {
  fontSize: "42px",
  marginBottom: "12px",
};

const heroText = {
  fontSize: "18px",
};

const buttonGroup = {
  display: "flex",
  gap: "14px",
  marginTop: "25px",
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

const heroBox = {
  background: "rgba(255,255,255,0.18)",
  padding: "28px",
  borderRadius: "20px",
  textAlign: "center",
  minWidth: "230px",
  minHeight: "120px",
};

const miniWhiteBtn = {
  background: "white",
  color: "#16a34a",
  padding: "10px 16px",
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

const greenLink = {
  color: "#16a34a",
  fontWeight: "700",
  textDecoration: "none",
};

const productGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
  gap: "20px",
};

const card = {
  background: "white",
  borderRadius: "18px",
  padding: "18px",
  boxShadow: "0 8px 25px rgba(15,23,42,0.08)",
};

const image = {
  width: "100%",
  height: "150px",
  objectFit: "cover",
  borderRadius: "14px",
};

const muted = {
  color: "#64748b",
};

const price = {
  color: "#16a34a",
};

const smallBtn = {
  display: "inline-block",
  background: "#16a34a",
  color: "white",
  padding: "10px 14px",
  borderRadius: "10px",
  textDecoration: "none",
  fontWeight: "700",
};

const categoryGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
  gap: "15px",
};

const categoryCard = {
  background: "white",
  padding: "20px",
  borderRadius: "16px",
  textAlign: "center",
  textDecoration: "none",
  color: "#0f172a",
  fontWeight: "700",
  boxShadow: "0 8px 25px rgba(15,23,42,0.08)",
};

export default CustomerHome;