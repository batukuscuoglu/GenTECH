import React, { useEffect, useState } from "react";

const DeliveryList = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch pending deliveries
  const fetchDeliveries = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:8080/api/pm/deliveries/pending",
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Deliveries Data:", data); // Debugging purposes
        setDeliveries(data);
      } else {
        console.error("Failed to fetch deliveries");
      }
    } catch (error) {
      console.error("Error fetching deliveries:", error);
    } finally {
      setLoading(false);
    }
  };

  // Update delivery status
  const updateDeliveryStatus = async (id, isCompleted) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/pm/deliveries/${id}/status?isCompleted=${isCompleted}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        alert("Delivery status updated successfully!");
        fetchDeliveries(); // Refresh the list
      } else {
        console.error("Failed to update delivery status");
      }
    } catch (error) {
      console.error("Error updating delivery status:", error);
    }
  };

  useEffect(() => {
    fetchDeliveries();
  }, []);

  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-secondary">Delivery List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full table-auto text-left border-collapse">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="p-3 border-b">Delivery ID</th>
              <th className="p-3 border-b">Customer ID</th>
              <th className="p-3 border-b">Product Name</th>
              <th className="p-3 border-b">Quantity</th>
              <th className="p-3 border-b">Price</th>
              <th className="p-3 border-b">Address</th>
              <th className="p-3 border-b">Status</th>
              <th className="p-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map((delivery) => (
              <tr key={delivery.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{delivery.id}</td>
                <td className="p-3">{delivery.customerId}</td>
                <td className="p-3">{delivery.cartItem2?.productName || "N/A"}</td>
                <td className="p-3">{delivery.cartItem2?.quantity || "N/A"}</td>
                <td className="p-3">
                  ${delivery.cartItem2?.price ? delivery.cartItem2.price.toFixed(2) : "N/A"}
                </td>
                <td className="p-3">
                  {delivery.deliveryAddress?.street}, {delivery.deliveryAddress?.city},{" "}
                  {delivery.deliveryAddress?.country}
                </td>
                <td className="p-3 text-gray-600">
                  {delivery.completed ? "Completed" : "Pending"}
                </td>
                <td className="p-3">
                  <button
                    className="px-4 py-2 border border-secondary text-secondary rounded-lg hover:bg-secondary hover:text-white"
                    onClick={() => updateDeliveryStatus(delivery.id, true)}
                    disabled={delivery.completed}
                  >
                    Complete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default DeliveryList;
