import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AppContent from "../components/AppContent";

function DefaultLayout() {
  const navigate =
    useNavigate();

  useEffect(() => {
    const user =
      localStorage.getItem(
        "user"
      );

    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem(
      "user"
    );

    navigate("/login");
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-top">
          <h2>
            🛒 Supermarket
          </h2>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/dashboard">
            Dashboard
          </NavLink>

          <NavLink to="/products">
            Products
          </NavLink>

          <NavLink to="/categories">
            Categories
          </NavLink>

          <NavLink to="/suppliers">
            Suppliers
          </NavLink>

          <NavLink to="/stock">
            Stock
          </NavLink>

          <NavLink to="/customers">
            Customers
          </NavLink>

          <NavLink to="/sales">
            Sales
          </NavLink>

          <NavLink to="/sale-items">
            Sale Items
          </NavLink>

          <NavLink to="/payments">
            Payments
          </NavLink>

          <NavLink to="/invoice">
            Invoice
          </NavLink>

          <NavLink to="/cashiers">
            Cashiers
          </NavLink>
        </nav>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <h1 className="page-title">
            Supermarket
          </h1>

          <div className="topbar-right">
            <div className="user-pill">
              Admin
            </div>

            <button
              onClick={
                handleLogout
              }
              className="logout-btn"
            >
              Logout
            </button>
          </div>
        </header>

        <section className="content-panel">
          <AppContent />
        </section>
      </main>
    </div>
  );
}

export default DefaultLayout;