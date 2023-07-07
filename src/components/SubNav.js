import React, { useState } from 'react'

const SubNav = ({ navCount, navItems, active }) => {
 
    return (
      <div>
        <div className='flex justify-evenly w-full border-b border-gray-300'>
            {
              (navCount === 0 ? null : (
                navItems.map((item, index) => (
                  <div className={` border-b-2 rounded-tr-lg w-full text-center`}>
                    <h5 className={` font-semibold py-1 text-white`}>{item}</h5>
                  </div>
                ))  
              ) 
              )
            }   
        </div>
      </div>
    );
};

export default SubNav