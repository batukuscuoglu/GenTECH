import React, { useEffect, useState } from 'react';

const RefundRequests = () => {
  const [refundRequests, setRefundRequests] = useState([]); // State to store refund requests
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch refund requests
    const fetchRefundRequests = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/orders/status/PENDING_REFUND', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer <your-token>',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch refund requests');
        }

        const data = await response.json();
        setRefundRequests(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRefundRequests();
  }, []);

  const handleRefundEvaluation = async (orderId, approve) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/sm/${orderId}/process-refund?approve=${approve}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer <your-token>',
          },
          credentials: 'include',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to process refund request');
      }

      alert(approve ? 'Refund approved successfully!' : 'Refund denied successfully!');

      // Remove the processed refund request from the list
      setRefundRequests((prevRequests) =>
        prevRequests.filter((request) => request.id !== orderId)
      );
    } catch (err) {
      alert('Error processing refund request. Please try again.');
      console.error('Error:', err);
    }
  };

  if (loading) {
    return <p className="text-gray-500">Loading refund requests...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-secondary">Evaluate Refund Requests</h2>
      {refundRequests.length > 0 ? (
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 border">Order ID</th>
              <th className="p-3 border">User ID</th>
              <th className="p-3 border">Product Name</th>
              <th className="p-3 border">Total Amount</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {refundRequests.map((request) => (
              <tr key={request.id} className="border-b hover:bg-gray-50">
                <td className="p-3 border">{request.id}</td>
                <td className="p-3 border">{request.userId || 'Unknown'}</td>
                <td className="p-3 border">
                  {request.cart?.cartItems?.map((item) => item.product.title).join(', ') || 'No products'}
                </td>
                <td className="p-3 border">${request.total?.toFixed(2) || '0.00'}</td>
                <td className="p-3 border flex gap-4">
                  <button
                    onClick={() => handleRefundEvaluation(request.id, true)}
                    className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleRefundEvaluation(request.id, false)}
                    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                  >
                    Deny
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">No refund requests at the moment.</p>
      )}
    </section>
  );
};

export default RefundRequests;
