import { useEffect, useState } from "react";
import "./Complaints.css";

function Complaints({ onBack }) {
  const [complaints, setComplaints] = useState([
    {
      id: 1,
      resident: "Rahul Sharma",
      flat: "A-101",
      category: "Plumbing",
      title: "Water leakage in bathroom",
      description:
        "There is water leakage from the bathroom pipe.",
      priority: "High",
      status: "Pending",
      date: "2026-09-15",
    },
    {
      id: 2,
      resident: "Priya Patil",
      flat: "A-203",
      category: "Electricity",
      title: "Corridor light not working",
      description:
        "The corridor light outside the flat is not working.",
      priority: "Medium",
      status: "In Progress",
      date: "2026-09-16",
    },
    {
      id: 3,
      resident: "Amit Kulkarni",
      flat: "B-102",
      category: "Cleanliness",
      title: "Garbage collection issue",
      description:
        "Garbage has not been collected from the floor.",
      priority: "Low",
      status: "Resolved",
      date: "2026-09-12",
    },
  ]);
  useEffect(() => {
  fetch("http://localhost:8080/societyhub/api/complaints")
    .then((response) => response.json())
    .then((data) => {
      const formattedComplaints = data.map((complaint) => ({
  id: complaint.id,
  resident: complaint.residentName,
  flat: "-",
  category: "General",
  title: complaint.subject,
  description: complaint.description,
  priority: "Medium",
  status: complaint.status,
  date: "-",
}));

      setComplaints(formattedComplaints);
    })
    .catch((error) => {
      console.error("Error loading complaints:", error);
    });
}, []);

  const [formData, setFormData] = useState({
    resident: "",
    flat: "",
    category: "",
    title: "",
    description: "",
    priority: "Medium",
    status: "Pending",
    date: "",
  });

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] =
    useState("All");

  const [filterPriority, setFilterPriority] =
    useState("All");

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newComplaint = {
      id: Date.now(),
      ...formData,
    };

    setComplaints([
      ...complaints,
      newComplaint,
    ]);

    setFormData({
      resident: "",
      flat: "",
      category: "",
      title: "",
      description: "",
      priority: "Medium",
      status: "Pending",
      date: "",
    });
  };

  const updateStatus = (id, newStatus) => {
    setComplaints(
      complaints.map((complaint) =>
        complaint.id === id
          ? {
              ...complaint,
              status: newStatus,
            }
          : complaint
      )
    );
  };

  const handleDelete = (id) => {
    setComplaints(
      complaints.filter(
        (complaint) => complaint.id !== id
      )
    );
  };

  const filteredComplaints =
    complaints.filter((complaint) => {
      const searchText =
        search.toLowerCase();

      const matchesSearch =
        complaint.resident
          .toLowerCase()
          .includes(searchText) ||
        complaint.flat
          .toLowerCase()
          .includes(searchText) ||
        complaint.category
          .toLowerCase()
          .includes(searchText) ||
        complaint.title
          .toLowerCase()
          .includes(searchText);

      const matchesStatus =
        filterStatus === "All" ||
        complaint.status === filterStatus;

      const matchesPriority =
        filterPriority === "All" ||
        complaint.priority === filterPriority;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority
      );
    });

  const totalComplaints =
    complaints.length;

  const pendingComplaints =
    complaints.filter(
      (complaint) =>
        complaint.status === "Pending"
    ).length;

  const inProgressComplaints =
    complaints.filter(
      (complaint) =>
        complaint.status === "In Progress"
    ).length;

  const resolvedComplaints =
    complaints.filter(
      (complaint) =>
        complaint.status === "Resolved"
    ).length;

  return (
    <div className="complaints-page">

      <div className="complaints-header">

        <div>
          <button
            className="back-button"
            onClick={onBack}
          >
            ← Back to Dashboard
          </button>

          <h1>Complaints Management</h1>

          <p>
            Track and resolve resident complaints
            efficiently.
          </p>
        </div>

      </div>

      <div className="complaint-stats">

        <div className="complaint-stat-card">
          <div className="complaint-stat-icon">
            📝
          </div>

          <div>
            <span>Total Complaints</span>
            <strong>
              {totalComplaints}
            </strong>
          </div>
        </div>

        <div className="complaint-stat-card">
          <div className="complaint-stat-icon">
            ⏳
          </div>

          <div>
            <span>Pending</span>
            <strong>
              {pendingComplaints}
            </strong>
          </div>
        </div>

        <div className="complaint-stat-card">
          <div className="complaint-stat-icon">
            🔧
          </div>

          <div>
            <span>In Progress</span>
            <strong>
              {inProgressComplaints}
            </strong>
          </div>
        </div>

        <div className="complaint-stat-card">
          <div className="complaint-stat-icon">
            ✅
          </div>

          <div>
            <span>Resolved</span>
            <strong>
              {resolvedComplaints}
            </strong>
          </div>
        </div>

      </div>

      <div className="complaint-form-card">

        <h2>➕ Add Complaint</h2>

        <form onSubmit={handleSubmit}>

          <div className="complaint-form-grid">

            <div className="form-group">
              <label>Resident Name</label>

              <input
                type="text"
                name="resident"
                value={formData.resident}
                onChange={handleChange}
                placeholder="Enter resident name"
                required
              />
            </div>

            <div className="form-group">
              <label>Flat Number</label>

              <input
                type="text"
                name="flat"
                value={formData.flat}
                onChange={handleChange}
                placeholder="e.g. A-101"
                required
              />
            </div>

            <div className="form-group">
              <label>Category</label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select category
                </option>

                <option value="Plumbing">
                  Plumbing
                </option>

                <option value="Electricity">
                  Electricity
                </option>

                <option value="Cleanliness">
                  Cleanliness
                </option>

                <option value="Security">
                  Security
                </option>

                <option value="Parking">
                  Parking
                </option>

                <option value="Maintenance">
                  Maintenance
                </option>

                <option value="Noise">
                  Noise
                </option>

                <option value="Other">
                  Other
                </option>
              </select>
            </div>

            <div className="form-group">
              <label>Complaint Title</label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter complaint title"
                required
              />
            </div>

            <div className="form-group">
              <label>Priority</label>

              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="Low">
                  Low
                </option>

                <option value="Medium">
                  Medium
                </option>

                <option value="High">
                  High
                </option>
              </select>
            </div>

            <div className="form-group">
              <label>Date</label>

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group full-width">
              <label>Description</label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the complaint..."
                rows="4"
                required
              />
            </div>

          </div>

          <button
            className="add-complaint-button"
            type="submit"
          >
            Add Complaint
          </button>

        </form>

      </div>

      <div className="complaint-list-card">

        <div className="complaint-list-header">

          <div>
            <h2>Complaint Directory</h2>

            <p>
              View, track and update resident
              complaints.
            </p>
          </div>

          <div className="complaint-filters">

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search complaints..."
            />

            <select
              value={filterStatus}
              onChange={(event) =>
                setFilterStatus(
                  event.target.value
                )
              }
            >
              <option value="All">
                All Status
              </option>

              <option value="Pending">
                Pending
              </option>

              <option value="In Progress">
                In Progress
              </option>

              <option value="Resolved">
                Resolved
              </option>
            </select>

            <select
              value={filterPriority}
              onChange={(event) =>
                setFilterPriority(
                  event.target.value
                )
              }
            >
              <option value="All">
                All Priority
              </option>

              <option value="High">
                High
              </option>

              <option value="Medium">
                Medium
              </option>

              <option value="Low">
                Low
              </option>
            </select>

          </div>

        </div>

        <div className="complaint-table-wrapper">

          <table className="complaint-table">

            <thead>
              <tr>
                <th>Resident</th>
                <th>Complaint</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredComplaints.length > 0 ? (
                filteredComplaints.map(
                  (complaint) => (
                    <tr key={complaint.id}>

                      <td>
                        <strong>
                          {complaint.resident}
                        </strong>

                        <small>
                          {complaint.flat}
                        </small>
                      </td>

                      <td>
                        <strong>
                          {complaint.title}
                        </strong>

                        <small>
                          {complaint.description}
                        </small>
                      </td>

                      <td>
                        {complaint.category}
                      </td>

                      <td>
                        <span >
                        className={`priority-badge ${complaint.priority.toLowerCase()}`}
                          {complaint.priority}
                        </span> 
                         
                      </td>

                      <td>
                        {complaint.date}
                      </td>

                      <td>
                        <select
                          className={`status-select ${complaint.status
                            .toLowerCase()
                            .replace(" ", "-")}`}
                          value={
                            complaint.status
                          }
                          onChange={(event) =>
                            updateStatus(
                              complaint.id,
                              event.target.value
                            )
                          }
                        >
                          <option value="Pending">
                            Pending
                          </option>

                          <option value="In Progress">
                            In Progress
                          </option>

                          <option value="Resolved">
                            Resolved
                          </option>
                        </select>
                      </td>

                      <td>
                        <button
                          className="delete-complaint-button"
                          onClick={() =>
                            handleDelete(
                              complaint.id
                            )
                          }
                        >
                          🗑️
                        </button>
                      </td>

                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="no-complaints"
                  >
                    No complaints found.
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Complaints;