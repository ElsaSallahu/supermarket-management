import { useEffect, useState } from "react";
import { getProducts } from "../../api/products";

function CustomerProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  const addToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    const itemExists = existingCart.find(
      (item) => item.produkti_id === product.produkti_id
    );

    let updatedCart;

    if (itemExists) {
      updatedCart = existingCart.map((item) =>
        item.produkti_id === product.produkti_id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...existingCart, { ...product, quantity: 1 }];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert("Produkti u shtua ne shporte");
  };

  return (
    <div style={page}>
      <div style={header}>
        <div>
          <h1 style={title}>Products</h1>
          <p style={subtitle}>
            Choose your favorite supermarket products and add them to your cart.
          </p>
        </div>

        <div style={summaryBox}>
          <h3>{products.length}</h3>
          <p>Available Products</p>
        </div>
      </div>

      {products.length === 0 ? (
        <div style={emptyBox}>
          No products found. Please check if backend and database are running.
        </div>
      ) : (
        <div style={grid}>
          {products.map((p) => {
            const outOfStock = Number(p.stoku) <= 0;

            return (
              <div key={p.produkti_id} style={card}>
                <div style={imageWrapper}>
                  <img
                   src={p.foto || "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600"}
  alt={p.emri}
  style={image}
/>

                  <span
                    style={{
                      ...stockBadge,
                      background: outOfStock ? "#fee2e2" : "#dcfce7",
                      color: outOfStock ? "#991b1b" : "#166534",
                    }}
                  >
                    {outOfStock ? "Out of Stock" : "In Stock"}
                  </span>
                </div>

                <div style={content}>
                  <h3 style={productName}>{p.emri}</h3>

                  <div style={infoRow}>
                    <span style={label}>Stock</span>
                    <span style={value}>{p.stoku}</span>
                  </div>

                  <div style={infoRow}>
                    <span style={label}>Price</span>
                    <span style={price}>
                      € {Number(p.cmimi_shitjes || 0).toFixed(2)}
                    </span>
                  </div>

                  <button
                    onClick={() => addToCart(p)}
                    disabled={outOfStock}
                    style={{
                      ...button,
                      background: outOfStock ? "#94a3b8" : "#16a34a",
                      cursor: outOfStock ? "not-allowed" : "pointer",
                    }}
                  >
                    {outOfStock ? "Out of Stock" : "Add to Cart"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

const page = {
  background: "#f8fafc",
  minHeight: "100vh",
  padding: "30px",
};

const header = {
  background: "white",
  padding: "28px",
  borderRadius: "22px",
  marginBottom: "25px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: "0 8px 25px rgba(15,23,42,0.08)",
};

const title = {
  fontSize: "34px",
  color: "#0f172a",
  margin: 0,
};

const subtitle = {
  color: "#64748b",
  fontSize: "17px",
  marginTop: "8px",
};

const summaryBox = {
  background: "#dcfce7",
  color: "#166534",
  padding: "18px 25px",
  borderRadius: "18px",
  textAlign: "center",
  fontWeight: "700",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "22px",
};

const card = {
  background: "white",
  borderRadius: "20px",
  overflow: "hidden",
  boxShadow: "0 8px 25px rgba(15,23,42,0.08)",
};

const imageWrapper = {
  height: "180px",
  position: "relative",
  overflow: "hidden",
  background: "#e2e8f0",
};

const image = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const stockBadge = {
  position: "absolute",
  top: "12px",
  right: "12px",
  padding: "6px 11px",
  borderRadius: "20px",
  fontSize: "13px",
  fontWeight: "700",
};

const content = {
  padding: "20px",
};

const productName = {
  fontSize: "20px",
  color: "#0f172a",
  marginBottom: "18px",
};

const infoRow = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "10px",
};

const label = {
  color: "#64748b",
};

const value = {
  color: "#0f172a",
  fontWeight: "700",
};

const price = {
  color: "#16a34a",
  fontWeight: "800",
  fontSize: "18px",
};

const button = {
  width: "100%",
  padding: "12px",
  border: "none",
  borderRadius: "12px",
  color: "white",
  fontWeight: "700",
  marginTop: "15px",
};

const emptyBox = {
  background: "white",
  padding: "25px",
  borderRadius: "18px",
  color: "#64748b",
  boxShadow: "0 8px 25px rgba(15,23,42,0.08)",
};

export default CustomerProducts;