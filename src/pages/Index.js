import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom'; 
import BottomNav from '../components/BottomNav'; 
import TopNav from '../components/TopNav';
import Dashboard from './user/Dashboard/Index';
import ViewWork from './user/ViewWork/Index';
import AddWork from './user/AddWork/Index';
import Testing from './user/Test/Index';

const Index = () => {

    const loc = useLocation();
    const [pageTitle, setPageTitle] = useState(''); 

    useEffect(() => {
        const getPageTitle = () => { 
        const pageTitleMap = {
            '/dashboard': 'Dashboard',
            '/aw': 'Add Work',
            '/vw': 'View Work',
        };
        
        const pageTitle = pageTitleMap[loc.pathname] || 'Else Title';
            return pageTitle;
        };
          
        setPageTitle(getPageTitle());
    }, [loc.pathname]);
    
    
  return (
    <>
    <TopNav pageTitle={pageTitle} />
        <div className="px-2 pt-12 overflow-y-hidden">
            <Routes>
                <Route path="/test" element={<Testing />} /> 
                <Route path="/" element={<Dashboard />} /> 
                <Route path="/dashboard" element={<Dashboard />} /> 
                <Route path="/aw" element={<AddWork />} /> 
                <Route path="/vw" element={<ViewWork />} /> 
            </Routes>
        </div>
    <BottomNav />
    </>
  )
}

export default Index