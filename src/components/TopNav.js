import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import ThemeToggle from './ThemeToggle';

function TopNav() {

    const [url, setUrl] = useState(window.location.pathname);

    useEffect(() => {
        const handleUrlChange = () => {
            setUrl(window.location.pathname);
        };
 
        window.addEventListener('popstate', handleUrlChange);
 
        return () => {
            window.removeEventListener('popstate', handleUrlChange);
        };
    }, []);
    
    
  return (
    <div className="breadcrumb lg drop-shadow-lg sticky top-0 py-1 border-b-[1px] border-gray-500 bg-slate-50 dark:bg-slate-800 z-30">
        <nav className="flex justify-between backdrop-blur-lg px-2 text-gray-700 w-full rounded-lg sm:flex sm:px-2" aria-label="Breadcrumb">
            <div className="inline-flex space-x-1 md:space-x-3 w-full sm:mb-0">
                <div className="text-base font-sm text-white flex">
                    <div className="w-full">
                        <div className="flex justify-between py-1 w-full">
                            <div className="flex">
                                <button onClick={() => window.history.back()}  className="mr-2 text-slate-900 dark:text-white text-sm align-middle my-auto"><span className="material-symbols-outlined align-middle"> arrow_back </span></button>
                                <span className="space-x-2 text-lg font-semibold">Test path</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex text-white">
                <div className="flex space-x-3 my-auto">

                    {/* Theme toggle */}
                    {url === '/vw' && (
                        <span id="dropdownMenuIconButton" data-dropdown-toggle="moreOptions" className="material-symbols-outlined align-middle text-slate-900 dark:text-white">search</span>)}
                    <ThemeToggle />
                    
                    <span id="dropdownMenuIconButton" data-dropdown-toggle="moreOptions" className="material-symbols-outlined align-middle text-slate-900 dark:text-white " > more_vert </span>
 
                    {/* Dropdown menu */}
                    <div id="moreOptions" className="z-10 px-2 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
                            <li>
                                <Link role="button" to="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                            </li>  
                        </ul>
                        <div className="py-2 flex">
                            <span className="material-symbols-outlined my-auto mr-2 align-middle text-red-600 dark:text-red-600" style={{ fontVariationSettings: "'opsz' 20", textSize: "15px !important" }}> logout </span>
                            <Link role="button" to="/auth/userlogout/" className="block py-2 font-bold text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-red-600 dark:hover:text-white">Log Out</Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </div>

  )
}

export default TopNav   