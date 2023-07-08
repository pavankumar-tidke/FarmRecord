import React, { useState } from "react";
import CustSpin from "./CustSpin";
import DropdownFunctionality from "../utils/DropdownFunctionality";

const ProdCard = ({ cardId, prod, handleEdit, handleDelete, viewWork }) => {

  const { isOpen, toggleDropdown, dropdownRef } = DropdownFunctionality(); 
  // handleItemClick
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    setLoading(true);
    await handleDelete(prod.pk, 'prodview');
    setLoading(false);
  };


  const image = {
    "Soyabin": "soyabin.png",
    "Chana": "chana.png",
    "Soyabin, Chana": "soyabinchana.png",
  }
  const selectedImage = image[prod.fields.crop_name]; 

  return (
    <div
      id={cardId}
      className="flex w-full bg-white border border-gray-300 rounded-2xl shadow-xl dark:shadow-gray-900 dark:bg-gray-800 dark:border-gray-700"
    >
      <div onClick={() => viewWork(prod, "prodview")} className="w-3/12">
        <img
          className="h-full w-full rounded-lg bg-cover"
          src={process.env.PUBLIC_URL + `/media/work/${selectedImage}`}
          alt={prod.fields.crop_name}
        />
      </div>
      <div className="w-9/12 justify-between px-2">
        <div className="w-full bg-">
          <div className="w-full ">
            <div className="flex justify-between">
              <div
                onClick={() => viewWork(prod, "prodview")}
                className="w-full mr-5"
              >
                <h5 className="text-xl font-semibold tracking-tight truncate overflow-hidden text-gray-900 dark:text-white">
                  {prod.fields.crop_name}
                </h5>
                <h5 className="text-sm py-2 font-medium w-full truncate text-slate-500 dark:text-slate-400 ">
                  {prod.fields.crop_desc}
                </h5>
              </div>
              <div>
                <span
                    onClick={() => toggleDropdown()}
                  className="flex  justify-end material-symbols-outlined align-middle text-blue-700 dark:text-blue-500"
                  style={{ fontVariationSettings: "'opsz' 20" }}
                >
                  more_vert
                </span>

                <div
                    ref={dropdownRef}
                    className={` z-50 px-2 ${
                    isOpen ? "" : "hidden"
                    } absolute right-5 inline-flex ease-in-out transition-all duration-200 bg-white divide-y divide-gray-100 rounded-lg shadow w-32 dark:bg-slate-700 dark:divide-gray-600`}
                    aria-orientation="vertical"
                >
                    <ul className="py-2 px-1 text-base font-normal space-y-2 text-gray-700 dark:text-gray-200">
                        <li onClick={() => handleEdit(prod, 'prodedit')} className="flex w-full">
                            <h5 className="flex py-1 font-semibold">
                                <span  className="flex mr-2 justify-end material-symbols-outlined small-medium my-auto text-blue-700 dark:text-blue-500" style={{ fontVariationSettings: "'opsz' 20", textSize: "15px !important" }} >
                                    edit
                                </span>
                                Edit
                            </h5> 
                        </li>
                        <li onClick={onDelete} className="flex">
                            <h5 className="flex py-1 font-semibold">
                                <span  className="flex mr-2 justify-end material-symbols-outlined small-medium my-auto text-red-600 dark:text-red-500" style={{ fontVariationSettings: "'opsz' 20", textSize: "15px !important" }}>
                                    {
                                        loading 
                                        ? ( <CustSpin /> ) 
                                        : ( 'delete' )
                                    }
                                </span>
                                Delete
                            </h5>
                        </li>
                    </ul>
                </div>
              </div>
            </div>
            <div
              onClick={() => viewWork(prod, "prodview")}
              className="grid grid-cols-2 py-1 border-t border-gray-200 dark:border-gray-700 w-full "
            >
              <h5 className="flex  py-1.5  text-base truncate w-full font-semibold  dark:border-gray-700 text-gray-900 dark:text-gray-200">
                <span
                  className="material-symbols-outlined small-icon my-auto align-middle text-blue-700 dark:text-blue-500 mr-2"
                  style={{ fontVariationSettings: "'opsz' 20" }}
                >
                  currency_rupee
                </span>
                {prod.fields.crop_amount} /-
              </h5>
              <h5 className="flex py-1.5 text-base w-full overflow-hidden font-semibold dark:border-gray-700 text-gray-800 dark:text-gray-300">
                <span
                  className="material-symbols-outlined small-icon my-auto align-middle text-blue-700 dark:text-blue-500 mr-2"
                  style={{ fontVariationSettings: "'opsz' 20" }}
                >
                  location_on
                </span>
                {prod.fields.sell_location}
              </h5>
            </div>
          </div>
        </div>
        <div className="flex w-full">

 
          {/* <span
            onClick={() => handleEdit(prod)}
            className="flex justify-end material-symbols-outlined align-middle text-blue-700 dark:text-blue-500"
            style={{ fontVariationSettings: "'opsz' 20", textSize: "15px !important" }}
          >
            edit
          </span>
          <span
              onClick={onDelete}
              className="flex justify-end material-symbols-outlined align-middle text-red-600 dark:text-red-600"
              style={{ fontVariationSettings: "'opsz' 20", textSize: "15px !important" }}
            >
              {
                loading 
                ? (
                  <CustSpin /> 

                ) 
                : ( 
                  'delete' 
                )
              }
            </span> */}
        </div>
      </div>
      {/* <div className="pr-5">
        <p className="my-3 text-sm font-semibold text-slate-700 dark:text-slate-400 line-clamp-1">{prod.fields.work_desc}</p>
      </div> */}
    </div>
  );
};

export default ProdCard;
