import React, { useState, useEffect } from "react";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
    isActive: true,
  });

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

  // Add a new category
  const addCategory = async () => {
    if (!newCategory.name.trim()) {
      alert("Category name cannot be empty.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/category/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(newCategory),
      });
      if (response.ok) {
        alert("Category added successfully.");
        setNewCategory({ name: "", isActive: true });
        fetchCategories(); // Refresh the list
      } else {
        alert("Failed to add category.");
      }
    } catch (error) {
      console.error("Error adding category:", error);
    } finally {
      setLoading(false);
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

      {/* Add New Category */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-primary">
          Add New Category
        </h3>
        <div className="flex gap-4 items-center">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Category Name"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            />
          </div>
          <button
            onClick={addCategory}
            className="px-5 py-3 border border-green-500 text-green-500 rounded-lg hover:bg-green-500 hover:text-white transition-all"
            disabled={loading}
          >
            Add Category
          </button>
        </div>
        
      </div>

      {/* Categories List */}
      <ul className="space-y-4">
        {categories.map((category) => (
          <li
            key={category.id}
            className="flex justify-between items-center bg-gray-100 p-4 rounded-md shadow-sm"
          >
            <span className="text-lg">
              {category.name} <span className="text-sm text-gray-500">(ID: {category.id})</span>
            </span>
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
