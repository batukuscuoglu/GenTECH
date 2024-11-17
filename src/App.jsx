import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './components/Home';
import SignIn from './components/Login';
import ItemPage from './components/Item-Page';
import About from './components/About';
import Categories from './components/Categories';
import Cart from './components/Cart';
import CheckoutPage from './components/CheckoutPage';
import SearchResults from './components/SearchResults';
import AllProducts from './components/AllProducts';
import PaymentConfirmation from './components/PaymentConfirmation';
import ProductManager from './components/Product-Manager';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/items/:id" element={<ItemPage onCategorySelect={handleCategorySelect} />} />
        <Route path="/about" element={<About />} />
        <Route path="/categories" element={<Categories selectedCategory={selectedCategory} onCategorySelect={handleCategorySelect} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/all-products" element={<AllProducts />} />
        <Route path="/payment-confirmation" element={<PaymentConfirmation />} />
        <Route path="/product-manager" element={<ProductManager />} />
      </Routes>
    </Router>
  );
}

export default App;
