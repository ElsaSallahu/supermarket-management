import { useEffect, useState } from "react";
import { getProducts } from "../../api/products";

function CustomerCategories() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
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

  return (
    <div style={page}>
      <h1 style={title}>Product Categories</h1>
      <p style={subtitle}>Explore supermarket products by category.</p>

      <div style={summaryBox}>
        <h2>{categories.length} Categories Available</h2>
      </div>

      <div style={grid}>
        {categories.map((cat, index) => {
          const count = products.filter((p) => getCategory(p.emri) === cat).length;

          return (
            <div key={index} style={card}>
              <h3>{cat}</h3>
              <p>{count} products available in this category.</p>
              <a href="/customer/products" style={button}>View Products</a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const page = {
  background: "#f8fafc",
  minHeight: "100vh",
  padding: "30px",
};

const title = {
  fontSize: "34px",
  color: "#0f172a",
};

const subtitle = {
  color: "#64748b",
  marginBottom: "25px",
};

const summaryBox = {
  background: "white",
  padding: "20px",
  borderRadius: "18px",
  marginBottom: "25px",
  boxShadow: "0 8px 25px rgba(15,23,42,0.08)",
  color: "#16a34a",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: "22px",
};

const card = {
  background: "white",
  padding: "28px",
  borderRadius: "22px",
  boxShadow: "0 10px 25px rgba(15,23,42,0.08)",
};

const button = {
  display: "inline-block",
  marginTop: "15px",
  background: "#16a34a",
  color: "white",
  padding: "12px 16px",
  borderRadius: "12px",
  textDecoration: "none",
  fontWeight: "700",
};

export default CustomerCategories;