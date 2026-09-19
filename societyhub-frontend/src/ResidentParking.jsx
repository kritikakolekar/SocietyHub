import "./ResidentParking.css";

function ResidentParking({ resident, onBack }) {
  const parking = {
    slot: "A-01",
    vehicleNumber: "MH 46 AB 1234",
    vehicleType: "Car",
    status: "Assigned",
  };

  return (
    <div className="resident-parking-page">

      <div className="resident-parking-header">

        <button
          className="parking-back-button"
          onClick={onBack}
        >
          ← Back to Dashboard
        </button>

        <div>
          <span className="parking-label">
            PARKING MANAGEMENT
          </span>

          <h1>My Parking</h1>

          <p>
            View your assigned parking slot and vehicle information.
          </p>
        </div>

      </div>

      <div className="resident-parking-summary">

        <div className="parking-summary-card">
          <span>Assigned Slot</span>
          <strong>{parking.slot}</strong>
        </div>

        <div className="parking-summary-card">
          <span>Vehicle</span>
          <strong>{parking.vehicleType}</strong>
        </div>

        <div className="parking-summary-card">
          <span>Status</span>
          <strong>{parking.status}</strong>
        </div>

      </div>

      <div className="resident-parking-card">

        <div className="resident-parking-card-header">
          <div>
            <h2>Parking Details</h2>
            <p>Your currently assigned parking information</p>
          </div>

          <span className="parking-status-badge">
            Assigned
          </span>
        </div>

        <div className="parking-details-grid">

          <div className="parking-detail">
            <span>Resident Name</span>
            <strong>{resident.name}</strong>
          </div>

          <div className="parking-detail">
            <span>Flat Number</span>
            <strong>{resident.flat}</strong>
          </div>

          <div className="parking-detail">
            <span>Parking Slot</span>
            <strong>{parking.slot}</strong>
          </div>

          <div className="parking-detail">
            <span>Vehicle Number</span>
            <strong>{parking.vehicleNumber}</strong>
          </div>

          <div className="parking-detail">
            <span>Vehicle Type</span>
            <strong>{parking.vehicleType}</strong>
          </div>

          <div className="parking-detail">
            <span>Assignment Status</span>
            <strong>{parking.status}</strong>
          </div>

        </div>

      </div>

    </div>
  );
}

export default ResidentParking;