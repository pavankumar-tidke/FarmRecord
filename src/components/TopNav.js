import React from 'react'
import { Link } from "react-router-dom";

function TopNav() {
  return (
    <div className="breadcrumb lg drop-shadow-xl sticky top-0 py-1 border-b-[1px] border-gray-500 bg-slate-50 dark:bg-slate-800 z-30">
        <nav className="flex justify-between backdrop-blur-lg pt-1 px-2 text-gray-700 w-full rounded-lg sm:flex sm:px-2" aria-label="Breadcrumb">
            <div className="inline-flex space-x-1 md:space-x-3 w-full sm:mb-0">
                <div className="text-base font-sm text-white flex">
                    <div className="w-full">
                        <div className="flex justify-between py-1 w-full">
                            <div className="flex">
                                <button onClick={() => window.history.back()}  className="mr-1 text-slate-900 dark:text-white text-sm align-middle my-auto"><span className="material-symbols-outlined align-middle" style={{ fontVariationSettings: "'opsz' 20", textSize: "15px !important" }}> arrow_back </span></button>
                                <span className="space-x-1 text-lg font-semibold">test path</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex text-white">
                <div className="flex space-x-3">
                    <span className="material-symbols-outlined align-middle text-slate-900 dark:text-white" style={{ fontVariationSettings: "'opsz' 20", textSize: "15px !important" }}> add </span>
                    <span id="dropdownMenuIconButton" data-dropdown-toggle="moreOptions" className="material-symbols-outlined align-middle text-slate-900 dark:text-white" style={{ fontVariationSettings: "'opsz' 20", textSize: "15px !important" }}> more_vert </span>

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