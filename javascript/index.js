$(document).ready(function () {
    const APIKEY = "63e6560e478852088da68030";

    getAccountDetails();
    getQuizDetails();
    getNavBarAccountDetails();

    function getNavBarAccountDetails(){
        var id = localStorage.getItem("id");
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://quizone-4a11.restdb.io/rest/account",
            "method": "GET",
            "headers": {
            "content-type": "application/json",
            "x-apikey": APIKEY,
            "cache-control": "no-cache"
            }
        }
    
        $.ajax(settings).done(function (response) {
            for (var i = 0; i < response.length; i++){
                if(id == response[i]._id){
                    $("#username-display").text(response[i].Username);
                    $("#points-display").text(response[i].Points);
                    $(".profile-pic").attr("src",response[i].ProfilePic );
                    
                    if(response[i]["profile-title"] != null){
                        var usernameString = $("#username-display").text()
                        $("#username-display").text(usernameString += ` ${response[i]["profile-title"]}`);
                    }

                    if (response[i]["text-color"] != null){
                        console.log(response[i]["change"])
                        $("#username-display").css({"color" : response[i]["change"]});
                    }

                    $("#points").text(response[i]["Points"])

                }
            }

        });
    }
    function getAccountDetails(){
        var id = localStorage.getItem("id");
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://quizone-4a11.restdb.io/rest/account",
            "method": "GET",
            "headers": {
            "content-type": "application/json",
            "x-apikey": APIKEY,
            "cache-control": "no-cache"
            }
        }
    
        $.ajax(settings).done(function (response) {
            for (var i = 0; i < response.length; i++){
                if(id == response[i]._id){
                    $("#username-display").text(response[i].Username)
                    $("#points-display").text(response[i].Points)
                    $(".profile-pic").attr("src",response[i].ProfilePic );
                }
            }

        });
    }

    function getQuizDetails(){
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://quizone-4a11.restdb.io/rest/quiz",
            "method": "GET",
            "headers": {
              "content-type": "application/json",
              "x-apikey": APIKEY,
              "cache-control": "no-cache"
            }
          }
          
        $.ajax(settings).done(function (response) {
            for(var i = 0; i < response.length && i < 5; i++){
                $('.wrapped').append(`
                <a id="${response[i]._id}">
                    <div class="item" id="${response[i]._id}-block">
                        <div class="card">
                            <img src="${response[i].Image}" alt="banner-img${i}">
                            <div class="card-body">
                            <h5 class="card-title">${response[i].QuizName}</h5>
                            <p class="card-text">${response[i].QuizDesc}</p>
                            </div>
                        </div>
                    </div>
                </a>
                `)
                let clowncar = response[i].QuizName;

                $(`#${response[i]._id}`).on("click", function(){
                    hyperlinkToQuizPage(clowncar);
                })
            }
        });
    }

    function hyperlinkToQuizPage(QuizName){
        console.log(QuizName)
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://quizone-4a11.restdb.io/rest/quiz",
            "method": "GET",
            "headers": {
              "content-type": "application/json",
              "x-apikey": APIKEY,
              "cache-control": "no-cache"
            }
        }
          
        $.ajax(settings).done(function (response) {
            for(var i = 0; i < response.length; i++){
                if(response[i]["QuizName"] == QuizName){
                    localStorage.setItem("QuizName", QuizName);
                    window.location.assign("quiz.html");
                }
            }
        });
    }

    /* NAVBAR JAVASCRIPT */

    $('#logoutButton').on("click", function(){
        localStorage.setItem("id", null);
        window.location.assign("login_page.html");
    })
    
    $('#Geography').on("click", function(e){
        e.preventDefault();
        hyperlinkToQuizzesPage('Geography');
    })

    $('#Horror').on("click", function(e){
        e.preventDefault();
        hyperlinkToQuizzesPage('Horror');
    })

    $('#Nature').on("click", function(e){
        e.preventDefault();
        hyperlinkToQuizzesPage('Nature');
    })

    $('#Pop-Culture').on("click", function(e){
        e.preventDefault();
        hyperlinkToQuizzesPage('Pop-Culture');
    })

    $('#Science').on("click", function(e){
        e.preventDefault();
        hyperlinkToQuizzesPage('Science');
    })

    function hyperlinkToQuizzesPage(subject){
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://quizone-4a11.restdb.io/rest/quiz",
            "method": "GET",
            "headers": {
              "content-type": "application/json",
              "x-apikey": APIKEY,
              "cache-control": "no-cache"
            }
        }
          
        $.ajax(settings).done(function (response) {
            for(var i = 0; i < response.length; i++){
                if(response[i]["QuizCat"] == subject){
                    localStorage.setItem("subject", subject);
                    window.location.assign("quiz_section.html");
                }
            }
        });
    }
});