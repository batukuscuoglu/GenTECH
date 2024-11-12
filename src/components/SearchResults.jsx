import React from 'react';
import { useLocation } from 'react-router-dom';
import itemData from '../mockData/itemdata';
import Navbar from './Navbar/Navbar'; 
import Card from './Card';
import Footer from './Footer';

function SearchResults() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query') || '';
  const filteredItems = itemData.filter(item =>
    item.cardName.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Search Results for "{query}"</h1>
        {filteredItems.length > 0 ? (
          <div className="flex flex-wrap gap-4">
            {filteredItems.map(item => (
              <Card 
                key={item.id}
                to={`/items/${item.id}`}
                cardName={item.cardName}
                imgSrc={item.imgSrc}
                price={item.price}
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
