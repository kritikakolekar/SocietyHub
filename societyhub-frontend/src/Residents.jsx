import { useState } from "react";
import "./Residents.css";

function Residents({onBack}) {
  const [residents, setResidents] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      flat: "A-101",
      building: "A Wing",
      phone: "9876543210",
      email: "rahul@example.com",
      members: 4,
      status: "Active",
    },
    {
      id: 2,
      name: "Priya Patil",
      flat: "A-203",
      building: "A Wing",
      phone: "9876501234",
      email: "priya@example.com",
      members: 3,
      status: "Active",
    },
    {
      id: 3,
      name: "Amit Kulkarni",
      flat: "B-102",
      building: "B Wing",
      phone: "9898989898",
      email: "amit@example.com",
      members: 2,
      status: "Active",
    },
  ]);

  const [search, setSearch] = useState("");
  const [buildingFilter, setBuildingFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    flat: "",
    building: "A Wing",
    phone: "",
    email: "",
    members: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddResident = (event) => {
    event.preventDefault();

    const newResident = {
      id: Date.now(),
      ...formData,
      members: Number(formData.members),
      status: "Active",
    };

    setResidents([...residents, newResident]);

    setFormData({
      name: "",
      flat: "",
      building: "A Wing",
      phone: "",
      email: "",
      members: "",
    });

    setShowForm(false);
  };

  const filteredResidents = residents.filter((resident) => {
    const matchesSearch =
      resident.name.toLowerCase().includes(search.toLowerCase()) ||
      resident.flat.toLowerCase().includes(search.toLowerCase()) ||
      resident.phone.includes(search);

    const matchesBuilding =
      buildingFilter === "All" ||
      resident.building === buildingFilter;

    return matchesSearch && matchesBuilding;
  });

  const activeResidents = residents.filter(
    (resident) => resident.status === "Active"
  ).length;

  const totalMembers = residents.reduce(
    (total, resident) => total + Number(resident.members),
    0
  );

  return (
    <div className="residents-page">

      <div className="residents-header">
        <button
  className="back-button"
  onClick={onBack}
>
  ← Back to Dashboard
</button>

        <div>
          <p className="page-label">SOCIETY DIRECTORY</p>

          <h1>Residents</h1>

          <p className="header-description">
            Manage resident information, flats and contact details.
          </p>
        </div>

        <button
          className="add-resident-button"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "✕ Close Form" : "+ Add Resident"}
        </button>

      </div>

      <div className="resident-stats">

        <div className="resident-stat-card">
          <div className="resident-stat-icon">👥</div>

          <div>
            <span>Total Residents</span>
            <strong>{residents.length}</strong>
          </div>
        </div>

        <div className="resident-stat-card">
          <div className="resident-stat-icon">🟢</div>

          <div>
            <span>Active Residents</span>
            <strong>{activeResidents}</strong>
          </div>
        </div>

        <div className="resident-stat-card">
          <div className="resident-stat-icon">🏠</div>

          <div>
            <span>Occupied Flats</span>
            <strong>{residents.length}</strong>
          </div>
        </div>

        <div className="resident-stat-card">
          <div className="resident-stat-icon">👨‍👩‍👧</div>

          <div>
            <span>Total Family Members</span>
            <strong>{totalMembers}</strong>
          </div>
        </div>

      </div>

      {showForm && (
        <div className="resident-form-card">

          <div className="form-card-header">
            <div>
              <h2>Add New Resident</h2>
              <p>Enter resident details below.</p>
            </div>

            <span>👤</span>
          </div>

          <form onSubmit={handleAddResident}>

            <div className="resident-form-grid">

              <div className="resident-input-group">
                <label>Resident Name</label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  required
                />
              </div>

              <div className="resident-input-group">
                <label>Flat Number</label>

                <input
                  type="text"
                  name="flat"
                  value={formData.flat}
                  onChange={handleChange}
                  placeholder="Example: A-101"
                  required
                />
              </div>

              <div className="resident-input-group">
                <label>Building / Wing</label>

                <select
                  name="building"
                  value={formData.building}
                  onChange={handleChange}
                >
                  <option>A Wing</option>
                  <option>B Wing</option>
                  <option>C Wing</option>
                  <option>D Wing</option>
                </select>
              </div>

              <div className="resident-input-group">
                <label>Phone Number</label>

                <input
  type="tel"
  name="phone"
  value={formData.phone}
  onChange={(event) => {
    const value = event.target.value.replace(/\D/g, "");
    if (value.length <= 10) {
      setFormData({
        ...formData,
        phone: value,
      });
    }
  }}
  placeholder="10-digit mobile number"
  maxLength="10"
  pattern="[0-9]{10}"
  required
/>
              </div>

              <div className="resident-input-group">
                <label>Email Address</label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="resident@email.com"
                />
              </div>

              <div className="resident-input-group">
                <label>Family Members</label>

                <input
                  type="number"
                  name="members"
                  value={formData.members}
                  onChange={handleChange}
                  placeholder="Number of members"
                  min="1"
                  required
                />
              </div>

            </div>

            <button className="save-resident-button" type="submit">
              ✓ Save Resident
            </button>

          </form>

        </div>
      )}

      <div className="resident-directory-card">

        <div className="directory-header">

          <div>
            <h2>Resident Directory</h2>
            <p>View and search registered residents.</p>
          </div>

          <div className="directory-count">
            {filteredResidents.length} Residents
          </div>

        </div>

        <div className="resident-filters">

          <div className="resident-search">

            <span>🔍</span>

            <input
              type="text"
              placeholder="Search by name, flat or phone..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

          </div>

          <select
            value={buildingFilter}
            onChange={(event) =>
              setBuildingFilter(event.target.value)
            }
          >
            <option value="All">All Wings</option>
            <option value="A Wing">A Wing</option>
            <option value="B Wing">B Wing</option>
            <option value="C Wing">C Wing</option>
            <option value="D Wing">D Wing</option>
          </select>

        </div>

        {filteredResidents.length === 0 ? (

          <div className="resident-empty-state">

            <div>👥</div>

            <h3>No residents found</h3>

            <p>
              Try changing your search or add a new resident.
            </p>

          </div>

        ) : (

          <div className="resident-table-wrapper">

            <table className="resident-table">

              <thead>
                <tr>
                  <th>Resident</th>
                  <th>Flat</th>
                  <th>Contact</th>
                  <th>Family</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                {filteredResidents.map((resident) => (

                  <tr key={resident.id}>

                    <td>
                      <div className="resident-name-cell">

                        <div className="resident-avatar">
                          {resident.name.charAt(0).toUpperCase()}
                        </div>

                        <div>
                          <strong>{resident.name}</strong>
                          <span>{resident.email || "No email added"}</span>
                        </div>

                      </div>
                    </td>

                    <td>
                      <div className="flat-cell">
                        <strong>{resident.flat}</strong>
                        <span>{resident.building}</span>
                      </div>
                    </td>

                    <td>
                      <div className="phone-cell">
                        📞 {resident.phone}
                      </div>
                    </td>

                    <td>
                      <span className="family-count">
                        👨‍👩‍👧 {resident.members}
                      </span>
                    </td>

                    <td>
                      <span className="active-badge">
                        ● {resident.status}
                      </span>
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}

export default Residents;