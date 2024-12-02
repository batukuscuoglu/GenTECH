import React from 'react';
import { Link } from 'react-router-dom';
import doneGif from '../assets/done.gif'; // Make sure to place your done.gif in the assets folder

function PaymentConfirmation() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="text-center">
        <img src={doneGif} alt="Payment Done" className="mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-lg mb-8">Your order has been placed successfully.</p>
        <Link to="/profile" className="bg-primary text-white py-2 px-6 rounded-md hover:bg-secondary">
          See Your Order
        </Link>
      </div>
    </div>
  );
}

export default PaymentConfirmation;
