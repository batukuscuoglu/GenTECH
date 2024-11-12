import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import itemData from '../mockData/itemdata';
import Card from './Card';
import Navbar from './Navbar/Navbar';
import Footer from './Footer';

function AllProducts() {
  const [sortOption, setSortOption] = useState('price'); // Default sorting by price
  const navigate = useNavigate();

  // Function to convert price string to numeric value
  const parsePrice = (priceString) => {
    return parseFloat(priceString.replace('$', '').replace(',', '')); // Remove "$" and commas, convert to float
  };

  // Sort products by price or popularity
  const sortItems = (items, option) => {
    if (option === 'price') {
      // Sorting by price (ascending)
      return items.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    }
    if (option === 'popularity') {
      // Sorting by popularity (alphabetically)
      return items.sort((a, b) => a.cardName.localeCompare(b.cardName));
    }
    return items;
  };

  const sortedItems = sortItems([...itemData], sortOption); // Clone itemData to avoid mutating the original data

  const handleSortChange = (e) => {
    setSortOption(e.target.value); // Update sort option based on user selection
  };

  return (
    <div>
      <Navbar />
      <div className="p-8">
        {/* Sorting Section */}
        <div className="flex justify-end mb-4 mr-4"> {/* Added mr-4 for right margin */}
          <div className="flex items-center space-x-4">
            <label htmlFor="sort" className="text-lg">Sort By:</label>
            <select 
              id="sort"
              value={sortOption}
              onChange={handleSortChange}
              className="border-2 border-primary p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="price">Price</option>
              <option value="popularity">Popularity</option>
            </select>
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-8 text-center">All Products</h1>
        <div className="flex flex-wrap justify-center gap-4">
          {sortedItems.length > 0 ? (
            sortedItems.map(item => (
              <Card
                key={item.id}
                to={`/items/${item.id}`}
                cardName={item.cardName}
                imgSrc={item.imgSrc}
                price={item.price}
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
