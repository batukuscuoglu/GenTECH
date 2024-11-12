import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import itemData from '../mockData/itemdata';
import Footer from './Footer';

function Items() {
  const { id } = useParams();
  const item = itemData.find((item) => item.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleQuantityChange = (value) => {
    setQuantity(value);
    setDropdownOpen(false);
  };

  if (!item) {
    return <div className="text-center p-4">Item not found.</div>;
  }

  const handleCategoryClick = () => {
    navigate('/categories', { state: { selectedCategory: item.itemCategory } });
  };

  return (
    <div>
      <Navbar />
      <div className="p-8">
        {/* Breadcrumb */}
        <div className="mb-4 text-lg">
          <span
            onClick={handleCategoryClick}
            className="text-primary cursor-pointer hover:underline"
          >
            {item.itemCategory}
          </span>
          {' > '}
          <span className="font-semibold">{item.cardName}</span>
        </div>

        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 flex justify-center mb-4 md:mb-0">
            <img src={item.imgSrc} alt={item.cardName} className="w-full max-w-md rounded-lg" />
          </div>

          <div className="md:w-1/2 flex flex-col p-4">
            <h1 className="text-3xl font-bold mb-2">{item.cardName}</h1>
            <p className="text-xl mb-2">{item.price}</p>
            <p className="text-lg mb-4">{item.description}</p>

            {/* Quantity Selector Dropdown */}
            <div className="relative mb-4 w-40">
              <button
                onClick={toggleDropdown}
                className="w-full p-2 border rounded-md bg-white flex items-center justify-between"
              >
                <span>Quantity:</span> <span className="ml-1 font-semibold">{quantity}</span>
              </button>
              {dropdownOpen && (
                <div className="absolute w-full border rounded-md bg-white shadow-lg z-10 mt-1 max-h-40 overflow-y-auto">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20].map((value) => (
                    <div
                      key={value}
                      onClick={() => handleQuantityChange(value)}
                      className={`cursor-pointer p-2 hover:bg-gray-200 text-center ${
                        value === quantity ? 'bg-primary text-white font-bold rounded-md' : ''
                      }`}
                    >
                      {value}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button className="w-full bg-primary py-3 rounded-md text-white transition-all hover:bg-white hover:text-primary hover:border-2 hover:border-primary">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Items;
