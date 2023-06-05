

//** shop adding request **//
$('#addShopForm').submit(function (e) { 
    e.preventDefault();

    $('.shopSubmitBtn').attr('disable', true)
    $('.shopSubmitBtn').html(`
        <div role="flex">
            <div role="status">
                <svg aria-hidden="true" class="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span class="sr-only">Loading...</span>
            </div>
            <span class="ml-4">Loading...</span>
        </div>
    `)
    

    var form = new FormData();

    form.append('shop_name', $("input[name='shopname']").val());
    form.append('shop_address', $("input[name='shopaddr']").val());
    form.append('opening_time', $("input[name='openingtime']").val());
    form.append('closing_time', $("input[name='closingtime']").val());
    form.append('category', $(".shopCategory").val());
    
    // console.log($("input[name='scrftoken']").val()); 

    var files = $("input[name='shopimages']").prop('files');
    for (var i = 0; i < files.length; i++) {
        form.append('files', files[i]);
    }
 
    try {
        transporter('POST', '/registerShop/', form, true, (status, res) => {
            console.log(res);
            if(status && res.success) {
                $('#addShopForm')[0].reset();
                $('.shopSubmitBtn').attr('disable', false).text('Register Shop') 
                toastMessage(res.data.alertMsg, 'success')
            } else {
                toastMessage(res.data.alertMsg, 'danger')
            }
        });
    } catch (error) {
        toastMessage(`adding shop exception: ${error}`, 'warning')
    }
}); 


//** Mosque adding request **//
$('#addMosqueForm').submit(function (e) { 
    e.preventDefault();

    $('.mosqueSubmitBtn').attr('disable', true)
    $('.mosqueSubmitBtn').html(`
        <div role="flex">
            <div role="status">
                <svg aria-hidden="true" class="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span class="sr-only">Loading...</span>
            </div>
            <span class="ml-4">Loading...</span>
        </div>
    `)
    
    var form = new FormData();

    form.append('mosque_name', $("input[name='mosquename']").val());
    form.append('mosque_address', $("input[name='mosqueaddr']").val());
    // form.append('mosque_address', $("input[name='mosqueimages']").val());
    form.append('timezoneOffset', new Date().getTimezoneOffset());

    var files = $("input[name='mosqueimages']").prop('files');
    for (var i = 0; i < files.length; i++) {
        form.append('files', files[i]);
    }    

    try {
        transporter('POST', '/registerMosque/', form, true, (status, res) => {
            console.log(res);
            if(status && res.success) {
                $('#addMosqueForm')[0].reset();
                $('.mosqueSubmitBtn').attr('disable', false).text('Register Mosque') 
                toastMessage(res.data.alertMsg, 'success')
            } else {
                toastMessage(res.data.alertMsg, 'danger')
            }
        });
    } catch (error) {
        toastMessage(`adding Mosque exception: ${error}`, 'warning')
    }
}); 
 

//** creating new notes folder **//
$(`.createFolderButton`).click(function () {  
    let folderName = $('.createFolderText').val().trim();
    let noteCategory = $('.folderCategory').val(); 
    
    let data = {
        'fwG0iEZFLj': folderName,
        '25wZJLkccS': noteCategory,
    }

    
    console.log(data);

    
    if(!folderName == '') {
        try {
            transporter('POST', '/createNewFolder/', data, false, (status, res) => {
                console.log(res);
                if(status && res.success) {
                    toastMessage(res.data.alertMsg, 'success');
                    // fetchNotesFolder()
                } else {
                    toastMessage(res.data.alertMsg, 'danger');
                }
            });
        } catch (error) {
            toastMessage(`FolderCreat exception: ${error}`, 'danger');
        }
        
    } else {
        toastMessage('Folder name is empty', 'warning');
    }
});

//** creating new notes **//
$(`.createNoteButton`).click(function () { 
    console.log("feokf"); 
    let noteTitle = $('.noteTitle').val();
    let noteText = $('.noteText').val();
    
    let folderId = window.location.pathname.split('/')[2];
 
    let data = {
        '0H1mNPc0BP': noteTitle,
        'dZzHBtJCD0': noteText, 
        'EYiJ1TxpVu': folderId
    }

    if(!noteTitle == '' && !noteText == '') {   
        try {
            transporter('POST', '/createNewNote/', data, false, (status, res) => {
                console.log(res);
                if(status && res.success) {
                    toastMessage(res.data.alertMsg, 'success');
                    window.location.reload();
                } else {
                    toastMessage(res.data.alertMsg, 'danger');
                }
            });
        } catch (error) {
            toastMessage(`NoteCreat exception: ${error}`, 'danger');
        }
        
    } else {
        toastMessage('Fields cannot be empty', 'warning');
    }
});

//** deleteing notes **//
function deleteNote(noteId, note_id) {
    console.log("feokf"); 
    // let noteTitle = $('.noteTitle').val();
    // let noteText = $('.noteText').val();
    let folderId = window.location.pathname.split('/')[2];
 
    let data = { 
        'IKvJLS8U2S': noteId,
        'fzvGd2ikwk': folderId
    }
 
    try {
        transporter('POST', '/deleteNote/', data, false, (status, res) => {
            console.log(res);
            if(status && res.success) {
                $(`#note-${note_id}-modal-closeBtn`).trigger("click"); 
                $(`#note-${note_id}-modal`).remove();
                $(`#note-${note_id}-modal-button`).remove();
                toastMessage(res.data.alertMsg, 'info');
                // fetchNotesFolder()
            } else {
                toastMessage(res.data.alertMsg, 'danger');
            }
        });
    } catch (error) {
        toastMessage(`NoteDeleteion exception: ${error}`, 'danger');
    }
 
}



//** creating new query folder **//
$(`.createQueryFolderButton`).click(function () {  
    let folderName = $('.createQueryFolderText').val().trim();

    console.log(folderName);
    
    let data = {
        'JkSjmnHmGG': folderName
    }
    
    if(!folderName == '') {
        try {
            transporter('POST', '/createNewQueryFolder/', data, false, (status, res) => {
                console.log(res);
                if(status && res.success) {
                    toastMessage(res.data.alertMsg, 'success');
                    // fetchNotesFolder()
                } else {
                    toastMessage(res.data.alertMsg, 'danger');
                }
            });
        } catch (error) {
            toastMessage(`FolderCreat exception: ${error}`, 'danger');
        }
        
    } else {
        toastMessage('Folder name is empty', 'warning');
    }
});


//** creating new query **//
$(`.createQueryButton`).click(function () { 
    console.log("feokf"); 
    let queryTitle = $('.queryTitle').val();
    let queryText = $('.queryText').val();
    let folderId = window.location.pathname.split('/')[2];
 
    let data = {
        'SQl1WfKXNP': queryTitle,
        'lImB4D3RU0': queryText,
        '5dXPTnCdWf': folderId
    }

    if(!queryTitle == '' && !queryText == '') {   
        try {
            transporter('POST', '/createNewQuery/', data, false, (status, res) => {
                console.log(res);
                if(status && res.success) {
                    toastMessage(res.data.alertMsg, 'success');
                    // fetchNotesFolder()
                } else {
                    toastMessage(res.data.alertMsg, 'danger');
                }
            });
        } catch (error) {
            toastMessage(`QueryCreat exception: ${error}`, 'danger');
        }
        
    } else {
        toastMessage('Fields cannot be empty', 'warning');
    }
});


//** De-activating / activating account **//
function acc_action() {

    let toggle_state = $(`.deactive-toggle`).is(':checked');
    let mode_of_operation = (toggle_state) ? 'active' : 'deactive';
    // (toggle_state) ? $(`.deactive-toggle`).attr('disabled', 'true') : $(`.deactive-toggle`).removeAttr('disabled')

    console.log(toggle_state);
    console.log(mode_of_operation);
    
    let data = { 
        'SqOXvChEZ9GB': mode_of_operation
    }

    try {
        transporter('POST', '/accstatus/', data, false, (status, res) => {
            console.log(res);
            if(status && res.success) { 
                $('.acc_status_text').text((toggle_state) ? 'De-activate Account' : 'Activate Account')
                window.location.reload();
                toastMessage(res.data.alertMsg, 'info');
                // fetchNotesFolder()
            } else {
                toastMessage(res.data.alertMsg, 'danger');
            }
        });
    } catch (error) {
        toastMessage(`QueryCreat exception: ${error}`, 'danger');
    }

}
