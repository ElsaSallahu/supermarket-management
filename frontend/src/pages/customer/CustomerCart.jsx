import { useEffect, useState } from "react";
import axios from "axios";

function CustomerCart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.produkti_id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const total = cart.reduce(
    (sum, item) => sum + Number(item.cmimi_shitjes || 0) * item.quantity,
    0
  );

 const confirmOrder = async () => {
  if (cart.length === 0) {
    alert("Shporta eshte e zbrazet");
    return;
  }

  const customer = JSON.parse(localStorage.getItem("customer"));

  const orderData = {
    customer_id: customer?.customer_id || null,
    customer_name: customer?.full_name || "Guest Customer",
    total_amount: total,
    items: cart,
  };

  try {
    const res = await axios.post("http://localhost:5000/orders", orderData);

    alert(res.data.message);

    localStorage.removeItem("cart");
    setCart([]);
  } catch (error) {
    console.log(error);
    alert("Gabim gjate konfirmimit te porosise");
  }
};


  return (
    <div className="page" style={{ background: "#f8fafc", minHeight: "100vh" }}>
      <h1 className="page-heading">My Cart</h1>
      <p style={{ color: "#64748b", marginBottom: "25px" }}>
        Review your selected products before confirming the order.
      </p>

      {cart.length === 0 ? (
        <div className="ui-card">
          Your cart is empty.
        </div>
      ) : (
        <>
          {cart.map((item) => (
            <div
              className="ui-card"
              key={item.produkti_id}
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "18px",
                marginBottom: "15px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
              }}
            >
              <div>
                <h3>{item.emri}</h3>
                <p style={{ color: "#64748b" }}>Quantity: {item.quantity}</p>
                <p style={{ color: "#64748b" }}>Price: €{item.cmimi_shitjes}</p>
              </div>

              <button
                className="ui-button ui-button-danger"
                onClick={() => removeItem(item.produkti_id)}
                style={{
                  background: "#ef4444",
                  color: "white",
                  border: "none",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </div>
          ))}

          <div
            className="ui-card"
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "18px",
              marginTop: "20px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
            }}
          >
            <h2>Total: €{total.toFixed(2)}</h2>

            <button
              className="ui-button ui-button-primary"
              onClick={confirmOrder}
              style={{
                background: "#16a34a",
                color: "white",
                border: "none",
                padding: "13px 18px",
                borderRadius: "12px",
                cursor: "pointer",
                fontWeight: "bold",
                marginTop: "10px",
              }}
            >
              Confirm Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CustomerCart;
