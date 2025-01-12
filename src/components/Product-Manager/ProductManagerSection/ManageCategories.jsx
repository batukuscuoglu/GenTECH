import React from 'react';

const ManageCategories = () => {
  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-secondary">Manage Categories</h2>
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Category Name"
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button className="px-5 py-3 bg-primary text-white rounded-lg hover:bg-secondary">
          Add Category
        </button>
        <button className="px-5 py-3 bg-red-500 text-white rounded-lg hover:bg-red-700">
          Remove Category
        </button>
      </div>
    </section>
  );
};

export default ManageCategories;
