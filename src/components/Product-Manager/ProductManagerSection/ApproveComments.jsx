import React, { useState, useEffect } from "react";

const ApproveComments = () => {
  const [unapprovedComments, setUnapprovedComments] = useState([]);
  const [productDetails, setProductDetails] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch unapproved comments
  useEffect(() => {
    const fetchUnapprovedComments = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "http://localhost:8080/api/pm/comments/unapproved",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include", // Include credentials for authentication
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUnapprovedComments(data || []);
          await fetchProductDetails(data);
        } else {
          console.error("Failed to fetch unapproved comments.");
        }
      } catch (error) {
        console.error("Error fetching unapproved comments:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchProductDetails = async (comments) => {
      const productIds = [
        ...new Set(comments.map((comment) => comment.productId)),
      ];
      const details = {};

      await Promise.all(
        productIds.map(async (productId) => {
          try {
            const response = await fetch(
              `http://localhost:8080/api/product/${productId}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: "include",
              }
            );

            if (response.ok) {
              const product = await response.json();
              details[productId] = product.title;
            }
          } catch (error) {
            console.error(
              `Error fetching product details for ID ${productId}:`,
              error
            );
          }
        })
      );

      setProductDetails(details);
    };

    fetchUnapprovedComments();
  }, []);

  // Approve a comment
  const approveComment = async (commentId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/pm/comments/${commentId}/approve`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Include credentials for authentication
        }
      );

      if (response.ok) {
        alert("Comment approved successfully.");
        setUnapprovedComments((prev) =>
          prev.filter((comment) => comment.id !== commentId)
        );
      } else {
        const errorData = await response.text();
        alert(`Failed to approve comment: ${errorData}`);
      }
    } catch (error) {
      console.error("Error approving comment:", error);
      alert("Error approving comment.");
    }
  };

  // Mock disapprove comment functionality
  const disapproveComment = (commentId) => {
    alert(`Disapprove mock: Comment ${commentId} disapproved.`);
    setUnapprovedComments((prev) =>
      prev.filter((comment) => comment.id !== commentId)
    );
  };

  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-secondary">
        Approve/Disapprove Comments
      </h2>
      {loading ? (
        <p>Loading unapproved comments...</p>
      ) : unapprovedComments.length === 0 ? (
        <p className="text-gray-500">No unapproved comments to show.</p>
      ) : (
        <table className="w-full table-auto text-left border-collapse">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="p-3 border-b">Comment ID</th>
              <th className="p-3 border-b">User ID</th>
              <th className="p-3 border-b">Product</th>
              <th className="p-3 border-b">Content</th>
              <th className="p-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {unapprovedComments.map((comment) => (
              <tr key={comment.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{comment.id}</td>
                <td className="p-3">{comment.userId}</td>
                <td className="p-3">
                  <strong>
                    {productDetails[comment.productId] || "Loading..."}
                  </strong>{" "}
                  (ID: {comment.productId})
                </td>
                <td className="p-3">{comment.content}</td>
                <td className="p-3 flex gap-4">
                  <button
                    className="px-4 py-2 border border-green-500 text-green-500 rounded-lg hover:bg-green-500 hover:text-white"
                    onClick={() => approveComment(comment.id)}
                  >
                    Approve
                  </button>
                  <button
                    className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white"
                    onClick={() => disapproveComment(comment.id)}
                  >
                    Disapprove
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

export default ApproveComments;
