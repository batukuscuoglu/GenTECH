import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import categoryData from '../mockData/categoryData';
import itemData from '../mockData/itemdata';
import Card from './Card';
import Navbar from './Navbar/Navbar';
import Footer from './Footer';

function Categories() {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize navigate
  const [selectedCategory, setSelectedCategory] = useState(location.state?.selectedCategory || null);

  useEffect(() => {
    if (location.state?.selectedCategory) {
      setSelectedCategory(location.state.selectedCategory);
    }
  }, [location.state]);

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  const handleShowAllProducts = () => {
    navigate('/all-products'); // Navigate to the all-products page
  };

  const filteredItems = selectedCategory
    ? itemData.filter(item => item.itemCategory === selectedCategory)
    : [];

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
              <span className="font-semibold">{selectedCategory}</span>
            </div>

            {/* Display items in the selected category */}
            <h2 className="text-2xl font-semibold mb-4">Items in {selectedCategory}</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {filteredItems.length > 0 ? (
                filteredItems.map(item => (
                  <Card 
                    key={item.id}
                    to={`/items/${item.id}`}
                    cardName={item.cardName}
                    imgSrc={item.imgSrc}
                    price={item.price}
                  />
                ))
              ) : (
                <p className="text-center text-lg">No items found in this category.</p>
              )}
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-4xl font-bold mb-8 text-center">Categories</h1>
            <div className="flex flex-wrap justify-center gap-4">
              {categoryData.map(category => (
                <div
                  key={category.id}
                  onClick={() => handleCategoryClick(category.categoryName)}
                  className="cursor-pointer transition-transform transform hover:scale-105 shadow-md rounded-lg overflow-hidden"
                >
                  <img src={category.imgSrc} alt={category.categoryName} className="w-60 h-40 object-cover" />
                  <div className="bg-gray-800 text-white text-center p-2">
                    {category.categoryName}
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
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Categories;
