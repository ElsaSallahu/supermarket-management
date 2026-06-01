function CustomerHome() {
  return (
    <div className="page" style={{ background: "#f8fafc", minHeight: "100vh" }}>
      <h1 className="page-heading" style={{ fontSize: "36px" }}>
        Welcome to Supermarket
      </h1>

      <p style={{ color: "#64748b", fontSize: "18px", marginTop: "10px" }}>
        Browse products, check offers and make your orders easily.
      </p>

      <div style={{ display: "flex", gap: "20px", marginTop: "30px" }}>
        <div className="ui-card">
          <h2>Products</h2>
          <p>View all available products.</p>
        </div>

        <div className="ui-card">
          <h2>Offers</h2>
          <p>Check supermarket discounts.</p>
        </div>

        <div className="ui-card">
          <h2>Orders</h2>
          <p>Track your orders.</p>
        </div>
      </div>
    </div>
  );
}

export default CustomerHome;
