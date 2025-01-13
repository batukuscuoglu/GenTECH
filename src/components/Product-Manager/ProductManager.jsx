import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Navbar from '../Navbar/Navbar.jsx';
import Footer from '../Footer.jsx';
import AddRemoveProducts from './ProductManagerSection/AddRemoveProducts';
import ManageCategories from './ProductManagerSection/ManageCategories';
import AdjustStockLevels from './ProductManagerSection/AdjustStockLevels';
import ViewInvoices from './ProductManagerSection/ViewInvoices';
import ApproveComments from './ProductManagerSection/ApproveComments';
import DeliveryList from './ProductManagerSection/DeliveryList';
import StatusTracking from './ProductManagerSection/StatusTracking';

const sections = [
   {
       title: 'Add or Remove Products',
       component: <AddRemoveProducts />,
   },
   {
       title: 'Manage Categories',
       component: <ManageCategories />,
   },
   {
       title: 'Adjust Stock Levels',
       component: <AdjustStockLevels />,
   },
   {
       title: 'View Invoices',
       component: <ViewInvoices />,
   },
   {
       title: 'Approve or Disapprove Comments',
       component: <ApproveComments />,
   },
   {
       title: 'Delivery List',
       component: <DeliveryList />,
   },
   {
    title: 'Status Tracking',
    component: <StatusTracking />,
  },  
];

const ProductManager = () => {
   const [expandedSection, setExpandedSection] = useState(null);

   const toggleSection = (index) => {
       setExpandedSection(expandedSection === index ? null : index);
   };

   return (
       <div className="w-full min-h-screen bg-gray-100 text-gray-900">
           <Navbar />

           <header className="bg-gray-50 shadow-sm px-8 py-4">
               <div className="container mx-auto">
                   <h1 className="text-3xl font-bold text-secondary tracking-tight">
                       Product Manager Dashboard
                   </h1>
                   <p className="text-gray-500 mt-2">
                       Add products, manage stock, and oversee deliveries.
                   </p>
               </div>
           </header>

           <main className="container mx-auto p-8 space-y-8">
               {sections.map((section, index) => (
                   <div key={index} className="mb-6">
                       <div
                           onClick={() => toggleSection(index)}
                           className="flex items-center justify-between text-xl font-semibold cursor-pointer mb-2 p-4 rounded-md transition-all duration-300 bg-secondary text-white hover:bg-white hover:text-secondary hover:border-2 hover:border-secondary shadow-md"
                       >
                           {section.title}
                           <span className="ml-2 text-lg">
                               {expandedSection === index ? <FaChevronUp /> : <FaChevronDown />}
                           </span>
                       </div>
                       <div
                           className={`${
                               expandedSection === index ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                           } overflow-hidden transition-all duration-500 ease-in-out transform ${
                               expandedSection === index ? 'translate-y-0' : '-translate-y-2'
                           }`}
                       >
                           <div className="p-4">
                               {section.component}
                           </div>
                       </div>
                   </div>
               ))}
           </main>

           <Footer />
       </div>
   );
};

export default ProductManager;
