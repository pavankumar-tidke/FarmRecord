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
            // headerStyle={{ backgroundColor: isDarkTheme ? 'rgb(51 65 85)' : 'white', color: isDarkTheme ? 'white' : 'rgb(2 6 23)' }}
            bodyStyle={{ backgroundColor: isDarkTheme ? 'rgb(30 41 59)' : 'white', color: isDarkTheme ? 'white' : 'rgb(2 6 23)' }}
            placement="bottom"
            closable={false}
            destroyOnClose={true}
            width={500}
            height={height}
            onClose={onClose}
            open={open}           
            className='bg-white !dark:bg-slate-800  rounded-tl-3xl rounded-tr-3xl'
        > 
            <div className="mx-24 mb-4 rounded-full border-t-8 border-gray-400 dark:border-gray-500"> </div>
            <div className='flex justify-between mb-5 pb-2 border-b border-gray-500'>
 
                <div>
                    <span className='text-slate-950 dark:text-white text-xl font-semibold border-gray-500'>{title} </span>
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