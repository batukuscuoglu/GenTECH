import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Footer from './Footer';
import itemData from '../mockData/itemdata'; // Import item data for sample cart items

function CartPage() {
  const navigate = useNavigate();

  // Sample cart items (in a real app, this would come from state or context)
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'iPhone 14 Pro', price: 999, quantity: 1, imgSrc: itemData.find(item => item.id === 1).imgSrc },
    { id: 21, name: 'MacBook Air M2', price: 1199, quantity: 1, imgSrc: itemData.find(item => item.id === 21).imgSrc },
  ]);

  const handleQuantityChange = (id, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleProceedToCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6">Shopping Cart</h1>
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center border-b pb-4 mb-4 border-gray-300"
              >
                <Link to={`/items/${item.id}`} className="mr-4">
                  <img
                    src={item.imgSrc}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                </Link>
                <div className="flex-1">
                  <Link to={`/items/${item.id}`} className="block">
                    <h2 className="text-xl font-semibold hover:underline">{item.name}</h2>
                  </Link>
                  <p className="text-gray-500">${item.price.toFixed(2)}</p>
                  <div className="mt-2">
                    <label htmlFor={`quantity-${item.id}`} className="mr-2">
                      Quantity:
                    </label>
                    <select
                      id={`quantity-${item.id}`}
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.id, parseInt(e.target.value))
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
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
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
        ) : (
          <p className="text-center text-xl">Your cart is currently empty.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default CartPage;
