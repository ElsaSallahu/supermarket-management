import React from "react"
import { NavLink } from "react-router-dom"
import AppContent from "../components/AppContent"

function DefaultLayout() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">Supermarket</div>
        <nav className="sidebar-nav">
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/products">Products</NavLink>
        </nav>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div>
            <p className="eyebrow">Management System</p>
            <h1>Supermarket Dashboard</h1>
          </div>
          <div className="user-pill">Admin</div>
        </header>

        <section className="content-panel">
          <AppContent />
        </section>
      </main>
    </div>
  )
}

export default DefaultLayout
