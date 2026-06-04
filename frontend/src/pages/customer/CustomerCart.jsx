import { useEffect, useState } from "react";
import axios from "axios";

function CustomerCart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item.produkti_id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    updateCart(updatedCart);
  };

  const decreaseQuantity = (id) => {
    const updatedCart = cart
      .map((item) =>
        item.produkti_id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    updateCart(updatedCart);
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.produkti_id !== id);
    updateCart(updatedCart);
  };

  const clearCart = () => {
    updateCart([]);
  };

  const total = cart.reduce(
    (sum, item) => sum + Number(item.cmimi_shitjes || 0) * Number(item.quantity || 1),
    0
  );

  const confirmOrder = () => {
  if (cart.length === 0) {
    alert("Shporta eshte e zbrazet");
    return;
  }

  const order = {
    id: Date.now(),
    items: cart,
    total: total,
    date: new Date().toLocaleString(),
    status: "Confirmed",
  };

  const existingOrders = JSON.parse(localStorage.getItem("customerOrders")) || [];
  const updatedOrders = [...existingOrders, order];

  localStorage.setItem("customerOrders", JSON.stringify(updatedOrders));
  localStorage.removeItem("cart");

  setCart([]);
  alert("Porosia u konfirmua me sukses");
};

  return (
    <div style={page}>
      <div style={header}>
        <div>
          <h1 style={title}>My Cart</h1>
          <p style={subtitle}>
            Review your selected products before confirming the order.
          </p>
        </div>

        <div style={summaryBox}>
          <h3>{cart.length}</h3>
          <p>Items</p>
        </div>
      </div>

      {cart.length === 0 ? (
        <div style={emptyBox}>
          <h2>Your cart is empty</h2>
          <p style={subtitle}>
            Go to products and add items to your cart.
          </p>
          <a href="/customer/products" style={primaryButton}>
            Browse Products
          </a>
        </div>
      ) : (
        <div style={cartLayout}>
          <div>
            {cart.map((item) => {
              const itemTotal =
                Number(item.cmimi_shitjes || 0) * Number(item.quantity || 1);

              return (
                <div key={item.produkti_id} style={cartItem}>
                  <img
                    src={
                      item.foto ||
                      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600"
                    }
                    alt={item.emri}
                    style={image}
                  />

                  <div style={{ flex: 1 }}>
                    <h3 style={productName}>{item.emri}</h3>
                    <p style={muted}>Price: €{Number(item.cmimi_shitjes || 0).toFixed(2)}</p>
                    <p style={muted}>Subtotal: €{itemTotal.toFixed(2)}</p>

                    <div style={quantityBox}>
                      <button style={qtyButton} onClick={() => decreaseQuantity(item.produkti_id)}>
                        -
                      </button>

                      <span style={quantity}>{item.quantity}</span>

                      <button style={qtyButton} onClick={() => increaseQuantity(item.produkti_id)}>
                        +
                      </button>
                    </div>
                  </div>

                  <button style={removeButton} onClick={() => removeItem(item.produkti_id)}>
                    Remove
                  </button>
                </div>
              );
            })}
          </div>

          <div style={orderSummary}>
            <h2>Order Summary</h2>

            <div style={summaryRow}>
              <span>Products</span>
              <strong>{cart.length}</strong>
            </div>

            <div style={summaryRow}>
              <span>Total items</span>
              <strong>
                {cart.reduce((sum, item) => sum + Number(item.quantity || 1), 0)}
              </strong>
            </div>

            <div style={summaryRow}>
              <span>Total price</span>
              <strong>€{total.toFixed(2)}</strong>
            </div>

            <button style={confirmButton} onClick={confirmOrder}>
              Confirm Order
            </button>

            <button style={clearButton} onClick={clearCart}>
              Clear Cart
            </button>
          </div>
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
  fontSize: "16px",
};

const summaryBox = {
  background: "#dcfce7",
  color: "#166534",
  padding: "18px 25px",
  borderRadius: "18px",
  textAlign: "center",
  fontWeight: "700",
};

const emptyBox = {
  background: "white",
  padding: "35px",
  borderRadius: "20px",
  boxShadow: "0 8px 25px rgba(15,23,42,0.08)",
};

const cartLayout = {
  display: "grid",
  gridTemplateColumns: "2fr 1fr",
  gap: "25px",
};

const cartItem = {
  background: "white",
  padding: "18px",
  borderRadius: "20px",
  marginBottom: "18px",
  display: "flex",
  gap: "18px",
  alignItems: "center",
  boxShadow: "0 8px 25px rgba(15,23,42,0.08)",
};

const image = {
  width: "110px",
  height: "100px",
  objectFit: "cover",
  borderRadius: "14px",
};

const productName = {
  color: "#0f172a",
  marginBottom: "8px",
};

const muted = {
  color: "#64748b",
  margin: "4px 0",
};

const quantityBox = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginTop: "12px",
};

const qtyButton = {
  background: "#16a34a",
  color: "white",
  border: "none",
  width: "32px",
  height: "32px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "700",
};

const quantity = {
  fontWeight: "700",
  fontSize: "17px",
};

const removeButton = {
  background: "#ef4444",
  color: "white",
  border: "none",
  padding: "10px 14px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "700",
};

const orderSummary = {
  background: "white",
  padding: "25px",
  borderRadius: "20px",
  height: "fit-content",
  boxShadow: "0 8px 25px rgba(15,23,42,0.08)",
};

const summaryRow = {
  display: "flex",
  justifyContent: "space-between",
  margin: "15px 0",
  color: "#334155",
};

const confirmButton = {
  width: "100%",
  background: "#16a34a",
  color: "white",
  border: "none",
  padding: "13px",
  borderRadius: "12px",
  cursor: "pointer",
  fontWeight: "700",
  marginTop: "15px",
};

const clearButton = {
  width: "100%",
  background: "#f1f5f9",
  color: "#ef4444",
  border: "none",
  padding: "13px",
  borderRadius: "12px",
  cursor: "pointer",
  fontWeight: "700",
  marginTop: "10px",
};

const primaryButton = {
  display: "inline-block",
  background: "#16a34a",
  color: "white",
  padding: "12px 18px",
  borderRadius: "12px",
  textDecoration: "none",
  fontWeight: "700",
  marginTop: "15px",
};

export default CustomerCart;