import React from 'react';

const ManageInvoices = () => {
  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-secondary">View and Manage Invoices</h2>
      <div className="flex gap-4">
        <input
          type="date"
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <input
          type="date"
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button className="px-5 py-3 bg-primary text-white rounded-lg hover:bg-secondary">
          Filter
        </button>
      </div>
      <button className="mt-4 px-5 py-3 bg-secondary text-white rounded-lg hover:bg-primary">
        Print or Save PDF
      </button>
    </section>
  );
};

export default ManageInvoices;
