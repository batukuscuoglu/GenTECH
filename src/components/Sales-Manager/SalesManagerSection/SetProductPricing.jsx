import React from 'react';

const SetProductPricing = () => {
  return (
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
  );
};

export default SetProductPricing;
