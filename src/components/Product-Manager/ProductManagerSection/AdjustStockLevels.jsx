import React, { useState } from 'react';

const AdjustStockLevels = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [stockQuantity, setStockQuantity] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch search results
  const fetchSearchResults = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:8080/api/product/search?query=${searchQuery}&page=0&size=5`,
        {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.content || []);
      } else {
        console.error('Failed to fetch search results.');
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  // Update stock
  const updateStock = async () => {
    if (!selectedProduct || !stockQuantity) {
      alert('Please select a product and enter the stock quantity.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/api/pm/product/${selectedProduct.id}/change-stock?newStock=${stockQuantity}`,
        {
          method: 'PATCH',
          credentials: 'include', // Include credentials for authentication
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        alert(`Stock updated successfully for product: ${data.title}.`);
        setSelectedProduct(null);
        setSearchQuery('');
        setSearchResults([]);
        setStockQuantity('');
      } else {
        const errorData = await response.text();
        alert(`Failed to update stock: ${errorData}`);
      }
    } catch (error) {
      console.error('Error updating stock:', error);
      alert('An error occurred while updating stock.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-secondary">Adjust Stock Levels</h2>
      <div className="flex flex-col gap-4">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search Product by Name"
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            fetchSearchResults();
          }}
        />
        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="border p-4 rounded-md shadow-md max-h-48 overflow-y-auto">
            {searchResults.map((product) => (
              <div
                key={product.id}
                className={`flex items-center p-2 border-b hover:bg-gray-100 ${
                  selectedProduct?.id === product.id ? 'bg-primary text-white' : ''
                }`}
                onClick={() => {
                  setSelectedProduct(product);
                  setSearchResults([]);
                }}
              >
                <img
                  src={
                    product.image
                      ? `data:image/jpeg;base64,${product.image}`
                      : 'https://via.placeholder.com/50'
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
        {selectedProduct && (
          <div className="p-4 border border-primary rounded-md">
            <h4 className="text-primary font-semibold">Selected Product:</h4>
            <div className="flex items-center">
              <img
                src={
                  selectedProduct.image
                    ? `data:image/jpeg;base64,${selectedProduct.image}`
                    : 'https://via.placeholder.com/100'
                }
                alt={selectedProduct.title}
                className="w-16 h-16 object-cover rounded-md mr-4"
              />
              <div>
                <p>{selectedProduct.title}</p>
                <p>${selectedProduct.basePrice.toFixed(2)}</p>
              </div>
            </div>
          </div>
        )}
        {/* Stock Quantity Input */}
        <input
          type="number"
          placeholder="Stock Quantity"
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          value={stockQuantity}
          onChange={(e) => setStockQuantity(e.target.value)}
        />
        {/* Update Stock Button */}
        <button
          className="px-5 py-3 bg-primary text-white rounded-lg hover:bg-secondary disabled:opacity-50"
          onClick={updateStock}
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Stock'}
        </button>
      </div>
    </section>
  );
};

export default AdjustStockLevels;
