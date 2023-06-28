import React from "react";

const ThemeToggle = () => {
   
    const handleToggle = () => {
        const htmlClasses = document.querySelector('html').classList;
        if(localStorage.theme === 'dark') {
            htmlClasses.remove('dark');
            localStorage.removeItem('theme')
        } else {
            htmlClasses.add('dark');
            localStorage.theme = 'dark';
        }
    }



  return (
    <span
      onClick={handleToggle}
      className="material-symbols-outlined align-middle text-slate-900 dark:text-white"
    >
      dark_mode
    </span>
  );
};

export default ThemeToggle;
