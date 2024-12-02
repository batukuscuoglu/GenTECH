import React, { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar/Navbar';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const userResponse = await fetch('http://localhost:8080/api/user/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer <your-token>', // Replace <your-token> with the actual token
        },
        credentials: 'include',
      });

      if (!userResponse.ok) throw new Error('Failed to fetch user details');

      const userData = await userResponse.json();
      setUser(userData);

      const ordersResponse = await fetch('http://localhost:8080/api/orders/user/orders', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer <your-token>', // Replace <your-token> with the actual token
        },
        credentials: 'include',
      });

      if (!ordersResponse.ok) throw new Error('Failed to fetch user orders');

      const ordersData = await ordersResponse.json();
      setOrders(ordersData);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8080/logout', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        alert('Logged out successfully!');
        navigate('/');
      } else {
        const errorText = await response.text();
        console.error('Logout Error:', errorText);
        alert('Failed to log out. Please try again.');
      }
    } catch (error) {
      console.error('Unexpected Logout Error:', error.message);
      alert('An unexpected error occurred during logout.');
    }
  };

  if (error) {
    return (
      <>
        <Navbar />
        <div className="text-center text-red-500 mt-10">
          <p>Error: {error}</p>
        </div>
        <Footer />
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="text-center text-gray-600 mt-10">Loading...</div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6">
        {/* User Profile Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Profile</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-lg text-gray-700">
                <strong>Email:</strong> {user.email}
              </p>
              <p className="text-lg text-gray-700">
                <strong>Name:</strong> {user.name}
              </p>
            </div>
            <div>
              <p className="text-lg text-gray-700">
                <strong>Surname:</strong> {user.surname}
              </p>
              <p className="text-lg text-gray-700">
                <strong>Phone:</strong> {user.phone}
              </p>
            </div>
          </div>
          <p className="text-lg text-gray-700 mt-4">
            <strong>Age:</strong> {user.age}
          </p>
          <p className="text-lg text-gray-700">
            <strong>Registered Date:</strong> {new Date(user.registerDate).toLocaleDateString()}
          </p>
        </div>

        {/* Orders Section */}
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Orders</h2>
        <div className="space-y-6">
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <OrderSummary key={index} order={order} />
            ))
          ) : (
            <p className="text-gray-600">You have no orders yet.</p>
          )}
        </div>

        {/* Logout Button */}
        <div className="text-center mt-10">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

function OrderSummary({ order }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef(null);

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
      {/* Order Header */}
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Order #{order.id}</h3>
          <p className="text-sm text-gray-600">
            <strong>Status:</strong> {order.orderStatus || 'Unknown'}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Total Price:</strong> ${order.cart?.totalPrice.toFixed(2) || '0.00'}
          </p>
        </div>
        <span className="text-secondary text-lg">
          {isExpanded ? '▲' : '▼'}
        </span>
      </div>

      {/* Collapsible Order Details */}
      <div
        className="transition-all duration-500 ease-in-out overflow-hidden"
        style={{
          maxHeight: isExpanded ? `${contentRef.current.scrollHeight}px` : '0',
          opacity: isExpanded ? 1 : 0,
        }}
      >
        <div ref={contentRef}>
          <h4 className="text-lg font-semibold text-gray-800 mt-4">Items</h4>
          <ul className="space-y-4 mt-4">
            {order.cart.cartItems.map((item, index) => (
              <li key={index} className="bg-white p-4 rounded-lg shadow-md">
                <p className="text-base font-semibold">{item.product.title} ({item.product.model})</p>
                <p className="text-sm text-gray-600"><strong>Brand:</strong> {item.product.brand}</p>
                <p className="text-sm text-gray-600"><strong>Serial Number:</strong> {item.product.serialNumber}</p>
                <p className="text-sm text-gray-600"><strong>Quantity:</strong> {item.quantity}</p>
                <p className="text-sm text-gray-600">
                  <strong>Price per Item:</strong> ${item.product.basePrice.toFixed(2)}
                </p>
              </li>
            ))}
          </ul>

          <h4 className="text-lg font-semibold text-gray-800 mt-6">Invoice</h4>
          <div className="mt-4 bg-white p-4 pb-4 rounded-lg shadow-md">
            {/* Items Breakdown */}
            {order.cart.cartItems.map((item, index) => (
              <p key={index} className="text-sm text-gray-600">
                <strong>{item.product.title}:</strong> ${item.product.basePrice.toFixed(2)} x {item.quantity} = ${(
                  item.product.basePrice * item.quantity
                ).toFixed(2)}
              </p>
            ))}
            <hr className="my-4" />
            {/* Total */}
            <p className="text-sm text-gray-800 font-bold">
              <strong>Total Money Spent:</strong> ${order.total.toFixed(2)}
            </p>
            {/* Order Date */}
            <p className="text-sm text-gray-600">
              <strong>Order Created At:</strong> {new Date(order.createdAt).toLocaleString()}
            </p>
            {/* Delivery Address */}
            <p className="text-sm text-gray-600">
              <strong>Delivery Address:</strong> {order.address.street}, {order.address.city}, {order.address.country} ({order.address.zipCode})
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
