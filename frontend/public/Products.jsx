import React, { useEffect, useState } from "react";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/produktet")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Gabim:", err));
  }, []);

  return (
    <div>
      <h2>Lista e Produkteve</h2>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.emri} - {p.cmimi_shitjes} € - Stoku: {p.stoku}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;