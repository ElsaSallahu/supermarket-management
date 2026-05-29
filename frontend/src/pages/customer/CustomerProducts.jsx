import { useEffect, useState } from "react";
import { getProducts } from "../../api/products";

function CustomerProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ padding: "40px", background: "#f8fafc", minHeight: "100vh" }}>
      <h1>Products</h1>
      <p>Choose your favorite supermarket products.</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "20px" }}>
        {products.map((p) => (
          <div key={p.produkti_id} style={{ background: "white", padding: "20px", borderRadius: "18px" }}>
            <div style={{ fontSize: "40px", textAlign: "center" }}>🛒</div>
            <h3>{p.emri}</h3>
            <p>Stock: {p.stoku}</p>
            <h2>€ {p.cmimi_shitjes}</h2>
            <button style={{ width: "100%", padding: "12px", border: "none", borderRadius: "12px", background: "#16a34a", color: "white" }}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomerProducts;