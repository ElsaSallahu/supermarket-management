import { useEffect, useState } from "react";
import { getProducts } from "../api/products";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  //edit
  const [editingId, setEditingId] = useState(null);

  // ADD state
const [newProduct, setNewProduct] = useState({
  emri: "",
  barkodi: "",
  cmimi_blerjes: "",
  cmimi_shitjes: "",
  njesia_matese: "",
  stoku: "",
  pragu_minimumi: "",
  data_skadences: "",
});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await getProducts();
      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setError("Start the backend server to load live products.");
    } finally {
      setLoading(false);
    }
  };

  //  ADD function
const addProduct = async () => {
  try {

    const response = await fetch("http://localhost:5000/produktet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(message || "Produkti nuk u shtua");
    }

    loadData();

    setNewProduct({
      emri: "",
      barkodi: "",
      cmimi_blerjes: "",
      cmimi_shitjes: "",
      njesia_matese: "",
      stoku: "",
      pragu_minimumi: "",
      data_skadences: "",
    });

  } catch (err) {
    console.log("ERROR:", err);
    setError(err.message || "Produkti nuk u shtua. Kontrollo backend-in.");
  }
};

const updateProduct = async (product) => {
  try {
    await fetch(
      `http://localhost:5000/produktet/${product.produkti_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      }
    );

    loadData();
    setEditingId(null);

  } catch (err) {
    console.log(err);
  }
};
// delete function
const deleteProduct = async (id) => {
  try {
    await fetch(`http://localhost:5000/produktet/${id}`, {
      method: "DELETE",
    });

    loadData();

  } catch (err) {
    console.log(err);
  }
};

  return (
    <div className="products-page">
      <div className="section-title">
        <div>
          <p className="eyebrow">Inventory</p>
          <h2>Products</h2>
          

<div style={{ marginBottom: "20px" }}>
  <input placeholder="Emri" value={newProduct.emri} onChange={(e) => setNewProduct({...newProduct, emri: e.target.value, })}/>
  <input placeholder="Barkodi" value={newProduct.barkodi} onChange={(e) => setNewProduct({...newProduct, barkodi: e.target.value,})}/>
  <input placeholder="Cmimi Blerjes" value={newProduct.cmimi_blerjes} onChange={(e) => setNewProduct({...newProduct, cmimi_blerjes: e.target.value,})}/>
  <input placeholder="Cmimi Shitjes" value={newProduct.cmimi_shitjes} onChange={(e) => setNewProduct({...newProduct, cmimi_shitjes: e.target.value,})}/>
  <input placeholder="Njesia Matese" value={newProduct.njesia_matese} onChange={(e) => setNewProduct({...newProduct, njesia_matese: e.target.value,})}/>
  <input placeholder="Stoku" value={newProduct.stoku} onChange={(e) => setNewProduct({...newProduct, stoku: e.target.value,})}/>
  <input placeholder="Pragu Minimumi" value={newProduct.pragu_minimumi} onChange={(e) => setNewProduct({...newProduct, pragu_minimumi: e.target.value,})}/>
  <input type="date" value={newProduct.data_skadences} onChange={(e) =>  setNewProduct({...newProduct, data_skadences: e.target.value,})}/>
</div>
        </div>
        <button type="button" onClick={addProduct}> Add Product </button>
      </div>

      {loading && <div className="notice">Loading products...</div>}
      {error && <div className="notice warning">{error}</div>}
      {!loading && !error && products.length === 0 && <div className="notice">No products found.</div>}

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Emri</th>
              <th>Barkodi</th>
              <th>Cmimi Blerjes</th>
              <th>Cmimi Shitjes</th>
              <th>Njesia Matese</th>
              <th>Stoku</th>
              <th>Pragu Minimumi</th>
              <th>Data Skadences</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.produkti_id || p.id || p.emri}>
                <td>{p.emri}</td>
                <td>{p.barkodi}</td>
                <td>{p.cmimi_blerjes}</td>
                <td>{p.cmimi_shitjes}</td>
                <td>{p.njesia_matese}</td>
                <td>{p.stoku}</td>
                <td>{p.pragu_minimumi}</td>
               <td>{p.data_skadences?.split("T")[0] || "-"}</td>
                 <td>
                  <button onClick={() => deleteProduct(p.produkti_id) } > Delete </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
