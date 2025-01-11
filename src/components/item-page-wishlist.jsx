import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { FaHeart, FaRegHeart } from "react-icons/fa";

const WishlistItemPage = ({ productId }) => {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  useEffect(() => {
    // Check login status from localStorage
    const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedInStatus);

    if (loggedInStatus) {
      // Fetch the current wishlist if the user is logged in
      const fetchWishlistStatus = async () => {
        try {
          const response = await fetch("http://localhost:8080/api/wishlist", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer YOUR_API_TOKEN_HERE", // Replace with actual token
            },
            credentials: "include",
          });

          if (response.ok) {
            const data = await response.json();
            setIsInWishlist(data.productIds.includes(productId));
          }
        } catch (err) {
          console.error("Error fetching wishlist:", err);
        }
      };

      fetchWishlistStatus();
    }
  }, [productId]);

  const handleAddToWishlist = async () => {
    if (!isLoggedIn) return; // Prevent action if not logged in

    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/api/wishlist/add?productId=${productId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer YOUR_API_TOKEN_HERE", // Replace with actual token
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        setIsInWishlist(true);
      } else {
        console.error("Failed to add to wishlist.");
      }
    } catch (err) {
      console.error("Error adding to wishlist:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromWishlist = async () => {
    if (!isLoggedIn) return; // Prevent action if not logged in

    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/api/wishlist/remove?productId=${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer YOUR_API_TOKEN_HERE", // Replace with actual token
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        setIsInWishlist(false);
      } else {
        console.error("Failed to remove from wishlist.");
      }
    } catch (err) {
      console.error("Error removing from wishlist:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login"); // Redirect to the login page
  };

  return (
    <div className="mt-1 ml-1 pl-1 pb-5">
      {isLoggedIn ? (
        <button
          onClick={isInWishlist ? handleRemoveFromWishlist : handleAddToWishlist}
          className="flex items-center gap-2 text-lg text-secondary hover:text-primary transition-all"
          disabled={loading}
        >
          {isInWishlist ? (
            <>
              <FaHeart className="text-3xl" />
              <span className="text-left">Remove from Wishlist</span>
            </>
          ) : (
            <>
              <FaRegHeart className="text-3xl" />
              <span className="text-left">Add to Wishlist</span>
            </>
          )}
        </button>
      ) : (
        <div
          className="flex items-center gap-2 text-lg text-gray-400 hover:text-gray-600 cursor-pointer"
          onClick={handleLoginRedirect} // Call the login redirect function
        >
          <FaRegHeart className="text-3xl" />
          <span className="text-left">Login to Wishlist</span>
        </div>
      )}
    </div>
  );
};

export default WishlistItemPage;
