import React from 'react';

const ViewInvoices = () => {
  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-secondary">View Invoices</h2>
      <table className="w-full table-auto text-left border-collapse">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="p-3 border-b">Invoice ID</th>
            <th className="p-3 border-b">Customer ID</th>
            <th className="p-3 border-b">Amount</th>
            <th className="p-3 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b hover:bg-gray-50">
            <td className="p-3">INV-123</td>
            <td className="p-3">CUST-456</td>
            <td className="p-3">$500.00</td>
            <td className="p-3 text-green-500">Paid</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default ViewInvoices;
