import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation, Navigate  } from 'react-router-dom'; 
import { message } from 'antd';
import axios from 'axios';
import BottomNav from '../components/BottomNav'; 
import TopNav from '../components/TopNav';
import Dashboard from './user/Dashboard/Index';
import ViewWork from './user/ViewWork/Index';
import AddWork from './user/AddWork/Index'; 
import Voice from './user/Voice/Index';

const Index = () => {

    const loc = useLocation();
    const [pageTitle, setPageTitle] = useState(''); 

    useEffect(() => {
        const getPageTitle = () => { 
        const pageTitleMap = {
            '/': 'Dashboard',
            '/aw': 'Add Work',
            '/vw': 'View Work',
            '/voice': 'Voice Test',
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
            message.error(`Couden't Connect, please Refresh, ${error}`, 5);
        }
    };
    
    useEffect(() => {  
        checkConnection();
    }, []);

    // window.location.href = '/dashboard'
    
    
  return (
    <>
    <TopNav pageTitle={pageTitle} />
    <div className="pt-12 overflow-y-hidden">
        <Routes>
            {/* <Route path="/test" element={<Testing />} /> 
            <Route path="/" element={<Dashboard />} />  */}
            <Route path="*" render={() => <Navigate to="/dashboard" />} />
            <Route path="/" element={<Dashboard />} /> 
            <Route path="/aw" element={<AddWork />} /> 
            <Route path="/vw" element={<ViewWork />} /> 
            <Route path="/voice" element={<Voice />} /> 
        </Routes>
    </div>
    {loc.pathname === '/' && <BottomNav />}
    </>
  )
}

export default Index;