import React, { useState, useEffect } from 'react';
import Navbar from './Navbar/Navbar';
import Card from './Card';
import laptopGif from '../assets/laptop.gif'; // Import the laptop GIF
import phoneGif from '../assets/phone.gif'; // Import the phone GIF
import './Home.css'; // Import the CSS
import Footer from './Footer';
import logo from '../assets/logo.png';
import mockIMG from '../assets/mockIMG.jpg';


function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState([]); // State to store fetched products
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State to handle errors

  const slides = [
    {
      type: 'text',
      title: 'Welcome to GenTECH',
      description: 'Your gateway to innovative technology solutions.',
    },
    {
      type: 'image',
      src: phoneGif,
      overlay: 'Introducing the Latest Smartphones. Experience the future in your hands.',
    },
    {
      type: 'image',
      src: laptopGif,
      overlay: 'Discover the cutting-edge New Laptops. Designed for performance and style.',
    },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/product/get-all-products', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_API_TOKEN_HERE', // Replace with your actual token
          },
          credentials: 'include', // Include cookies if required for session-based auth
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch products. Status: ${response.status}`);
        }

        const data = await response.json();
        setProducts(data); // Set the fetched products to state
        setLoading(false); // Stop loading
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error.message); // Set the error message
        setLoading(false); // Stop loading even on error
      }
    };

    fetchProducts(); // Trigger product fetch on component mount
  }, []);

  // Automatic slide change
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 2800);

    return () => clearInterval(slideInterval);
  }, [slides.length]);

  return (
    <div>
      <Navbar />
      <div className="home-container">
        <div
          className="slide"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) =>
            slide.type === 'text' ? (
              <div key={index} className="slide-content flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold mb-4">{slide.title}</h1>
                <p className="text-lg font-semibold">{slide.description}</p>
              </div>
            ) : (
              <div key={index} className="slide-content">
                <img src={slide.src} alt="Showcase" />
                <div 
                  key={`${slide.overlay}-${currentSlide}`} // Ensure key changes on every slide
                  className="slide-text-overlay animate"
                >
                  {slide.overlay.split('. ').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-4 justify-center p-4">
        {loading ? (
          <p>Loading products...</p> // Display loading message while fetching
        ) : error ? (
          <p>Error: {error}</p> // Display error message if something goes wrong
        ) : (
          products.map((product) => (
            <Card 
              key={product.id}
              cardName={product.title} // Use the title from the fetched data
              to={`/items/${product.id}`} // Link to the product's detail page
              imgSrc={mockIMG} // The image will be handled in the Card component
              price={`$${product.basePrice}`} // Format the price
            />
          ))
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
