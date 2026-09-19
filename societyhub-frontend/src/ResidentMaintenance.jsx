import { useEffect, useState } from "react";
import "./ResidentMaintenance.css";

function ResidentMaintenance({ resident, onBack }) {
   
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");

  const [payments, setPayments] = useState([]);
  useEffect(() => {
  fetch("http://localhost:8080/societyhub/api/maintenance")
    .then((response) => response.json())
    .then((data) => {
      const residentPayments = data
        .filter((item) => item.flatNumber === resident.flat)
        .map((item) => ({
          id: item.id,
          month: item.month + " 2026",
          amount: Number(item.amount),
          status: item.paymentStatus,
          dueDate: "10 " + item.month + " 2026",
        }));

      setPayments(residentPayments);
    })
    .catch((error) => {
      console.error("Error loading maintenance:", error);
    });
}, [resident.flat]);

  return (
    <div className="resident-maintenance-page">

      <div className="resident-maintenance-header">

        <button
          className="maintenance-back-button"
          onClick={onBack}
        >
          ← Back to Dashboard
        </button>

        <h1>My Maintenance</h1>

        <p>
          View your monthly maintenance charges and payment
          history.
        </p>

      </div>

      <div className="maintenance-summary">

        <div className="maintenance-summary-card">
          <span>Current Due</span>
          <strong>₹2,500</strong>
          <small>September 2026</small>
        </div>

        <div className="maintenance-summary-card">
          <span>Total Paid</span>
          <strong>₹5,000</strong>
          <small>Last 2 months</small>
        </div>

        <div className="maintenance-summary-card">
          <span>Flat</span>
          <strong>{resident.flat}</strong>
          <small>{resident.wing}</small>
        </div>

      </div>

      <div className="maintenance-history-card">

        <div className="maintenance-history-header">
          <div>
            <h2>Payment History</h2>
            <p>Your recent maintenance records</p>
          </div>
        </div>

        <div className="maintenance-table-wrapper">

          <table className="maintenance-table">

            <thead>
              <tr>
                <th>Month</th>
                <th>Amount</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id}>

                  <td>
                    <strong>{payment.month}</strong>
                  </td>

                  <td>
                    ₹{payment.amount.toLocaleString("en-IN")}
                  </td>

                  <td>
                    {payment.dueDate}
                  </td>

                  <td>
                    <span
                      className={`maintenance-status ${payment.status.toLowerCase()}`}
                    >
                      {payment.status}
                    </span>
                  </td>

                  <td>
                    {payment.status === "Pending" ? (
                      <button
  className="pay-maintenance-button"
  onClick={() => setSelectedPayment(payment)}
>
  Pay Now
</button>
                    ) : (
                      <button className="receipt-button">
                        View Receipt
                      </button>
                    )}
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>

     </div>

      {selectedPayment && (
        <div className="payment-modal-overlay">

          <div className="payment-modal">

            <button
              className="payment-close-button"
              onClick={() => setSelectedPayment(null)}
            >
              ×
            </button>

            <h2>Pay Maintenance</h2>

            <p className="payment-subtitle">
              Complete your maintenance payment securely.
            </p>

            <div className="payment-summary">
              <div>
                <span>Month</span>
                <strong>{selectedPayment.month}</strong>
              </div>

              <div>
                <span>Flat</span>
                <strong>{resident.flat}</strong>
              </div>

              <div>
                <span>Amount</span>
                <strong>
                  ₹{selectedPayment.amount.toLocaleString("en-IN")}
                </strong>
              </div>
            </div>

            <h3>Select Payment Method</h3>

           <button
  className={`payment-method-button ${
    paymentMethod === "UPI" ? "selected" : ""
  }`}
  onClick={() => setPaymentMethod("UPI")}
>
  📱 UPI
</button>
            <button
  className={`payment-method-button ${
    paymentMethod === "CARD" ? "selected" : ""
  }`}
  onClick={() => setPaymentMethod("CARD")}
>
  💳 Debit / Credit Card
</button>

           <button
  className={`payment-method-button ${
    paymentMethod === "NET_BANKING" ? "selected" : ""
  }`}
  onClick={() => setPaymentMethod("NET_BANKING")}
>
  🏦 Net Banking
</button>

            <button
              className="confirm-payment-button"
              onClick={() => {
                alert("Payment successful!");
                setSelectedPayment(null);
              }}
            >
              Confirm Payment
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default ResidentMaintenance;