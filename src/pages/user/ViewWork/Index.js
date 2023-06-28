import React from 'react'

const Index = () => {
  return (
    
    <div className="mb-20">
        <div className="flex flex-between w-full my-4">
            <div className="my-auto w-full">
              <h5 className="text-xl font-semibold text-slate-900 dark:text-white">Past Records</h5>
            </div>
            <div className="flex justify-end my-auto space-x-2 w-full">
              <span className="material-symbols-outlined align-middle text-slate-900 dark:text-white" style={{ fontVariationSettings: "'opsz' 20", textSize: "15px !important" }}> filter_alt </span>
            </div>
        </div>

        <div className="space-y-3">
            <div className="space-y-3" id="work-card-div">
            {/* Add your content here */}
            </div>
        </div>
    </div>

  )
}

export default Index