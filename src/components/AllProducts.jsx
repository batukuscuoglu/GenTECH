import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from './Card';
import Navbar from './Navbar/Navbar';
import Footer from './Footer';
import logo from '../assets/logo.png'; // Import the logo

function AllProducts() {
  const [products, setProducts] = useState([]); // Products list
  const [sortOption, setSortOption] = useState('price-asc'); // Default sorting by price (ascending)
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();

  const fetchProducts = async (sortOption) => {
    try {
      setLoading(true); // Start loading
      let endpoint = 'http://localhost:8080/api/product/get-all-products'; // Default endpoint

      // Determine endpoint based on sort option
      if (sortOption === 'price-asc') {
        endpoint = 'http://localhost:8080/api/product/sort-by-price?page=0&size=100&sortDirection=asc';
      } else if (sortOption === 'price-desc') {
        endpoint = 'http://localhost:8080/api/product/sort-by-price?page=0&size=100&sortDirection=desc';
      } else if (sortOption === 'popularity') {
        endpoint = 'http://localhost:8080/api/product/sort-by-popularity?page=0&size=100';
      }

      console.log('Fetching from endpoint:', endpoint); // Debugging
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer <your-token>', // Replace <your-token> with the actual token
        },
        credentials: 'include', // Include cookies for session-based auth
      });

      console.log('Response status:', response.status); // Debugging
      if (!response.ok) {
        throw new Error(`Failed to fetch products. Status: ${response.status}`);
      }

      const data = await response.json();
      const productList = data.content || data; // Adjust based on response structure
      setProducts(productList); // Update products
      setLoading(false); // Stop loading
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.message);
      setLoading(false); // Stop loading even if there is an error
    }
  };

  // Fetch products whenever the sort option changes
  useEffect(() => {
    fetchProducts(sortOption);
  }, [sortOption]);

  const handleSortChange = (e) => {
    setSortOption(e.target.value); // Update sort option based on user selection
  };

  if (loading) {
    return <div className="text-center p-4">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="p-8">
        {/* Sorting Section */}
        <div className="flex justify-end mb-4 mr-4">
          <div className="flex items-center space-x-4">
            <label htmlFor="sort" className="text-lg">Sort By:</label>
            <select
              id="sort"
              value={sortOption}
              onChange={handleSortChange}
              className="border-2 border-primary p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="price-asc">Price (Low to High)</option>
              <option value="price-desc">Price (High to Low)</option>
              <option value="popularity">Popularity</option>
            </select>
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-8 text-center">All Products</h1>
        <div className="flex flex-wrap justify-center gap-4">
          {products.length > 0 ? (
            products.map(item => (
              <Card
                key={item.id}
                to={`/items/${item.id}`}
                cardName={item.title}
                imgSrc={logo} // Use logo as the image
                price={`$${item.basePrice}`}
              />
            ))
          ) : (
            <p className="text-center text-lg">No products available.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AllProducts;
