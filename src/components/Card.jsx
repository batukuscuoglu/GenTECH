import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ to, cardName, imgSrc, price }) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [currentImgSrc, setCurrentImgSrc] = useState(null);

  // Lazy-load image when card is in the viewport
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true); 
          setCurrentImgSrc(imgSrc);
          observer.disconnect();
        }
      });
    });

    const cardElement = document.getElementById(`card-${cardName}`);
    if (cardElement) observer.observe(cardElement);

    return () => {
      if (cardElement) observer.unobserve(cardElement);
    };
  }, [imgSrc, cardName]);

  return (
    <div
      onClick={() => navigate(to)}
      id={`card-${cardName}`}
      className="w-full max-w-[200px] mx-auto my-4 rounded-2xl overflow-hidden cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg bg-gray-600"
    >
      {isVisible && (
        <div className="overflow-hidden">
          <img
            src={currentImgSrc}
            alt={cardName}
            className="w-full h-[70%] object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
      )}
      <div className="flex flex-col items-center p-2 bg-gray-600">
        <div className="text-white font-bold text-md">{cardName}</div>
        <div className="text-white font-semibold text-sm">{price}</div>
      </div>
      
    </div>
  );
};

export default Card;
