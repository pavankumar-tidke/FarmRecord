
// Toggle between the signup and login view
$('.signup-section').hide()
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

  let data = {
    name: $("input[name='name']").val(),
    // username: $("input[name='username']").val(),
    email: $("input[name='email']").val(),
    password: $("input[name='password']").val(),
    operation: 'signup',
  }

  try{
    transporter('POST', `authenticateUser/`, data, false, (status, res) => {
      let type = (status && res.success) ? 'success' : 'yellow';
      toastMessage(res.data.alertMsg, type)
      $('#user_sign_up_form')[0].reset();
    });
  } catch (error) {
    toastMessage(`signup exception: ${error}`, danger);
  }

});


$(".loading-animation").hide();
// login 
$('.login-submit').click( (e) => {

  let data = { 
    email: $("input[name='loginEmail']").val(), 
    password: $("input[name='loginPassword']").val(),
    operation: 'login',
  }
  
  try {
    transporter("POST", `authenticateUser/`, data, false, (status, res) => { 

      if(status && res.success) { 
        $(".auth-container, .auth-nav").hide();
        $(".loading-animation").show();
          setTimeout(function() {
            window.location.href = '/dashboard/' 
        // }, 7000);
        }, 200);
      } else {
         toastMessage(res.data.alertMsg, 'danger');
      }
    });
  } catch (error) {
    toastMessage(`login exception: ${error}`, danger);
  }
 
});


// user logout button
function logoutUser() {

  try {
    transporter("POST", `/auth/userlogout/`, data, false, (status, res) => { 
      // (status && res.success) ? window.location.href = res.data.redirect_url : toastMessage(res.data.alertMsg, 'danger');
      console.log(res);


    });
  } catch (error) {
    toastMessage(`login exception: ${error}`, danger);
  }


}

