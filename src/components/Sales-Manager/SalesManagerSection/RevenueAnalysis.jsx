import React from 'react';

const RevenueAnalysis = () => {
  return (
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
          <p className="text-center text-gray-500 pt-20">Revenue chart goes here</p>
        </div>
      </div>
    </section>
  );
};

export default RevenueAnalysis;
