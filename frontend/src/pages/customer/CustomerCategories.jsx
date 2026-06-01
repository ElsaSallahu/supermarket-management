import { useEffect, useState } from "react";
import axios from "axios";

function CustomerCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ padding: "40px", background: "#f8fafc", minHeight: "100vh" }}>
      <h1 style={{ fontSize: "32px", color: "#0f172a", marginBottom: "8px" }}>
        Product Categories
      </h1>

      <p style={{ color: "#64748b", marginBottom: "30px" }}>
        Explore supermarket products by category.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "22px",
        }}
      >
        {categories.map((c) => (
          <div
            key={c.category_id}
            style={{
              background: "white",
              padding: "26px",
              borderRadius: "20px",
              boxShadow: "0 10px 25px rgba(15, 23, 42, 0.08)",
              border: "1px solid #e5e7eb",
            }}
          >
            <div
              style={{
                width: "55px",
                height: "6px",
                background: "#16a34a",
                borderRadius: "20px",
                marginBottom: "18px",
              }}
            ></div>

            <h3 style={{ fontSize: "20px", color: "#0f172a", marginBottom: "8px" }}>
              {c.emri}
            </h3>

            <p style={{ color: "#64748b", lineHeight: "1.6" }}>
              {c.pershkrimi || "Products available in this category."}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomerCategories;