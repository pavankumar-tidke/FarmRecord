import React, { useState, useEffect } from "react";
import axios from "axios";
import { message, Empty,  } from "antd";
import WorkCard from "../../../components/WorkCard";
import CustSpin from "../../../components/CustSpin"; 
import BottomDrawer from "../../../components/BottomDrawer";


const Index = () => {
  const [data, setData] = useState([]);
  const [pageLoading, setPageLoading] = useState(false); 
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false); 
  const [editData , setEditData] = useState([]);


  
  const showDrawer = () => {
    setOpen(true);
  };   

  const onClose = () => {
    setOpen(false);
  }; 
  
  useEffect(() => {
    const fetchData = async () => {
      setPageLoading(true);
      // message.loading("Loading...", 0);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/fetch/all_work/`
        );
        setData(JSON.parse(response.data));
        setPageLoading(false);
        message.success("Data fetched successfully");

      } catch (error) {
        console.log(error);
        setPageLoading(false);
        message.error(`Data not fetched. ${error}`, 5);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (work) => {
    console.log(work); 
    setEditData(work);
    showDrawer();
  };

  const handleDelete = async (pk, workId) => { 
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/dw/`,
        {
          pk,
          workId,
        }
      );
      // setLoading(false);
      console.log(response);
      if (response.data.success) {
        const cardToRemove = document.getElementById(`work-card-${pk}`); 
        
        if (cardToRemove && cardToRemove.parentNode) {
          cardToRemove.parentNode.removeChild(cardToRemove);  
          message.warning(response.data.data.alertMsg, 3);
        
        } else {
          console.log("Failed to remove card: Card element or its parent node not found");
        }
      
      } else {
        message.error(`${response.data.data.alertMsg}`, 5); 
      }
    
    } catch (error) {
      message.error(`Work not deleted. ${error}`, 5);   
    }
  };

  const editFormSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    const pk = editData.pk;
    const workHeading = event.target.work_heading.value;
    const workDescription = event.target.work_desc.value;
    const workAmount = event.target.work_amount.value;
    const workLocation = event.target.work_location.value; 
    const editedAt = new Date().toLocaleString();

    try {
      console.log(editData); 
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/ew/`,
        {
          pk,
          workHeading, 
          workDescription,
          workAmount,
          workLocation,
          editedAt,
        }
      );
 
      if (response.data.success) {
        message.success(response.data.data.alertMsg, 15);
        setLoading(false);
        onClose(); 
         
      } else {
        message.error(`${response.data.data.alertMsg}`, 5);
        setLoading(false); 
      }

    } catch (error) {
      message.error(`Work not edited. ${error}`, 5);
      setLoading(false);
    }  
  };

  // message.info("This is a view page", 1); 



  return (
    <div className="mb-20">
  

      {pageLoading && (
        <div className="absolute flex top-80 left-48 justify-center ">
          <CustSpin />
        </div>
 
      )}


      {pageLoading ? null : (
        
        <div>
          <div className="flex flex-between w-full my-4">
            <div className="flex justify-end my-auto space-x-2 w-full">
            <span 
                className="material-symbols-outlined align-middle text-slate-900 dark:text-white"
                style={{
                  fontVariationSettings: "'opsz' 20",
                  textSize: "15px !important",
                }}
              > 
                search 
              </span>
              <span
                className="material-symbols-outlined align-middle text-slate-900 dark:text-white"
                style={{
                  fontVariationSettings: "'opsz' 20",
                  textSize: "15px !important",
                }}
              > 
                filter_alt 
              </span>
              
            </div>
          </div>

          <div className="space-y-3 text-white">
            {data.length === 0 ? (
              <Empty />
            ) : (
              <div className="space-y-4" id="work-card-div">
                {data.map((work) => (
                  <WorkCard
                    key={work.pk}
                    cardId={`work-card-${work.pk}`}
                    work={work}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete} 
                  />
                ))}
              </div>
            )}
          </div>


          <div> 

            {
              editData.length === 0 ? null : (
                <BottomDrawer title={'Edit Work'} open={open} onClose={onClose} height={600}>

                  <form onSubmit={editFormSubmit} id="edit_form" className="rounded-lg w-full space-y-4"> 
                    <div className="w-full">
                        <label htmlFor="work_heading" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Work Heading</label>
                        <input defaultValue={editData.fields.work_heading} type="text" id="work_heading" name="work_heading" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="favarni, nangar" required />
                    </div> 
                    <div className="w-full">
                        <label htmlFor="work_desc" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Work Description</label>
                        <textarea defaultValue={editData.fields.work_desc} id="work_desc" rows="4" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg   block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="First favarni"  required>
                          
                        </textarea>
                    </div> 
                    <div className="w-full">
                        <label htmlFor="work_amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Work Amount</label>
                        <input defaultValue={editData.fields.work_amount} type="number" id="work_amount" name="work_amount" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="₹ 2,230 /-" required />
                    </div>  
                    <div className="w-full">
                        <label htmlFor="work_location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Add Location</label>
                        <input defaultValue={editData.fields.work_location} type="text" id="work_location" name="work_location" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Poison names, fertilizer names, etc."  />
                    </div>   
                    {/* <div className="flex flex-col items-start justify-center w-full">
                        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bill or Receipt</label>
                        <label htmlFor="reciept-file" className="flex flex-col items-center justify-center w-full sm:h-32 lg:h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div id="selected-files" className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG, or GIF (MAX. 800x400px)</p>
                            </div>
                            <input id="reciept-file" name="reciept-file" type="file" className="hidden" multiple />
                        </label>
                    </div>   */}
                    <div className="flex justify-center mt-2  w-full"> 
                    <button type="submit" className={` ${loading && 'opacity-70'} mt-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 align-middle text-center text-base font-semibold shadow-md shadow-sky-500 px-3 py-2 bg-blue-600 text-white rounded-lg w-full`} disabled={loading && true}>
                          
                      { loading ? 
                        <span className="space-x-3 my-auto">
                            <CustSpin color={'white'} size={15}  />
                            <span>Editing...</span>
                        </span>
                        : 
                        <span>Edit Work</span> 
                      }
                          
                    </button>
                    </div>  
                </form>

              </BottomDrawer>
              )
            }

          </div>

          
        </div>
      )}
    </div>
  );
};

export default Index;
