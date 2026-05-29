function CustomerHome() {
  return (
    <div style={{ padding: "40px", background: "#f8fafc", minHeight: "100vh" }}>
      <h1 style={{ fontSize: "36px", color: "#0f172a" }}>
        Welcome to Supermarket
      </h1>

      <p style={{ color: "#64748b", fontSize: "18px", marginTop: "10px" }}>
        Browse products, check offers and make your orders easily.
      </p>

      <div style={{ display: "flex", gap: "20px", marginTop: "30px" }}>
        <div style={{ background: "white", padding: "25px", borderRadius: "18px" }}>
          <h2>Products</h2>
          <p>View all available products.</p>
        </div>

        <div style={{ background: "white", padding: "25px", borderRadius: "18px" }}>
          <h2>Offers</h2>
          <p>Check supermarket discounts.</p>
        </div>

        <div style={{ background: "white", padding: "25px", borderRadius: "18px" }}>
          <h2>Orders</h2>
          <p>Track your orders.</p>
        </div>
      </div>
    </div>
  );
}

export default CustomerHome;