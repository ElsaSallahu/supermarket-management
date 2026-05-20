import React from 'react'

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <div className="stats-grid">
        <div className="stat-card">
          <span>Total Sales</span>
          <strong>$12,480</strong>
          <small>Today</small>
        </div>
        <div className="stat-card">
          <span>Products</span>
          <strong>248</strong>
          <small>In stock</small>
        </div>
        <div className="stat-card">
          <span>Customers</span>
          <strong>1,824</strong>
          <small>This month</small>
        </div>
        <div className="stat-card warning">
          <span>Low Stock</span>
          <strong>17</strong>
          <small>Need attention</small>
        </div>
      </div>

      <div className="dashboard-grid">
        <section className="panel">
          <h2>Recent Activity</h2>
          <div className="activity-row"><span>Milk 1L restocked</span><b>+40</b></div>
          <div className="activity-row"><span>Bread sold</span><b>-18</b></div>
          <div className="activity-row"><span>New cashier shift opened</span><b>09:00</b></div>
          <div className="activity-row"><span>Apples low stock alert</span><b>5 left</b></div>
        </section>

        <section className="panel">
          <h2>Quick Overview</h2>
          <div className="meter"><span>Daily target</span><div><i style={{ width: '72%' }} /></div></div>
          <div className="meter"><span>Inventory health</span><div><i style={{ width: '84%' }} /></div></div>
          <div className="meter"><span>Staff coverage</span><div><i style={{ width: '65%' }} /></div></div>
        </section>
      </div>
    </div>
  )
}

export default Dashboard
