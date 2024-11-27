import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Footer from './Footer';
import logo from '../assets/logo.png'; // Properly importing the logo

function CartPage() {
  const [cartItems, setCartItems] = useState([]); // Cart items state
  const [totalAmount, setTotalAmount] = useState(0); // Total cart amount
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();

  // Fetch cart items from the backend
  const fetchCart = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/cart', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer YOUR_API_TOKEN_HERE', // Replace with actual token
        },
        credentials: 'include', // Include cookies for session-based auth
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch cart. Status: ${response.status}`);
      }

      const contentType = response.headers.get('Content-Type');
      if (!contentType || !contentType.includes('application/json')) {
        setCartItems([]); // Handle non-JSON response as empty cart
        setTotalAmount(0);
        return;
      }

      const data = await response.json();
      setCartItems(data.cartItems || []); // Update cart items
      setTotalAmount(data.totalPrice || 0); // Update total amount
      setError(null); // Clear any previous error
    } catch (err) {
      console.error('Error fetching cart:', err.message);
      setCartItems([]); // Ensure cart is empty on error
      setTotalAmount(0); // Reset total amount
      setError(err.message); // Set error state
    } finally {
      setLoading(false);
    }
  };

  // Handle quantity change
  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      await fetch(`http://localhost:8080/api/cart/remove?productId=${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer YOUR_API_TOKEN_HERE',
        },
        credentials: 'include',
      });

      await fetch(
        `http://localhost:8080/api/cart/cart/add?productId=${productId}&quantity=${newQuantity}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer YOUR_API_TOKEN_HERE',
          },
          credentials: 'include',
        }
      );

      fetchCart();
    } catch (err) {
      console.error('Error updating quantity:', err.message);
      setError(err.message);
    }
  };

  // Handle remove item
  const handleRemoveItem = async (productId) => {
    try {
      await fetch(`http://localhost:8080/api/cart/remove?productId=${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer YOUR_API_TOKEN_HERE',
        },
        credentials: 'include',
      });

      fetchCart();
    } catch (err) {
      console.error('Error removing item:', err.message);
      setError(err.message);
    }
  };

  // Handle proceed to checkout
  const handleProceedToCheckout = () => {
    navigate('/checkout');
  };

  // Fetch cart items on component mount
  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6">Shopping Cart</h1>
        {loading ? (
          <p className="text-center text-xl">Loading cart...</p>
        ) : cartItems.length === 0 ? (
          <p className="text-center text-xl text-gray-500">Your cart is currently empty.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {cartItems.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center border-b pb-4 mb-4 border-gray-300"
              >
                <Link to={`/items/${item.product.id}`} className="mr-4">
                  <img
                    src={logo} // Explicitly setting the logo as the placeholder image
                    alt={item.product.title}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                </Link>
                <div className="flex-1">
                  <Link to={`/items/${item.product.id}`} className="block">
                    <h2 className="text-xl font-semibold hover:underline">
                      {item.product.title}
                    </h2>
                  </Link>
                  <p className="text-gray-500">${item.product.basePrice.toFixed(2)}</p>
                  <div className="mt-2">
                    <label htmlFor={`quantity-${item.product.id}`} className="mr-2">
                      Quantity:
                    </label>
                    <select
                      id={`quantity-${item.product.id}`}
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.product.id, parseInt(e.target.value))
                      }
                      className="border rounded-md p-1"
                    >
                      {[...Array(10).keys()].map((num) => (
                        <option key={num + 1} value={num + 1}>
                          {num + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-lg font-bold">
                    ${(item.product.basePrice * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => handleRemoveItem(item.product.id)}
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
