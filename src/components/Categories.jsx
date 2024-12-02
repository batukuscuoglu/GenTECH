import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Footer from './Footer';
import Card from './Card';
import logo from '../assets/logo.png';
import mockIMG from '../assets/mockIMG.jpg';
import mockCategory from '../assets/mockCategory.jpg';

function Categories() {
  const [categories, setCategories] = useState([]); // Categories list
  const [selectedCategory, setSelectedCategory] = useState(null); // Selected category
  const [products, setProducts] = useState([]); // Products in the selected category
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const location = useLocation(); // Access state from navigation
  const navigate = useNavigate();

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      setLoading(true); // Start loading
      const response = await fetch('http://localhost:8080/api/product/get-categories', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer <your-token>', // Replace <your-token> with the actual token
        },
        credentials: 'include', // Include cookies for session-based auth
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch categories. Status: ${response.status}`);
      }

      const data = await response.json();
      const activeCategories = data.filter((category) => category.isActive); // Filter active categories
      setCategories(activeCategories); // Update categories state
      setLoading(false); // Stop loading
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError(err.message);
      setLoading(false); // Stop loading even if there's an error
    }
  };

  // Fetch products by category
  const fetchProductsByCategory = async (categoryId) => {
    try {
      setLoading(true); // Start loading
      const response = await fetch(
        `http://localhost:8080/api/product/sort-by-price-and-category?categoryId=${categoryId}&page=0&size=100&sortDirection=asc`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer <your-token>', // Replace <your-token> with the actual token
          },
          credentials: 'include', // Include cookies for session-based auth
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch products. Status: ${response.status}`);
      }

      const data = await response.json();
      setProducts(data.content || []); // Update products state
      setLoading(false); // Stop loading
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.message);
      setLoading(false); // Stop loading even if there's an error
    }
  };

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle category selection from state passed via navigation
  useEffect(() => {
    const state = location.state || {};
    if (state.selectedCategoryId) {
      const category = categories.find((cat) => cat.id === state.selectedCategoryId);
      if (category) {
        setSelectedCategory(category);
        fetchProductsByCategory(state.selectedCategoryId);
      }
    }
  }, [categories, location.state]);

  // Handle category click to fetch products
  const handleCategoryClick = (category) => {
    setSelectedCategory(category); // Set selected category
    fetchProductsByCategory(category.id); // Fetch products for the selected category
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null); // Reset selected category
    setProducts([]); // Clear products
  };

  const handleShowAllProducts = () => {
    navigate('/all-products'); // Navigate to the all-products page
  };

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="p-8">
        {selectedCategory ? (
          <div>
            {/* Breadcrumb */}
            <div className="mb-4 text-lg">
              <span
                onClick={handleBackToCategories}
                className="text-primary cursor-pointer hover:underline"
              >
                Categories
              </span>
              {' > '}
              <span className="font-semibold">{selectedCategory.name}</span>
            </div>

            {/* Display items in the selected category */}
            <h2 className="text-2xl font-semibold mb-4">Items in {selectedCategory.name}</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {products.length > 0 ? (
                products.map((product) => (
                  <Card
                    key={product.id}
                    to={`/items/${product.id}`}
                    cardName={product.title}
                    imgSrc={mockIMG} // Always use logo.png
                    price={`$${product.basePrice}`}
                  />
                ))
              ) : (
                <p className="text-center text-lg">No items found in this category.</p>
              )}
            </div>
          </div>
        ) : (
          <div>
            <h1 className="text-4xl font-bold mb-8 text-center">Categories</h1>
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <div
                  key={category.id}
                  onClick={() => handleCategoryClick(category)}
                  className="cursor-pointer transition-transform transform hover:scale-105 shadow-md rounded-lg overflow-hidden"
                >
                  <img src={mockCategory} alt={category.name} className="w-60 h-40 object-cover" /> {/* Fixed imgSrc to src */}
                  <div className="bg-gray-800 text-white text-center p-2">
                    {category.name}
                  </div>
                </div>
              ))}
            </div>
            {/* Button to show all products */}
            <div className="mt-8 text-center">
              <button
                onClick={handleShowAllProducts}
                className="bg-secondary text-white p-2 rounded-md hover:bg-primary transition-colors"
              >
                Show All Products
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Categories;
