import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom'; 
import { message } from 'antd';
import axios from 'axios';
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
    

    const checkConnection = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/check_connection/`);
            // console.log(response);
            if (response.data.success) {
                message.success(response.data.data.alertMsg);
            } else {
                message.error(`${response.data.data.alertMsg}`);
            }

        } catch (error) {
            console.log(error);
            message.error('Couden\'t Connect, please Refresh', 15);
        }
    };
    
    useEffect(() => {  
        checkConnection();
    }, []);
    
    
  return (
    <>
    <TopNav pageTitle={pageTitle} />
        <div className="px-3 pt-12 overflow-y-hidden">
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

export default Index;