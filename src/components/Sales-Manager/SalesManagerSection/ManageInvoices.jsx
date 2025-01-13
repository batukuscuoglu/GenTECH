import React, { useState } from "react";

const ViewInvoices = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch invoices based on start and end date
  const fetchInvoices = async () => {
    if (!startDate || !endDate) {
      alert("Please provide both start and end dates.");
      return;
    }

    // Adjust endDate to include the last day
    const adjustedEndDate = new Date(endDate);
    adjustedEndDate.setDate(adjustedEndDate.getDate() + 1); // Add 1 day to make endDate inclusive
    const formattedEndDate = adjustedEndDate.toISOString().split("T")[0];

    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/api/sm/invoices?startDate=${startDate}&endDate=${formattedEndDate}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Include credentials
        }
      );
      if (response.ok) {
        const data = await response.json();
        setInvoices(data || []); // Ensure the data is an array or fallback to an empty array
      } else {
        alert("Failed to fetch invoices.");
        setInvoices([]);
      }
    } catch (error) {
      console.error("Error fetching invoices:", error);
      setInvoices([]);
    } finally {
      setLoading(false);
    }
  };

  // Download a specific invoice
  const downloadInvoice = async (invoiceId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/sm/invoices/${invoiceId}/download`,
        {
          method: "GET",
          credentials: "include", // Include credentials
        }
      );
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `invoice-${invoiceId}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else {
        alert("Failed to download the invoice.");
      }
    } catch (error) {
      console.error("Error downloading invoice:", error);
    }
  };

  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-secondary">
        View and Manage Invoices
      </h2>

      {/* Date Inputs */}
      <div className="flex items-center gap-4 mb-4">
        <input
          type="date"
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button
          onClick={fetchInvoices}
          className="px-5 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-all"
          disabled={loading}
        >
          {loading ? "Loading..." : "Filter"}
        </button>
      </div>

      {/* Invoices Table */}
      {invoices && invoices.length > 0 ? (
        <table className="w-full table-auto border-collapse text-left">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-3 border">Invoice ID</th>
              <th className="p-3 border">Order ID</th>
              <th className="p-3 border">Customer Email</th>
              <th className="p-3 border">Invoice Date</th>
              <th className="p-3 border">Total Amount</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{invoice.id}</td>
                <td className="p-3">{invoice.orderId}</td>
                <td className="p-3">{invoice.email}</td>
                <td className="p-3">
                  {new Date(invoice.invoiceDate).toLocaleDateString()}
                </td>
                <td className="p-3">${invoice.totalAmount.toFixed(2)}</td>
                <td className="p-3">
                  <button
                    onClick={() => downloadInvoice(invoice.id)}
                    className="text-primary border border-primary px-3 py-2 rounded-lg hover:bg-primary hover:text-white transition-all"
                  >
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">No invoices found for the selected dates.</p>
      )}
    </section>
  );
};

export default ViewInvoices;
