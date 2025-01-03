import Mock_img from '../assets/logo.png';

const itemData = [
  // Smartphones
  { id: 1, cardName: 'iPhone 14 Pro', imgSrc: Mock_img, price: '$999', description: 'Latest iPhone with A16 Bionic chip.', itemCategory: 'Smartphones', stock: 10 },
  { id: 2, cardName: 'Samsung Galaxy S23', imgSrc: Mock_img, price: '$799', description: 'Samsung’s flagship phone with great camera quality.', itemCategory: 'Smartphones', stock: 0 },
  { id: 3, cardName: 'Google Pixel 8', imgSrc: Mock_img, price: '$699', description: 'Google’s latest smartphone with AI features.', itemCategory: 'Smartphones', stock: 15 },
  { id: 4, cardName: 'OnePlus 11', imgSrc: Mock_img, price: '$749', description: 'OnePlus flagship with fast performance and great design.', itemCategory: 'Smartphones', stock: 25 },
  { id: 5, cardName: 'Xiaomi Mi 13', imgSrc: Mock_img, price: '$599', description: 'High-performance smartphone with excellent camera.', itemCategory: 'Smartphones', stock: 12 },
  { id: 6, cardName: 'Sony Xperia 1 IV', imgSrc: Mock_img, price: '$1,199', description: 'Sony’s flagship phone with a 4K display.', itemCategory: 'Smartphones', stock: 8 },
  { id: 7, cardName: 'Asus ROG Phone 6', imgSrc: Mock_img, price: '$999', description: 'Gaming smartphone with high refresh rate display.', itemCategory: 'Smartphones', stock: 18 },
  { id: 8, cardName: 'Nokia XR20', imgSrc: Mock_img, price: '$549', description: 'Rugged smartphone for outdoor enthusiasts.', itemCategory: 'Smartphones', stock: 22 },
  { id: 9, cardName: 'Huawei P50 Pro', imgSrc: Mock_img, price: '$899', description: 'Flagship phone with powerful camera.', itemCategory: 'Smartphones', stock: 14 },
  { id: 10, cardName: 'Realme GT Neo 3', imgSrc: Mock_img, price: '$499', description: 'Budget-friendly smartphone with high-end features.', itemCategory: 'Smartphones', stock: 30 },

  // Laptops
  { id: 21, cardName: 'MacBook Air M2', imgSrc: Mock_img, price: '$1,199', description: 'MacBook Air with M2 chip for faster performance.', itemCategory: 'Laptops', stock: 12 },
  { id: 22, cardName: 'Dell XPS 13', imgSrc: Mock_img, price: '$1,299', description: 'Compact and powerful laptop with Intel i7 processor.', itemCategory: 'Laptops', stock: 10 },
  { id: 23, cardName: 'HP Spectre x360', imgSrc: Mock_img, price: '$1,199', description: 'Convertible laptop with stunning design.', itemCategory: 'Laptops', stock: 5 },
  { id: 24, cardName: 'Razer Blade 15', imgSrc: Mock_img, price: '$2,399', description: 'High-performance gaming laptop with NVIDIA RTX.', itemCategory: 'Laptops', stock: 8 },
  { id: 25, cardName: 'Lenovo ThinkPad X1', imgSrc: Mock_img, price: '$1,399', description: 'Business-class laptop with robust security.', itemCategory: 'Laptops', stock: 7 },
  { id: 26, cardName: 'ASUS ROG Zephyrus', imgSrc: Mock_img, price: '$1,799', description: 'Ultra-slim gaming laptop with AMD Ryzen.', itemCategory: 'Laptops', stock: 4 },
  { id: 27, cardName: 'Acer Swift 5', imgSrc: Mock_img, price: '$999', description: 'Lightweight laptop with good battery life.', itemCategory: 'Laptops', stock: 20 },
  { id: 28, cardName: 'MSI GS66 Stealth', imgSrc: Mock_img, price: '$2,099', description: 'High-end gaming laptop with slim design.', itemCategory: 'Laptops', stock: 6 },
  { id: 29, cardName: 'Microsoft Surface 4', imgSrc: Mock_img, price: '$1,299', description: 'Sleek and powerful productivity laptop.', itemCategory: 'Laptops', stock: 9 },
  { id: 30, cardName: 'Apple MacBook Pro 14"', imgSrc: Mock_img, price: '$1,999', description: 'Professional-grade laptop with M1 Pro chip.', itemCategory: 'Laptops', stock: 3 },

  // Tablets
  { id: 41, cardName: 'iPad Pro', imgSrc: Mock_img, price: '$799', description: 'The ultimate iPad for professionals and creatives.', itemCategory: 'Tablets', stock: 25 },
  { id: 42, cardName: 'Samsung Galaxy Tab S8', imgSrc: Mock_img, price: '$899', description: 'Samsung’s top-tier tablet for productivity and media.', itemCategory: 'Tablets', stock: 15 },
  { id: 43, cardName: 'Microsoft Surface Pro 9', imgSrc: Mock_img, price: '$1,099', description: 'Versatile 2-in-1 device for productivity.', itemCategory: 'Tablets', stock: 10 },
  { id: 44, cardName: 'Lenovo Tab P12 Pro', imgSrc: Mock_img, price: '$599', description: 'High-end tablet for multitasking and creativity.', itemCategory: 'Tablets', stock: 20 },
  { id: 45, cardName: 'Amazon Fire HD 10', imgSrc: Mock_img, price: '$149', description: 'Affordable tablet for everyday use.', itemCategory: 'Tablets', stock: 30 },
  { id: 46, cardName: 'Huawei MatePad Pro', imgSrc: Mock_img, price: '$649', description: 'Tablet with a sleek design and powerful specs.', itemCategory: 'Tablets' },
  { id: 47, cardName: 'Xiaomi Pad 5', imgSrc: Mock_img, price: '$499', description: 'Mid-range tablet with good performance.', itemCategory: 'Tablets' },
  { id: 48, cardName: 'ASUS ROG Flow Z13', imgSrc: Mock_img, price: '$1,499', description: 'Gaming tablet with detachable keyboard.', itemCategory: 'Tablets' },
  { id: 49, cardName: 'Google Pixel Tablet', imgSrc: Mock_img, price: '$799', description: 'Google’s high-performance tablet.', itemCategory: 'Tablets' },
  { id: 50, cardName: 'Apple iPad Air', imgSrc: Mock_img, price: '$599', description: 'Lightweight iPad with great features.', itemCategory: 'Tablets' },
  { id: 51, cardName: 'Lenovo Yoga Tab 13', imgSrc: Mock_img, price: '$679', description: 'Large display for media consumption.', itemCategory: 'Tablets' },
  { id: 52, cardName: 'Samsung Galaxy Tab A8', imgSrc: Mock_img, price: '$229', description: 'Budget-friendly tablet for basic use.', itemCategory: 'Tablets' },
  { id: 53, cardName: 'Microsoft Surface Go 3', imgSrc: Mock_img, price: '$399', description: 'Compact 2-in-1 tablet.', itemCategory: 'Tablets' },
  { id: 54, cardName: 'TCL Tab Pro 5G', imgSrc: Mock_img, price: '$399', description: '5G-capable tablet with decent specs.', itemCategory: 'Tablets' },
  { id: 55, cardName: 'Huawei MatePad T10s', imgSrc: Mock_img, price: '$199', description: 'Affordable tablet with good display.', itemCategory: 'Tablets' },
  { id: 56, cardName: 'Nokia T20', imgSrc: Mock_img, price: '$249', description: 'Sturdy tablet for basic needs.', itemCategory: 'Tablets' },
  { id: 57, cardName: 'Lenovo Smart Tab M10', imgSrc: Mock_img, price: '$249', description: 'Tablet with smart display features.', itemCategory: 'Tablets' },
  { id: 58, cardName: 'ASUS CT100', imgSrc: Mock_img, price: '$299', description: 'Tablet designed for education.', itemCategory: 'Tablets' },
  { id: 59, cardName: 'HP Chromebook x2 11', imgSrc: Mock_img, price: '$599', description: 'Detachable Chromebook tablet.', itemCategory: 'Tablets' },
  { id: 60, cardName: 'Amazon Fire HD 8', imgSrc: Mock_img, price: '$99', description: 'Compact and affordable tablet.', itemCategory: 'Tablets' },

  // Headphones
  { id: 61, cardName: 'Sony WH-1000XM5', imgSrc: Mock_img, price: '$399', description: 'Industry-leading noise-canceling headphones.', itemCategory: 'Headphones' },
  { id: 62, cardName: 'AirPods Pro 2', imgSrc: Mock_img, price: '$249', description: 'Wireless earbuds with active noise cancellation.', itemCategory: 'Headphones' },
  { id: 63, cardName: 'Bose 700', imgSrc: Mock_img, price: '$379', description: 'Premium noise-canceling headphones.', itemCategory: 'Headphones' },
  { id: 64, cardName: 'Beats Studio 3', imgSrc: Mock_img, price: '$349', description: 'Over-ear headphones with great sound.', itemCategory: 'Headphones' },
  { id: 65, cardName: 'Jabra Elite 85h', imgSrc: Mock_img, price: '$249', description: 'Wireless noise-canceling headphones.', itemCategory: 'Headphones' },
  { id: 66, cardName: 'Sennheiser Momentum', imgSrc: Mock_img, price: '$349', description: 'Audiophile-grade sound quality.', itemCategory: 'Headphones' },
  { id: 67, cardName: 'Anker Soundcore Q30', imgSrc: Mock_img, price: '$79', description: 'Affordable noise-canceling headphones.', itemCategory: 'Headphones' },
  { id: 68, cardName: 'Marshall Major IV', imgSrc: Mock_img, price: '$149', description: 'Iconic design with great sound.', itemCategory: 'Headphones' },
  { id: 69, cardName: 'Shure AONIC 50', imgSrc: Mock_img, price: '$299', description: 'High-quality wireless headphones.', itemCategory: 'Headphones' },
  { id: 70, cardName: 'Skullcandy Crusher Evo', imgSrc: Mock_img, price: '$199', description: 'Bass-heavy wireless headphones.', itemCategory: 'Headphones' },
  { id: 71, cardName: 'Bang & Olufsen Beoplay', imgSrc: Mock_img, price: '$899', description: 'Luxury headphones with superior audio.', itemCategory: 'Headphones' },
  { id: 72, cardName: 'Audio-Technica', imgSrc: Mock_img, price: '$199', description: 'Wireless version of the popular M50x.', itemCategory: 'Headphones' },
  { id: 73, cardName: 'Sony WF-1000XM4', imgSrc: Mock_img, price: '$279', description: 'High-end true wireless earbuds.', itemCategory: 'Headphones' },
  { id: 74, cardName: 'Bose Earbuds II', imgSrc: Mock_img, price: '$299', description: 'Noise-canceling earbuds.', itemCategory: 'Headphones' },
  { id: 75, cardName: 'JBL Live 660NC', imgSrc: Mock_img, price: '$199', description: 'Noise-canceling headphones with great sound.', itemCategory: 'Headphones' },
  { id: 76, cardName: 'Philips Fidelio X3', imgSrc: Mock_img, price: '$349', description: 'Open-back headphones for audiophiles.', itemCategory: 'Headphones' },
  { id: 77, cardName: 'AKG N700NC M2', imgSrc: Mock_img, price: '$299', description: 'Noise-canceling headphones with studio quality.', itemCategory: 'Headphones' },
  { id: 78, cardName: 'Grado SR325x', imgSrc: Mock_img, price: '$295', description: 'Open-back headphones with dynamic sound.', itemCategory: 'Headphones' },
  { id: 79, cardName: 'HyperX Cloud Alpha', imgSrc: Mock_img, price: '$159', description: 'Wireless gaming headphones with great battery life.', itemCategory: 'Headphones' },
  { id: 80, cardName: 'Plantronics BackBeat', imgSrc: Mock_img, price: '$149', description: 'Wireless headphones with noise canceling.', itemCategory: 'Headphones' }
];

export default itemData;
