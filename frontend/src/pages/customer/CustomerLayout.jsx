import { Link, Outlet } from "react-router-dom";

function CustomerLayout() {
  const logout = () => {
    localStorage.removeItem("customerToken");
    localStorage.removeItem("customer");
    window.location.href = "/register";
  };

  return (
    <div>
      <nav style={{
        background: "white",
        padding: "18px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 4px 18px rgba(0,0,0,0.08)"
      }}>
        <h2 style={{ color: "#16a34a", margin: 0 }}>Supermarket</h2>

        <div style={{ display: "flex", gap: "25px", alignItems: "center" }}>
          <Link to="/customer">Home</Link>
          <Link to="/customer/products">Products</Link>
          <Link to="/customer/categories">Categories</Link>
          <Link to="/customer/offers">Offers</Link>
          <Link to="/customer/cart">Cart</Link>

          <button className="ui-button ui-button-danger" onClick={logout} style={{
            background: "#ef4444",
            color: "white",
            border: "none",
            padding: "10px 16px",
            borderRadius: "10px",
            cursor: "pointer"
          }}>
            Logout
          </button>
        </div>
      </nav>

      <Outlet />
    </div>
  );
}

export default CustomerLayout;
