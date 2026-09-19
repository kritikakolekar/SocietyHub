import "./ResidentNotices.css";

function ResidentNotices({ onBack }) {
  const notices = [
    {
      id: 1,
      title: "Society Cleaning Drive",
      category: "General",
      date: "20 Sep 2026",
      priority: "Medium",
      description:
        "A society-wide cleaning drive will be conducted in all common areas. Residents are requested to cooperate with the management team.",
    },
    {
      id: 2,
      title: "Water Tank Cleaning",
      category: "Maintenance",
      date: "22 Sep 2026",
      priority: "High",
      description:
        "The overhead water tanks will be cleaned. Water supply may be temporarily affected during the scheduled maintenance period.",
    },
    {
      id: 3,
      title: "Ganesh Festival Celebration",
      category: "Event",
      date: "25 Sep 2026",
      priority: "Low",
      description:
        "Residents are invited to participate in the society Ganesh Festival celebration and cultural activities.",
    },
  ];

  return (
    <div className="resident-notices-page">

      <div className="resident-notices-header">
        <button
          className="notices-back-button"
          onClick={onBack}
        >
          ← Back to Dashboard
        </button>

        <div>
          <span className="notices-label">
            SOCIETY UPDATES
          </span>

          <h1>Notices</h1>

          <p>
            Stay updated with important announcements and
            information from society management.
          </p>
        </div>
      </div>

      <div className="resident-notices-summary">

        <div className="notice-summary-card">
          <span>Total Notices</span>
          <strong>{notices.length}</strong>
        </div>

        <div className="notice-summary-card">
          <span>Important</span>
          <strong>
            {
              notices.filter(
                (notice) => notice.priority === "High"
              ).length
            }
          </strong>
        </div>

        <div className="notice-summary-card">
          <span>Latest Update</span>
          <strong>Today</strong>
        </div>

      </div>

      <div className="resident-notices-card">

        <div className="resident-notices-card-header">
          <div>
            <h2>Latest Notices</h2>
            <p>
              Announcements published by society management
            </p>
          </div>
        </div>

        <div className="resident-notices-list">

          {notices.map((notice) => (
            <div
              className="resident-notice-item"
              key={notice.id}
            >

              <div className="resident-notice-icon">
                📢
              </div>

              <div className="resident-notice-content">

                <div className="resident-notice-top">

                  <h3>{notice.title}</h3>

                  <span
                    className={`resident-notice-priority ${notice.priority.toLowerCase()}`}
                  >
                    {notice.priority}
                  </span>

                </div>

                <div className="resident-notice-meta">
                  <span>{notice.category}</span>
                  <span>{notice.date}</span>
                </div>

                <p>{notice.description}</p>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default ResidentNotices;