import React, { useState, useEffect } from 'react';

const StatusTracking = () => {
  const [orders, setOrders] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOrdersByStatus = async () => {
    const statuses = ['PROCESSING', 'IN_TRANSIT', 'DELIVERED', 'REFUNDED'];
    const fetchedOrders = {};
    setLoading(true);
    setError(null);

    try {
      for (const status of statuses) {
        const response = await fetch(`http://localhost:8080/api/orders/status/${status}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          fetchedOrders[status] = data;
        } else {
          console.error(`Failed to fetch orders for status: ${status}`);
          fetchedOrders[status] = [];
        }
      }
      setOrders(fetchedOrders);
    } catch (err) {
      setError('Failed to fetch orders.');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    const statusCodes = { PROCESSING: 2, IN_TRANSIT: 1, DELIVERED: 3, REFUNDED: 4 };

    try {
      const response = await fetch(
        `http://localhost:8080/api/orders/${orderId}/status?statusCode=${statusCodes[newStatus]}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        }
      );

      if (response.ok) {
        alert('Order status updated successfully!');
        fetchOrdersByStatus();
      } else {
        alert('Failed to update order status.');
      }
    } catch (err) {
      console.error('Error updating order status:', err);
      alert('An error occurred while updating the order status.');
    }
  };

  useEffect(() => {
    fetchOrdersByStatus();
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-secondary">Status Tracking</h2>
      {['PROCESSING', 'IN_TRANSIT', 'DELIVERED', 'REFUNDED'].map((status) => (
        <div key={status} className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            {status} Orders ({orders[status]?.length || 0})
          </h3>
          {orders[status]?.length ? (
            <table className="w-full table-auto border-collapse text-left">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="p-3 border">Order ID</th>
                  <th className="p-3 border">Customer</th>
                  <th className="p-3 border">Total Price</th>
                  <th className="p-3 border">Order Date</th>
                  <th className="p-3 border">Delivery Address</th>
                  <th className="p-3 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders[status].map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{order.id}</td>
                    <td className="p-3">{order.userId || 'N/A'}</td>
                    <td className="p-3">
                      ${order.total ? order.total.toFixed(2) : '0.00'}
                    </td>
                    <td className="p-3">
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleString()
                        : 'N/A'}
                    </td>
                    <td className="p-3">
                      {order.address
                        ? `${order.address.street}, ${order.address.city}, ${order.address.country}`
                        : 'N/A'}
                    </td>
                    <td className="p-3">
                      <select
                        className="border rounded-md p-2"
                        defaultValue={status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      >
                        <option value="PROCESSING">Processing</option>
                        <option value="IN_TRANSIT">In Transit</option>
                        <option value="DELIVERED">Delivered</option>
                        <option value="REFUNDED">Refunded</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">No orders found under this status.</p>
          )}
        </div>
      ))}
    </section>
  );
};

export default StatusTracking;
