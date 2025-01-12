import React, { useState } from "react";

const AddRemoveProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProductToRemove, setSelectedProductToRemove] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    categoryId: "",
    brand: "",
    model: "",
    serialNumber: "",
    description: "",
    quantityInStock: "",
    basePrice: "",
    warrantyStatus: true,
    distributorId: "",
    image: [],
  });
  const [loading, setLoading] = useState(false);

  const fetchSearchResults = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:8080/api/product/search?query=${searchQuery}&page=0&size=5`,
        { credentials: "include" }
      );
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.content || []);
      } else {
        console.error("Failed to fetch search results.");
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantityInStock" || name === "basePrice" ? +value : value,
    }));
  };

  const addProduct = async () => {
    if (!formData.title || !formData.categoryId || !formData.basePrice) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/pm/product/add", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Product added successfully.");
        setFormData({
          title: "",
          categoryId: "",
          brand: "",
          model: "",
          serialNumber: "",
          description: "",
          quantityInStock: "",
          basePrice: "",
          warrantyStatus: true,
          distributorId: "",
          image: [],
        });
      } else {
        alert("Failed to add product.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeProduct = async () => {
    if (!selectedProductToRemove) {
      alert("Please select a product to remove.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/api/pm/product/${selectedProductToRemove.id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (response.ok) {
        alert("Product removed successfully.");
        setSelectedProductToRemove(null);
        setSearchQuery("");
        setSearchResults([]);
      } else {
        alert("Failed to remove product.");
      }
    } catch (error) {
      console.error("Error removing product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-secondary">
        Add/Remove Products
      </h2>
      <div className="flex flex-col gap-6">
        {/* Add Product Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-primary">Add Product</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="title"
              placeholder="Product Title"
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={formData.title}
              onChange={handleFormChange}
            />
            <input
              type="text"
              name="categoryId"
              placeholder="Category ID"
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={formData.categoryId}
              onChange={handleFormChange}
            />
            <input
              type="text"
              name="brand"
              placeholder="Brand"
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={formData.brand}
              onChange={handleFormChange}
            />
            <input
              type="text"
              name="model"
              placeholder="Model"
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={formData.model}
              onChange={handleFormChange}
            />
            <input
              type="text"
              name="serialNumber"
              placeholder="Serial Number"
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={formData.serialNumber}
              onChange={handleFormChange}
            />
            <textarea
              name="description"
              placeholder="Description"
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={formData.description}
              onChange={handleFormChange}
            ></textarea>
            <input
              type="number"
              name="quantityInStock"
              placeholder="Quantity in Stock (e.g., 10)"
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={formData.quantityInStock || ""}
              onChange={handleFormChange}
            />
            <input
              type="number"
              name="basePrice"
              placeholder="Base Price (e.g., 100.50)"
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={formData.basePrice || ""}
              onChange={handleFormChange}
            />
          </div>
          <button
            className="mt-4 px-5 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white disabled:opacity-50"
            onClick={addProduct}
            disabled={loading}
          >
            Add Product
          </button>
        </div>

        {/* Remove Product Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-red-500">
            Remove Product
          </h3>
          <input
            type="text"
            placeholder="Search Product to Remove"
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              fetchSearchResults();
            }}
          />
          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="border p-4 rounded-md shadow-md max-h-48 overflow-y-auto mt-2">
              {searchResults.map((product) => (
                <div
                  key={product.id}
                  className={`flex items-center p-2 border-b hover:bg-gray-100 ${
                    selectedProductToRemove?.id === product.id ? "bg-red-100" : ""
                  }`}
                  onClick={() => {
                    setSelectedProductToRemove(product);
                    setSearchResults([]);
                  }}
                >
                  <img
                    src={
                      product.image
                        ? `data:image/jpeg;base64,${product.image}`
                        : "https://via.placeholder.com/50"
                    }
                    alt={product.title}
                    className="w-12 h-12 object-cover rounded-md mr-4"
                  />
                  <div>
                    <h3 className="font-semibold">{product.title}</h3>
                    <p>${product.basePrice.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* Selected Product */}
          {selectedProductToRemove && (
            <div className="mt-4 p-4 border border-red-500 rounded-md">
              <h4 className="text-red-500 font-semibold">
                Selected Product to Remove:
              </h4>
              <div className="flex items-center">
                <img
                  src={
                    selectedProductToRemove.image
                      ? `data:image/jpeg;base64,${selectedProductToRemove.image}`
                      : "https://via.placeholder.com/100"
                  }
                  alt={selectedProductToRemove.title}
                  className="w-16 h-16 object-cover rounded-md mr-4"
                />
                <div>
                  <p>{selectedProductToRemove.title}</p>
                  <p>${selectedProductToRemove.basePrice.toFixed(2)}</p>
                </div>
              </div>
              <button
                className="mt-2 px-5 py-3 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white disabled:opacity-50"
                onClick={removeProduct}
                disabled={loading}
              >
                Confirm Remove
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AddRemoveProducts;
