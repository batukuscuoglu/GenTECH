import React from 'react';

const NotifyUsers = () => {
  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-secondary">Notify Users About Discounts</h2>
      <textarea
        placeholder="Compose email content..."
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        rows="4"
      ></textarea>
      <button className="mt-4 px-5 py-3 bg-primary text-white rounded-lg hover:bg-secondary">
        Send Notification
      </button>
    </section>
  );
};

export default NotifyUsers;
