import { useEffect, useState } from "react";

const SaleItems = () => {
  const [saleItems, setSaleItems] = useState([]);

  const [search, setSearch] = useState("");

  const [newItem, setNewItem] = useState({
    sale_id: "",
    produkti_id: "",
    quantity: "",
    price: "",
    subtotal: "",
  });

  const [editingId, setEditingId] =
    useState(null);

  useEffect(() => {
    loadSaleItems();
  }, []);

  const loadSaleItems = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/sale-items"
      );

      const data =
        await response.json();

      setSaleItems(data);
    } catch (err) {
      console.log(err);
    }
  };

  // ADD
  const addSaleItem = async () => {
    try {

        const subtotal =
         Number(newItem.quantity) *
         Number(newItem.price);

      await fetch(
        "http://localhost:5000/sale-items",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          //llogaritet totali automatikisht
          body: JSON.stringify({
          ...newItem,
          subtotal,
        }),
        }
      );

      loadSaleItems();

      setNewItem({
        sale_id: "",
        produkti_id: "",
        quantity: "",
        price: "",
        subtotal: "",
      });

    } catch (err) {
      console.log(err);
    }
  };

  // DELETE
  const deleteSaleItem = async (
    id
  ) => {
    try {
      await fetch(
        `http://localhost:5000/sale-items/${id}`,
        {
          method: "DELETE",
        }
      );

      loadSaleItems();

    } catch (err) {
      console.log(err);
    }
  };

  // UPDATE
  const updateSaleItem = async (
    id
  ) => {
    try {
      await fetch(
        `http://localhost:5000/sale-items/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(
            newItem
          ),
        }
      );

      setEditingId(null);

      setNewItem({
        sale_id: "",
        produkti_id: "",
        quantity: "",
        price: "",
        subtotal: "",
      });

      loadSaleItems();

    } catch (err) {
      console.log(err);
    }
  };

  const filteredSaleItems =
  saleItems.filter(
    (item) =>
      String(
        item.sale_id
      ).includes(
        search
      ) ||
      String(
        item.produkti_id
      ).includes(
        search
      )
  );

return (
  <div className="page-container">
    <div
      style={{
        display: "flex",
        justifyContent:
          "space-between",
        alignItems: "center",
        marginBottom: "20px",
      }}
    >
      <div>
        <p
          style={{
            color: "#666",
          }}
        >
          Sales Management
        </p>

        <h1
          style={{
            fontSize: "45px",
            fontWeight: "bold",
          }}
        >
          🛍 Sale Items
        </h1>
      </div>

      <input type="text" placeholder="Search sale items..." value={search} onChange={(e) => setSearch( e.target.value )  }
        style={{
          padding: "14px",
          borderRadius: "14px",
          border:
            "1px solid #ddd",
          width: "300px",
        }}
      />
    </div>

    {/* CARD */}
    <div
      style={{
        background:
          "linear-gradient(to right, #4f46e5, #9333ea)",
        borderRadius: "25px",
        padding: "30px",
        color: "white",
        marginBottom: "25px",
      }}
    >
      <p>Total Sale Items</p>

      <h1>
        {saleItems.length}
      </h1>
    </div>

    {/* FORM */}
    <div
      style={{
        background: "white",
        padding: "30px",
        borderRadius: "25px",
        marginBottom: "25px",
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
        }}
      >
        ➕ Add Sale Item
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(4, 1fr)",
          gap: "15px",
        }}
      >
        <input
          placeholder="Sale ID"
          value={newItem.sale_id}
          onChange={(e) =>
            setNewItem({
              ...newItem,
              sale_id:
                e.target.value,
            })
          }
        />

        <input
          placeholder="Product ID"
          value={
            newItem.produkti_id
          }
          onChange={(e) =>
            setNewItem({
              ...newItem,
              produkti_id:
                e.target.value,
            })
          }
        />

        <input
          placeholder="Quantity"
          value={
            newItem.quantity
          }
          onChange={(e) =>
            setNewItem({
              ...newItem,
              quantity:
                e.target.value,
            })
          }
        />

        <input
          placeholder="Price"
          value={newItem.price}
          onChange={(e) =>
            setNewItem({
              ...newItem,
              price:
                e.target.value,
            })
          }
        />
      </div>

      <button
        onClick={
          editingId
            ? () =>
                updateSaleItem(
                  editingId
                )
            : addSaleItem
        }
        style={{
          marginTop: "20px",
          background:
            "#7c3aed",
          color: "white",
          border: "none",
          padding:
            "12px 25px",
          borderRadius: "12px",
          cursor: "pointer",
        }}
      >
        {editingId
          ? "Update"
          : "Add Sale Item"}
      </button>
    </div>

    {/* TABLE */}
    {/* TABLE */}
<div
  style={{
    background: "white",
    padding: "30px",
    borderRadius: "25px",
    boxShadow:
      "0 8px 20px rgba(0,0,0,0.08)",
  }}
>
  <h2
    style={{
      marginBottom: "25px",
      fontSize: "32px",
      fontWeight: "bold",
      color: "#111827",
    }}
  >
  Sale Items List
  </h2>

  <div
    style={{
      overflowX: "auto",
    }}
  >
    <table
      style={{
        width: "100%",
        borderCollapse: "separate",
        borderSpacing: "0 ",
      }}
    >
      <thead>
        <tr
          style={{
            background:
              "linear-gradient(to right, #da5dd8, #9333ea)",
            color: "white",
          }}
        >
          {[
            "ID",
            "Sale ID",
            "Product ID",
            "Quantity",
            "Price",
            "Subtotal",
            "Actions",
          ].map((header) => (
            <th
              key={header}
              style={{
                padding:
                  "18px",
                textAlign:
                  "center",
              }}
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {filteredSaleItems.map(
          (item, index) => (
            <tr
              key={
                item.sale_item_id
              }
              style={{
                background:
                  index % 2 === 0
                    ? "#f9fafb"
                    : "#ffffff",
              }}
            >
              <td
                style={{
                  padding:
                    "18px",
                  textAlign:
                    "center",
                  borderBottom:
                    "1px solid #eee",
                }}
              >
                {
                  item.sale_item_id
                }
              </td>

              <td
                style={{
                  textAlign:
                    "center",
                  borderBottom:
                    "1px solid #eee",
                }}
              >
                {item.sale_id}
              </td>

              <td
                style={{
                  textAlign: "center",
                  borderBottom: "1px solid #eee",
                }}
              >
                { item.produkti_id }
              </td>

              <td
                style={{
                  textAlign:
                    "center",
                  borderBottom:
                    "1px solid #eee",
                }}
              >
                {item.quantity}
              </td>

              <td
                style={{
                  textAlign:
                    "center",
                  borderBottom:
                    "1px solid #eee",
                }}
              >
                €
                {item.price}
              </td>

              <td
                style={{
                  textAlign:
                    "center",
                  fontWeight:
                    "bold",
                  color:
                    "#241e90",
                  borderBottom:
                    "1px solid #eee",
                }}
              >
                €
                {
                  item.subtotal
                }
              </td>

              <td
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                  padding: "12px",
                  borderBottom: "1px solid #eee",
                }}
              >
                <button
                  onClick={() => {
                    setEditingId(
                      item.sale_item_id
                    );

                    setNewItem({
                      sale_id:
                        item.sale_id,
                      produkti_id:
                        item.produkti_id,
                      quantity:
                        item.quantity,
                      price:
                        item.price,
                      subtotal:
                        item.subtotal,
                    });
                  }}
                  style={{
                    background:
                      "#c0ade1",
                    color:
                      "white",
                    border:
                      "none",
                    borderRadius:
                      "10px",
                    padding:
                      "10px 15px",
                    cursor:
                      "pointer",
                  }}
                >
                  ✏️ Edit
                </button>

                <button
                  onClick={() =>
                    deleteSaleItem(
                      item.sale_item_id
                    )
                  }
                  style={{
                    background:
                      "#ef4444",
                    color:
                      "white",
                    border:
                      "none",
                    borderRadius:
                      "10px",
                    padding:
                      "10px 15px",
                    cursor:
                      "pointer",
                  }}
                >
                  🗑 Delete
                </button>
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  </div>
</div>
  </div>
);
};

export default SaleItems;