import React from 'react';
import Navbar from '../Navbar/Navbar.jsx';
import Footer from '../Footer.jsx';
import AddRemoveProducts from './ProductManagerSection/AddRemoveProducts';
import ManageCategories from './ProductManagerSection/ManageCategories';
import DeliveryList from './ProductManagerSection/DeliveryList';

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
        <AddRemoveProducts />
        <ManageCategories />
        <DeliveryList />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProductManager;
