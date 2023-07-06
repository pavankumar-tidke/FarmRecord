import React, { useState, useEffect } from 'react';
import { Drawer } from 'antd';


const BottomDrawer = ({ open, onClose, children, height, title }) => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    useEffect(() => { 
        const isDarkModePreferred =
          window.matchMedia &&
          window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDarkTheme(isDarkModePreferred);
    }, []);


    return ( 
        <Drawer  
            headerStyle={{ backgroundColor: isDarkTheme ? 'rgb(51 65 85)' : 'white', color: isDarkTheme ? 'white' : 'rgb(2 6 23)' }}
            placement="bottom"
            closable={false}
            destroyOnClose={true}
            width={500}
            height={height}
            onClose={onClose}
            open={open} 
            className='text-white !p-0 !bg-slate-800 !dark:bg-white rounded-tl-3xl rounded-tr-3xl'
            style={{
               
            }} 
        > 
            <div className='flex justify-between mb-5 pb-2 border-b border-gray-500'>
 
                <div >
                    <span className=' text-xl font-semibold border-gray-500'>{title} </span>
                </div>
                <div>
                    <span onClick={onClose} className="material-symbols-outlined small-icon  text-slate-900 dark:text-white" > 
                        close 
                    </span>
                </div>
                
            </div>

            {children}
 
        </Drawer> 
    );
  };
  
  export default BottomDrawer;