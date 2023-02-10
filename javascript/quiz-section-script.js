$(document).ready(function () {
    const APIKEY = "63e6560e478852088da68030";

    var subject = localStorage.getItem("subject");

    retrieveQuizData();
    retrieveAccountDetails();
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
                }
            }

        });
    }

    function retrieveQuizData(){
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
            console.log(response);
            $('.header').append(`<h1>${subject}</h1>`);
            for(var i = 0; i < response.length; i++){
                if(response[i]["QuizCat"] == subject){
                    
                    $('.quizzes').append(`
                    <div class="item">
                        <a id="${response[i]._id}">
                            <div class="card">
                                <img src="${response[i].Image}" alt="${response[i].Image}">
                                <div class="card-body">
                                    <h5 class="card-title text-center">${response[i].QuizName}</h5>
                                    <p class="card-text">${response[i].QuizDesc}</p>
                                </div>
                            </div>
                        </a>
                    </div>`)

                    let clowncar = response[i].QuizName;

                    $(`#${response[i]._id}`).on("click", function(){
                        hyperlinkToQuizPage(clowncar);
                    })

                }
            }
        });
    }

    function retrieveAccountDetails(){
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
});