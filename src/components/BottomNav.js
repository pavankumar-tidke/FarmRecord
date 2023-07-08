import { Link } from "react-router-dom";

function BottomNavbar() {
  return (
    <div className="bottom-nav fixed bottom-0 left-0 z-50 w-full h-16 bg-slate-100 border-t-2 rounded-tl-2xl rounded-tr-2xl border-blue-400 dark:bg-gray-700">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
        <Link
          to="/dashboard" 
          className="inline-flex flex-col text-gray-500 dark:text-gray-200 rounded-lg items-center justify-center px-5 group"
        >
          <span className="material-symbols-outlined">home</span>
        </Link>
        <Link
          to="/vw" 
          className="inline-flex flex-col text-gray-500 dark:text-gray-200 rounded-lg items-center justify-center px-5  group"
        >
          <span className="material-symbols-outlined">view_agenda</span>
        </Link>
        <Link
          to="/aw" 
          className="inline-flex flex-col  text-white rounded-lg items-center justify-center px-5 group"
        >
          <span className="material-symbols-outlined  bg-blue-600 dark:bg-blue-700 rounded-full p-2">
            add
          </span>
        </Link>
        <Link
          to="#" 
          className="inline-flex flex-col text-gray-500 dark:text-gray-200 rounded-lg items-center justify-center px-5  group"
        >
          <span className="material-symbols-outlined">database</span>
        </Link>
        <Link
          to="#" 
          className="inline-flex flex-col text-gray-500 dark:text-gray-200 rounded-lg items-center justify-center px-5  group"
        >
          <span className="material-symbols-outlined">settings</span>
        </Link>
      </div>
    </div>
  );
}


export default BottomNavbar;