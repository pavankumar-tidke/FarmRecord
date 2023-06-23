
// Toggle between the signup and login view
$('.signup-section').hide();

$('.login-link').click( (e) => {
  $('.login-section').show();
  $('.signup-section').hide();
}) ;
$('.signup-link').click( (e) => {
    $('.login-section').hide();
    $('.signup-section').show();
}) ;


// Account create action
$('.signup-submit').click( (e) => {

  $('.signup-submit').addClass('opacity-75 cursor-not-allowed').attr('disabled', true).html(`
      <div class="text-center">
          <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="blue"/>
          </svg>
          Creating an account...
      </div>
    `)

  let data = {
    name: $("input[name='name']").val().trim(), 
    email: $("input[name='email']").val().trim(),
    password: $("input[name='password']").val().trim(),
    operation: 'signup',
  }
  

  if(data.name != '' || data.email != '' || data.password != ''){
    try{
      transporter('POST', `/auth/authenticateUser/`, data, false, (status, res) => {
        (status && res.success) ? toastMessage(res.data.alertMsg, 'success') : toastMessage(res.data.alertMsg, 'warning'); 
        $('.signup-submit').removeClass('opacity-75').attr('disabled', false).html('Create an account');
        $('#user_sign_up_form')[0].reset();
      });
    } catch (error) {
      toastMessage(`signup exception: ${error}`, 'danger');
    }
  } else {
    toastMessage('Please fill all the fields', 'warning');
    $('.signup-submit').removeClass('opacity-75').attr('disabled', false).html('Create an account');
  }

});


$(".loading-animation").hide();
// login 
$('.login-submit').click( (e) => {

  $('.login-submit').addClass('opacity-75 cursor-not-allowed').attr('disabled', true).html(`
      <div class="text-center">
          <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="blue"/>
          </svg>
          Logging In...
      </div>
    `)

  let data = { 
    email: $("input[name='loginEmail']").val(), 
    password: $("input[name='loginPassword']").val(),
    operation: 'login',
  }
  
  try {
    transporter("POST", `/auth/authenticateUser/`, data, false, (status, res) => { 

      if(status && res.success) { 
        // console.log(res);

        localStorage.setItem('user_id', res.data.user['id']);
        localStorage.setItem('user_name', res.data.user['name']);
        localStorage.setItem('user_email', res.data.user['email']);
        
        toastMessage(res.data.alertMsg, 'success');
        window.location.href = res.data.redirect_url;

      } else {
        toastMessage(res.data.alertMsg, 'danger');
        $('.login-submit').removeClass('opacity-75').attr('disabled', false).html('Login In');
        $('#user_login_form')[0].reset();
      }
    });
  } catch (error) {
    toastMessage(`login exception: ${error}`, danger); 
  }
 
});


// user logout button
function logoutUser() {

  try {
    transporter("POST", `/userlogout/`, data, false, (status, res) => { 
      // (status && res.success) ? window.location.href = res.data.redirect_url : toastMessage(res.data.alertMsg, 'danger');
      console.log(res);


    });
  } catch (error) {
    toastMessage(`login exception: ${error}`, danger);
  }


}

