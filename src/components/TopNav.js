import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import DropdownFunctionality from "../utils/DropdownFunctionality";
import SearchIconVisibility from "../utils/SearchIconVisibility";

function TopNav(props) {
  const { isOpen, toggleDropdown, handleItemClick, dropdownRef } =
    DropdownFunctionality();
  const { searchIcon } = SearchIconVisibility();
 
  
  return (
    <motion.div 
        initial="initial"
        animate="animate"  
        className="breadcrumb lg drop-shadow-lg fixed w-full top-0 py-1 border-b-[1px] border-gray-500 bg-slate-50 dark:bg-slate-800 z-30">
      <nav
        className="flex justify-between backdrop-blur-lg px-2 py-2 text-gray-700 w-full rounded-lg sm:flex sm:px-2"
        aria-label="Breadcrumb"
      >
        <div className="inline-flex space-x-1 md:space-x-3 w-full sm:mb-0">
          <div className="text-base font-sm text-white flex">
            <div className="w-full">
              <div className="flex justify-between w-full">
                <div className="flex">
                  <button
                    onClick={() => window.history.back()}
                    className="mr-2 text-slate-900 dark:text-white text-sm align-middle my-auto"
                  >
                    <span className="material-symbols-outlined align-middle">
                      {" "}
                      arrow_back{" "}
                    </span>
                  </button>
                  <span className="space-x-2 text-lg font-semibold">
                    {" "}
                    {props.pageTitle}{" "}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex relative space-x-4 my-auto text-white">

        <span  
            onClick={() => { window.location.reload(); }}
              className="material-symbols-outlined align-middle text-slate-900 dark:text-white"
            >
              refresh
            </span>
          
          {/* Theme toggle */}
          {searchIcon && (
            <span
              id="dropdownMenuIconButton"
              data-dropdown-toggle="moreOptions"
              className="material-symbols-outlined align-middle text-slate-900 dark:text-white"
            >
              search
            </span>
          )}
          <ThemeToggle />

          <span
            onClick={() => {
              toggleDropdown();
            }}
            id="moreOptions"
            className="material-symbols-outlined align-middle relative text-slate-900 dark:text-white "
          > 
            more_vert 
          </span>

          {/* Dropdown menu */}
          {/* <Dropdown color={'dark'} /> */}

          <div
            ref={dropdownRef}
            className={` z-10 px-2 ${
              isOpen ? "" : "hidden"
            } absolute  right-1 inline-flex ease-in-out transition-all duration-200 bg-white divide-y divide-gray-100 rounded-lg shadow w-60 dark:bg-gray-700 dark:divide-gray-600`}
            aria-orientation="vertical"
          >
            <ul className="py-2 px-4 text-base font-normal space-y-2 text-gray-700 dark:text-gray-200">
              <li onClick={handleItemClick} className="flex">
                <span className="material-symbols-outlined my-auto">home</span>
                <Link to="/dashboard" className="block px-4 py-2">
                  Dashboard
                </Link>
              </li>
              <li onClick={handleItemClick} className="flex">
                <span className="material-symbols-outlined my-auto">
                  view_agenda
                </span>
                <Link to="/vw" className="block px-4 py-2">
                  View Work
                </Link>
              </li>
              <li onClick={handleItemClick} className="flex">
                <span className="material-symbols-outlined my-auto">home</span>
                <Link to="/aw" className="block px-4 py-2">
                  Add Work
                </Link>
              </li>
              <li onClick={handleItemClick} className="flex">
                <span className="material-symbols-outlined my-auto">
                  database
                </span>
                <Link to="/dashboard" className="block px-4 py-2">
                  Database
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </motion.div>
  );
}

export default TopNav;
