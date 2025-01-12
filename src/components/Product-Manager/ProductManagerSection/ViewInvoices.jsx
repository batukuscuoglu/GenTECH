import React, { useEffect, useState } from "react";

const ViewInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvoices = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/invoices", {
          credentials: "include", // Include credentials
        });
        if (response.ok) {
          const data = await response.json();
          const detailedInvoices = await Promise.all(
            data.map(async (invoice) => {
              const orderResponse = await fetch(
                `http://localhost:8080/api/orders/${invoice.orderId}`,
                { credentials: "include" }
              );
              if (orderResponse.ok) {
                const orderData = await orderResponse.json();
                return {
                  ...invoice,
                  deliveryStatus: orderData.completed
                    ? "Delivered"
                    : "Pending",
                };
              } else {
                return { ...invoice, deliveryStatus: "Unknown" };
              }
            })
          );
          setInvoices(detailedInvoices);
        } else {
          throw new Error("Failed to fetch invoices.");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-secondary">View Invoices</h2>
      {loading && <p className="text-gray-500">Loading invoices...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && !error && (
        <table className="w-full table-auto text-left border-collapse">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="p-3 border-b">Invoice ID</th>
              <th className="p-3 border-b">Customer Email</th>
              <th className="p-3 border-b">Amount</th>
              <th className="p-3 border-b">Delivery Status</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{invoice.id}</td>
                <td className="p-3">{invoice.email}</td>
                <td className="p-3">${invoice.totalAmount.toFixed(2)}</td>
                <td
                  className={`p-3 ${
                    invoice.deliveryStatus === "Delivered"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {invoice.deliveryStatus}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default ViewInvoices;
