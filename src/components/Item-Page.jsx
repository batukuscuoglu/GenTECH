import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer";
import logo from "../assets/logo.png";
import { FaStar, FaRegStar } from "react-icons/fa"; // For displaying star ratings
import mockIMG from "../assets/mockIMG.jpg";
import WishlistItemPage from "./item-page-wishlist";

function Items() {
  const { id } = useParams(); // Get the product ID from the URL
  const [item, setItem] = useState(null); // State for item details
  const [categoryName, setCategoryName] = useState(""); // State for category name
  const [comments, setComments] = useState([]); // State for comments
  const [avgRating, setAvgRating] = useState(null); // State for average rating
  const [quantity, setQuantity] = useState(1); // Quantity for item
  const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown state
  const [loading, setLoading] = useState(true); // Loading state for item
  const [commentsLoading, setCommentsLoading] = useState(true); // Loading state for comments
  const [error, setError] = useState(null); // Error state
  const [commentsError, setCommentsError] = useState(null); // Error state for comments
  const [cartMessage, setCartMessage] = useState(""); // Message for cart operation
  const [cartMessageType, setCartMessageType] = useState(""); // Message type (success/error)
  const navigate = useNavigate();

  // Fetch item details from the API
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/product/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer YOUR_API_TOKEN_HERE", // Replace with actual token
          },
          credentials: "include", // Include cookies if session-based auth is used
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch item. Status: ${response.status}`);
        }

        const data = await response.json();
        setItem(data); // Set the fetched item data
        setLoading(false); // Set loading to false
        fetchCategoryName(data.categoryId); // Fetch the category name
      } catch (err) {
        console.error("Error fetching item:", err);
        setError(err.message);
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    const fetchCategoryName = async (categoryId) => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/product/get-categories",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer YOUR_API_TOKEN_HERE", // Replace with actual token
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch categories. Status: ${response.status}`);
        }

        const categories = await response.json();
        const category = categories.find((cat) => cat.id === categoryId);
        setCategoryName(category?.name || "Unknown Category");
      } catch (err) {
        console.error("Error fetching category:", err);
        setCategoryName("Unknown Category");
      }
    };

    fetchItem(); // Fetch item on component mount
  }, [id]);

  // Fetch average rating
  useEffect(() => {
    const fetchAverageRating = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/comments/${id}/get-avg-rating`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include", // Include cookies if session-based auth is used
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch average rating. Status: ${response.status}`
          );
        }

        const rating = await response.json();
        setAvgRating(rating); // Set the fetched average rating
      } catch (err) {
        console.error("Error fetching average rating:", err);
        setAvgRating(null);
      }
    };

    fetchAverageRating();
  }, [id]);

  // Fetch comments for the product
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/comments/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer YOUR_API_TOKEN_HERE", // Replace with actual token
          },
          credentials: "include", // Include cookies if session-based auth is used
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch comments. Status: ${response.status}`);
        }

        const data = await response.json();
        const approvedComments = data.filter((comment) => comment.approved); // Only approved comments
        setComments(approvedComments); // Set the approved comments
        setCommentsLoading(false); // Set loading to false
      } catch (err) {
        console.error("Error fetching comments:", err);
        setCommentsError(err.message);
        setCommentsLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchComments(); // Fetch comments on component mount
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (item && quantity > item.quantityInStock) {
      setQuantity(item.quantityInStock); // Ensure quantity doesn't exceed stock
    }
  }, [item]);

  const toggleDropdown = () => {
    if (item?.quantityInStock > 0) {
      setDropdownOpen(!dropdownOpen); // Toggle dropdown visibility
    }
  };

  const handleQuantityChange = (value) => {
    if (value <= item.quantityInStock) {
      setQuantity(value); // Update quantity
    }
    setDropdownOpen(false); // Close dropdown
  };

  // Add or update item in cart
  const handleAddToCart = async () => {
    try {
      // Try to add to the backend cart
      const removeResponse = await fetch(`http://localhost:8080/api/cart/remove?productId=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer YOUR_API_TOKEN_HERE",
          "X-Requested-With": "XMLHttpRequest", // Prevent default login popup
        },
        credentials: "include",
      });
  
      if (removeResponse.status === 401) {
        // Handle offline cart (store in localStorage)
        const offlineCart = JSON.parse(localStorage.getItem("offlineCart")) || [];
        const existingItemIndex = offlineCart.findIndex((item) => item.productId === id);
  
        if (existingItemIndex >= 0) {
          // Update existing item's quantity
          
        } else {
          // Add new item to offline cart
          offlineCart.push({
            productId: id,
            title: item.title,
            price: item.basePrice,
            quantity,
            image: mockIMG, // Placeholder for product image
          });
        }
  
        localStorage.setItem("offlineCart", JSON.stringify(offlineCart));
        setCartMessage("Item added to offline cart!");
        setCartMessageType("success");
        return;
      }
  
      // Then, add the item to the cart with the selected quantity
      const addResponse = await fetch(
        `http://localhost:8080/api/cart/cart/add?productId=${id}&quantity=${quantity}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer YOUR_API_TOKEN_HERE",
            "X-Requested-With": "XMLHttpRequest", // Prevent default login popup
          },
          credentials: "include",
        }
      );
  
      if (!addResponse.ok) {
        throw new Error(`Failed to add item to cart. Status: ${addResponse.status}`);
      }
  
      setCartMessage("Item successfully added to cart!");
      setCartMessageType("success");
    } catch (err) {
      console.error("Error adding to cart:", err);
      setCartMessage("Failed to add item to cart.");
      setCartMessageType("error");
    }
  };

  const handleBackToCategory = () => {
    navigate("/categories", {
      state: { selectedCategoryId: item.categoryId }, // Pass the categoryId to Categories
    });
  };

  if (loading) {
    return <div className="text-center p-4">Loading item details...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">Error: {error}</div>;
  }

  if (!item) {
    return <div className="text-center p-4">Item not found.</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="p-8">
        {/* Breadcrumb */}
        <div className="mb-4 text-lg">
          <span
            onClick={() => navigate("/categories")}
            className="text-primary cursor-pointer hover:underline"
          >
            Categories
          </span>
          {" > "}
          <span
            className="text-primary cursor-pointer hover:underline"
            onClick={handleBackToCategory}
          >
            {categoryName}
          </span>
          {" > "}
          <span className="font-semibold">{item.title}</span>
        </div>

        {/* Item Details */}
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 flex justify-center mb-4 md:mb-0">
            {/* Always display the logo */}
            <img
            src={item && item.image ? `data:image/jpeg;base64,${item.image}` : mockIMG}
            alt={item?.title || "Product Image"}
            className="w-full max-w-md rounded-lg"
            />
          </div>

          <div className="md:w-1/2 flex flex-col p-4">
            <h1 className="text-3xl font-bold mb-2">{item.title}</h1>

            {/* Average Rating Section */}
            {avgRating !== null && (
              <div className="flex items-center mb-2">
                {Array(5)
                  .fill(0)
                  .map((_, index) =>
                    index < Math.round(avgRating) ? (
                      <FaStar key={index} className="text-primary mr-1" />
                    ) : (
                      <FaRegStar key={index} className="text-gray-400 mr-1" />
                    )
                  )}
                <span className="ml-2 text-lg font-semibold">
                  {avgRating.toFixed(1)}
                </span>
              </div>
            )}
            
            <p className="text-xl mb-2">${item.basePrice}</p>
            <p className="text-lg mb-4">{item.description}</p>
            <p className="text-lg mb-2">
              <span className="font-bold">Model:</span> {item.model}
            </p>
            <p className="text-lg mb-2">
              <span className="font-bold">Serial No:</span> {item.serialNumber}
            </p>
            <p className="text-lg mb-2">
              <span className="font-bold">Warranty:</span> {item.warrantyStatus ? "2 years" : "No warranty"}
            </p>
            <p >Stock: {item.quantityInStock}</p>
            {item.quantityInStock > 0 ? (
              <>
                {/* Quantity Selector Dropdown */}
                <div className="relative mb-4 w-40">
                  <button
                    onClick={toggleDropdown}
                    className="w-full p-2 border rounded-md bg-white flex items-center justify-between"
                  >
                    <span>Quantity:</span>{" "}
                    <span className="ml-1 font-semibold">{quantity}</span>
                  </button>
              
                  {dropdownOpen && (
                    <div className="absolute w-full border rounded-md bg-white shadow-lg z-10 mt-1 max-h-40 overflow-y-auto">
                      {[...Array(item.quantityInStock).keys()].map((_, index) => {
                        const value = index + 1;
                        return (
                          <div
                            key={value}
                            onClick={() => handleQuantityChange(value)}
                            className={`cursor-pointer p-2 hover:bg-gray-200 text-center ${
                              value === quantity
                                ? "bg-primary text-white font-bold rounded-md"
                                : ""
                            }`}
                          >
                            {value}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                {/* Wishlist Button */}
                <WishlistItemPage productId={id} />
                  
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-primary py-3 rounded-md text-white transition-all hover:bg-white hover:text-primary hover:border-2 hover:border-primary"
                >
                  Add to Cart
                </button>
                
                {cartMessage && (
                  <p
                    className={`mt-2 text-center ${
                      cartMessageType === "success"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {cartMessage}
                  </p>
                )}
              </>
            ) : (
              <div className="text-center mt-4">
                <p className="text-red-500 text-lg font-semibold mb-2">
                  Out of Stock
                </p>
                <button
                  className="w-full bg-gray-400 py-3 rounded-md text-white cursor-not-allowed"
                  disabled
                >
                  Add to Cart
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Comment Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-4">Comments</h2>
          {commentsLoading ? (
            <p>Loading comments...</p>
          ) : commentsError ? (
            <p className="text-red-500">Error: {commentsError}</p>
          ) : comments.length > 0 ? (
            <div className="space-y-4">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="p-4 border-2 rounded-md shadow-sm border-primary"
                >
                  {/* Display userId or username */}
                  <p className="font-semibold mb-1">User ID: {comment.userId}</p>
                  <div className="flex items-center mb-2">
                    {/* Render stars based on rating */}
                    {Array(5)
                      .fill(0)
                      .map((_, index) =>
                        index < comment.rating ? (
                          <FaStar key={index} className="text-primary mr-1" />
                        ) : (
                          <FaRegStar key={index} className="text-gray-400 mr-1" />
                        )
                      )}
                  </div>
                  <p>{comment.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No comments available for this product.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Items;
