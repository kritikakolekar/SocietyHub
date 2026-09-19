import "./ResidentProfile.css";

function ResidentProfile({ resident, onBack }) {
  return (
    <div className="resident-profile-page">

      <div className="resident-profile-header">

        <button
          className="profile-back-button"
          onClick={onBack}
        >
          ← Back to Dashboard
        </button>

        <h1>My Profile</h1>

        <p>
          View your personal and society membership details.
        </p>

      </div>

      <div className="resident-profile-card">

        <div className="profile-main">

          <div className="profile-large-avatar">
            {resident.name.charAt(0)}
          </div>

          <div>
            <h2>{resident.name}</h2>
            <p>Society Resident</p>
          </div>

        </div>

        <div className="profile-details">

          <div className="profile-detail">
            <span>👤 Full Name</span>
            <strong>{resident.name}</strong>
          </div>

          <div className="profile-detail">
            <span>🏠 Flat Number</span>
            <strong>{resident.flat}</strong>
          </div>

          <div className="profile-detail">
            <span>🏢 Wing</span>
            <strong>{resident.wing}</strong>
          </div>

          <div className="profile-detail">
            <span>📱 Phone Number</span>
            <strong>{resident.phone}</strong>
          </div>

          <div className="profile-detail">
            <span>🔑 Resident Username</span>
            <strong>{resident.username}</strong>
          </div>

          <div className="profile-detail">
            <span>🟢 Account Status</span>
            <strong className="active-status">
              Active
            </strong>
          </div>

        </div>

      </div>

    </div>
  );
}

export default ResidentProfile;