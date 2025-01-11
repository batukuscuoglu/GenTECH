import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Footer from './Footer';
import mockIMG from '../assets/mockIMG.jpg';

function CartPage() {
  const [cartItems, setCartItems] = useState([]); // Cart items state
  const [totalAmount, setTotalAmount] = useState(0); // Total cart amount
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const navigate = useNavigate();

  // Fetch product data (including image) using the search API
  const fetchProductData = async (query) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/product/search?query=${encodeURIComponent(query)}&page=0&size=1`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Include credentials for authentication
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch product data for ${query}`);
      }

      const data = await response.json();
      return data.content[0] || null; // Return the first matching product
    } catch (err) {
      console.error('Error fetching product data:', err.message);
      return null; // Return null if the product is not found
    }
  };

  // Fetch cart items from the backend or localStorage
  const fetchCart = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/cart', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer YOUR_API_TOKEN_HERE', // Replace with actual token
          'X-Requested-With': 'XMLHttpRequest', // Prevent default login popup
        },
        credentials: 'include', // Include cookies for session-based auth
      });

      if (response.status === 401 || response.status === 403) {
        // Offline cart handling
        const offlineCart = JSON.parse(localStorage.getItem('offlineCart')) || [];
        for (const item of offlineCart) {
          if (!item.product?.image) {
            const productData = await fetchProductData(item.title);
            item.product = { ...item.product, image: productData?.image || null };
          }
        }
        const offlineTotal = offlineCart.reduce(
          (acc, item) => acc + (item.price || 0) * (item.quantity || 0),
          0
        );
        setCartItems(offlineCart);
        setTotalAmount(offlineTotal);
        setIsLoggedIn(false);
        setError(null); // Clear any error
        return;
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch cart. Status: ${response.status}`);
      }

      const data = await response.json();
      setCartItems(data.cartItems || []);
      setTotalAmount(
        (data.cartItems || []).reduce(
          (acc, item) => acc + item.product.basePrice * item.quantity,
          0
        )
      );
      setIsLoggedIn(true);
      setError(null);
    } catch (err) {
      console.error('Error fetching cart:', err.message);
      const offlineCart = JSON.parse(localStorage.getItem('offlineCart')) || [];
      const offlineTotal = offlineCart.reduce(
        (acc, item) => acc + (item.price || 0) * (item.quantity || 0),
        0
      );
      setCartItems(offlineCart);
      setTotalAmount(offlineTotal);
      setError('No items in the cart.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    if (isLoggedIn) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/cart/update-quantity?productId=${productId}&quantity=${newQuantity}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer YOUR_API_TOKEN_HERE',
            },
            credentials: 'include',
          }
        );

        if (!response.ok) {
          throw new Error('Failed to update item quantity.');
        }

        fetchCart();
      } catch (err) {
        console.error('Error updating quantity:', err.message);
      }
    } else {
      const offlineCart = JSON.parse(localStorage.getItem('offlineCart')) || [];
      const updatedCart = offlineCart.map((item) =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      );
      localStorage.setItem('offlineCart', JSON.stringify(updatedCart));
      fetchCart();
    }
  };

  const handleRemoveItem = async (productId) => {
    if (isLoggedIn) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/cart/remove?productId=${productId}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer YOUR_API_TOKEN_HERE',
            },
            credentials: 'include',
          }
        );

        if (!response.ok) {
          throw new Error('Failed to remove item from cart.');
        }

        fetchCart();
      } catch (err) {
        console.error('Error removing item:', err.message);
      }
    } else {
      const offlineCart = JSON.parse(localStorage.getItem('offlineCart')) || [];
      const updatedCart = offlineCart.filter((item) => item.productId !== productId);
      localStorage.setItem('offlineCart', JSON.stringify(updatedCart));
      fetchCart();
    }
  };

  const handleProceedToCheckout = () => {
    if (!isLoggedIn) {
      alert('Please log in to proceed to checkout.');
      navigate('/login');
    } else {
      navigate('/checkout');
    }
  };

  useEffect(() => {
    fetchCart(); // Fetch cart items
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6">Shopping Cart</h1>
        {loading ? (
          <p className="text-center text-xl">Loading cart...</p>
        ) : error ? (
          <p className="text-center text-xl text-gray-500">{error}</p>
        ) : cartItems.length === 0 ? (
          <p className="text-center text-xl text-gray-500">Your cart is currently empty.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {cartItems.map((item) => (
              <div
                key={item.productId || item.product?.id}
                className="flex items-center border-b pb-4 mb-4 border-gray-300"
              >
                <Link to={`/items/${item.productId || item.product?.id}`} className="mr-4">
                  <img
                    src={item.product?.image ? `data:image/jpeg;base64,${item.product.image}` : mockIMG}
                    alt={item.product?.title || 'Product Image'}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                </Link>
                <div className="flex-1">
                  <Link to={`/items/${item.productId || item.product?.id}`} className="block">
                    <h2 className="text-xl font-semibold hover:underline">
                      {item.title || item.product?.title || 'Unknown Item'}
                    </h2>
                  </Link>
                  <p className="text-gray-500">${(item.price || item.product?.basePrice || 0).toFixed(2)}</p>
                  <div className="mt-2 flex items-center">
                    <button
                      onClick={() =>
                        handleQuantityChange(item.productId || item.product?.id, Math.max(1, item.quantity - 1))
                      }
                      className="px-2 py-1 border rounded-md"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(
                          item.productId || item.product?.id,
                          Math.min(10, item.quantity + 1)
                        )
                      }
                      className="px-2 py-1 border rounded-md"
                      disabled={item.quantity >= 10}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-lg font-bold">
                    ${((item.price || item.product?.basePrice || 0) * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => handleRemoveItem(item.productId || item.product?.id)}
                    className="text-red-500 mt-2 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="text-right font-bold text-2xl">
              Total: ${totalAmount.toFixed(2)}
            </div>
            <button
              onClick={handleProceedToCheckout}
              className="w-full bg-primary text-white py-3 rounded-md mt-4 transition hover:bg-white hover:text-primary hover:border-2 hover:border-primary"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default CartPage;
