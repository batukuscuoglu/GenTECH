import React from 'react';

const DeliveryList = () => {
  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-secondary">Delivery List</h2>
      <table className="w-full table-auto text-left border-collapse">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="p-3 border-b">Delivery ID</th>
            <th className="p-3 border-b">Customer ID</th>
            <th className="p-3 border-b">Product ID</th>
            <th className="p-3 border-b">Status</th>
            <th className="p-3 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b hover:bg-gray-50">
            <td className="p-3">#001</td>
            <td className="p-3">123</td>
            <td className="p-3">P-456</td>
            <td className="p-3 text-green-500">Delivered</td>
            <td className="p-3">
              <button className="text-primary hover:underline">View</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default DeliveryList;
