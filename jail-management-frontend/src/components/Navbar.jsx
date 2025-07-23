import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [description, setDescription] = useState('');
  const boxRef = useRef(null);
  const navigate = useNavigate();

  const homeDesc = "Welcome to the Jail Management System – a secure and efficient way to manage prisoner records, track sentence durations, monitor statuses, and streamline jail administration. Built with Node.js and React for better control and transparency.";
  const aboutDesc = "This Jail Management System is designed for handling day-to-day operations inside a prison. It manages prisoner data, sentence status (active/inactive), entry logs, and more. The system is ideal for learning how backend APIs work with real-world concepts.";
  const contactDesc = "Need support or want to contribute to this project? Reach out at jailadmin@systemsecure.com or check out the GitHub repository for more updates and collaborations.";

  const handleSetDescription = (desc) => {
    setDescription(desc);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // If ref is assigned and clicked target is NOT inside the box
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        setDescription('');
      }
    };

    // Listen for all document clicks
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <nav className="flex bg-emerald-800 px-6 py-4 shadow-md text-white items-center justify-between relative">
        <span className="material-symbols-outlined">allergies</span>

        <div className="font-bold text-lg px-10 absolute left-[45%] hidden xl:block">
          Jail Management System
        </div>

        <ul className="flex gap-[20px] z-10">
          <li onClick={(e) => handleSetDescription(homeDesc)} className="cursor-pointer hover:font-bold text-sm lg:text-lg">
            Home
          </li>
          <li onClick={(e) => handleSetDescription(aboutDesc)} className="cursor-pointer hover:font-bold text-sm lg:text-lg">
            About Us
          </li>
          <li onClick={(e) => handleSetDescription(contactDesc)} className="cursor-pointer hover:font-bold text-sm lg:text-lg">
            Contact Us
          </li>
          <li onClick={() => navigate('/login')} className="cursor-pointer hover:font-bold text-sm lg:text-lg">
            Login
          </li>
        </ul>
      </nav>

      <div
        ref={boxRef}
        className={`z-10 content max-w-[80vw] md:max-w-[50vw] lg:max-w-[20vw] min-h-[40px] border border-white bg-gray-700 rounded-2xl p-4 absolute right-0 mt-2 mr-4 transition-all duration-300 ease-in-out ${!description ? 'hidden' : 'block'
          }`}
      >
        {description}
      </div>
    </div>
  );
};

export default Navbar;
