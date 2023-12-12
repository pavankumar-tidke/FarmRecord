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
        console.log(`${process.env.REACT_APP_BACKEND_URL}/fetch/all_work/`);
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
    console.log(typeof(total));

    setTotalCropAmount((isNaN(total) || total === undefined) ? 0 : formatNumber(total));

  }, [data]);


  
  
  

  return (
    <div className="mb-28">

      {pageLoading && (
        <div className="absolute z-50 flex top-80 left-48 justify-center">
          <CustSpin />
        </div>
      )}
  
      <div className="mx-3 space-y-4 py-5 rounded-2xl backdrop-blur-2xl bg-white bg-opacity-5">

        <div className="text-center mx-auto mb-8">
          <h5 className="text-base font-bold text-gray-600 dark:text-gray-300">Total Revenue <span className=" text-xs text-gray-500">(since 2020)</span></h5>
          <h5 className="text-3xl font-bold text-green-600">
            <span className="material-symbols-outlined extra-small-icon text-slate-500 dark:text-slate-500">currency_rupee</span>
            {totalCropAmount} 
          </h5>
        </div>
  
        <div className="flex justify-evenly text-center mb-6">
          <div className="">
            <h5 className="text-base font-bold text-gray-600 dark:text-gray-300">Chana Profit</h5>
            <h5 className="text-lg font-bold text-blue-400">
              <span className="material-symbols-outlined extra-small-icon text-slate-500 dark:text-slate-500">currency_rupee</span>
              {totalChanaAmount}
            </h5>
          </div>
          <div className="">
            <h5 className="text-base font-bold text-gray-600 dark:text-gray-300">Soyabin Profit</h5>
            <h5 className="text-lg font-bold text-blue-400">
              <span className="material-symbols-outlined extra-small-icon text-slate-500 dark:text-slate-500">currency_rupee</span>
              {totalSoyaAmount}
            </h5>
          </div>
        </div>
      </div>
  
      <div className="mx-3 mt-5">
        {data !== undefined || data !== null ? (
          <Graph data={data} />
        ) : (
          pageLoading && (
            <div className="absolute z-50 flex top-80 left-48 justify-center">
              <CustSpin />
            </div>
          )
        )}
      </div>
    </div>
  );
  
};

export default Dashboard;
