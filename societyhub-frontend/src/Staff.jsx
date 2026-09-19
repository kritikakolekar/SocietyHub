import { useEffect, useState } from "react";
import "./Staff.css";

function Staff({ onBack }) {
  const [staff, setStaff] = useState([]);
  const [formData, setFormData] = useState({
  name: "",
  type: "",
  phone: "",
  flat: "",
  joiningDate: "",
  status: "Active",
  passNumber: "",
});

useEffect(() => {
  fetch("http://localhost:8080/societyhub/api/staff")
    .then((response) => response.json())
    .then((data) => {
      const formattedStaff = data.map((item) => ({
        id: item.id,
        name: item.name,
        type: item.jobRole,
        phone: item.phone,
        flat: "Society",
        joiningDate: item.joiningDate,
        status: item.status,
        passNumber: "ST-" + item.id,
      }));

      setStaff(formattedStaff);
    })
    .catch((error) => {
      console.error("Error loading staff:", error);
    });
}, []);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handlePhoneChange = (event) => {
    const value = event.target.value.replace(/\D/g, "");

    if (value.length <= 10) {
      setFormData({
        ...formData,
        phone: value,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newStaff = {
      id: Date.now(),
      ...formData,
    };

    setStaff([...staff, newStaff]);

    setFormData({
      name: "",
      type: "",
      phone: "",
      flat: "",
      joiningDate: "",
      status: "Active",
      passNumber: "",
    });
  };

  const handleDelete = (id) => {
    setStaff(
      staff.filter((person) => person.id !== id)
    );
  };

  const filteredStaff = staff.filter((person) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      person.name.toLowerCase().includes(searchText) ||
      person.type.toLowerCase().includes(searchText) ||
      person.phone.includes(search) ||
      person.flat.toLowerCase().includes(searchText) ||
      person.passNumber.toLowerCase().includes(searchText);

    const matchesStatus =
      filterStatus === "All" ||
      person.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const totalStaff = staff.length;

  const activeStaff = staff.filter(
    (person) => person.status === "Active"
  ).length;

  const domesticHelp = staff.filter(
    (person) =>
      person.type === "Maid / Housekeeper" ||
      person.type === "Nanny / Babysitter" ||
      person.type === "Cook" ||
      person.type === "Driver"
  ).length;

  const societyStaff = staff.filter(
    (person) =>
      person.type === "Security Guard" ||
      person.type === "Cleaner" ||
      person.type === "Gardener" ||
      person.type === "Maintenance Worker" ||
      person.type === "Plumber" ||
      person.type === "Electrician"
  ).length;

  return (
    <div className="staff-page">

      <div className="staff-header">
        <div>
          <button
            className="back-button"
            onClick={onBack}
          >
            ← Back to Dashboard
          </button>

          <h1>Staff & Domestic Help</h1>

          <p>
            Manage society staff and household support workers.
          </p>
        </div>
      </div>

      <div className="staff-stats">

        <div className="staff-stat-card">
          <div className="staff-stat-icon">👥</div>

          <div>
            <span>Total Staff</span>
            <strong>{totalStaff}</strong>
          </div>
        </div>

        <div className="staff-stat-card">
          <div className="staff-stat-icon">🟢</div>

          <div>
            <span>Active</span>
            <strong>{activeStaff}</strong>
          </div>
        </div>

        <div className="staff-stat-card">
          <div className="staff-stat-icon">🧹</div>

          <div>
            <span>Domestic Help</span>
            <strong>{domesticHelp}</strong>
          </div>
        </div>

        <div className="staff-stat-card">
          <div className="staff-stat-icon">🛡️</div>

          <div>
            <span>Society Staff</span>
            <strong>{societyStaff}</strong>
          </div>
        </div>

      </div>

      <div className="staff-form-card">

        <h2>➕ Add Staff / Domestic Help</h2>

        <form onSubmit={handleSubmit}>

          <div className="staff-form-grid">

            <div className="form-group">
              <label>Name</label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                required
              />
            </div>

            <div className="form-group">
              <label>Type</label>

              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select type
                </option>

                <optgroup label="Domestic Help">
                  <option>Maid / Housekeeper</option>
                  <option>Nanny / Babysitter</option>
                  <option>Cook</option>
                  <option>Driver</option>
                </optgroup>

                <optgroup label="Society Staff">
                  <option>Security Guard</option>
                  <option>Cleaner</option>
                  <option>Gardener</option>
                  <option>Maintenance Worker</option>
                  <option>Plumber</option>
                  <option>Electrician</option>
                  <option>Society Manager</option>
                </optgroup>
              </select>
            </div>

            <div className="form-group">
              <label>Phone Number</label>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handlePhoneChange}
                placeholder="10-digit mobile number"
                maxLength="10"
                pattern="[0-9]{10}"
                required
              />
            </div>

            <div className="form-group">
              <label>Flat / Location</label>

              <input
                type="text"
                name="flat"
                value={formData.flat}
                onChange={handleChange}
                placeholder="e.g. A-101 or Society"
                required
              />
            </div>

            <div className="form-group">
              <label>Joining Date</label>

              <input
                type="date"
                name="joiningDate"
                value={formData.joiningDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Pass / ID Number</label>

              <input
                type="text"
                name="passNumber"
                value={formData.passNumber}
                onChange={handleChange}
                placeholder="e.g. DH-004"
                required
              />
            </div>

            <div className="form-group">
              <label>Status</label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Active">
                  Active
                </option>

                <option value="Inactive">
                  Inactive
                </option>
              </select>
            </div>

          </div>

          <button
            className="add-staff-button"
            type="submit"
          >
            Add Staff
          </button>

        </form>

      </div>

      <div className="staff-list-card">

        <div className="staff-list-header">

          <div>
            <h2>Staff Directory</h2>

            <p>
              View and manage society staff and domestic workers.
            </p>
          </div>

          <div className="staff-filters">

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search staff..."
            />

            <select
              value={filterStatus}
              onChange={(event) =>
                setFilterStatus(event.target.value)
              }
            >
              <option value="All">
                All Status
              </option>

              <option value="Active">
                Active
              </option>

              <option value="Inactive">
                Inactive
              </option>
            </select>

          </div>

        </div>

        <div className="staff-table-wrapper">

          <table className="staff-table">

            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Phone</th>
                <th>Flat / Location</th>
                <th>Joining Date</th>
                <th>Pass / ID</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredStaff.length > 0 ? (
                filteredStaff.map((person) => (
                  <tr key={person.id}>

                    <td>
                      <strong>{person.name}</strong>
                    </td>

                    <td>
                      {person.type}
                    </td>

                    <td>
                      {person.phone}
                    </td>

                    <td>
                      {person.flat}
                    </td>

                    <td>
                      {person.joiningDate}
                    </td>

                    <td>
                      <span className="pass-badge">
                        {person.passNumber}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`staff-status ${person.status.toLowerCase()}`}
                      >
                        {person.status}
                      </span>
                    </td>

                    <td>
                      <button
                        className="delete-staff-button"
                        onClick={() =>
                          handleDelete(person.id)
                        }
                      >
                        🗑️
                      </button>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="no-staff"
                  >
                    No staff records found.
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

export default Staff;