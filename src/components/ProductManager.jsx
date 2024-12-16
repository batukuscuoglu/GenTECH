import React from 'react';
import Navbar from './Navbar/Navbar';
import Footer from './Footer';

const ProductManager = () => {
  return (
    <div className="w-full min-h-screen bg-gray-100 text-gray-900">
      {/* Navbar */}
      <Navbar />

      {/* Header */}
      <header className="bg-gray-50 shadow-sm px-8 py-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Product Manager Dashboard</h1>
          <p className="text-gray-500 mt-2">Add products, manage stock, and oversee deliveries.</p>
        </div>
      </header>

      {/* Content Section */}
      <main className="container mx-auto p-8 space-y-8">
        {/* Card: Add or Remove Products */}
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

        {/* Card: Manage Categories */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-secondary">Manage Categories</h2>
          <p className="text-gray-500">You can add or delete categories here.</p>
        </section>

        {/* Card: Delivery List */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-secondary">Delivery List</h2>
          <table className="w-full table-auto text-left border-collapse">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="p-3 border-b">Delivery ID</th>
                <th className="p-3 border-b">Customer ID</th>
                <th className="p-3 border-b">Product ID</th>
                <th className="p-3 border-b">Status</th>
                <th className="p-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-3">#001</td>
                <td className="p-3">123</td>
                <td className="p-3">P-456</td>
                <td className="p-3 text-green-500">Delivered</td>
                <td className="p-3">
                  <button className="text-primary hover:underline">View</button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProductManager;
