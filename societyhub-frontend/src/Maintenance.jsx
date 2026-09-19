import { useEffect, useState } from "react";
import "./Maintenance.css";

function Maintenance({onBack}) {
  const [maintenance, setMaintenance] = useState([]);
  useEffect(() => {
  fetch("http://localhost:8080/societyhub/api/maintenance")
    .then((response) => response.json())
    .then((data) => {
      const formattedMaintenance = data.map((item) => ({
        id: item.id,
        residentName: item.residentName,
        flatNumber: item.flatNumber,
        month: item.month,
        amount: item.amount,
        paymentStatus: item.paymentStatus,
        paymentDate:
          item.paymentDate === "null"
            ? ""
            : item.paymentDate,
      }));

      setMaintenance(formattedMaintenance);
    })
    .catch((error) => {
      console.error("Error loading maintenance:", error);
    });
}, []);

  const [formData, setFormData] = useState({
    residentName: "",
    flatNumber: "",
    month: "",
    amount: "",
    paymentStatus: "Pending",
    paymentDate: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setMaintenance([
      ...maintenance,
      {
        id: Date.now(),
        ...formData,
      },
    ]);

    setFormData({
      residentName: "",
      flatNumber: "",
      month: "",
      amount: "",
      paymentStatus: "Pending",
      paymentDate: "",
    });
  };

  return (
    <div className="maintenance-page">

      <div className="page-header">
        <button
  className="back-button"
  onClick={onBack}
>
  ← Back to Dashboard
</button>
        <div>
          <p className="page-label">SOCIETY FINANCE</p>
          <h1>Maintenance Management</h1>
          <p>
            Manage monthly maintenance payments and payment status.
          </p>
        </div>
      </div>

      <div className="maintenance-layout">

        <div className="maintenance-form-card">

          <div className="card-header">
            <h2>Add Maintenance</h2>
            <span>+</span>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Resident Name</label>
              <input
                type="text"
                name="residentName"
                value={formData.residentName}
                onChange={handleChange}
                placeholder="Enter resident name"
                required
              />
            </div>

            <div className="form-group">
              <label>Flat Number</label>
              <input
                type="text"
                name="flatNumber"
                value={formData.flatNumber}
                onChange={handleChange}
                placeholder="Example: A-101"
                required
              />
            </div>

            <div className="form-row">

              <div className="form-group">
                <label>Month</label>
                <select
                  name="month"
                  value={formData.month}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select month</option>
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                </select>
              </div>

              <div className="form-group">
                <label>Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="₹ Amount"
                  min="0"
                  required
                />
              </div>

            </div>

            <div className="form-group">
              <label>Payment Status</label>

              <select
                name="paymentStatus"
                value={formData.paymentStatus}
                onChange={handleChange}
              >
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
              </select>
            </div>

            <div className="form-group">
              <label>Payment Date</label>
              <input
                type="date"
                name="paymentDate"
                value={formData.paymentDate}
                onChange={handleChange}
              />
            </div>

            <button className="save-button" type="submit">
              + Add Maintenance
            </button>

          </form>

        </div>

        <div className="maintenance-table-card">

          <div className="card-header table-header">
            <div>
              <h2>Maintenance Records</h2>
              <p>Monthly payment records</p>
            </div>

            <span className="record-count">
              {maintenance.length} Records
            </span>
          </div>

          {maintenance.length === 0 ? (

            <div className="empty-maintenance">

              <div className="empty-maintenance-icon">
                💰
              </div>

              <h3>No maintenance records</h3>

              <p>
                Add a maintenance payment using the form.
              </p>

            </div>

          ) : (

            <div className="table-wrapper">

              <table>

                <thead>
                  <tr>
                    <th>Resident</th>
                    <th>Flat</th>
                    <th>Month</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Payment Date</th>
                  </tr>
                </thead>

                <tbody>

                  {maintenance.map((item) => (

                    <tr key={item.id}>

                      <td>
                        <strong>{item.residentName}</strong>
                      </td>

                      <td>{item.flatNumber}</td>

                      <td>{item.month}</td>

                      <td>₹{item.amount}</td>

                      <td>
                        <span
                          className={`status-badge ${
                            item.paymentStatus === "Paid"
                              ? "paid"
                              : "pending"
                          }`}
                        >
                          {item.paymentStatus}
                        </span>
                      </td>

                      <td>
                        {item.paymentDate || "-"}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default Maintenance;