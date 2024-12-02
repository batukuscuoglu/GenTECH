import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Footer from './Footer';
import logo from '../assets/logo.png';

function CheckoutPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [address, setAddress] = useState({
    street: '',
    city: '',
    zipCode: '',
    country: '',
    notes: '', // Optional field
  });
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [errors, setErrors] = useState({
    address: false,
    payment: false,
    checkout: '', // Error message for checkout process
  });

  // Fetch cart items
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/cart', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer YOUR_API_TOKEN_HERE',
          },
          credentials: 'include',
        });

        if (!response.ok) throw new Error(`Failed to fetch cart. Status: ${response.status}`);

        const data = await response.json();
        setCartItems(data.cartItems || []);
        setTotalPrice(data.totalPrice || 0);
      } catch (err) {
        console.error('Error fetching cart:', err.message);
      }
    };

    fetchCartItems();
  }, []);

  // Function to send address
  const sendAddress = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/account/address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer YOUR_API_TOKEN_HERE',
        },
        credentials: 'include',
        body: JSON.stringify(address),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to send address. ${errorText}`);
      }
      console.log('Address saved successfully.');
    } catch (err) {
      console.error('Error saving address:', err.message);
      throw new Error('Address submission failed. Please check your details and try again.');
    }
  };

  // Place Order
  const handlePlaceOrder = async () => {
    const isAddressFilled = Object.entries(address).every(
      ([key, value]) => key === 'notes' || value.trim() !== '' // Notes field is optional
    );
    const isPaymentFilled = Object.values(paymentDetails).every((field) => field.trim() !== '');

    if (!isAddressFilled || !isPaymentFilled) {
      setErrors({
        ...errors,
        address: !isAddressFilled,
        payment: !isPaymentFilled,
      });
      return;
    }

    if (cartItems.length === 0) {
      setErrors({
        ...errors,
        checkout: 'Your cart is empty. Add items to proceed with the checkout.',
      });
      return;
    }

    try {
      await sendAddress(); // Send address before placing the order

      const payload = {
        address,
        cartItems: cartItems.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
        paymentDetails,
      };

      const response = await fetch('http://localhost:8080/api/cart/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer YOUR_API_TOKEN_HERE',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to place order. Status: ${response.status}. Message: ${errorMessage}`);
      }

      alert('Order placed successfully!');
      navigate('/payment-confirmation');
    } catch (err) {
      console.error('Error placing order:', err.message);
      setErrors({
        ...errors,
        checkout: `Failed to place order. ${err.message}`,
      });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>

        {cartItems.length === 0 ? (
          <div className="text-center text-xl text-gray-500">Your cart is currently empty.</div>
        ) : (
          <>
            {/* Order Summary */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center justify-between p-4 border rounded-lg shadow-sm"
                  >
                    <Link to={`/items/${item.product.id}`} className="flex items-center">
                      <img
                        src={logo} // Use logo.png as the image
                        alt={item.product.title}
                        className="w-20 h-20 object-cover rounded-md mr-4"
                      />
                      <div>
                        <h3 className="text-xl font-semibold">{item.product.title}</h3>
                        <p className="text-gray-600">${item.product.basePrice.toFixed(2)}</p>
                        <p className="text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                    </Link>
                    <div className="text-lg font-bold">
                      ${(item.product.basePrice * item.quantity).toFixed(2)}
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
                  placeholder="ZIP Code"
                  className="w-full mb-2 p-2 border rounded-md"
                  value={address.zipCode}
                  onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Country"
                  className="w-full mb-2 p-2 border rounded-md"
                  value={address.country}
                  onChange={(e) => setAddress({ ...address, country: e.target.value })}
                />
                <textarea
                  placeholder="Notes (optional)"
                  className="w-full mb-2 p-2 border rounded-md"
                  value={address.notes}
                  onChange={(e) => setAddress({ ...address, notes: e.target.value })}
                />
                {errors.address && (
                  <p className="text-red-500">Please fill in all address fields.</p>
                )}
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
                  onChange={(e) =>
                    setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Expiry Date (MM/YY)"
                  className="w-full mb-2 p-2 border rounded-md"
                  value={paymentDetails.expiryDate}
                  onChange={(e) =>
                    setPaymentDetails({ ...paymentDetails, expiryDate: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="CVV"
                  className="w-full mb-2 p-2 border rounded-md"
                  value={paymentDetails.cvv}
                  onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value })}
                />
                {errors.payment && (
                  <p className="text-red-500">Please fill in all payment details.</p>
                )}
              </div>
            </div>

            {/* Total and Place Order */}
            <div className="text-right border-t pt-4">
              <h3 className="text-2xl font-bold mb-4">Total: ${totalPrice.toFixed(2)}</h3>
              <button
                onClick={handlePlaceOrder}
                className="w-full bg-primary text-white py-3 rounded-md transition-all hover:bg-white hover:text-primary hover:border-2 hover:border-primary"
              >
                Place Order
              </button>
              {errors.checkout && (
                <div className="mt-4 text-red-500 font-semibold text-center">
                  {errors.checkout}
                </div>
              )}
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default CheckoutPage;
