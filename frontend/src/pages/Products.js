import { useEffect, useState } from "react";
import { getProducts } from "../api/products";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await getProducts();
    setProducts(res.data);
  };

  return (
    <div>
      <h2>Products</h2>

      {products.map((p) => (
        <div key={p.id}>
          {p.name} - {p.price}
        </div>
      ))}
    </div>
  );
};

export default Products;