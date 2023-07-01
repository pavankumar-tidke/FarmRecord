import React, { useState, useEffect, useRef } from 'react';

const DropdownFunctionality = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
   
  const toggleDropdown = () => {
    setIsOpen(!isOpen); 
  };

  const handleItemClick = () => {
    setIsOpen(false);
  };

  return { isOpen, toggleDropdown, handleItemClick, dropdownRef };
};

export default DropdownFunctionality;
