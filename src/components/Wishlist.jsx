import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa'; // Import like icons
import Navbar from './Navbar/Navbar';
import Footer from './Footer';
import mockIMG from '../assets/mockIMG.jpg'; // Placeholder image for items

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch wishlist items (currently mocked; backend logic can be added later)
  const fetchWishlist = async () => {
    setLoading(true);
    try {
      // Simulate a fetch request; replace this with actual API logic
      const mockData = [
        {
          productId: 1,
          title: 'Sample Product 1',
          price: 49.99,
          image: mockIMG,
          liked: true, // Initial liked state
        },
        {
          productId: 2,
          title: 'Sample Product 2',
          price: 79.99,
          image: mockIMG,
          liked: true, // Initial liked state
        },
      ];
      setWishlistItems(mockData);
      setError(null);
    } catch (err) {
      console.error('Error fetching wishlist:', err.message);
      setError('Failed to load wishlist. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Toggle the liked state of an item
  const toggleLike = (productId) => {
    const updatedWishlist = wishlistItems.map((item) =>
      item.productId === productId ? { ...item, liked: !item.liked } : item
    );
    setWishlistItems(updatedWishlist);
    // Backend update logic for like state can be added here
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6">Your Wishlist</h1>
        {loading ? (
          <p className="text-center text-xl">Loading wishlist...</p>
        ) : error ? (
          <p className="text-center text-xl text-gray-500">{error}</p>
        ) : wishlistItems.length === 0 ? (
          <p className="text-center text-xl text-gray-500">Your wishlist is currently empty.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {wishlistItems.map((item) => (
              <div
                key={item.productId}
                className="flex items-center border-b pb-4 mb-4 border-gray-300"
              >
                <Link to={`/items/${item.productId}`} className="mr-4">
                  <img
                    src={item.image || mockIMG}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                </Link>
                <div className="flex-1">
                  <Link to={`/items/${item.productId}`} className="block">
                    <h2 className="text-xl font-semibold hover:underline">{item.title}</h2>
                  </Link>
                  <p className="text-gray-500">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex flex-col items-end">
                  <button
                    onClick={() => toggleLike(item.productId)}
                    className="text-xl hover:scale-110 transition-transform duration-200"
                  >
                    {item.liked ? (
                      <FaHeart className="text-primary" />
                    ) : (
                      <FaRegHeart className="text-secondary" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default WishlistPage;
