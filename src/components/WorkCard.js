import React from 'react';

const WorkCard = ({ cardId, work, handleEdit, handleDelete }) => {

    
    // const work = workd.fields;
    
    // console.log(work.pk);
    
  return (
    <div id={cardId} className="w-full p-2 bg-white border border-gray-300 rounded-2xl shadow-xl dark:shadow-gray-900 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-between">
        <div className="flex" >
          <img className="mr-2 h-10" src={process.env.PUBLIC_URL + '/media/work/plough.png'} alt={work.fields.work_heading} />
          <div className="flex grow">
            <h5 className="text-lg font-semibold tracking-tight truncate w-[205px] overflow-hidden text-gray-900 dark:text-white">{work.fields.work_heading}</h5>
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
            // onClick={() => handleEdit(work.pk, work.work_heading, work.work_desc, work.work_amount, work.work_location)}
            className="flex justify-end material-symbols-outlined align-middle text-slate-900 dark:text-white"
            style={{ fontVariationSettings: "'opsz' 20", textSize: "15px !important" }}
          >
            edit
          </span>
          <span
            onClick={() => handleDelete(work.pk, work.fields.work_id)}
            className="flex justify-end material-symbols-outlined align-middle text-red-600 dark:text-red-600"
            style={{ fontVariationSettings: "'opsz' 20", textSize: "15px !important" }}
          >
            delete
          </span>
        </div>
      </div>
      <div className="pr-5">
        <p className="my-3 text-sm font-semibold text-slate-700 dark:text-slate-400 line-clamp-1">{work.fields.work_desc}</p>
      </div>
      <div className="flex justify-between w-full">
        <div className="flex space-x-1 w-full">
          <h5 className="flex text-lg w-full font-semibold tracking-wide text-gray-900 dark:text-gray-200">
            <span className="flex justify-end material-symbols-outlined small-icon my-auto align-middle text-slate-900 dark:text-white mr-2" style={{ fontVariationSettings: "'opsz' 20" }}>
              currency_rupee
            </span>
            {work.fields.work_amount} /-
          </h5>
          <h5 className="flex text-lg w-full font-normal tracking-wide text-gray-800 dark:text-gray-300">
            <span className="flex justify-end material-symbols-outlined small-icon my-auto align-middle text-slate-900 dark:text-white mr-2" style={{ fontVariationSettings: "'opsz' 20" }}>
              location_on
            </span>
            {work.fields.work_location}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default WorkCard;
