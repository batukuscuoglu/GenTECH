import React, { useState, useEffect } from "react";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/product/get-categories", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include credentials
      });
      if (response.ok) {
        const data = await response.json();
        setCategories(data || []);
      } else {
        alert("Failed to fetch categories.");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Delete a category
  const deleteCategory = async (categoryId) => {
    if (!window.confirm("Are you sure you want to delete this category?")) {
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/api/pm/delete-category/${categoryId}`,
        {
          method: "GET",
          credentials: "include", // Include credentials
        }
      );
      if (response.ok) {
        alert("Category deleted successfully.");
        fetchCategories(); // Refresh the list
      } else {
        alert("Failed to delete category.");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    } finally {
      setLoading(false);
    }
  };

  // Load categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-secondary">
        Manage Categories
      </h2>

      {/* Categories List */}
      <ul className="space-y-4">
        {categories.map((category) => (
          <li
            key={category.id}
            className="flex justify-between items-center bg-gray-100 p-4 rounded-md shadow-sm"
          >
            <span className="text-lg">{category.name}</span>
            <button
              onClick={() => deleteCategory(category.id)}
              className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"
              disabled={loading}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {categories.length === 0 && (
        <p className="text-gray-500 mt-4">No categories available.</p>
      )}
    </section>
  );
};

export default ManageCategories;
