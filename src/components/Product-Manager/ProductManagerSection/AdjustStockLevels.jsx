import React from 'react';

const AdjustStockLevels = () => {
  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-secondary">Adjust Stock Levels</h2>
      <div className="flex gap-4 items-center">
        <input
          type="text"
          placeholder="Product ID"
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <input
          type="number"
          placeholder="Stock Quantity"
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button className="px-5 py-3 bg-primary text-white rounded-lg hover:bg-secondary">
          Update Stock
        </button>
      </div>
    </section>
  );
};

export default AdjustStockLevels;
