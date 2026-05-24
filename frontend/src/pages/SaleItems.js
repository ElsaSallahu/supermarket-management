import { useEffect, useState } from "react";

const SaleItems = () => {
  const [saleItems, setSaleItems] = useState([]);

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

  return (
    <div>
      <h1>Sale Items</h1>

      <div
        style={{
          marginBottom: "20px",
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
          placeholder="Produkti ID"
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
          value={newItem.quantity}
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

        {editingId ? (
          <button
            onClick={() =>
              updateSaleItem(
                editingId
              )
            }
          >
            Update
          </button>
        ) : (
          <button
            onClick={addSaleItem}
          >
            Add
          </button>
        )}
      </div>

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Sale ID</th>
            <th>Produkti ID</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Subtotal</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {saleItems.map((item) => (
            <tr
              key={item.sale_item_id}
            >
              <td>
                {
                  item.sale_item_id
                }
              </td>
              <td>
                {item.sale_id}
              </td>
              <td>
                {
                  item.produkti_id
                }
              </td>
              <td>
                {item.quantity}
              </td>
              <td>
                {item.price}
              </td>
              <td>
                {item.subtotal}
              </td>

              <td>
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
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteSaleItem(
                      item.sale_item_id
                    )
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SaleItems;