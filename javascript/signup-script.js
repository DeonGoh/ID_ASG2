$(document).ready(function(){
    // hides loading screen
    $('.loading-screen').hide();

    const APIKEY = "63e4e4f5478852088da67f32";

    function signUp(){
        var username = $('#username-input').val();
        var password = $('#password-input').val();

        var jsondata = {
            "Username" : username,
            "Password" : password,
            "Points" : 0,
            "ProfilePic" : 'bannertest/default-profile-pic.jpg'
        }

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://clowncar-fd03.restdb.io/rest/account",
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "x-apikey": APIKEY,
                "cache-control": "no-cache"
            },
            "processData": false,
            "data": JSON.stringify(jsondata)
        }

        $.ajax(settings).done(function (response) {
            console.log(response);
            window.location.assign("login_page.html");
        });
    }
    // event listener
    $("#signUp").on('click',function (event){
        console.log("BUTTOn")
        event.preventDefault();
        
        // hides the entire page and show loading screen
        $('.center').hide();
        $('.loading-screen').show();

        var usernameInput = $('#username-input').val();

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://clowncar-fd03.restdb.io/rest/account",
            "method": "GET",
            "headers": {
            "content-type": "application/json",
            "x-apikey": APIKEY,
            "cache-control": "no-cache"
            }
        }
       
        $.ajax(settings).done(function (response) {
            console.log(response); 
            // true if the username is not already registered
            var allowSignUp = true;

            for (var i  = 0; i < response.length; i++) {
                if(response[i].Username == usernameInput ){
                   console.log("Invalid Username as its not unique");
                   alert("Username is already registered. Please try another");
                   // false if username is already registered
                   allowSignUp = false
                }
            }

            let password = $("#password-input").val();
            let check_password = $("#check-password").val();

            if (allowSignUp){
                if (password == ""){
                    alert("Field cannot be empty.");
                }
                else if(password != check_password){
                    alert("Password didn't match try again.");
                }
                else if(password == check_password){
                    signUp();
                }
            }

            // shows the page and loading screen after loading and failing to sign in
            $('.loading-screen').hide();
            $('.center').show();

            // clears the form
            $('#username-input').val('');
            $("#password-input").val('');
            $("#check-password").val('');
        });   
    })
})
