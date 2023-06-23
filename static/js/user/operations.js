

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
        form.append('work_amount', `₹ ${$("input[name='work_amount']").val()} /-`); 

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

})

// prepend all work cards //
function prependWorkCard(arrayOfObjects) { 

    let previousDate = null;

    arrayOfObjects.forEach((work, index) => {
        let w = work.fields;
        let receipt_array = JSON.parse(w.work_reciept);  

        let date = getDateTime(w.added_at).date
        let time = getDateTime(w.added_at).time

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
            <div class="w-full px-2 py-1 bg-white border border-gray-300 rounded-2xl shadow-xl dark:shadow-gray-900 dark:bg-gray-800 dark:border-gray-700">
                <div class="flex justify-between w-full">
                    <div class="flex w-full">
                        <img class="mr-2 h-10" src="/static/media/work/plough.png" alt="image" /> 
                        <div class="my-auto">
                            <h5 class="text-xl font-semibold tracking-tight truncate text-gray-900 dark:text-white">${w.work_heading}</h5>
                        </div>
                    </div>
                    <div class="flex justify-end space-x-3 w-full ">
                    ${(receipt_array.length !== 0) ? `<span onclick="fetchDocument('${w.work_heading}', '${receipt_array[0]}')" class="flex justify-end material-symbols-outlined align-middle text-slate-900 dark:text-white" style="font-variation-settings: 'opsz' 20; text-size: 15px !important;"> receipt_long </span>` : ``} 
                        <span class="flex justify-end material-symbols-outlined align-middle text-slate-900 dark:text-white" style="font-variation-settings: 'opsz' 20; text-size: 15px !important;"> edit </span>
                        <span class="flex justify-end material-symbols-outlined align-middle text-red-600 dark:text-red-600" style="font-variation-settings: 'opsz' 20; text-size: 15px !important;"> delete_forever </span>
                    </div> 
                </div> 
                <p class="mb-3 font-normal text-slate-700 dark:text-slate-400 line-clamp-1">${w.work_desc}</p>
                <div class="flex justify-between w-full">
                    <div class=" w-full">  
                        <h5 class=" text-base w-full font-semibold tracking-wide text-gray-900 dark:text-white">${w.work_amount}</h5>
                    </div>
                    <div class="flex flex-col justify-start  w-full ">
                        <h5 class="flex text-sm w-full font-semibold tracking-wide text-gray-500 dark:text-gray-500"> <span class="flex justify-end material-symbols-outlined align-middle text-slate-900 dark:text-white mr-2" style="font-variation-settings: 'opsz' 20; text-size: 15px !important;"> schedule </span>   ${time}</h5>
                        <h5 class="flex text-sm w-full font-normal tracking-wide text-gray-900 dark:text-white"> <span class="flex justify-end material-symbols-outlined align-middle text-slate-900 dark:text-white mr-2" style="font-variation-settings: 'opsz' 20; text-size: 15px !important;"> location_on </span> ${w.work_location}</h5>
                    </div> 
                </div>
            </div>
        `)

        
    });  
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






