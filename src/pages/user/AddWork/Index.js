import React, {  useRef, useState  }  from 'react';
import axios from 'axios';  
import { message } from 'antd'; 
import CustSpin from '../../../components/CustSpin';  

const Index = () => {

    const formRef = useRef(null);  
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("Add Work");
    // const [workMode, setWorkMode] = useState(0);
    const [startX, setStartX] = useState(0);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleTouchStart = (event) => {
        setStartX(event.touches[0].clientX);
    };
    
    const handleTouchEnd = (event) => {
    const endX = event.changedTouches[0].clientX;
    const diffX = startX - endX;
    if (diffX > 50) {
        // Swipe left
        if (activeTab === "Add Work") {
        setActiveTab("Add Production");
        }
    } else if (diffX < -50) {
        // Swipe right
        if (activeTab === "Add Production") {
        setActiveTab("Add Work");
        }
    }
    };
  
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        // (loading && message.loading('Action in progress..'));
     
        const workHeading = event.target.work_heading.value;
        const workDescription = event.target.work_desc.value;
        const workAmount = event.target.work_amount.value;
        const workLocation = event.target.work_location.value; 
        const addedAt = new Date().toLocaleString();
 
        // setLoading(true);
    
        try { 
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/sw/`, {
                workHeading,
                workDescription,
                workAmount,
                workLocation,
                addedAt
            });

            console.log(response); 
            formRef.current.reset(); 
            setLoading(false);
            message.success(response.data.data.alertMsg);
        
        } catch (error) {  
            console.log(error);
            setLoading(false); 
            message.error(error, 5);
        }
    };
 
    // message.info('This is a normal message', 1);

    // message.loading('Action in progress..', 2.5);

  return ( 
    <> 
        <div className="mb-20 mt-5"> 

            {/* <SubNav active={true} navCount={2} navItems={['Add work', 'Add Production']} /> */}
 
            
            <div>
                <div className="flex justify-evenly w-full border-b py-1 border-gray-300"
                    
                >
                    <div
                    className={`${
                        activeTab === "Add Work"
                        ? "border-b-4 rounded-md text-sky-500 border-sky-500 text-center transition-colors duration-300"
                        : "text-white text-center transition-colors duration-300"
                    }`}
                    onClick={() => handleTabClick("Add Work")}
                    >
                    <h5 className={`font-semibold py-1`}>Add Work</h5>
                    </div>
                    <div
                    className={`${
                        activeTab === "Add Production"
                        ? "border-b-4 rounded-md text-sky-500 border-sky-500 text-center transition-colors duration-300"
                        : "text-white text-center transition-colors duration-300"
                    }`}
                    onClick={() => handleTabClick("Add Production")}
                    >
                    <h5 className={`font-semibold py-1`}>Add Production</h5>
                    </div>
                </div>
            </div>
 
 
            <div className='duration-300'
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
 
                {activeTab === "Add Work" && (
                    <div id="AddWorkForm" className="rounded-2xl p-1 mt-10 duration-300 drop-shadow-lg">   
                        <form ref={formRef} onSubmit={handleFormSubmit} id="r_w_btn_form" className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-2  rounded-lg p-2 w-full "> 
                            <div className="w-full">
                                <label htmlFor="work_heading" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Work Heading</label>
                                <input type="text" id="work_heading" name="work_heading" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="favarni, nangar" required />
                            </div> 
                            <div className="w-full">
                                <label htmlFor="work_desc" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Work Description</label>
                                <textarea id="work_desc" rows="4" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg   block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="First favarni"  required></textarea>
                            </div> 
                            <div className="w-full">
                                <label htmlFor="work_amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Work Amount</label>
                                <input type="number" id="work_amount" name="work_amount" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="₹ 2,230 /-" required />
                            </div>  
                            <div className="w-full">
                                <label htmlFor="work_location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Add Location</label>
                                <input type="text" id="work_location" name="work_location" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Poison names, fertilizer names, etc."  />
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
                            <div className="flex justify-center mt-5  w-full"> 
                            <button type="submit" id="r_w_btn" className={` ${loading && 'opacity-70'} bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 align-middle text-center text-base font-semibold shadow-md shadow-sky-500 px-3 py-2 bg-blue-600 text-white rounded-lg w-full`} disabled={loading && true}>
                                
                                {loading ? 
                                    <span className="space-x-3 my-auto">
                                        <CustSpin color={'white'} size={15}  />
                                        <span>Saving...</span>
                                    </span>
                                :
                                
                                    <span>Save Work</span>
                                
                                }
                                
                            </button>
                            </div>  
                        </form>  
                    </div>
                )}


                {activeTab === "Add Production" && (
                    <div id="ProductionForm" className="rounded-2xl p-1 mt-10 duration-300 drop-shadow-lg">   
                        <form ref={formRef} onSubmit={handleFormSubmit} id="r_w_btn_form" className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-2  rounded-lg p-2 w-full "> 
                            <div className="w-full">
                                <label htmlFor="work_heading" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Crop Name</label>
                                <input type="text" id="work_heading" name="work_heading" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Soyabin, Chaana" required />
                            </div> 
                            <div className="w-full">
                                <label htmlFor="work_desc" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Crop Sell Description</label>
                                <textarea id="work_desc" rows="4" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg   block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Latur Buyer Name"  required></textarea>
                            </div> 
                            <div className="flex gap-2 w-full">
                                <div className="w-full relative">
                                    <label htmlFor="work_amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Weight of Crop
                                    </label>
                                    <input
                                        type="number"
                                        id="work_amount"
                                        name="work_amount"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="30"
                                        required
                                    />
                                    <span
                                        className="absolute top-2/3 right-3 font-semibold transform -translate-y-1/2 text-gray-400"
                                        style={{ pointerEvents: "none" }}
                                    >
                                        क्विंटल
                                    </span>
                                </div>  
                                <div className="w-full relative">
                                    <label htmlFor="work_amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        &nbsp;
                                    </label>
                                    <input
                                        type="number"
                                        id="work_amount"
                                        name="work_amount"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="45"
                                        required
                                    />
                                    <span
                                        className="absolute top-2/3 right-3 font-semibold transform -translate-y-1/2 text-gray-400"
                                        style={{ pointerEvents: "none" }}
                                    >    
                                    किलो
                                    </span>
                                </div>  
                            </div>  
                            <div className="w-full">
                                <label htmlFor="work_amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Crop Amount</label>
                                <input type="number" id="work_amount" name="work_amount" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="₹ 2,230 /-" required />
                            </div>   
                            <div className="w-full">
                                <label htmlFor="work_location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location</label>
                                <input type="text" id="work_location" name="work_location" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Latur, Ghatnandur"  />
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
                            <div className="flex justify-center mt-5  w-full"> 
                            <button type="submit" id="r_w_btn" className={` ${loading && 'opacity-70'} bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 align-middle text-center text-base font-semibold shadow-md shadow-sky-500 px-3 py-2 bg-blue-600 text-white rounded-lg w-full`} disabled={loading && true}>
                                
                                {loading ? 
                                    <span className="space-x-3 my-auto">
                                        <CustSpin color={'white'} size={15}  />
                                        <span>Saving...</span>
                                    </span>
                                :
                                
                                    <span>Save Work</span>
                                
                                }
                                
                            </button>
                            </div>  
                        </form>  
                    </div>
                )}
 
            </div>
             
        </div>
    </>
  );
}

export default Index;