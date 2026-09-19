import { useEffect, useState } from "react";
import "./Visitors.css";

function Visitors({ onBack }) {

const [visitors, setVisitors] = useState([]);

useEffect(() => {
  fetch("http://localhost:8080/societyhub/api/visitors")
    .then((response) => response.json())
    .then((data) => {
      const formattedVisitors = data.map((item) => ({
        id: item.id,
        name: item.visitorName,
        flat: item.flatNumber,
        contact: item.contactNumber,
        purpose: item.purpose,
        entryTime: item.entryTime
          ? item.entryTime.replace(" ", "T").slice(0, 16)
          : "",
        exitTime: item.exitTime
          ? item.exitTime.replace(" ", "T").slice(0, 16)
          : "",
        status: item.status,
      }));

      setVisitors(formattedVisitors);
    })
    .catch((error) => {
      console.error("Error loading visitors:", error);
    });
}, []);
  const [formData, setFormData] = useState({
    name: "",
    flat: "",
    contact: "",
    purpose: "",
    entryTime: "",
  });

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleContactChange = (event) => {
    const value = event.target.value.replace(/\D/g, "");

    if (value.length <= 10) {
      setFormData({
        ...formData,
        contact: value,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newVisitor = {
      id: Date.now(),
      ...formData,
      exitTime: "",
      status: "Inside",
    };

    setVisitors([...visitors, newVisitor]);

    setFormData({
      name: "",
      flat: "",
      contact: "",
      purpose: "",
      entryTime: "",
    });
  };

  const markExited = (id) => {
    const currentTime = new Date()
      .toISOString()
      .slice(0, 16);

    setVisitors(
      visitors.map((visitor) =>
        visitor.id === id
          ? {
              ...visitor,
              exitTime: currentTime,
              status: "Exited",
            }
          : visitor
      )
    );
  };

  const handleDelete = (id) => {
    setVisitors(
      visitors.filter((visitor) => visitor.id !== id)
    );
  };

  const filteredVisitors = visitors.filter((visitor) => {
    const matchesSearch =
      visitor.name.toLowerCase().includes(search.toLowerCase()) ||
      visitor.flat.toLowerCase().includes(search.toLowerCase()) ||
      visitor.contact.includes(search) ||
      visitor.purpose.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      filterStatus === "All" ||
      visitor.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const totalVisitors = visitors.length;

  const insideVisitors = visitors.filter(
    (visitor) => visitor.status === "Inside"
  ).length;

  const exitedVisitors = visitors.filter(
    (visitor) => visitor.status === "Exited"
  ).length;

  return (
    <div className="visitors-page">

      <div className="visitors-header">

        <div>
          <button className="back-button" onClick={onBack}>
            ← Back to Dashboard
          </button>

          <h1>Visitor Management</h1>

          <p>
            Track visitors entering and leaving the society.
          </p>
        </div>

      </div>

      <div className="visitor-stats">

        <div className="visitor-stat-card">
          <div className="visitor-stat-icon">
            👥
          </div>

          <div>
            <span>Total Visitors</span>
            <strong>{totalVisitors}</strong>
          </div>
        </div>

        <div className="visitor-stat-card">
          <div className="visitor-stat-icon">
            🟢
          </div>

          <div>
            <span>Currently Inside</span>
            <strong>{insideVisitors}</strong>
          </div>
        </div>

        <div className="visitor-stat-card">
          <div className="visitor-stat-icon">
            🚪
          </div>

          <div>
            <span>Exited</span>
            <strong>{exitedVisitors}</strong>
          </div>
        </div>

      </div>

      <div className="visitor-form-card">

        <h2>➕ Register Visitor</h2>

        <form onSubmit={handleSubmit}>

          <div className="visitor-form-grid">

            <div className="form-group">
              <label>Visitor Name</label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter visitor name"
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
              <label>Contact Number</label>

              <input
                type="tel"
                name="contact"
                value={formData.contact}
                onChange={handleContactChange}
                placeholder="10-digit mobile number"
                maxLength="10"
                pattern="[0-9]{10}"
                required
              />
            </div>

            <div className="form-group">
              <label>Purpose</label>

              <input
                type="text"
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                placeholder="e.g. Guest, Delivery"
                required
              />
            </div>

            <div className="form-group">
              <label>Entry Time</label>

              <input
                type="datetime-local"
                name="entryTime"
                value={formData.entryTime}
                onChange={handleChange}
                required
              />
            </div>

          </div>

          <button
            className="register-visitor-button"
            type="submit"
          >
            Register Visitor
          </button>

        </form>

      </div>

      <div className="visitor-list-card">

        <div className="visitor-list-header">

          <div>
            <h2>Visitor Log</h2>

            <p>
              View and manage today's visitor records
            </p>
          </div>

          <div className="visitor-filters">

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search visitors..."
            />

            <select
              value={filterStatus}
              onChange={(event) =>
                setFilterStatus(event.target.value)
              }
            >
              <option value="All">All Status</option>
              <option value="Inside">Inside</option>
              <option value="Exited">Exited</option>
            </select>

          </div>

        </div>

        <div className="visitor-table-wrapper">

          <table className="visitor-table">

            <thead>
              <tr>
                <th>Visitor</th>
                <th>Flat</th>
                <th>Contact</th>
                <th>Purpose</th>
                <th>Entry</th>
                <th>Exit</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredVisitors.length > 0 ? (
                filteredVisitors.map((visitor) => (
                  <tr key={visitor.id}>

                    <td>
                      <strong>{visitor.name}</strong>
                    </td>

                    <td>{visitor.flat}</td>

                    <td>{visitor.contact}</td>

                    <td>{visitor.purpose}</td>

                    <td>
                      {visitor.entryTime.replace("T", " ")}
                    </td>

                    <td>
                      {visitor.exitTime
                        ? visitor.exitTime.replace("T", " ")
                        : "—"}
                    </td>

                    <td>
                      <span
                        className={`visitor-status ${visitor.status.toLowerCase()}`}
                      >
                        {visitor.status}
                      </span>
                    </td>

                    <td>

                      <div className="visitor-actions">

                        {visitor.status === "Inside" && (
                          <button
                            className="exit-button"
                            onClick={() =>
                              markExited(visitor.id)
                            }
                          >
                            Exit
                          </button>
                        )}

                        <button
                          className="delete-visitor-button"
                          onClick={() =>
                            handleDelete(visitor.id)
                          }
                        >
                          🗑️
                        </button>

                      </div>

                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="no-visitors"
                  >
                    No visitor records found.
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

export default Visitors;