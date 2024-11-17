import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import commentsData from '../mockData/commentsData';
import Navbar from './Navbar/Navbar';
import Footer from './Footer';

function ProductManager() {
  const [comments, setComments] = useState(commentsData);
  const [expandedItem, setExpandedItem] = useState(null);

  const toggleApproval = (itemId, commentId) => {
    setComments((prevComments) =>
      prevComments.map((item) =>
        item.itemId === itemId
          ? {
              ...item,
              comments: item.comments.map((comment) =>
                comment.id === commentId
                  ? { ...comment, approved: !comment.approved }
                  : comment
              ),
            }
          : item
      )
    );
  };

  const toggleItemSection = (itemId) => {
    setExpandedItem(expandedItem === itemId ? null : itemId);
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Product Manager: Handle Comments</h1>
        {comments.map((item) => (
          <div key={item.itemId} className="mb-6">
            <div
              onClick={() => toggleItemSection(item.itemId)}
              className="flex items-center justify-between cursor-pointer text-xl font-semibold p-4 rounded-md bg-secondary text-white hover:bg-white hover:text-primary hover:border-2 hover:border-secondary transition-all"
            >
              <span>Item ID: {item.itemId}</span>
              <span>{expandedItem === item.itemId ? <FaChevronUp /> : <FaChevronDown />}</span>
            </div>

            <div
              className={`transition-all duration-500 ease-in-out overflow-hidden ${
                expandedItem === item.itemId ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="mt-4 border rounded-md p-4 bg-gray-100 shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Comments</h2>
                <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-secondary scrollbar-track-gray-300">
                  {item.comments.map((comment) => (
                    <div
                      key={comment.id}
                      className={`p-4 border-2 rounded-md shadow-sm ${
                        comment.approved ? 'border-green-500' : 'border-red-500'
                      }`}
                    >
                      <p className="font-bold">{comment.username}</p>
                      <p className="mb-2">{comment.text}</p>
                      <div className="flex items-center mb-2">
                        <span className="mr-2">Rating:</span>
                        {Array(5)
                          .fill(0)
                          .map((_, index) =>
                            index < comment.rating ? (
                              <span key={index} className="text-primary">★</span>
                            ) : (
                              <span key={index} className="text-gray-400">☆</span>
                            )
                          )}
                      </div>
                      <button
                        onClick={() => toggleApproval(item.itemId, comment.id)}
                        className={`mt-4 py-2 px-4 rounded-md font-semibold ${
                          comment.approved
                            ? 'bg-red-500 text-white hover:bg-red-700'
                            : 'bg-green-500 text-white hover:bg-green-700'
                        }`}
                      >
                        {comment.approved ? 'Disapprove' : 'Approve'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default ProductManager;
