import React, { useState, useEffect } from 'react'
import axios from 'axios';
import WorkCard from '../../../components/WorkCard';

const Index = () => {

  const [data, setData] = useState([]); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/fetch/all_work/`);
        const jsonData = JSON.parse(response.data);
        console.log(JSON.parse(response.data));
        setData(jsonData);
        // setLoading(false);
      } catch (error) { 
        console.log(error);
        // setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (pk, heading, desc, amount, location) => {
    // Handle edit functionality
  };

  const handleDelete = async (pk, workId) => {
 

    try { 
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/dw/`, {
        pk,
        workId,
      });
      // setLoading(false); 
      console.log(response); 
      if (response.ok) {
        // Resource deleted successfully
        console.log('Resource deleted');
        const cardToRemove = document.getElementById(`work-card-${pk}`);
        cardToRemove.remove(); 

        setData((prevData) => prevData.filter((item) => item.pk !== pk));

      }

    } catch (error) { 
        // setLoading(false);
        console.log(error);
    }

 
  };
   
  
  
  return (
    
    <div className="mb-20">
        <div className="flex flex-between w-full my-4"> 
            <div className="flex justify-end my-auto space-x-2 w-full">
              <span className="material-symbols-outlined align-middle text-slate-900 dark:text-white" style={{ fontVariationSettings: "'opsz' 20", textSize: "15px !important" }}> filter_alt </span>
            </div>
        </div>

        <div className="space-y-3">
            <div className="space-y-3" id="work-card-div">

              {data.map((work, index) => ( 
                <WorkCard
                  key={work.pk}
                  cardId={`work-card-${work.pk}`}
                  work={work}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              ))}
            
            </div>
        </div>
    </div>

  )
}

export default Index