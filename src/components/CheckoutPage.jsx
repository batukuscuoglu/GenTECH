// CheckoutPage.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate
import itemData from '../mockData/itemdata';
import Navbar from './Navbar/Navbar';
import Footer from './Footer';

function CheckoutPage() {
  const navigate = useNavigate(); // Initialize navigate for redirecting
  const [cartItems] = useState([
    { id: 1, name: 'iPhone 14 Pro', price: 999, quantity: 1, imgSrc: itemData.find(item => item.id === 1).imgSrc },
    { id: 2, name: 'MacBook Air M2', price: 1199, quantity: 1, imgSrc: itemData.find(item => item.id === 2).imgSrc },
  ]);

  const [address, setAddress] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: ''
  });

  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const [errors, setErrors] = useState({
    address: false,
    payment: false
  });

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = () => {
    const isAddressFilled = Object.values(address).every(field => field.trim() !== '');
    const isPaymentFilled = Object.values(paymentDetails).every(field => field.trim() !== '');

    if (!isAddressFilled || !isPaymentFilled) {
      setErrors({
        address: !isAddressFilled,
        payment: !isPaymentFilled
      });
      return;
    }

    // Redirect to PaymentConfirmation page after placing the order
    navigate('/payment-confirmation');  // Redirects to the Payment Confirmation page
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>

        {/* Order Summary Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 border rounded-lg shadow-sm"
              >
                <Link to={`/items/${item.id}`} className="flex items-center">
                  <img
                    src={item.imgSrc}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md mr-4"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">{item.name}</h3>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                </Link>
                <div className="text-lg font-bold">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Address Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Shipping Address</h2>
          <div className="border p-4 rounded-lg shadow-sm">
            <input
              type="text"
              placeholder="Name"
              className="w-full mb-2 p-2 border rounded-md"
              value={address.name}
              onChange={(e) => setAddress({ ...address, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Street Address"
              className="w-full mb-2 p-2 border rounded-md"
              value={address.street}
              onChange={(e) => setAddress({ ...address, street: e.target.value })}
            />
            <input
              type="text"
              placeholder="City"
              className="w-full mb-2 p-2 border rounded-md"
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
            />
            <input
              type="text"
              placeholder="State"
              className="w-full mb-2 p-2 border rounded-md"
              value={address.state}
              onChange={(e) => setAddress({ ...address, state: e.target.value })}
            />
            <input
              type="text"
              placeholder="ZIP Code"
              className="w-full mb-2 p-2 border rounded-md"
              value={address.zip}
              onChange={(e) => setAddress({ ...address, zip: e.target.value })}
            />
            <input
              type="text"
              placeholder="Country"
              className="w-full mb-2 p-2 border rounded-md"
              value={address.country}
              onChange={(e) => setAddress({ ...address, country: e.target.value })}
            />
            {errors.address && <p className="text-red-500">Please fill in all address fields.</p>}
          </div>
        </div>

        {/* Payment Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>
          <div className="border p-4 rounded-lg shadow-sm">
            <input
              type="text"
              placeholder="Card Number"
              className="w-full mb-2 p-2 border rounded-md"
              value={paymentDetails.cardNumber}
              onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })}
            />
            <input
              type="text"
              placeholder="Expiry Date (MM/YY)"
              className="w-full mb-2 p-2 border rounded-md"
              value={paymentDetails.expiryDate}
              onChange={(e) => setPaymentDetails({ ...paymentDetails, expiryDate: e.target.value })}
            />
            <input
              type="text"
              placeholder="CVV"
              className="w-full mb-2 p-2 border rounded-md"
              value={paymentDetails.cvv}
              onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value })}
            />
            {errors.payment && <p className="text-red-500">Please fill in all payment details.</p>}
          </div>
        </div>

        {/* Total and Place Order Section */}
        <div className="text-right border-t pt-4">
          <h3 className="text-2xl font-bold mb-4">Total: ${totalPrice.toFixed(2)}</h3>
          <button
            onClick={handlePlaceOrder}
            className="w-full bg-primary text-white py-3 rounded-md transition-all hover:bg-white hover:text-primary hover:border-2 hover:border-primary"
          >
            Place Order
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CheckoutPage;
