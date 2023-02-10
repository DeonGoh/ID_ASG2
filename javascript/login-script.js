$(document).ready(function () {
    // hides loading screen
    $('.loading-screen').hide();
<<<<<<< Updated upstream

=======
    
>>>>>>> Stashed changes
    const APIKEY = "63e60c29478852088da68009";

    function loginCheck(){
        var allowlogin = false;
        var usernameInput = $('#username-input').val();
        var passwordInput = $('#password-input').val();

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://clowncar2-516f.restdb.io/rest/account",
            "method": "GET",
            "headers": {
            "content-type": "application/json",
            "x-apikey": APIKEY,
            "cache-control": "no-cache"
            }
        }
    
        $.ajax(settings).done(function (response) {
            for (var i  = 0; i < response.length; i++) {
                if(response[i].Username == usernameInput && response[i].Password == passwordInput){
                    sessionStorage.setItem("id", response[i]._id);
                    localStorage.setItem("id", response[i]._id);
                    window.location.assign("index.html");
                    allowlogin = true;
                }
            }
            // if login fail
            if (allowlogin == false){
                if(passwordInput == "" && usernameInput == ""){
                    alert('the field left empty');
                }
                else if(passwordInput == ""){
                    alert('password field left empty');
                }    
                $('.center').show();
                $('.loading-screen').hide(); 
            }
        });
    }

    // Event Listener
    $("#login-submit").on("click", function(e){
        // hides the entire page and show loading screen
        $('.center').hide();
        $('.loading-screen').show();
<<<<<<< Updated upstream
        e.preventDefault();
=======
>>>>>>> Stashed changes
        loginCheck();
    });
});