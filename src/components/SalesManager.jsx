import React from 'react';
import Navbar from './Navbar/Navbar';
import Footer from './Footer';

const SalesManager = () => {
  return (
    <div className="w-full min-h-screen bg-gray-100 text-gray-900">
      {/* Navbar */}
      <Navbar />

      {/* Header */}
      <header className="bg-gray-50 shadow-sm px-8 py-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Sales Manager Dashboard</h1>
          <p className="text-gray-500 mt-2">Manage pricing, invoices, refunds, and revenue insights.</p>
        </div>
      </header>

      {/* Content Section */}
      <main className="container mx-auto p-8 space-y-8">
        {/* Card: Set Product Pricing and Discounts */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-secondary">Set Product Pricing & Discounts</h2>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Product Name"
              className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="number"
              placeholder="Price"
              className="w-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="number"
              placeholder="Discount (%)"
              className="w-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="px-5 py-3 bg-primary text-white rounded-lg hover:bg-secondary">
              Update
            </button>
          </div>
        </section>

        {/* Card: Notify Users About Discounts */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-secondary">Notify Users About Discounts</h2>
          <textarea
            placeholder="Compose email content..."
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            rows="4"
          ></textarea>
          <button className="mt-4 px-5 py-3 bg-primary text-white rounded-lg hover:bg-secondary">
            Send Notification
          </button>
        </section>

        {/* Card: View and Manage Invoices */}
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

        {/* Card: Revenue Analysis */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-secondary">Revenue Analysis</h2>
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
              Calculate
            </button>
          </div>
          <div className="mt-4">
            <p className="text-lg text-gray-600">Profit/Loss: <span className="font-bold text-gray-800">$XXX.XX</span></p>
            <div className="bg-gray-200 h-48 rounded-lg mt-4">
              {/* Placeholder for Revenue Chart */}
              <p className="text-center text-gray-500 pt-20">Revenue chart goes here</p>
            </div>
          </div>
        </section>

        {/* Card: Refund Requests */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-secondary">Evaluate Refund Requests</h2>
          <div>
            {/* Placeholder for refund requests */}
            <p className="text-gray-500">No refund requests at the moment.</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SalesManager;
