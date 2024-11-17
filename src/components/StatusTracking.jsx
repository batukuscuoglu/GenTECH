import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Footer from './Footer';
import orderStatusData from '../mockData/OrderStatus';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

function StatusTracking() {
  const { id } = useParams(); // Get order ID from the URL
  const order = orderStatusData.find((order) => order.orderId === parseInt(id));
  const [isExpanded, setIsExpanded] = useState(false); // Sliding open/close for Order Summary

  if (!order) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto p-8 text-center">
          <h1 className="text-3xl font-bold text-primary">Order Not Found</h1>
          <p className="text-lg text-gray-600">Please check your Order ID.</p>
        </div>
        <Footer />
      </div>
    );
  }

  const currentStageIndex = order.stages.findIndex((stage) => stage.name === order.status);
  const progressBarWidth = `${(currentStageIndex + 1) / order.stages.length * 100}%`; // Dynamic width

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Order Tracking</h1>

        {/* Collapsible Order Summary */}
        <div className="bg-gray-100 p-6 rounded-md shadow-md mb-6">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className="flex items-center">
              <img
                src={order.imgSrc}
                alt={order.itemName}
                className="w-24 h-24 object-cover rounded-md mr-6"
              />
              <div>
                <h2 className="text-xl font-semibold">{order.itemName}</h2>
                <p className="text-gray-700">
                  <strong>Quantity:</strong> {order.quantity}
                </p>
                <p className="text-gray-700">
                  <strong>Price:</strong> ${order.price}
                </p>
              </div>
            </div>
            <span className="text-secodnary text-lg">
              {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          </div>

          {isExpanded && (
            <div className="mt-4 border-t pt-4">
              <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
              <p className="text-gray-700">
                <strong>Order ID:</strong> {order.orderId}
              </p>
              <p className="text-gray-700">
                <strong>Shipping Address:</strong> {order.shippingAddress}
              </p>
              <p className="text-gray-700">
                <strong>Status:</strong> {order.status}
              </p>
              <p className="text-gray-700">
                <strong>Estimated Delivery:</strong> {order.estimatedDelivery}
              </p>
              <p className="text-gray-700">
                <strong>Total Price:</strong> ${order.quantity * order.price}
              </p>
            </div>
          )}
        </div>

        {/* Status Tracker */}
        <div className="bg-gray-100 p-6 rounded-md shadow-md">
          <div className="relative flex items-center justify-between">
            {/* Circles */}
            {order.stages.map((stage, index) => (
              <div key={index} className="flex-1 text-center relative">
                <div
                  className={`w-12 h-12 mx-auto flex items-center justify-center rounded-full text-white font-semibold ${
                    index <= currentStageIndex ? 'bg-primary' : 'bg-gray-300'
                  }`}
                >
                  {index + 1}
                </div>
                <p
                  className={`mt-4 ${
                    index <= currentStageIndex ? 'text-secondary' : 'text-gray-500'
                  }`}
                >
                  {stage.name}
                </p>
              </div>
            ))}

            {/* Progress Bar */}
            <div className="absolute top-[64%] left-0 h-1 w-full bg-gray-300 -translate-y-1/2"></div>
            <div
              className="absolute top-[64%] left-0 h-1 bg-primary -translate-y-1/2 transition-all duration-300"
              style={{ width: progressBarWidth }}
            ></div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default StatusTracking;
