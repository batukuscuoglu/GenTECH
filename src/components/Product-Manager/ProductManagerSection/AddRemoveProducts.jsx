import React from 'react';

const AddRemoveProducts = () => {
  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-secondary">Add or Remove Products</h2>
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Product Name"
          className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <input
          type="number"
          placeholder="Stock Quantity"
          className="w-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button className="px-5 py-3 bg-primary text-white rounded-lg hover:bg-secondary">
          Add Product
        </button>
      </div>
      <button className="mt-4 px-5 py-3 bg-secondary text-white rounded-lg hover:bg-primary">
        Remove Selected Products
      </button>
    </section>
  );
};

export default AddRemoveProducts;
