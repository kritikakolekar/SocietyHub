import { useState } from "react";
import "./ResidentComplaints.css";

function ResidentComplaints({ resident, onBack }) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
  title: "",
  category: "",
  priority: "Medium",
  description: "",
});
  const [complaints, setComplaints] = useState([
    {
      id: 1,
      title: "Water leakage near kitchen sink",
      category: "Plumbing",
      priority: "High",
      status: "In Progress",
      date: "18 Sep 2026",
    },
    {
      id: 2,
      title: "Corridor light not working",
      category: "Electrical",
      priority: "Medium",
      status: "Resolved",
      date: "12 Sep 2026",
    },
  ]);

  return (
    <div className="resident-complaints-page">

      <div className="resident-complaints-header">

        <button
          className="complaints-back-button"
          onClick={onBack}
        >
          ← Back to Dashboard
        </button>

        <h1>My Complaints</h1>

        <p>
          Raise and track complaints related to your flat and society.
        </p>

      </div>

      <div className="complaints-summary">

        <div className="complaint-summary-card">
          <span>Total Complaints</span>
          <strong>{complaints.length}</strong>
        </div>

        <div className="complaint-summary-card">
          <span>In Progress</span>
          <strong>
            {complaints.filter(
              (complaint) => complaint.status === "In Progress"
            ).length}
          </strong>
        </div>

        <div className="complaint-summary-card">
          <span>Resolved</span>
          <strong>
            {complaints.filter(
              (complaint) => complaint.status === "Resolved"
            ).length}
          </strong>
        </div>

      </div>
{showForm && (
  <div className="complaint-form-overlay">

    <div className="complaint-form-card">

      <button
        className="complaint-form-close"
        onClick={() => setShowForm(false)}
      >
        ×
      </button>

      <h2>Raise a Complaint</h2>

      <p>
        Submit a complaint to the society management.
      </p>

      <label>Complaint Title</label>
      <input
  type="text"
  placeholder="e.g. Water leakage"
  value={formData.title}
  onChange={(e) =>
    setFormData({
      ...formData,
      title: e.target.value,
    })
  }
/>

      <label>Category</label>
      <select
  value={formData.category}
  onChange={(e) =>
    setFormData({
      ...formData,
      category: e.target.value,
    })
  }
>
        <option value="" disabled>
          Select category
        </option>
        <option>Plumbing</option>
        <option>Electrical</option>
        <option>Cleaning</option>
        <option>Security</option>
        <option>Parking</option>
        <option>Other</option>
      </select>

      <label>Priority</label>
      <select
  value={formData.priority}
  onChange={(e) =>
    setFormData({
      ...formData,
      priority: e.target.value,
    })
  }
>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <label>Description</label>
      <textarea
  rows="4"
  placeholder="Describe your complaint..."
  value={formData.description}
  onChange={(e) =>
    setFormData({
      ...formData,
      description: e.target.value,
    })
  }
/>

      <button
  className="submit-complaint-button"
  onClick={() => {
    setComplaints([
  ...complaints,
  {
    id: Date.now(),
    title: formData.title,
    category: formData.category,
    priority: formData.priority,
    status: "Pending",
    date: new Date().toLocaleDateString("en-GB"),
  },
]);
    fetch("http://localhost:8080/societyhub/api/complaints", {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body: new URLSearchParams({
    residentName: resident.name,
    subject: formData.title,
    description: formData.description,
    status: "Pending",
  }),
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to submit complaint");
    }

    return response.text();
  })
  .then(() => {
    alert("Complaint submitted successfully!");
    setShowForm(false);
    setFormData({
      title: "",
      category: "",
      priority: "Medium",
      description: "",
    });
  })
  .catch((error) => {
    console.error("Error submitting complaint:", error);
    alert("Unable to submit complaint.");
  });
  }}
>
  Submit Complaint
</button>

    </div>

  </div>
)}
      <div className="resident-complaints-card">

        <div className="resident-complaints-card-header">
          <div>
            <h2>Complaint History</h2>
            <p>
              Complaints raised for {resident.flat}, {resident.wing}
            </p>
          </div>

         <button
  className="raise-complaint-button"
  onClick={() => setShowForm(true)}
>
  + Raise Complaint
</button>
        </div>

        <div className="resident-complaints-list">

          {complaints.map((complaint) => (
            <div
              className="resident-complaint-item"
              key={complaint.id}
            >

              <div className="complaint-icon">
                🛠️
              </div>

              <div className="complaint-content">

                <h3>{complaint.title}</h3>

                <div className="complaint-meta">
                  <span>{complaint.category}</span>
                  <span>{complaint.priority} Priority</span>
                  <span>{complaint.date}</span>
                </div>

              </div>

              <span
                className={`resident-complaint-status ${complaint.status
                  .toLowerCase()
                  .replace(" ", "-")}`}
              >
                {complaint.status}
              </span>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default ResidentComplaints;