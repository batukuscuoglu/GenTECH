import React from 'react';
import { NavbarMenu } from '../../mockData/data';
import { MdClose } from 'react-icons/md';

const ResponsiveMenu = ({ open, setOpen }) => {
  return (
    <div
      className={`fixed top-0 right-0 w-3/4 h-full bg-white shadow-lg transform ${
        open ? 'translate-x-0' : 'translate-x-full'
      } transition-transform duration-300 ease-in-out z-50`}
    >
      <div className="flex justify-end p-4">
        <button onClick={() => setOpen(false)}>
          <MdClose className="text-3xl" />
        </button>
      </div>
      <ul className="flex flex-col items-center gap-4 mt-8">
        {NavbarMenu.map((item) => (
          <li key={item.id} className="text-lg font-semibold w-full">
            <a
              href={item.link}
              className="block w-full py-2 px-4 text-gray-700 hover:bg-primary hover:text-white rounded-md transition-colors duration-200 text-center"
              onClick={() => setOpen(false)} // Close the menu when an item is clicked
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
      <div className="mt-12 w-full flex justify-center">
        <a href="/login">
          <button className="w-3/4 bg-primary text-white py-3 px-6 flex items-center justify-center text-center rounded-md font-semibold transition-all duration-200 hover:bg-white hover:text-primary hover:border-2 hover:border-primary">
            Login
          </button>
        </a>
      </div>
    </div>
  );
};

export default ResponsiveMenu;
