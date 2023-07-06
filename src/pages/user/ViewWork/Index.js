import React, { useState, useEffect } from "react";
import axios from "axios";
import { message, Empty } from "antd";
import WorkCard from "../../../components/WorkCard";
import CustSpin from "../../../components/CustSpin";

const Index = () => {
  const [data, setData] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setPageLoading(true);
      message.loading("Loading...", 0);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/fetch/all_work/`
        );
        setData(JSON.parse(response.data));
        setPageLoading(false);
        message.success("Data fetched successfully");

      } catch (error) {
        console.log(error);
        setPageLoading(false);
        message.error(`Data not fetched. ${error}`, 5);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (pk, heading, desc, amount, location) => {
    // Handle edit functionality
  };

  const handleDelete = async (pk, workId) => {
    setDeleteLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/dw/`,
        {
          pk,
          workId,
        }
      );
      // setLoading(false);
      console.log(response);
      if (response.data.success) {
        const cardToRemove = document.getElementById(`work-card-${pk}`);
        console.log(cardToRemove.parentNode);
        
        if (cardToRemove && cardToRemove.parentNode) {
          cardToRemove.parentNode.removeChild(cardToRemove); 
          setDeleteLoading(false);
          message.warning(response.data.data.alertMsg, 3);
        
        } else {
          console.log("Failed to remove card: Card element or its parent node not found");
        }
      
      } else {
        message.error(`${response.data.data.alertMsg}`, 5);
        setDeleteLoading(false);
      }
    
    } catch (error) {
      message.error(`Work not deleted. ${error}`, 5);
      setDeleteLoading(false);
    }
  };

  // message.info("This is a view page", 1);

  return (
    <div className="mb-20">


      {pageLoading ? (
        <div className="absolute flex top-80 left-48 justify-center ">
          <CustSpin />
        </div>
 
      ) : message.destroy()}


      {pageLoading ? null : (
        <div>
          <div className="flex flex-between w-full my-4">
            <div className="flex justify-end my-auto space-x-2 w-full">
              <span
                className="material-symbols-outlined align-middle text-slate-900 dark:text-white"
                style={{
                  fontVariationSettings: "'opsz' 20",
                  textSize: "15px !important",
                }}
              >
                {" "}
                filter_alt{" "}
              </span>
            </div>
          </div>

          <div className="space-y-3 text-white">
            {data.length === 0 ? (
              <Empty />
            ) : (
              <div className="space-y-4" id="work-card-div">
                {data.map((work) => (
                  <WorkCard
                    key={work.pk}
                    cardId={`work-card-${work.pk}`}
                    work={work}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    deleteLoading={deleteLoading}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
