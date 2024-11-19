import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import itemData from '../mockData/itemdata';
import commentsData from '../mockData/commentsData'; 
import Footer from './Footer';
import { FaStar, FaRegStar } from 'react-icons/fa'; 

function Items() {
  const { id } = useParams();
  const item = itemData.find((item) => item.id === parseInt(id));
  const commentsForItem =
    commentsData.find((data) => data.itemId === parseInt(id))?.comments.filter((comment) => comment.approved) || [];
  const [quantity, setQuantity] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (item && quantity > item.stock) {
      setQuantity(item.stock);
    }
  }, [item]);

  const toggleDropdown = () => {
    if (item?.stock > 0) {
      setDropdownOpen(!dropdownOpen);
    }
  };

  const handleQuantityChange = (value) => {
    if (value <= item.stock) {
      setQuantity(value);
    }
    setDropdownOpen(false);
  };

  const handleCategoryClick = () => {
    navigate('/categories', { state: { selectedCategory: item.itemCategory } });
  };

  if (!item) {
    return <div className="text-center p-4">Item not found.</div>;
  }

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

            {item.stock > 0 ? (
              <>
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
                      {[...Array(item.stock).keys()].map((_, index) => {
                        const value = index + 1;
                        return (
                          <div
                            key={value}
                            onClick={() => handleQuantityChange(value)}
                            className={`cursor-pointer p-2 hover:bg-gray-200 text-center ${
                              value === quantity ? 'bg-primary text-white font-bold rounded-md' : ''
                            }`}
                          >
                            {value}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <button className="w-full bg-primary py-3 rounded-md text-white transition-all hover:bg-white hover:text-primary hover:border-2 hover:border-primary">
                  Add to Cart
                </button>
              </>
            ) : (
              <div className="text-center mt-4">
                <p className="text-red-500 text-lg font-semibold mb-2">Out of Stock</p>
                <button
                  className="w-full bg-gray-400 py-3 rounded-md text-white cursor-not-allowed"
                  disabled
                >
                  Add to Cart
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Comment Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-4">Comments</h2>
          <div className="space-y-4">
            {commentsForItem.map((comment) => (
              <div
                key={comment.id}
                className="p-4 border-2 rounded-md shadow-sm border-primary"
              >
                <p className="text-lg font-semibold">{comment.username}</p>
                <div className="flex items-center mb-2">
                  {/* Render stars based on rating */}
                  {Array(5)
                    .fill(0)
                    .map((_, index) =>
                      index < comment.rating ? (
                        <FaStar key={index} className="text-primary mr-1" />
                      ) : (
                        <FaRegStar key={index} className="text-gray-400 mr-1" />
                      )
                    )}
                </div>
                <p>{comment.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Items;
