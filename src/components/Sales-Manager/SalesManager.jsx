import React from 'react';
import Navbar from '../Navbar/Navbar.jsx';
import Footer from '../Footer.jsx';
import SetProductPricing from './SalesManagerSection/SetProductPricing';
import NotifyUsers from './SalesManagerSection/NotifyUsers';
import ManageInvoices from './SalesManagerSection/ManageInvoices';
import RevenueAnalysis from './SalesManagerSection/RevenueAnalysis';
import RefundRequests from './SalesManagerSection/RefundRequests';

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
        <SetProductPricing />
        <NotifyUsers />
        <ManageInvoices />
        <RevenueAnalysis />
        <RefundRequests />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SalesManager;
