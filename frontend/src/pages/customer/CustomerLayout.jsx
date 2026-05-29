import { Link, Outlet } from "react-router-dom";

function CustomerLayout() {
  return (
    <div>
      <nav
        style={{
          background: "#16a34a",
          padding: "15px",
          display: "flex",
          gap: "20px"
        }}
      >
        <Link to="/customer/home">Home</Link>
        <Link to="/customer/products">Products</Link>
        <Link to="/customer/login">Login</Link>
      </nav>

      <Outlet />
    </div>
  );
}

export default CustomerLayout;