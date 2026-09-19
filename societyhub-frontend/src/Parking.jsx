import { useEffect, useState } from "react";
import "./Parking.css";

function Parking({ onBack }) {
 const [parkingRecords, setParkingRecords] = useState([]);

useEffect(() => {
  fetch("http://localhost:8080/societyhub/api/parking")
    .then((response) => response.json())
    .then((data) => {
      const formattedParking = data.map((item) => ({
        id: item.id,
        slot: item.parkingSlot,
        flat: item.flatNumber,
        owner: item.ownerName,
        vehicleNumber: item.vehicleNumber,
        vehicleType: item.vehicleType,
        status: item.status,
      }));

      setParkingRecords(formattedParking);
    })
    .catch((error) => {
      console.error("Error loading parking:", error);
    });
}, []);

  const [formData, setFormData] = useState({
    slot: "",
    flat: "",
    owner: "",
    vehicleNumber: "",
    vehicleType: "Car",
    status: "Assigned",
  });

  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newRecord = {
      id: Date.now(),
      ...formData,
    };

    setParkingRecords([...parkingRecords, newRecord]);

    setFormData({
      slot: "",
      flat: "",
      owner: "",
      vehicleNumber: "",
      vehicleType: "Car",
      status: "Assigned",
    });
  };

  const handleDelete = (id) => {
    setParkingRecords(
      parkingRecords.filter((record) => record.id !== id)
    );
  };

  const filteredRecords = parkingRecords.filter((record) => {
    const matchesSearch =
      record.slot.toLowerCase().includes(search.toLowerCase()) ||
      record.flat.toLowerCase().includes(search.toLowerCase()) ||
      record.owner.toLowerCase().includes(search.toLowerCase()) ||
      record.vehicleNumber.toLowerCase().includes(search.toLowerCase());

    const matchesType =
      filterType === "All" ||
      record.vehicleType === filterType;

    return matchesSearch && matchesType;
  });

  const totalSlots = 50;
  const occupiedSlots = parkingRecords.length;
  const availableSlots = totalSlots - occupiedSlots;
  const carCount = parkingRecords.filter(
    (record) => record.vehicleType === "Car"
  ).length;
  const bikeCount = parkingRecords.filter(
    (record) => record.vehicleType === "Bike"
  ).length;

  return (
    <div className="parking-page">

      <div className="parking-header">
        <div>
          <button className="back-button" onClick={onBack}>
            ← Back to Dashboard
          </button>

          <h1>Parking Management</h1>

          <p>
            Manage parking slots and vehicle assignments in your society.
          </p>
        </div>
      </div>

      <div className="parking-stats">

        <div className="parking-stat-card">
          <div className="parking-stat-icon">🅿️</div>
          <div>
            <span>Total Slots</span>
            <strong>{totalSlots}</strong>
          </div>
        </div>

        <div className="parking-stat-card">
          <div className="parking-stat-icon">🚗</div>
          <div>
            <span>Occupied</span>
            <strong>{occupiedSlots}</strong>
          </div>
        </div>

        <div className="parking-stat-card">
          <div className="parking-stat-icon">✅</div>
          <div>
            <span>Available</span>
            <strong>{availableSlots}</strong>
          </div>
        </div>

        <div className="parking-stat-card">
          <div className="parking-stat-icon">🏍️</div>
          <div>
            <span>Vehicles</span>
            <strong>{carCount + bikeCount}</strong>
          </div>
        </div>

      </div>

      <div className="parking-form-card">

        <h2>➕ Assign Parking Slot</h2>

        <form onSubmit={handleSubmit}>

          <div className="parking-form-grid">

            <div className="form-group">
              <label>Parking Slot</label>

              <input
                type="text"
                name="slot"
                value={formData.slot}
                onChange={handleChange}
                placeholder="e.g. A-03"
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
                placeholder="e.g. A-205"
                required
              />
            </div>

            <div className="form-group">
              <label>Owner Name</label>

              <input
                type="text"
                name="owner"
                value={formData.owner}
                onChange={handleChange}
                placeholder="Enter owner name"
                required
              />
            </div>

            <div className="form-group">
              <label>Vehicle Number</label>

              <input
                type="text"
                name="vehicleNumber"
                value={formData.vehicleNumber}
                onChange={handleChange}
                placeholder="e.g. MH 46 AB 1234"
                required
              />
            </div>

            <div className="form-group">
              <label>Vehicle Type</label>

              <select
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
              >
                <option value="Car">Car</option>
                <option value="Bike">Bike</option>
                <option value="Scooter">Scooter</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Status</label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Assigned">Assigned</option>
                <option value="Reserved">Reserved</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

          </div>

          <button className="assign-button" type="submit">
            Assign Parking
          </button>

        </form>

      </div>

      <div className="parking-list-card">

        <div className="parking-list-header">

          <div>
            <h2>Parking Directory</h2>
            <p>Current parking slot assignments</p>
          </div>

          <div className="parking-filters">

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search parking..."
            />

            <select
              value={filterType}
              onChange={(event) => setFilterType(event.target.value)}
            >
              <option value="All">All Vehicles</option>
              <option value="Car">Car</option>
              <option value="Bike">Bike</option>
              <option value="Scooter">Scooter</option>
              <option value="Other">Other</option>
            </select>

          </div>

        </div>

        <div className="parking-table-wrapper">

          <table className="parking-table">

            <thead>
              <tr>
                <th>Slot</th>
                <th>Flat</th>
                <th>Owner</th>
                <th>Vehicle No.</th>
                <th>Type</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredRecords.length > 0 ? (
                filteredRecords.map((record) => (
                  <tr key={record.id}>

                    <td>
                      <strong>{record.slot}</strong>
                    </td>

                    <td>{record.flat}</td>

                    <td>{record.owner}</td>

                    <td>
                      <span className="vehicle-number">
                        {record.vehicleNumber}
                      </span>
                    </td>

                    <td>
                      <span className="vehicle-type">
                        {record.vehicleType}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`status-badge ${record.status.toLowerCase()}`}
                      >
                        {record.status}
                      </span>
                    </td>

                    <td>
                      <button
                        className="delete-parking-button"
                        onClick={() => handleDelete(record.id)}
                      >
                        🗑️
                      </button>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="no-records">
                    No parking records found.
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

export default Parking;