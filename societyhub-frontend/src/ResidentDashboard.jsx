import { useState } from "react";
import "./ResidentDashboard.css";
import ResidentProfile from "./ResidentProfile";
import ResidentMaintenance from "./ResidentMaintenance";
import ResidentComplaints from "./ResidentComplaints";
import ResidentNotices from "./ResidentNotices";
import ResidentSocietyEvents from "./ResidentSocietyEvents";
import ResidentParking from "./ResidentParking";
import ResidentVisitors from "./ResidentVisitors";

function ResidentDashboard({ onLogout, username }) {
  const [activePage, setActivePage] = useState("dashboard");

  const resident =
  username === "resident"
    ? {
        name: "Kritika Kolekar",
        username: "resident",
        flat: "A-101",
        wing: "A Wing",
        phone: "9876543210",
      }
    : username === "priya"
    ? {
        name: "Priya Patil",
        username: "priya",
        flat: "B-205",
        wing: "B Wing",
        phone: "9876543211",
      }
    : {
        name: "Amit Kulkarni",
        username: "amit",
        flat: "C-302",
        wing: "C Wing",
        phone: "9876543212",
      };

  if (activePage === "profile") {
  return (
    <ResidentProfile
      resident={resident}
      onBack={() => setActivePage("dashboard")}
    />
  );
}
if (activePage === "maintenance") {
  return (
    <ResidentMaintenance
      resident={resident}
      onBack={() => setActivePage("dashboard")}
    />
  );
}
if (activePage === "complaints") {
  return (
    <ResidentComplaints
      resident={resident}
      onBack={() => setActivePage("dashboard")}
    />
  );
}
if (activePage === "notices") {
  return (
    <ResidentNotices
      onBack={() => setActivePage("dashboard")}
    />
  );
}
if (activePage === "events") {
  return (
    <ResidentSocietyEvents
      onBack={() => setActivePage("dashboard")}
    />
  );
}
if (activePage === "parking") {
  return (
    <ResidentParking
      resident={resident}
      onBack={() => setActivePage("dashboard")}
    />
  );
}
if (activePage === "visitors") {
  return (
    <ResidentVisitors
      resident={resident}
      onBack={() => setActivePage("dashboard")}
    />
  );
}
  if (activePage === "dashboard") {
    return (
      <div className="resident-layout">

        <aside className="resident-sidebar">

          <div className="resident-brand">
            <div className="resident-brand-icon">🏢</div>

            <div>
              <strong>SocietyHub</strong>
              <span>Resident Portal</span>
            </div>
          </div>

          <div className="resident-profile">
            <div className="resident-avatar">
              {resident.name.charAt(0)}
            </div>

            <div>
              <strong>{resident.name}</strong>
              <span>
                {resident.flat} · {resident.wing}
              </span>
            </div>
          </div>

          <nav className="resident-nav">

            <div className="resident-nav-title">
              MAIN MENU
            </div>

            <button
              className="resident-nav-item active"
              onClick={() => setActivePage("dashboard")}
            >
              <span>🏠</span>
              Dashboard
            </button>

            <button
              className="resident-nav-item"
              onClick={() => setActivePage("profile")}
            >
              <span>👤</span>
              My Profile
            </button>

            <button
              className="resident-nav-item"
              onClick={() => setActivePage("maintenance")}
            >
              <span>💰</span>
              My Maintenance
            </button>

            <button
              className="resident-nav-item"
              onClick={() => setActivePage("complaints")}
            >
              <span>📝</span>
              My Complaints
            </button>

            <button
              className="resident-nav-item"
              onClick={() => setActivePage("notices")}
            >
              <span>📢</span>
              Notices
            </button>

            <button
              className="resident-nav-item"
              onClick={() => setActivePage("events")}
            >
              <span>📅</span>
              Society Events
            </button>

            <button
              className="resident-nav-item"
              onClick={() => setActivePage("parking")}
            >
              <span>🅿️</span>
              My Parking
            </button>

            <button
              className="resident-nav-item"
              onClick={() => setActivePage("visitors")}
            >
              <span>🚪</span>
              Visitors
            </button>

          </nav>

          <button
            className="resident-logout"
            onClick={onLogout}
          >
            <span>↪</span>
            Logout
          </button>

        </aside>

        <main className="resident-main">

          <header className="resident-topbar">

            <div>
              <h1>Welcome, {resident.name.split(" ")[0]}! 👋</h1>

              <p>
                Here's what's happening in your society today.
              </p>
            </div>

            <div className="resident-top-actions">
              <button className="notification-button">
                🔔
                <span></span>
              </button>

              <div className="resident-top-profile">
                <div className="small-avatar">
                  {resident.name.charAt(0)}
                </div>

                <div>
                  <strong>{resident.name}</strong>
                  <small>{resident.flat}</small>
                </div>
              </div>
            </div>

          </header>

          <section className="resident-stats">

            <div className="resident-stat-card">
              <div className="resident-stat-icon blue">
                💰
              </div>

              <div>
                <span>Maintenance Due</span>
                <strong>₹2,500</strong>
                <small>September 2026</small>
              </div>
            </div>

            <div className="resident-stat-card">
              <div className="resident-stat-icon orange">
                📝
              </div>

              <div>
                <span>Open Complaints</span>
                <strong>1</strong>
                <small>Needs attention</small>
              </div>
            </div>

            <div className="resident-stat-card">
              <div className="resident-stat-icon green">
                📢
              </div>

              <div>
                <span>New Notices</span>
                <strong>2</strong>
                <small>Recently published</small>
              </div>
            </div>

            <div className="resident-stat-card">
              <div className="resident-stat-icon purple">
                📅
              </div>

              <div>
                <span>Upcoming Events</span>
                <strong>3</strong>
                <small>This month</small>
              </div>
            </div>

          </section>

          <section className="resident-content-grid">

            <div className="resident-panel">

              <div className="resident-panel-header">
                <div>
                  <h2>Recent Activity</h2>
                  <p>Your latest society activities</p>
                </div>

                <button>View All</button>
              </div>

              <div className="activity-list">

                <div className="activity-item">
                  <div className="activity-icon complaint">
                    📝
                  </div>

                  <div>
                    <strong>
                      Complaint submitted
                    </strong>

                    <span>
                      Water leakage near kitchen sink
                    </span>

                    <small>
                      18 Sep 2026 · 10:30 AM
                    </small>
                  </div>

                  <span className="activity-status pending">
                    Pending
                  </span>
                </div>

                <div className="activity-item">
                  <div className="activity-icon payment">
                    💰
                  </div>

                  <div>
                    <strong>
                      Maintenance payment
                    </strong>

                    <span>
                      August 2026 maintenance paid
                    </span>

                    <small>
                      5 Sep 2026 · 2:15 PM
                    </small>
                  </div>

                  <span className="activity-status paid">
                    Paid
                  </span>
                </div>

                <div className="activity-item">
                  <div className="activity-icon notice">
                    📢
                  </div>

                  <div>
                    <strong>
                      New notice published
                    </strong>

                    <span>
                      Water supply maintenance
                    </span>

                    <small>
                      17 Sep 2026 · 6:00 PM
                    </small>
                  </div>

                  <span className="activity-status new">
                    New
                  </span>
                </div>

              </div>

            </div>

            <div className="resident-panel">

              <div className="resident-panel-header">
                <div>
                  <h2>Upcoming Events</h2>
                  <p>Events happening in the society</p>
                </div>

                <button>View All</button>
              </div>

              <div className="event-list">

                <div className="resident-event">
                  <div className="event-date-box">
                    <strong>25</strong>
                    <span>SEP</span>
                  </div>

                  <div>
                    <strong>
                      Annual Society Meeting
                    </strong>

                    <span>
                      🕕 6:00 PM · Society Club House
                    </span>
                  </div>
                </div>

                <div className="resident-event">
                  <div className="event-date-box">
                    <strong>28</strong>
                    <span>SEP</span>
                  </div>

                  <div>
                    <strong>
                      Ganesh Festival Celebration
                    </strong>

                    <span>
                      🕢 7:30 PM · Society Garden
                    </span>
                  </div>
                </div>

                <div className="resident-event">
                  <div className="event-date-box">
                    <strong>02</strong>
                    <span>OCT</span>
                  </div>

                  <div>
                    <strong>
                      Community Clean-Up Drive
                    </strong>

                    <span>
                      🕘 9:00 AM · Society Garden
                    </span>
                  </div>
                </div>

              </div>

            </div>

          </section>

          <section className="resident-quick-actions">

            <h2>Quick Actions</h2>

            <div className="quick-action-grid">

              <button
                onClick={() => setActivePage("complaints")}
              >
                <span>📝</span>
                <strong>Raise Complaint</strong>
                <small>Report an issue</small>
              </button>

              <button
                onClick={() => setActivePage("maintenance")}
              >
                <span>💰</span>
                <strong>View Maintenance</strong>
                <small>Check payment details</small>
              </button>

              <button
                onClick={() => setActivePage("notices")}
              >
                <span>📢</span>
                <strong>View Notices</strong>
                <small>Latest announcements</small>
              </button>

              <button
                onClick={() => setActivePage("events")}
              >
                <span>📅</span>
                <strong>Society Events</strong>
                <small>See upcoming events</small>
              </button>

            </div>

          </section>

        </main>

      </div>
    );
  }

  return (
    <div className="resident-placeholder">

      <button
        onClick={() => setActivePage("dashboard")}
        className="resident-back-button"
      >
        ← Back to Dashboard
      </button>

      <div className="resident-placeholder-card">

        <div className="placeholder-icon">
          🚧
        </div>

        <h1>
          {activePage === "profile" && "My Profile"}
          {activePage === "maintenance" && "My Maintenance"}
          {activePage === "complaints" && "My Complaints"}
          {activePage === "notices" && "Notices"}
          {activePage === "events" && "Society Events"}
          {activePage === "parking" && "My Parking"}
          {activePage === "visitors" && "Visitors"}
        </h1>

        <p>
          This resident feature will be connected
          to the SocietyHub backend next.
        </p>

      </div>

    </div>
  );
}

export default ResidentDashboard;