import React from 'react';

const Dashboard = () => {
  return (
    <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-5 my-5">

        {/* USER DATA */}
        <div className='relative p-5 w-full rounded-2xl bg-slate-800 drop-shadow-2xl mt-5'>
            <div className='absolute -top-4 left-4 shadow-2xl bg-[#1F2937] rounded-2xl h-16 w-16 flex items-center justify-center drop-shadow-2xl'>
            <span className="material-symbols-outlined text-white">
                chair
            </span>
            </div>
            <div className="flex flex-col ">
            <div className="flex justify-between">
                <div>
                
                </div>
                <div>
                <span className="text-white font-light text-md">Total Users</span>
                <h1 className='block uppercase text-white font-bold text-2xl text-right'>
                    Pavankumar
                </h1>
                </div>
            </div>
            <span className='text-white font-md text-md'>
                <hr className="border-bottom my-2" />
                <span className="text-white-600"><span className="text-green-600">+55%</span> than last week</span>
            </span>
            </div>
        </div>
        <div className='relative p-5 w-full rounded-2xl bg-slate-800 drop-shadow-2xl mt-5'>
            <div className='absolute -top-4 left-4 shadow-2xl bg-rose-600 rounded-2xl h-16 w-16 flex items-center justify-center drop-shadow-2xl'>
            <span className="material-symbols-outlined text-white">
                person_add
            </span>
            </div>
            <div className="flex flex-col ">
            <div className="flex justify-between">
                <div>
                
                </div>
                <div>
                <span className="text-white font-light text-md">Pending Users</span>
                <h1 className='block uppercase text-white font-bold text-2xl text-right'>
                    Pavankumar
                </h1>
                </div>
            </div>
            <span className='text-white font-md text-md'>
                <hr className="border-bottom my-2" />
                <span className="text-white-600"><span className="text-green-600">+55%</span> than last week</span>
            </span>
            </div>
        </div>
    </div>
  );
}

export default Dashboard;