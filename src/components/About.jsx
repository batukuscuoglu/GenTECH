import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Navbar from './Navbar/Navbar';
import Footer from './Footer';

const sections = [
  {
    title: 'Our Mission',
    content: `At GenTECH, we believe in the power of technology to drive meaningful change. Our mission is to bridge the gap between innovation and usability, offering products that are as intuitive as they are powerful. We focus on developing technology that simplifies lives, boosts productivity, and enables our clients to stay ahead in an ever-evolving digital landscape.`
  },
  {
    title: 'Why Choose GenTECH?',
    content: `Our team is passionate about creating tech solutions that are accessible, high-performing, and tailored to the unique needs of each user. With expertise across software, hardware, and service design, we continuously push boundaries to stay at the forefront of the tech industry. We prioritize user satisfaction, innovation, and quality in everything we do.`
  },
  {
    title: 'Our Values',
    content: `Innovation: We are driven by a commitment to continuous improvement and the exploration of new ideas. At GenTECH, innovation isn’t just a goal; it’s our culture.
    Customer-Centric Approach: Your needs are our priority. We listen, learn, and design solutions with our customers in mind, ensuring that every product and service exceeds expectations.
    Integrity and Quality: From the first concept to the final product, we maintain the highest standards of quality and transparency.
    Sustainability: We strive to make a positive impact on the environment by adopting sustainable practices in our operations and product design.`
  },
  {
    title: 'Our Journey',
    content: `Founded by a group of tech enthusiasts with a shared vision, GenTECH started as a small startup and has grown into a trusted name in the technology industry. Over the years, we’ve developed a diverse range of products that cater to both personal and professional needs, and we are continuously expanding our offerings to meet the demands of a rapidly advancing world.`
  },
  {
    title: 'Join Us in Shaping the Future',
    content: `At GenTECH, we are always looking ahead. Our team is dedicated to making the world a smarter, more connected place through technology. Whether you’re looking for powerful tech solutions for your business or innovative gadgets for personal use, GenTECH is here to help you embrace the future.`
  }
];

function About() {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (index) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  return (
    <div className="overflow-y-auto no-scrollbar h-full">
      <Navbar />
      <div className="w-screen text-center bg-gray-100 p-6">
        <h1 className="text-4xl font-bold text-secondary mb-8">About Us</h1>

        <p className="text-lg mb-6 w-4/5 mx-auto">
          Welcome to <strong>GenTECH</strong>, where innovation meets functionality. As a forward-thinking technology company, we’re committed to providing cutting-edge solutions that enhance everyday experiences. Our mission is to empower individuals and businesses with the latest in technology, transforming ideas into practical, efficient, and scalable solutions.
        </p>

        <div className="w-4/5 mx-auto">
          {sections.map((section, index) => (
            <div key={index} className="text-center mb-6">
              <div
                onClick={() => toggleSection(index)}
                className="flex items-center justify-center text-2xl font-semibold cursor-pointer mb-2 p-4 rounded-md transition-all duration-300 
                  bg-secondary text-white hover:bg-white hover:text-primary hover:border-2 hover:border-secondary shadow-md"
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
                <p className="text-lg mt-2 px-4">{section.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About;