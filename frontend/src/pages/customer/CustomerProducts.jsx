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
    updatedCart = [
      ...existingCart,
      {
        ...product,
        quantity: 1,
      },
    ];
  }

  localStorage.setItem("cart", JSON.stringify(updatedCart));
  alert("Produkti u shtua ne shporte");
};

  return (
    <div className="page" style={{ background: "#f8fafc", minHeight: "100vh" }}>
      <h1 className="page-heading">Products</h1>
      <p>Choose your favorite supermarket products.</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "20px" }}>
        {products.map((p) => (
          <div key={p.produkti_id} className="ui-card">
            <h3>{p.emri}</h3>
            <p>Stock: {p.stoku}</p>
            <h2>€ {p.cmimi_shitjes}</h2>
           <button
  className="ui-button ui-button-primary"
  onClick={() => addToCart(p)}
  disabled={Number(p.stoku) <= 0}
  style={{
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: "12px",
    background: Number(p.stoku) <= 0 ? "#94a3b8" : "#16a34a",
    color: "white",
    cursor: Number(p.stoku) <= 0 ? "not-allowed" : "pointer",
  }}
>
  {Number(p.stoku) <= 0 ? "Out of Stock" : "Add to Cart"}
</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomerProducts;
