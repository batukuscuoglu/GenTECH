import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import itemData from '../mockData/itemdata';
import Footer from './Footer';

function Items() {
  const { id } = useParams();
  const item = itemData.find((item) => item.id === parseInt(id));

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!item) {
    return <div className="text-center p-4">Item not found.</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="flex flex-col md:flex-row items-center p-8">
        {/* Image on the left */}
        <div className="md:w-1/2 flex justify-center mb-4 md:mb-0">
          <img src={item.imgSrc} alt={item.cardName} className="w-full max-w-md rounded-lg" />
        </div>

        {/* Details on the right */}
        <div className="md:w-1/2 flex flex-col p-4">
          <h1 className="text-3xl font-bold mb-2">{item.cardName}</h1>
          <p className="text-xl mb-2">{item.price}</p>
          <p className="text-lg mb-4">{item.description}</p>
          <button className="text-white bg-primary py-4 px-4 rounded-md transition-all hover:bg-white hover:text-primary hover:border-2 hover:border-primary">
            Add to Cart
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Items;