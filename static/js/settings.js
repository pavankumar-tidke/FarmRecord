

 
//** MOBILE VIEW SETTINGS **/ 
if (screen.width < 768) { 
    $('.navbar').hide();   
  
} else { 
    $('.bottom-nav').hide();

}
   

//** THEME CHANGER **/ 
$('.theme-toggle-button').click(function() {
    $('body, body *').toggleClass('text-gray-900');     
    $('body, body *').toggleClass('bg-white');
})



//** ACTIVE CLASS ADDED IN NAV BASED ON URL **/ 
let urlPathName = window.location.pathname.replace(/\//g, "") 
$(`#${urlPathName}`).addClass('!text-sky-400');
$(`.bottom-nav #${urlPathName}, .bottom-nav #${urlPathName} span`).addClass('!text-sky-600');
// $(`.bottom-nav #${urlPathName} span`).addClass('!text-blue-400');

