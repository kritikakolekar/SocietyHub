import { useState } from "react";
import "./Dashboard.css";
import Maintenance from "./Maintenance";
import Residents from "./Residents";
import SocietyEvents from "./SocietyEvents";
import Parking from "./Parking";
import Visitors from "./Visitors";
import Staff from "./Staff";
import Utility from "./Utility";
import Complaints from "./Complaints";
import Notices from "./Notices";

function Dashboard({ onLogout }) {
  const [activePage, setActivePage] = useState("dashboard");
  if (activePage === "maintenance") {
  return (
    <Maintenance
      onBack={() => setActivePage("dashboard")}
    />
  );
}
if (activePage === "residents") {
  return (
    <Residents
      onBack={() => setActivePage("dashboard")}
    />
  );
}
if (activePage === "events") {
  return (
    <SocietyEvents
      onBack={() => setActivePage("dashboard")}
    />
  );
}
if (activePage === "parking") {
  return (
    <Parking
      onBack={() => setActivePage("dashboard")}
    />
  );
}
if (activePage === "visitors") {
  return (
    <Visitors
      onBack={() => setActivePage("dashboard")}
    />
  );
}
if (activePage === "staff") {
  return (
    <Staff
      onBack={() => setActivePage("dashboard")}
    />
  );
}
if (activePage === "utility") {
  return (
    <Utility
      onBack={() => setActivePage("dashboard")}
    />
  );
}
if (activePage === "complaints") {
  return (
    <Complaints
      onBack={() => setActivePage("dashboard")}
    />
  );
}
if (activePage === "notices") {
  return (
    <Notices
      onBack={() => setActivePage("dashboard")}
    />
  );
}
  return (
    <div className="dashboard-page">

      <aside className="sidebar">

        <div className="sidebar-brand">
          <div className="sidebar-logo">🏢</div>
          <div>
            <h2>SocietyHub</h2>
            <span>Management System</span>
          </div>
        </div>

        <nav className="sidebar-nav">

  <div className="nav-item active">
    <span>📊</span>
    Dashboard
  </div>

  <div
  className={`nav-item ${
    activePage === "residents" ? "active" : ""
  }`}
  onClick={() => setActivePage("residents")}
>
  <span>👥</span>
  Residents
</div>

  <div
  className={`nav-item ${
    activePage === "maintenance" ? "active" : ""
  }`}
  onClick={() => setActivePage("maintenance")}
>
  <span>💰</span>
  Maintenance
</div>

  <div
  className={`nav-item ${
    activePage === "events" ? "active" : ""
  }`}
  onClick={() => setActivePage("events")}
>
  <span>📅</span>
  Society Events
</div>

  <div
  className={`nav-item ${
    activePage === "parking" ? "active" : ""
  }`}
  onClick={() => setActivePage("parking")}
>
  <span>🚗</span>
  Parking Management
</div>

   <div
  className={`nav-item ${
    activePage === "visitors" ? "active" : ""
  }`}
  onClick={() => setActivePage("visitors")}
>
  <span>👤</span>
  Visitor Management
</div> 
  
  <div
  className={`nav-item ${
    activePage === "staff" ? "active" : ""
  }`}
  onClick={() => setActivePage("staff")}
>
  <span>👷</span>
  Staff & Domestic Help
</div>

  <div
  className={`nav-item ${
    activePage === "utility" ? "active" : ""
  }`}
  onClick={() => setActivePage("utility")}
>
  <span>⚡</span>
  Utility / Electricity
</div>

  <div
  className={`nav-item ${
    activePage === "complaints" ? "active" : ""
  }`}
  onClick={() => setActivePage("complaints")}
>
  <span>📝</span>
  Complaints
</div>

 <div
  className={`nav-item ${
    activePage === "notices" ? "active" : ""
  }`}
  onClick={() => setActivePage("notices")}
>
  <span>📢</span>
  Notices
</div>

</nav>

        <div className="sidebar-bottom">
          <div className="admin-profile">
            <div className="admin-avatar">A</div>
            <div>
              <strong>Admin</strong>
              <span>Administrator</span>
            </div>
          </div>
        </div>

      </aside>

      <main className="dashboard-main">

        <header className="dashboard-header">

          <div>
            <p className="header-small">WELCOME BACK</p>
            <h1>Good afternoon, Admin 👋</h1>
            <p className="header-description">
              Here's what's happening in your society today.
            </p>
          </div>

          <div className="header-actions">
            <button className="notification-button">🔔</button>

            <div className="header-avatar">
              A
            </div>
          </div>

        </header>

        <section className="stats-grid">

          <div className="stat-card residents-card">
            <div className="stat-top">
              <div className="stat-icon">👥</div>
              <span className="stat-change">+12%</span>
            </div>

            <p>Total Residents</p>
            <h2>0</h2>
            <span className="stat-footer">
              Registered residents
            </span>
          </div>

          <div className="stat-card complaints-card">
            <div className="stat-top">
              <div className="stat-icon">📝</div>
              <span className="stat-change">0 new</span>
            </div>

            <p>Complaints</p>
            <h2>0</h2>
            <span className="stat-footer">
              Pending complaints
            </span>
          </div>

          <div className="stat-card notices-card">
            <div className="stat-top">
              <div className="stat-icon">📢</div>
              <span className="stat-change">Active</span>
            </div>

            <p>Notices</p>
            <h2>0</h2>
            <span className="stat-footer">
              Published notices
            </span>
          </div>

          <div className="stat-card society-card">
            <div className="stat-top">
              <div className="stat-icon">🏠</div>
              <span className="stat-change">Live</span>
            </div>

            <p>Society Status</p>
            <h2>Active</h2>
            <span className="stat-footer">
              System is running
            </span>
          </div>

        </section>

        <section className="dashboard-content">

          <div className="welcome-card">

            <div className="welcome-text">
              <span className="welcome-label">SOCIETY OVERVIEW</span>

              <h2>Manage everything from one place</h2>

              <p>
                Keep track of residents, complaints and important
                society announcements through SocietyHub.
              </p>

              <button className="primary-button">
                + Add Resident
              </button>
            </div>

            <div className="welcome-illustration">
              🏙️
            </div>

          </div>

          <div className="quick-card">

            <div className="section-title">
              <div>
                <h3>Quick Actions</h3>
                <p>Common administrative tasks</p>
              </div>
            </div>

            <div className="quick-actions">

              <button className="quick-action">
                <span>👤</span>
                <div>
                  <strong>Add Resident</strong>
                  <small>Register a new resident</small>
                </div>
              </button>

              <button className="quick-action">
                <span>📝</span>
                <div>
                  <strong>View Complaints</strong>
                  <small>Check pending complaints</small>
                </div>
              </button>

              <button className="quick-action">
                <span>📢</span>
                <div>
                  <strong>Create Notice</strong>
                  <small>Publish a society notice</small>
                </div>
              </button>

            </div>

          </div>

        </section>

        <section className="recent-section">

          <div className="section-heading">
            <div>
              <h3>Recent Activity</h3>
              <p>Latest society updates</p>
            </div>
          </div>

          <div className="empty-state">

            <div className="empty-icon">
              📋
            </div>

            <h4>No recent activity</h4>

            <p>
              Activities will appear here when residents,
              complaints or notices are added.
            </p>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;