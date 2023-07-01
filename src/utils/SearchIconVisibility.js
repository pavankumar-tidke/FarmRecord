import { useEffect, useState } from 'react'
import {  useLocation } from "react-router-dom"; 

const SearchIconVisibility = () => {

    const loc = useLocation();
    const [searchIcon, setSearchIcon] = useState(false);    
     
    useEffect(() => {
        (loc.pathname === '/vw') ? setSearchIcon(true) : setSearchIcon(false);
 
    }, [loc.pathname]);
    
    
    return { searchIcon }
    
}

export default SearchIconVisibility;