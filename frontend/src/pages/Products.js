import { useEffect, useMemo, useState } from "react";
import { getProducts } from "../api/products";

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "12px",
  border: "1px solid #dbe3ee",
  outline: "none",
  background: "#fff",
  fontSize: "14px",
};

const buttonBase = {
  border: "none",
  borderRadius: "12px",
  padding: "12px 16px",
  cursor: "pointer",
  fontWeight: 700,
  transition: "0.2s ease",
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

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

  const clearForm = () => {
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
    setEditingId(null);
  };

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

      await loadData();
      clearForm();
    } catch (err) {
      console.log("ERROR:", err);
      setError(err.message || "Produkti nuk u shtua.");
    }
  };

  const updateProduct = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/produktet/${editingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newProduct),
        }
      );

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Produkti nuk u perditesua");
      }

      await loadData();
      clearForm();
    } catch (err) {
      console.log("ERROR:", err);
      setError(err.message || "Produkti nuk u perditesua.");
    }
  };

  const deleteProduct = async (id) => {
    try {
      await fetch(`http://localhost:5000/produktet/${id}`, {
        method: "DELETE",
      });
      await loadData();
    } catch (err) {
      console.log(err);
    }
  };

  const editProduct = (p) => {
    setEditingId(p.produkti_id);
    setNewProduct({
      emri: p.emri || "",
      barkodi: p.barkodi || "",
      cmimi_blerjes: p.cmimi_blerjes || "",
      cmimi_shitjes: p.cmimi_shitjes || "",
      njesia_matese: p.njesia_matese || "",
      stoku: p.stoku || "",
      pragu_minimumi: p.pragu_minimumi || "",
      data_skadences: p.data_skadences?.split("T")[0] || "",
    });
  };

  const filteredProducts = useMemo(() => {
    const q = search.toLowerCase().trim();
    return products.filter((p) => {
      const name = String(p.emri || "").toLowerCase();
      const barcode = String(p.barkodi || "").toLowerCase();
      return name.includes(q) || barcode.includes(q);
    });
  }, [products, search]);

  const lowStockCount = products.filter((p) => Number(p.stoku) < 10).length;
  const totalStock = products.reduce((sum, p) => sum + Number(p.stoku || 0), 0);

  return (
    <div style={{ padding: "24px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
          flexWrap: "wrap",
          marginBottom: "20px",
        }}
      >
        <div>
          <p style={{ margin: 0, color: "#6b7280", fontSize: "14px" }}>
            Inventory Management
          </p>
          <h1 style={{ margin: "4px 0 0", fontSize: "30px", color: "#0f172a" }}>
            Products
          </h1>
        </div>

        <div style={{ width: "320px", maxWidth: "100%" }}>
          <input
            placeholder="🔍 Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={inputStyle}
          />
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "14px",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #2563eb, #60a5fa)",
            color: "white",
            padding: "18px",
            borderRadius: "18px",
            boxShadow: "0 10px 25px rgba(37,99,235,0.22)",
          }}
        >
          <div style={{ opacity: 0.9, fontSize: "13px" }}>Total Products</div>
          <div style={{ fontSize: "28px", fontWeight: 800 }}>{products.length}</div>
        </div>

        <div
          style={{
            background: "linear-gradient(135deg, #10b981, #34d399)",
            color: "white",
            padding: "18px",
            borderRadius: "18px",
            boxShadow: "0 10px 25px rgba(16,185,129,0.20)",
          }}
        >
          <div style={{ opacity: 0.9, fontSize: "13px" }}>Total Stock</div>
          <div style={{ fontSize: "28px", fontWeight: 800 }}>{totalStock}</div>
        </div>

        <div
          style={{
            background: "linear-gradient(135deg, #f59e0b, #fbbf24)",
            color: "white",
            padding: "18px",
            borderRadius: "18px",
            boxShadow: "0 10px 25px rgba(245,158,11,0.18)",
          }}
        >
          <div style={{ opacity: 0.95, fontSize: "13px" }}>Low Stock</div>
          <div style={{ fontSize: "28px", fontWeight: 800 }}>{lowStockCount}</div>
        </div>

        <div
          style={{
            background: "linear-gradient(135deg, #0f172a, #334155)",
            color: "white",
            padding: "18px",
            borderRadius: "18px",
            boxShadow: "0 10px 25px rgba(15,23,42,0.22)",
          }}
        >
          <div style={{ opacity: 0.9, fontSize: "13px" }}>Status</div>
          <div style={{ fontSize: "28px", fontWeight: 800 }}>Live</div>
        </div>
      </div>

      <div
        style={{
          background: "#ffffff",
          borderRadius: "22px",
          padding: "22px",
          boxShadow: "0 8px 30px rgba(15, 23, 42, 0.08)",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "14px",
            marginBottom: "16px",
          }}
        >
          <div>
            <h2 style={{ margin: 0, fontSize: "22px", color: "#0f172a" }}>
              {editingId ? "✏ Update Product" : "➕ Add Product"}
            </h2>
            <p style={{ margin: "6px 0 0", color: "#64748b", fontSize: "14px" }}>
              Fill the product details below
            </p>
          </div>

          <button
            type="button"
            onClick={editingId ? updateProduct : addProduct}
            style={{
              ...buttonBase,
              background: editingId ? "#2563eb" : "#16a34a",
              color: "white",
              minWidth: "160px",
              boxShadow: "0 8px 20px rgba(22,163,74,0.18)",
            }}
          >
            {editingId ? "Update Product" : "Add Product"}
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "12px",
          }}
        >
          <input
            placeholder="Emri"
            value={newProduct.emri}
            onChange={(e) => setNewProduct({ ...newProduct, emri: e.target.value })}
            style={inputStyle}
          />
          <input
            placeholder="Barkodi"
            value={newProduct.barkodi}
            onChange={(e) => setNewProduct({ ...newProduct, barkodi: e.target.value })}
            style={inputStyle}
          />
          <input
            placeholder="Cmimi Blerjes"
            value={newProduct.cmimi_blerjes}
            onChange={(e) =>
              setNewProduct({ ...newProduct, cmimi_blerjes: e.target.value })
            }
            style={inputStyle}
          />
          <input
            placeholder="Cmimi Shitjes"
            value={newProduct.cmimi_shitjes}
            onChange={(e) =>
              setNewProduct({ ...newProduct, cmimi_shitjes: e.target.value })
            }
            style={inputStyle}
          />
          <input
            placeholder="Njesia Matese"
            value={newProduct.njesia_matese}
            onChange={(e) =>
              setNewProduct({ ...newProduct, njesia_matese: e.target.value })
            }
            style={inputStyle}
          />
          <input
            placeholder="Stoku"
            value={newProduct.stoku}
            onChange={(e) => setNewProduct({ ...newProduct, stoku: e.target.value })}
            style={inputStyle}
          />
          <input
            placeholder="Pragu Minimumi"
            value={newProduct.pragu_minimumi}
            onChange={(e) =>
              setNewProduct({ ...newProduct, pragu_minimumi: e.target.value })
            }
            style={inputStyle}
          />
          <input
            type="date"
            value={newProduct.data_skadences}
            onChange={(e) =>
              setNewProduct({ ...newProduct, data_skadences: e.target.value })
            }
            style={inputStyle}
          />
        </div>
      </div>

      {loading && (
        <div
          style={{
            background: "#fff",
            padding: "16px 18px",
            borderRadius: "14px",
            marginBottom: "16px",
            boxShadow: "0 6px 20px rgba(15,23,42,0.06)",
            color: "#334155",
          }}
        >
          Loading products...
        </div>
      )}

      {error && (
        <div
          style={{
            background: "#fef2f2",
            color: "#b91c1c",
            padding: "16px 18px",
            borderRadius: "14px",
            marginBottom: "16px",
            border: "1px solid #fecaca",
          }}
        >
          {error}
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "16px",
        }}
      >
        {filteredProducts.map((p) => {
          const isLow = Number(p.stoku) < 10;

          return (
            <div
              key={p.produkti_id}
              style={{
                background: "white",
                borderRadius: "18px",
                padding: "18px",
                boxShadow: "0 8px 24px rgba(15,23,42,0.08)",
                border: `1px solid ${isLow ? "#fbbf24" : "#e5e7eb"}`,
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "10px",
                  marginBottom: "14px",
                }}
              >
                <div>
                  <h3 style={{ margin: 0, fontSize: "18px", color: "#0f172a" }}>
                    {p.emri}
                  </h3>
                  <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: "13px" }}>
                    Barcode: {p.barkodi}
                  </p>
                </div>

                <span
                  style={{
                    padding: "6px 10px",
                    borderRadius: "999px",
                    fontSize: "12px",
                    fontWeight: 700,
                    background: isLow ? "#fef3c7" : "#dcfce7",
                    color: isLow ? "#b45309" : "#15803d",
                  }}
                >
                  {isLow ? "⚠ Low Stock" : "In Stock"}
                </span>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                  gap: "10px",
                  fontSize: "14px",
                  color: "#334155",
                }}
              >
                <div>
                  <div style={{ color: "#94a3b8", fontSize: "12px" }}>Buying Price</div>
                  <div>€ {p.cmimi_blerjes}</div>
                </div>
                <div>
                  <div style={{ color: "#94a3b8", fontSize: "12px" }}>Selling Price</div>
                  <div>€ {p.cmimi_shitjes}</div>
                </div>
                <div>
                  <div style={{ color: "#94a3b8", fontSize: "12px" }}>Unit</div>
                  <div>{p.njesia_matese}</div>
                </div>
                <div>
                  <div style={{ color: "#94a3b8", fontSize: "12px" }}>Stock</div>
                  <div>{p.stoku}</div>
                </div>
                <div>
                  <div style={{ color: "#94a3b8", fontSize: "12px" }}>Min Threshold</div>
                  <div>{p.pragu_minimumi}</div>
                </div>
                <div>
                  <div style={{ color: "#94a3b8", fontSize: "12px" }}>Expiry</div>
                  <div>{p.data_skadences?.split("T")[0] || "-"}</div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
                <button
                  onClick={() => editProduct(p)}
                  style={{
                    ...buttonBase,
                    background: "#2563eb",
                    color: "white",
                    flex: 1,
                  }}
                >
                  ✏ Edit
                </button>

                <button
                  onClick={() => deleteProduct(p.produkti_id)}
                  style={{
                    ...buttonBase,
                    background: "#ef4444",
                    color: "white",
                    flex: 1,
                  }}
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {!loading && !error && filteredProducts.length === 0 && (
        <div
          style={{
            marginTop: "16px",
            background: "#fff",
            borderRadius: "14px",
            padding: "18px",
            color: "#64748b",
            textAlign: "center",
            boxShadow: "0 6px 20px rgba(15,23,42,0.06)",
          }}
        >
          No products found.
        </div>
      )}
    </div>
  );
};

export default Products;