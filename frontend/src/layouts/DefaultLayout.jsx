import { useEffect } from "react";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import AppContent from "../components/AppContent";

function DefaultLayout() {
  const navigate =
    useNavigate();

  // USER SAFE PARSE
  const userData =
    localStorage.getItem(
      "user"
    );

  let user = null;

  try {
    user = userData
      ? JSON.parse(
          userData
        )
      : null;
  } catch (error) {
    console.log(
      "User parse error:",
      error
    );

    localStorage.removeItem(
      "user"
    );

    user = null;
  }

  // CHECK LOGIN
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  // LOGOUT
 const handleLogout =
  () => {
    localStorage.removeItem(
      "user"
    );

    localStorage.removeItem(
      "token"
    );

    navigate("/login");
  };

  return (
    <div className="app-shell">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-top">
          <h2 className="brand">
            🛒 Supermarket
          </h2>
        </div>

        <nav className="sidebar-nav">

          {/* ADMIN + MANAGER */}
          {(user?.role ===
            "admin" ||
            user?.role ===
              "manager") && (
            <NavLink to="/dashboard">
              Dashboard
            </NavLink>
          )}

{/* ADMIN + MANAGER */}
{
  (user?.role === "admin" ||
   user?.role === "manager") && (
    <NavLink to="/products">
      Products
    </NavLink>
  )
}

          {/* ADMIN + MANAGER + CUSTOMER */}
          {(user?.role ===
            "admin" ||
            user?.role ===
              "manager" ||
            user?.role ===
              "customer") && (
            <NavLink to="/categories">
              Categories
            </NavLink>
          )}

          {/* ADMIN + MANAGER */}
          {(user?.role ===
            "admin" ||
            user?.role ===
              "manager") && (
            <>
              <NavLink to="/suppliers">
                Suppliers
              </NavLink>

              <NavLink to="/stock">
                Stock
              </NavLink>
            </>
          )}

          {/* ADMIN + MANAGER + CASHIER */}
          {(user?.role ===
            "admin" ||
            user?.role ===
              "manager" ||
            user?.role ===
              "cashier") && (
            <>
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
            </>
          )}

{/* ADMIN ONLY */}
{user?.role === "admin" && (
  <>
    <NavLink to="/cashiers">
      Cashiers
    </NavLink>

    <NavLink to="/employees">
      Employees
    </NavLink>
  </>
)}

{/* ADMIN + MANAGER */}
{(user?.role === "admin" ||
  user?.role === "manager") && (
  <>
    <NavLink to="/product-report">
      Product Report
    </NavLink>

    <NavLink to="/sales-report">
      Sales Report
    </NavLink>
  </>
)}

          {/* ADMIN ONLY */}
          {user?.role ===
            "admin" && (
            <>
              <NavLink to="/users">
                Users
              </NavLink>

              <NavLink to="/roles">
                Roles
              </NavLink>

              <NavLink to="/user-activity">
                User Activity
              </NavLink>
            </>
          )}
        </nav>
      </aside>

      {/* MAIN */}
      <main className="main-panel">
        <header className="topbar">
          <h1 className="page-title">
            Supermarket
          </h1>

          <div className="topbar-right">

            <div className="user-pill">
              {user?.role
                ? user.role
                : "Guest"}
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