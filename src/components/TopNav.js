import React, { useEffect, useState } from 'react'
import { Link, useLocation } from "react-router-dom"; 
import ThemeToggle from './ThemeToggle';
import DropdownFunctionality from '../utils/DropdownFunctionality';

function TopNav(props) {

    const loc = useLocation();
    const { isOpen, toggleDropdown, handleItemClick, dropdownRef } = DropdownFunctionality();
    const [searchIcon, setSearchIcon] = useState(false);    
    
    //  write a code to hide search icon on all pages except VIewWork page
    useEffect(() => {
        const getPageTitle = () => {
            const pageTitleMap = {
                '/vw': true,
            };

            const pageTitle = pageTitleMap[loc.pathname] || true;
            return pageTitle;
        };

        setSearchIcon(getPageTitle());
    }, [loc.pathname]);

    
    
  return (
    <div className="breadcrumb lg drop-shadow-lg fixed w-full top-0 py-1 border-b-[1px] border-gray-500 bg-slate-50 dark:bg-slate-800 z-30">
        <nav className="flex justify-between backdrop-blur-lg px-2 py-2 text-gray-700 w-full rounded-lg sm:flex sm:px-2" aria-label="Breadcrumb">
            <div className="inline-flex space-x-1 md:space-x-3 w-full sm:mb-0">
                <div className="text-base font-sm text-white flex">
                    <div className="w-full">
                        <div className="flex justify-between w-full">
                            <div className="flex">
                                <button onClick={() => window.history.back()}  className="mr-2 text-slate-900 dark:text-white text-sm align-middle my-auto"><span className="material-symbols-outlined align-middle"> arrow_back </span></button>
                                <span className="space-x-2 text-lg font-semibold"> {props.pageTitle} </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex relative space-x-3 my-auto text-white"> 

                {/* Theme toggle */}
                {searchIcon && (
                    <span id="dropdownMenuIconButton" data-dropdown-toggle="moreOptions" className="material-symbols-outlined align-middle text-slate-900 dark:text-white">search</span>)
                }
                <ThemeToggle />
                
                <span onClick={() => {toggleDropdown()}} id="moreOptions" className="material-symbols-outlined align-middle relative text-slate-900 dark:text-white " > more_vert </span>

                {/* Dropdown menu */}
                {/* <Dropdown color={'dark'} /> */}
                
                
                <div  ref={dropdownRef} className={` z-10 px-2 ${(isOpen) ? '' : 'hidden'} absolute top-7 right-1 inline-flex ease-in-out transition-all duration-200 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`} aria-orientation="vertical">
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                        <li onClick={handleItemClick}>
                            <Link role="button" to="/aw" className="block px-4 py-2">Dashboard</Link>
                        </li>  
                    </ul> 
                </div>
 
            </div>
        </nav>
    </div>

  )
}

export default TopNav   