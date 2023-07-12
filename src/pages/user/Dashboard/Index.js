import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { message } from 'antd';  
import Graph from '../../../components/Graph';
import CustSpin from '../../../components/CustSpin';

const Dashboard = () => { 
  const [data, setData] = useState({}); 
  const [totalCropAmount, setTotalCropAmount] = useState(0);
  const [totalSoyaAmount, setTotalSoyaAmount] = useState(0);
  const [totalChanaAmount, setTotalChanaAmount] = useState(0);
  const [pageLoading, setPageLoading] = useState(false);
 
  useEffect(() => {
    const fetchData = async () => {
      setPageLoading(true);

      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/fetch/all_work/`);
        let response = JSON.parse(res.data);
        if (response.success) {
          setData(response);

        } else {
          message.error(`Data fetching error: ${response}`);
        }
      } catch (error) {
        console.log(error);
        message.error(`Data not fetched. ${error}`);
      }

      setPageLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {

    const formatNumber = (number) => {
      if (number >= 1e5) {
        return (number / 1e5).toFixed(2) + ' L';
      } else if (number >= 1e3) {
        return (number / 1e3).toFixed(2) + ' T';
      } else {
        return number.toFixed(2) + ' H';
      }
    };
    
    const calculateCropTotal = (cropName) => {
      const cropTotal = data?.prodWorkData
      ?.filter(item => item?.fields?.crop_name === cropName)
      ?.reduce((sum, item) => sum + (parseFloat(item?.fields?.crop_amount) || 0), 0);
      
      return cropTotal;
    };
      
    const soyabinTotal = calculateCropTotal('Soyabin');
    const chanaTotal = calculateCropTotal('Chana');
    
    setTotalSoyaAmount((soyabinTotal === 0 || soyabinTotal === undefined) ? 0 : formatNumber(soyabinTotal));
    setTotalChanaAmount((chanaTotal === 0 || chanaTotal === undefined) ? 0 : formatNumber(chanaTotal));
    let total = soyabinTotal + chanaTotal;
    setTotalCropAmount((total === 0 || total === undefined) ? 0 : formatNumber(total));
    // setTotalCropAmount(total)

    // console.log((soyabinTotal === 0) ? 0 : formatNumber(soyabinTotal));
    // console.log((chanaTotal === 0) ? 0 : formatNumber(chanaTotal));
    console.log();

  }, [data]);


  
  
  

  return (
    <div className="my-5">
      
      {pageLoading && (
        <div className="absolute z-50 flex top-80 left-48 justify-center ">
          <CustSpin />
        </div>
      )}
 
      <div className='px-3 space-y-4 rounded-b-3xl'> 
 
        <div className='text-center mx-auto mb-5'>
          <h5 className='text-2xl font-bold text-gray-500'>Total Revenue</h5>
          <h5 className='text-xl font-bold text-lime-600'>
            <span className="material-symbols-outlined extra-small-icon align- text-slate-800 dark:text-slate-300">currency_rupee</span>
            { totalCropAmount } 
            <span className='ml-5 text-xs text-gray-500'>(since 2020)</span>
          </h5>
        </div>
        
        <div className='flex justify-evenly text-center'>
          <div className=' '>
            <h5 className='text-lg font-bold text-gray-500'>Chana Profit</h5>
            <h5 className='text-lg font-bold text-red-400'>
              <span className="material-symbols-outlined extra-small-icon align- text-slate-800 dark:text-slate-300">currency_rupee</span>
              { totalChanaAmount }
            </h5>
          </div>
          <div className=' '>
            <h5 className='text-lg font-bold text-gray-500'>Soyabin Profit</h5>
            <h5 className='text-lg font-bold text-lime-600'>
              <span className="material-symbols-outlined extra-small-icon align- text-slate-800 dark:text-slate-300">currency_rupee</span>
              { totalSoyaAmount }
            </h5>
          </div>
        </div>
        
      </div>

      <hr className='mt-4 mx-3' />

      <div className='my-5'>

        {
          (data !== undefined || data !== null) && (
            <Graph data={data} />
          )
        }

      </div>
      

    </div>
  );
};

export default Dashboard;
