import React, { useState } from 'react';
import CustSpin from './CustSpin';  

const WorkCard = ({ cardId, work, handleEdit, handleDelete, viewWork }) => {

  const [loading, setLoading] = useState(false); 
  

  const onDelete = async () => {
    setLoading(true);
    await handleDelete(work.pk, 'view');
    setLoading(false);
  };

  // const image = {
  //   'Plough': 'plough.png',
  //   'Harrow': 'harrow.png',
  //   'Seed Drill': 'seeddrill.png',
  //   'Sprayer': 'sprayer.png',
  //   'Harvester': 'harvester.png',
  //   'Thresher': 'thresher.png',
  //   'Tractor': 'tractor.png',
  //   'Cultivator': 'cultivator.png',
  //   'Rotavator': 'rotavator.png',
  //   'Plough, Harrow': 'ploughharrow.png',
  //   'Plough, Harrow, Seed Drill': 'ploughharrowseeddrill.png',
  //   'Plough, Harrow, Seed Drill, Sprayer': 'ploughharrowseeddrillsprayer.png',
  //   'Plough, Harrow, Seed Drill, Sprayer, Harvester': 'ploughharrowseeddrillsprayerharvester.png',
  // };


  const month = parseInt(work.fields.added_at.split("/")[1], 10);
  console.log(month);
  var season = (month >= 6 && month <= 10) ? "खरीप" : (month >= 11 || month <= 3) ? "रबी" : "उन्हाळी";
  var colr = (month >= 6 && month <= 10) ? "lime" : (month >= 11 || month <= 3) ? "fuchsia" : "yellow";
 


  return (
    <div id={cardId} className="w-full p-2 bg-white border border-gray-300 rounded-2xl shadow-xl dark:shadow-gray-900 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-between">
        <div onClick={() => viewWork(work, 'view')} className="flex" >
          <img className="mr-2 h-10" src={process.env.PUBLIC_URL + '/media/work/plough.png'} alt={work.fields.work_heading} />
          <div className="flex flex-col grow">
            <h5 className="text-xl font-semibold tracking-tight truncate w-[205px] overflow-hidden text-gray-900 dark:text-white">{work.fields.work_heading}</h5>
            <h5 className="text-base py-2 font-semibold w-[260px] truncate text-slate-500 dark:text-slate-400 ">{work.fields.work_desc}</h5>
          </div>
        </div>
        <div className="flex justify-end space-x-3 w-full">
          {/* {receiptArray.length !== 0 && (
            <span
              onClick={() => fetchDocument(work.work_heading, receiptArray[0])}
              className="flex justify-end material-symbols-outlined align-middle text-slate-900 dark:text-white"
              style={{ fontVariationSettings: "'opsz' 20", textSize: "15px !important" }}
            >
              receipt_long
            </span>
          )} */}
 
          
          <span
            onClick={() => handleEdit(work, 'edit')}
            className="flex justify-end material-symbols-outlined align-middle text-blue-700 dark:text-blue-500"
            style={{ fontVariationSettings: "'opsz' 20", textSize: "15px !important" }}
          >
            edit
          </span>
          <span
              onClick={onDelete}
              className="flex justify-end material-symbols-outlined align-middle text-red-600 dark:text-red-600"
              style={{ fontVariationSettings: "'opsz' 20", textSize: "15px !important" }}
            >
              {
                loading 
                ? (
                  <CustSpin /> 

                ) 
                : ( 
                  'delete' 
                )
              }
            </span>
          
        </div>
      </div>
      {/* <div className="pr-5">
        <p className="my-3 text-sm font-semibold text-slate-700 dark:text-slate-400 line-clamp-1">{work.fields.work_desc}</p>
      </div> */}
      <div onClick={() => viewWork(work, 'view')} className="grid grid-cols-3 border-t border-gray-200 dark:border-gray-700 space-x-1 w-full mt-3">  
        <h5 className="flex justify-center p-2  text-base truncate w-full font-semibold border-r border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-200">
          <span className="material-symbols-outlined small-icon my-auto align-middle text-blue-700 dark:text-blue-500 mr-2" style={{ fontVariationSettings: "'opsz' 20" }}>
            currency_rupee
          </span>
          {work.fields.work_amount} /-
        </h5>  
        <h5 className="flex justify-center p-2 text-base w-full overflow-hidden font-semibold border-r border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-300">
          <span className="material-symbols-outlined small-icon my-auto align-middle text-blue-700 dark:text-blue-500 mr-2" style={{ fontVariationSettings: "'opsz' 20" }}>
            location_on
          </span>
          {work.fields.work_location}
        </h5>  
        <h5 className={`flex justify-center p-2 text-sm w-full tracking-widest font-semibold text-${colr}-600`}>
            <span></span> { season }
        </h5>  
      </div>
    </div>
    
  );
};

export default WorkCard;