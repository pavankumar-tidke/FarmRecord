

// When the user selects th files then selected files will be displayed in the input box //
$(`#reciept-file`).on('change', (e) => {
    $('#selected-files p:first').html(`<span class=" font-semibold">Selected files are:</span> `)
    $('#selected-files p:eq(1)').empty()
    Array.from(e.target.files).forEach((file, index)  => {
        $('#selected-files p:eq(1)').append(`<span class=" p-1 text-black space-y-3 dark:text-white">${index+1}) ${file.name}, &nbsp; </span><br>`)  
    }); 
})


// record the work  //
$('#r_w_btn_form').submit(function (e) { 
    try {
        e.preventDefault();
 
        $('#r_w_btn').addClass('opacity-50').attr('disabled', true).html(`
            <div class="text-center">
                <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#428bff"/>
                </svg>
                Saving...
            </div>
        `)

        var form = new FormData();

        form.append('work_heading', $("input[name='work_heading']").val());
        form.append('work_desc', $("#work_desc").val());
        form.append('work_location', $("input[name='work_location']").val());
        form.append('currTime', currentTime());
        console.log(currentTime());
        form.append('work_amount', `${$("input[name='work_amount']").val()} /-`); 

        var files = $("input[id='reciept-file']").prop('files');
        for (var i = 0; i < files.length; i++) {
            form.append('work_reciept', files[i]); 
        } 

        transporter('POST', '/sw/', form, true, (status, res) => {
            console.log(res);
            if(status && res.success) {
                $('#r_w_btn_form')[0].reset();
                $('#r_w_btn').removeClass('opacity-50').attr('disabled', false).html('Save Work') 
                toastMessage(res.data.alertMsg, 'success')
                console.log(files);
            } else {
                $('#r_w_btn_form')[0].reset();
                $('#r_w_btn').removeClass('opacity-50').attr('disabled', false).html('Save Work') 
                toastMessage(res.data.alertMsg, 'danger')
            }
        });

    } 
    catch(e) {
        toastMessage(`Error while saving work : ${e}`, 'danger')
    }

});


// edit the work request //
function e_w_f_submit() { 
    try { 
 
        $('#e_w_btn').addClass('opacity-50').attr('disabled', true).html(`
            <div class="text-center">
                <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#428bff"/>
                </svg>
                Editing...
            </div>
        `)

        var form = new FormData();

        form.append('work_heading', $("input[name='work_heading']").val());
        form.append('work_desc', $("#work_desc").val());
        form.append('work_location', $("input[name='work_location']").val());
        form.append('workid', $("input[name='workid']").val()); 
        form.append('editTime', currentTime());
        console.log(currentTime());
        form.append('work_amount', `${$("input[name='work_amount']").val()}`); 

        var files = $("input[id='reciept-file']").prop('files');
        for (var i = 0; i < files.length; i++) {
            form.append('work_reciept', files[i]); 
        } 

        transporter('POST', '/ew/', form, true, (status, res) => {
            console.log(res);
            if(status && res.success) { 
                $('#e_w_btn').removeClass('opacity-50').attr('disabled', false).html('Edit Work') 
                toastMessage(res.data.alertMsg, 'success')
                console.log(files);
            } else {
                $('#e_w_btn_form')[0].reset();
                $('#e_w_btn').removeClass('opacity-50').attr('disabled', false).html('Edit Work') 
                toastMessage(res.data.alertMsg, 'danger')
            }
        });

    } 
    catch(e) {
        toastMessage(`Error while saving work : ${e}`, 'danger')
    }

}

// prepend all work cards //
function prependWorkCard(arrayOfObjects) { 

    let previousDate = null;

    arrayOfObjects.forEach((work, index) => {
        let w = work.fields; 
        let receipt_array = JSON.parse(w.work_reciept);  

        let date = getDateTime(w.added_at).date
        let time = getDateTime(w.added_at).time

        let card_id = `card-id-${w.work_id}`

        if (date !== previousDate) { 
            $('#work-card-div').prepend(`
                <div class="inline-flex items-center justify-center w-full">
                    <hr class="w-11/12 h-[1px] my-5 bg-gray-400 border-0 dark:bg-gray-700">
                    <span class="absolute px-3 font-medium text-slate-900 -translate-x-1/2 left-1/2 dark:text-white backdrop-blur-lg ">${date}</span>
                </div>
            `);    
            previousDate = date;
        }
 
        $('#work-card-div').prepend(`
            <div id="${card_id}"  class="w-full p-2 bg-white border border-gray-300 rounded-2xl shadow-xl dark:shadow-gray-900 dark:bg-gray-800 dark:border-gray-700">
                <div class="flex justify-between  ">
                    <div class="flex" onclick="modal($('#${card_id}').html())">
                        <img class="mr-2 h-10" src="/static/media/work/plough.png" alt="image" /> 
                        <div class="flex grow">
                            <h5 class="text-lg font-semibold tracking-tight truncate w-[205px] overflow-hidden text-gray-900 dark:text-white">${w.work_heading}</h5>
                        </div>
                    </div>
                    <div class="flex justify-end space-x-3 w-full ">
                    ${(receipt_array.length !== 0) ? `<span onclick="fetchDocument('${w.work_heading}', '${receipt_array[0]}')" class="flex justify-end material-symbols-outlined align-middle text-slate-900 dark:text-white" style="font-variation-settings: 'opsz' 20; text-size: 15px !important;"> receipt_long </span>` : ``} 
                        <span onclick="editWorkModalHTML(${work.pk}, '${w.work_heading}', '${w.work_desc}', '${w.work_amount}', '${w.work_location}')" class="flex justify-end material-symbols-outlined align-middle text-slate-900 dark:text-white" style="font-variation-settings: 'opsz' 20; text-size: 15px !important;"> edit </span>
                        <span class="flex justify-end material-symbols-outlined align-middle text-red-600 dark:text-red-600" style="font-variation-settings: 'opsz' 20; text-size: 15px !important;"> delete_forever </span>  
                    </div> 
                </div> 
                <div onclick="modal($('#${card_id}').html())" class="pr-5">
                    <p class="my-3 text-sm font-semibold text-slate-700 dark:text-slate-400 line-clamp-1">${w.work_desc}</p>
                </div>
                <div class="flex justify-between w-full" onclick="modal($('#${card_id}').html())">
                    <div class="flex space-x-1 w-full">  
                        <h5 class="flex text-lg w-full font-semibold tracking-wide text-gray-900 dark:text-gray-200"><span class="flex justify-end material-symbols-outlined small-icon my-auto align-middle text-slate-900 dark:text-white mr-2" style="font-variation-settings: 'opsz' 20;"> currency_rupee </span> ${w.work_amount} /-</h5>  
                        <h5 class="flex text-lg w-full font-normal tracking-wide text-gray-800 dark:text-gray-300"> <span class="flex justify-end material-symbols-outlined small-icon my-auto align-middle text-slate-900 dark:text-white mr-2" style="font-variation-settings: 'opsz' 20;"> location_on </span> ${w.work_location}</h5>
                    </div> 
                </div>
            </div>
        `)

        
    });  
}


// work edit modal //
function viewWorkModalHTML() {

}


// work edit modal //
function editWorkModalHTML(workid, work_heading, work_desc, work_amount, work_location) {
    let div = ` 
                <form id="e_w_btn_form" class="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-2  rounded-lg p-2 w-full "> 
                <h5 class="text-lg font-semibold mb-2  text-slate-900 dark:text-white">Edit Work </h5>
                    <div class="w-full">
                        <label for="work_heading" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Work Heading</label>
                        <input type="text" id=" " value="${work_heading}" name="work_heading" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="favarni, nangar" required >
                    </div> 
                    <div class="w-full">
                        <label for="work_desc" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Work Description</label>
                        <textarea id="work_desc" rows="4" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="First favarni"  required>${work_desc}</textarea>
                    </div> 
                    <div class="w-full">
                        <label for="work_amount" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Work Amount</label>
                        <input type="number" id="" value="${work_amount}" name="work_amount" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="₹ 2,230 /-" required >
                    </div>  
                    <div class="w-full">
                        <label for="work_location" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Add Location </label>
                        <input type="text" id=" " value="${work_location}" name="work_location" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Poison names, fertilizer names, etc."  >
                    </div>   
                    <div class="flex flex-col items-start justify-center w-full">
                        <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bill or Reciept</label>
                        <label for="reciept-file" class="flex flex-col items-center justify-center w-full sm:h-32 lg:h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div id="selected-files" class=" flex flex-col items-center justify-center pt-5 pb-6">
                                <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                                <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                            </div>
                            <input id="reciept-file" name="reciept-file" type="file" class="hidden" multiple>
                        </label>
                    </div>  
                    <input id="workid" name="workid" type="number" hidden value="${workid}">
                    <div class="flex justify-center mt-2  w-full"> 
                        <button type="button" id="e_w_btn" onclick="e_w_f_submit()" class="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 align-middle text-center text-base font-semibold shadow-md shadow-sky-500 px-3 py-2 bg-blue-600 text-white rounded-lg w-full ">
                            Edit Work
                        </button>
                    </div>  
                </form>
             
    `

    modal(div);
    
}


// Fetch all works //
function viewWork() { 

    let data = new FormData();
    data.append('user_id', USER_ID)
    
    transporter('POST', '/fetch/all_work/', data, true, (status, res) => {
        console.log(res);

        prependWorkCard(res)
    })
}


// fetch document // 
function fetchDocument(work_title, file_name) {

    let div = null;


    if(getFileExtension(file_name) === 'pdf' || getFileExtension(file_name) === 'doc' || getFileExtension(file_name) === 'docx' || getFileExtension(file_name) === 'ppt' || getFileExtension(file_name) === 'pptx' || getFileExtension(file_name) === 'xls' || getFileExtension(file_name) === 'xlsx') {
        div = `<iframe src="${BASE_URL}/${MEDIA_URL}/work_title_${work_title}/${file_name}" class=" w-full " style="height: 780px;"></iframe>`
    } 
    else if(getFileExtension(file_name) === 'jpg' || getFileExtension(file_name) === 'jpeg' || getFileExtension(file_name) === 'png' || getFileExtension(file_name) === 'gif' || getFileExtension(file_name) === 'svg') {
        div = `<img src="${BASE_URL}/${MEDIA_URL}/work_title_${work_title}/${file_name}" class=" w-full h-fit max-h-[780px]" style=""></img>`
    }
    else {
        toastMessage('File format not supported', 'danger')
    }

    modal(div);    
}






