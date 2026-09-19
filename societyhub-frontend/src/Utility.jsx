import { useEffect, useState } from "react";
import "./Utility.css";

function Utility({ onBack }) {
  const [utilities, setUtilities] = useState([]);

useEffect(() => {
  fetch("http://localhost:8080/societyhub/api/utilities")
    .then((response) => response.json())
    .then((data) => {
      const formattedUtilities = data.map((item) => ({
        id: item.id,
        month: item.month,
        electricityUnits: Number(item.electricityUnits),
        electricityBill: Number(item.electricityBill),
        waterBill: Number(item.waterBill),
        otherExpenses: Number(item.otherExpenses),
        totalAmount: Number(item.totalAmount),
        paymentStatus: item.paymentStatus,
      }));

      setUtilities(formattedUtilities);
    })
    .catch((error) => {
      console.error("Error loading utilities:", error);
    });
}, []);

  const [formData, setFormData] = useState({
    month: "",
    year: "",
    electricityUnits: "",
    electricityBill: "",
    waterBill: "",
    otherExpenses: "",
    paymentStatus: "Pending",
  });

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const electricityBill =
      Number(formData.electricityBill) || 0;

    const waterBill =
      Number(formData.waterBill) || 0;

    const otherExpenses =
      Number(formData.otherExpenses) || 0;

    const totalAmount =
      electricityBill +
      waterBill +
      otherExpenses;

    const newUtility = {
      id: Date.now(),
      ...formData,
      month: `${formData.month} ${formData.year}`,
      electricityUnits:
        Number(formData.electricityUnits) || 0,
      electricityBill,
      waterBill,
      otherExpenses,
      totalAmount,
    };

    setUtilities([...utilities, newUtility]);

    setFormData({
      month: "",
      year: "",
      electricityUnits: "",
      electricityBill: "",
      waterBill: "",
      otherExpenses: "",
      paymentStatus: "Pending",
    });
  };

  const handleDelete = (id) => {
    setUtilities(
      utilities.filter(
        (utility) => utility.id !== id
      )
    );
  };

  const filteredUtilities = utilities.filter(
    (utility) => {
      const matchesSearch =
        utility.month
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        filterStatus === "All" ||
        utility.paymentStatus === filterStatus;

      return matchesSearch && matchesStatus;
    }
  );

  const totalRecords = utilities.length;

  const paidRecords = utilities.filter(
    (utility) =>
      utility.paymentStatus === "Paid"
  ).length;

  const pendingRecords = utilities.filter(
    (utility) =>
      utility.paymentStatus === "Pending"
  ).length;

  const totalExpenses = utilities.reduce(
    (sum, utility) =>
      sum + Number(utility.totalAmount),
    0
  );

  return (
    <div className="utility-page">

      <div className="utility-header">

        <div>
          <button
            className="back-button"
            onClick={onBack}
          >
            ← Back to Dashboard
          </button>

          <h1>Utility / Electricity Tracking</h1>

          <p>
            Track monthly electricity, water and
            other society expenses.
          </p>
        </div>

      </div>

      <div className="utility-stats">

        <div className="utility-stat-card">
          <div className="utility-stat-icon">
            ⚡
          </div>

          <div>
            <span>Total Records</span>
            <strong>{totalRecords}</strong>
          </div>
        </div>

        <div className="utility-stat-card">
          <div className="utility-stat-icon">
            ✅
          </div>

          <div>
            <span>Paid</span>
            <strong>{paidRecords}</strong>
          </div>
        </div>

        <div className="utility-stat-card">
          <div className="utility-stat-icon">
            ⏳
          </div>

          <div>
            <span>Pending</span>
            <strong>{pendingRecords}</strong>
          </div>
        </div>

        <div className="utility-stat-card">
          <div className="utility-stat-icon">
            💰
          </div>

          <div>
            <span>Total Expenses</span>
            <strong>
              ₹{totalExpenses.toLocaleString("en-IN")}
            </strong>
          </div>
        </div>

      </div>

      <div className="utility-form-card">

        <h2>➕ Add Monthly Utility Record</h2>

        <form onSubmit={handleSubmit}>

          <div className="utility-form-grid">

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
  <label>Year</label>

  <input
    type="number"
    name="year"
    value={formData.year}
    onChange={handleChange}
    placeholder="Enter year"
    min="1900"
    max="2100"
    required
  />
</div>

            <div className="form-group">
              <label>Electricity Units</label>

              <input
                type="number"
                name="electricityUnits"
                value={formData.electricityUnits}
                onChange={handleChange}
                placeholder="e.g. 12500"
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label>Electricity Bill (₹)</label>

              <input
                type="number"
                name="electricityBill"
                value={formData.electricityBill}
                onChange={handleChange}
                placeholder="Enter amount"
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label>Water Bill (₹)</label>

              <input
                type="number"
                name="waterBill"
                value={formData.waterBill}
                onChange={handleChange}
                placeholder="Enter amount"
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label>Other Expenses (₹)</label>

              <input
                type="number"
                name="otherExpenses"
                value={formData.otherExpenses}
                onChange={handleChange}
                placeholder="Enter amount"
                min="0"
              />
            </div>

            <div className="form-group">
              <label>Payment Status</label>

              <select
                name="paymentStatus"
                value={formData.paymentStatus}
                onChange={handleChange}
              >
                <option value="Paid">
                  Paid
                </option>

                <option value="Pending">
                  Pending
                </option>
              </select>
            </div>

          </div>

          <button
            className="add-utility-button"
            type="submit"
          >
            Add Utility Record
          </button>

        </form>

      </div>

      <div className="utility-list-card">

        <div className="utility-list-header">

          <div>
            <h2>Monthly Utility Records</h2>

            <p>
              View electricity and other society
              expenses by month.
            </p>
          </div>

          <div className="utility-filters">

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search month..."
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

              <option value="Paid">
                Paid
              </option>

              <option value="Pending">
                Pending
              </option>
            </select>

          </div>

        </div>

        <div className="utility-table-wrapper">

          <table className="utility-table">

            <thead>
              <tr>
                <th>Month</th>
                <th>Units</th>
                <th>Electricity</th>
                <th>Water</th>
                <th>Other</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredUtilities.length > 0 ? (
                filteredUtilities.map(
                  (utility) => (
                    <tr key={utility.id}>

                      <td>
                        <strong>
                          {utility.month}
                        </strong>
                      </td>

                      <td>
                        {Number(
                          utility.electricityUnits
                        ).toLocaleString("en-IN")}
                      </td>

                      <td>
                        ₹
                        {Number(
                          utility.electricityBill
                        ).toLocaleString("en-IN")}
                      </td>

                      <td>
                        ₹
                        {Number(
                          utility.waterBill
                        ).toLocaleString("en-IN")}
                      </td>

                      <td>
                        ₹
                        {Number(
                          utility.otherExpenses
                        ).toLocaleString("en-IN")}
                      </td>

                      <td>
                        <strong>
                          ₹
                          {Number(
                            utility.totalAmount
                          ).toLocaleString("en-IN")}
                        </strong>
                      </td>

                      <td>
                        <span
                          className={`utility-status ${utility.paymentStatus.toLowerCase()}`}
                        >
                          {utility.paymentStatus}
                        </span>
                      </td>

                      <td>
                        <button
                          className="delete-utility-button"
                          onClick={() =>
                            handleDelete(
                              utility.id
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
                    colSpan="8"
                    className="no-utilities"
                  >
                    No utility records found.
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

export default Utility;