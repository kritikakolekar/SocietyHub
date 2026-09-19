import { useState } from "react";
import "./ResidentVisitors.css";

function ResidentVisitors({ resident, onBack }) {
  const [visitors, setVisitors] = useState([
    {
      id: 1,
      name: "Sanjay Mehta",
      purpose: "Family Visit",
      date: "18 Sep 2026",
      entry: "10:30 AM",
      exit: "12:15 PM",
      status: "Exited",
    },
    {
      id: 2,
      name: "Neha Joshi",
      purpose: "Delivery",
      date: "18 Sep 2026",
      entry: "2:20 PM",
      exit: "-",
      status: "Inside",
    },
    {
      id: 3,
      name: "Rohit Desai",
      purpose: "Personal Visit",
      date: "17 Sep 2026",
      entry: "6:00 PM",
      exit: "8:10 PM",
      status: "Exited",
    },
  ]);

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    purpose: "",
  });

  const handleRegister = () => {
    if (
      !formData.name ||
      !formData.contact ||
      !formData.purpose
    ) {
      alert("Please fill all visitor details.");
      return;
    }

    if (formData.contact.length !== 10) {
      alert("Contact number must be exactly 10 digits.");
      return;
    }

    setVisitors([
      {
        id: Date.now(),
        name: formData.name,
        purpose: formData.purpose,
        date: new Date().toLocaleDateString("en-GB"),
        entry: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        exit: "-",
        status: "Inside",
      },
      ...visitors,
    ]);

    alert("Visitor registered successfully!");

    setFormData({
      name: "",
      contact: "",
      purpose: "",
    });

    setShowForm(false);
  };

  return (
    <div className="resident-visitors-page">

      <div className="resident-visitors-header">

        <button
          className="visitors-back-button"
          onClick={onBack}
        >
          ← Back to Dashboard
        </button>

        <div>
          <span className="visitors-label">
            VISITOR MANAGEMENT
          </span>

          <h1>Visitors</h1>

          <p>
            View visitor activity and register visitors for your flat.
          </p>
        </div>

        <button
          className="register-visitor-button"
          onClick={() => setShowForm(true)}
        >
          + Register Visitor
        </button>

      </div>

      <div className="resident-visitors-summary">

        <div className="visitor-summary-card">
          <span>Total Visitors</span>
          <strong>{visitors.length}</strong>
        </div>

        <div className="visitor-summary-card">
          <span>Currently Inside</span>
          <strong>
            {
              visitors.filter(
                (visitor) => visitor.status === "Inside"
              ).length
            }
          </strong>
        </div>

        <div className="visitor-summary-card">
          <span>Exited</span>
          <strong>
            {
              visitors.filter(
                (visitor) => visitor.status === "Exited"
              ).length
            }
          </strong>
        </div>

      </div>

      {showForm && (
        <div className="visitor-form-card">

          <div className="visitor-form-header">
            <div>
              <h2>Register Visitor</h2>
              <p>
                Enter the visitor's details before arrival.
              </p>
            </div>
          </div>

          <div className="visitor-form-grid">

            <div className="visitor-form-field">
              <label>Visitor Name</label>
              <input
                type="text"
                placeholder="Enter visitor name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
              />
            </div>

            <div className="visitor-form-field">
              <label>Contact Number</label>
              <input
                type="tel"
                maxLength="10"
                placeholder="10-digit mobile number"
                value={formData.contact}
                onChange={(e) => {
                  const value = e.target.value.replace(
                    /\D/g,
                    ""
                  );

                  setFormData({
                    ...formData,
                    contact: value,
                  });
                }}
              />
            </div>

            <div className="visitor-form-field">
              <label>Purpose of Visit</label>
              <select
                value={formData.purpose}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    purpose: e.target.value,
                  })
                }
              >
                <option value="">Select purpose</option>
                <option value="Family Visit">
                  Family Visit
                </option>
                <option value="Personal Visit">
                  Personal Visit
                </option>
                <option value="Delivery">
                  Delivery
                </option>
                <option value="Service">
                  Service
                </option>
                <option value="Other">
                  Other
                </option>
              </select>
            </div>

          </div>

          <div className="visitor-form-actions">

            <button
              className="visitor-cancel-button"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>

            <button
              className="visitor-submit-button"
              onClick={handleRegister}
            >
              Register Visitor
            </button>

          </div>

        </div>
      )}

      <div className="resident-visitors-card">

        <div className="resident-visitors-card-header">
          <div>
            <h2>Visitor History</h2>
            <p>
              Recent visitor activity for {resident.flat}
            </p>
          </div>
        </div>

        <div className="resident-visitors-list">

          {visitors.map((visitor) => (
            <div
              className="resident-visitor-item"
              key={visitor.id}
            >

              <div className="visitor-avatar">
                {visitor.name.charAt(0)}
              </div>

              <div className="visitor-content">

                <div className="visitor-top">
                  <h3>{visitor.name}</h3>

                  <span
                    className={`visitor-status ${visitor.status.toLowerCase()}`}
                  >
                    {visitor.status}
                  </span>
                </div>

                <div className="visitor-meta">
                  <span>{visitor.purpose}</span>
                  <span>{visitor.date}</span>
                </div>

                <div className="visitor-time">
                  <span>
                    Entry: <strong>{visitor.entry}</strong>
                  </span>

                  <span>
                    Exit: <strong>{visitor.exit}</strong>
                  </span>
                </div>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default ResidentVisitors;