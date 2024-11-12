import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavbarMenu } from '../../mockData/data';
import { CiSearch } from 'react-icons/ci';
import { MdMenu } from 'react-icons/md';
import { GrTechnology } from 'react-icons/gr';
import { PiShoppingCart } from 'react-icons/pi';
import ResponsiveMenu from './ResponsiveMenu';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim() !== '') {
      navigate(`/search?query=${searchQuery}`);
      setSearchQuery('');
      setSearchOpen(false);
    }
  };

  return (
    <>
      <nav>
        <div className="container flex justify-between items-center py-4">
          {/* Logo Section */}
          <a href="/">
            <div className="text-2xl flex items-center gap-2 font-bold py-8">
              <GrTechnology />
              <p>Gen</p>
              <p className="text-secondary">TECH</p>
            </div>
          </a>

          {/* Menu Section */}
          <div className="hidden md:block">
            <ul className="flex items-center gap-6 text-gray-600">
              {NavbarMenu.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.link}
                    className="inline-block py-1 px-3 hover:text-primary font-semibold"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Icons Section */}
          <div className="flex items-center gap-4">
            {searchOpen && (
              <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              className="border-2 border-primary p-2 rounded-md text-black w-48 transition-all duration-200 focus:border-secondary hover:border-secondary bg-white focus:outline-none focus:ring-2 focus:ring-secondary z-10"
            />
            )}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-2xl hover:bg-primary hover:text-white rounded-full p-2 duration-200"
            >
              <CiSearch />
            </button>
            <a href="/cart">
              <button className="text-2xl hover:bg-primary hover:text-white rounded-full p-2 duration-200">
                <PiShoppingCart />
              </button>
            </a>
            <a href="/login">
              <button className="hover:bg-primary text-primary font-semibold hover:text-white rounded-md border-2 border-primary py-2 px-6 duration-200 hidden md:block">
                Login
              </button>
            </a>
          </div>

          {/* Mobile Hamburger Menu Section */}
          <div className="md:hidden" onClick={() => setOpen(!open)}>
            <MdMenu className="text-4xl" />
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Section */}
      <ResponsiveMenu open={open} setOpen={setOpen} />
    </>
  );
};

export default Navbar;
