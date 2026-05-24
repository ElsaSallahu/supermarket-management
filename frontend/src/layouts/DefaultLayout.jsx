import React, { useEffect } from "react";
import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import AppContent from "../components/AppContent";

function DefaultLayout() {
  const navigate =
    useNavigate();

  // PROTECT DASHBOARD
  useEffect(() => {
    const user =
      localStorage.getItem(
        "user"
      );

    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem(
      "user"
    );

    navigate("/login");
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          Supermarket
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/dashboard">
            Dashboard
          </NavLink>

          <NavLink to="/products">
            Products
          </NavLink>
        </nav>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div>
            <p className="eyebrow">
              Management System
            </p>

            <h1>
              Supermarket Dashboard
            </h1>
          </div>

          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems:
                "center",
            }}
          >
            <div className="user-pill">
              Admin
            </div>

            <button
              onClick={
                handleLogout
              }
              style={{
                background:
                  "#dc3545",
                color: "white",
                border: "none",
                padding:
                  "10px 15px",
                borderRadius:
                  "8px",
                cursor:
                  "pointer",
              }}
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