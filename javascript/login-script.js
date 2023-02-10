$(document).ready(function () {
<<<<<<< Updated upstream
    // hides loading screen
    $('.loading-screen').hide();
    
    const APIKEY = "63ce80d5969f06502871b127";
=======
    const APIKEY = "63e60c29478852088da68009";
>>>>>>> Stashed changes

    function loginCheck(){
        var allowlogin = false;
        var usernameInput = $('#username-input').val();
        var passwordInput = $('#password-input').val();

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://idasg2-e35e.restdb.io/rest/account",
            "url": "https://clowncar2-516f.restdb.io/rest/account",
            "method": "GET",
            "headers": {
            "content-type": "application/json",
            "x-apikey": APIKEY,
            "cache-control": "no-cache"
            }
        }
    
        $.ajax(settings).done(function (response) {
<<<<<<< Updated upstream
            console.log(response); 
=======
>>>>>>> Stashed changes
            for (var i  = 0; i < response.length; i++) {
                if(response[i].Username == usernameInput && response[i].Password == passwordInput){
                    sessionStorage.setItem("id", response[i]._id);
                    window.location.replace("index.html");
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
<<<<<<< Updated upstream
        // hides the entire page and show loading screen
        $('.center').hide();
        $('.loading-screen').show();
=======
        console.log("HELLologinsubmit")
        e.preventDefault();
>>>>>>> Stashed changes
        loginCheck();
    });
});