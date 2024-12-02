import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar/Navbar'; 
import Card from './Card';
import Footer from './Footer';
import logo from '../assets/logo.png'; // Importing logo.png as the placeholder image
import mockIMG from '../assets/mockIMG.jpg';

function SearchResults() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query') || '';
  const [results, setResults] = useState([]); // Holds search results from the backend
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    if (query) {
      fetchSearchResults(query);
    }
  }, [query]);

  const fetchSearchResults = async (query) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:8080/api/product/search?query=${query}&page=0&size=100`, // Backend search API
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer YOUR_API_TOKEN_HERE', // Replace with actual token
          },
          credentials: 'include', // If session-based auth is used
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch search results. Status: ${response.status}`);
      }

      const data = await response.json();
      setResults(data.content || []); // Update results with the fetched data
      setLoading(false);
      setError(null);
    } catch (err) {
      console.error('Error fetching search results:', err);
      setError('Failed to load search results.');
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Search Results for "{query}"</h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : results.length > 0 ? (
          <div className="flex flex-wrap gap-4">
            {results.map((item) => (
              <Card 
                key={item.id}
                to={`/items/${item.id}`}
                cardName={item.title} // Use backend-provided title
                imgSrc={mockIMG} // Always use logo.png as the image
                price={`$${item.basePrice}`} // Use backend-provided price
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-lg">No results found for "{query}".</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default SearchResults;
