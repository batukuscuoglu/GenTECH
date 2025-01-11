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

  // Fetch product details for the wishlist
  const fetchProductDetails = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/product/${productId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer YOUR_API_TOKEN_HERE', // Replace with actual token
          },
          credentials: 'include',
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch product details for ID: ${productId}`);
      }

      const productData = await response.json();
      return {
        id: productData.id,
        title: productData.title,
        price: productData.basePrice,
        image: productData.image ? `data:image/jpeg;base64,${productData.image}` : mockIMG,
        liked: true, // Default liked state
      };
    } catch (err) {
      console.error('Error fetching product details:', err.message);
      return null;
    }
  };

  // Fetch wishlist items
  const fetchWishlist = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/wishlist', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer YOUR_API_TOKEN_HERE', // Replace with actual token
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch wishlist.');
      }

      const wishlistData = await response.json();
      const productDetailsPromises = wishlistData.productIds.map((id) =>
        fetchProductDetails(id)
      );
      const products = (await Promise.all(productDetailsPromises)).filter(Boolean);

      setWishlistItems(products);
      setError(null);
    } catch (err) {
      console.error('Error fetching wishlist:', err.message);
      setError('Failed to load wishlist. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Remove item from wishlist
  const removeFromWishlist = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/wishlist/remove?productId=${productId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer YOUR_API_TOKEN_HERE', // Replace with actual token
          },
          credentials: 'include',
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to remove product with ID: ${productId}`);
      }

      // Update the wishlist state after removal
      setWishlistItems((prevItems) =>
        prevItems.filter((item) => item.id !== productId)
      );
    } catch (err) {
      console.error('Error removing item from wishlist:', err.message);
    }
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
                key={item.id}
                className="flex items-center border-b pb-4 mb-4 border-gray-300"
              >
                <Link to={`/items/${item.id}`} className="mr-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                </Link>
                <div className="flex-1">
                  <Link to={`/items/${item.id}`} className="block">
                    <h2 className="text-xl font-semibold hover:underline">{item.title}</h2>
                  </Link>
                  <p className="text-gray-500">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex flex-col items-end">
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="text-xl hover:scale-110 transition-transform duration-200"
                  >
                    <FaHeart className="text-primary" />
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
