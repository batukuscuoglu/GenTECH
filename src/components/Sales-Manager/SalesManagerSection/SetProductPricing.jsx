import React, { useState, useEffect } from "react";

const SetProductPricing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch search results
  useEffect(() => {
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

    const delayDebounce = setTimeout(() => {
      fetchSearchResults();
    }, 300); // Debounce API calls

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  // Update price
  const updatePrice = async () => {
    if (!selectedProduct || !price) {
      alert("Please select a product and provide a price.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/api/sm/product/${selectedProduct.id}/update-price/${price}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        alert("Price updated successfully.");
        const updatedProduct = { ...selectedProduct, basePrice: parseFloat(price) };
        setSelectedProduct(updatedProduct); // Update the selected product with the new price
      } else {
        alert("Failed to update price.");
      }
    } catch (error) {
      console.error("Error updating price:", error);
    } finally {
      setLoading(false);
    }
  };

  // Update discount
  const updateDiscount = async () => {
    if (!selectedProduct || !discount) {
      alert("Please select a product and provide a discount.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/api/sm/product/${selectedProduct.id}/apply-discount/${discount}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        alert("Discount updated successfully.");
        const discountValue = (selectedProduct.basePrice * (1 - discount / 100)).toFixed(2);
        const updatedProduct = { ...selectedProduct, basePrice: parseFloat(discountValue) };
        setSelectedProduct(updatedProduct); // Update the selected product with the discounted price
      } else {
        alert("Failed to update discount.");
      }
    } catch (error) {
      console.error("Error updating discount:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle product selection
  const handleProductSelect = (product) => {
    setSelectedProduct(product); // Set selected product
    setSearchResults([]); // Clear search results to close the sliding window
    setSearchQuery(""); // Clear the search query
  };

  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-secondary">
        Set Product Pricing & Discounts
      </h2>
      <div className="flex flex-col gap-4">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search Product Name"
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="border p-4 rounded-md shadow-md max-h-48 overflow-y-auto">
            {searchResults.map((product) => (
              <div
                key={product.id}
                className={`flex items-center p-2 cursor-pointer hover:bg-gray-200 ${
                  selectedProduct?.id === product.id ? "bg-gray-200" : ""
                }`}
                onClick={() => handleProductSelect(product)}
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
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{product.title}</h3>
                  <p className="text-gray-600">${product.basePrice.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Selected Product Details */}
        {selectedProduct && (
          <div className="p-4 border rounded-md shadow-md">
            <div className="flex items-center gap-4">
              <img
                src={
                  selectedProduct.image
                    ? `data:image/jpeg;base64,${selectedProduct.image}`
                    : "https://via.placeholder.com/100"
                }
                alt={selectedProduct.title}
                className="w-20 h-20 object-cover rounded-md"
              />
              <div>
                <h3 className="text-lg font-semibold">{selectedProduct.title}</h3>
                <p className="text-gray-600">ID: {selectedProduct.id}</p>
                <p className="text-gray-600">
                  Current Price: ${selectedProduct.basePrice.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Price and Discount Inputs with Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="New Price"
              className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <button
              className="px-4 py-2 border border-secondary text-secondary rounded-lg hover:bg-secondary hover:text-white disabled:opacity-50 font-bold"
              onClick={updatePrice}
              disabled={loading}
            >
              Update Price
            </button>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Discount (%)"
              className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            />
            <button
              className="px-4 py-2 border border-secondary text-secondary rounded-lg hover:bg-secondary hover:text-white disabled:opacity-50 font-bold"
              onClick={updateDiscount}
              disabled={loading}
            >
              Update Discount
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SetProductPricing;
