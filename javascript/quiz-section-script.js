$(document).ready(function () {
    const APIKEY = "63e60c29478852088da68009";

    var subject = localStorage.getItem("subject");

    retrieveQuizData();
    retrieveAccountDetails();

    function retrieveQuizData(){
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://clowncar2-516f.restdb.io/rest/quiz",
            "method": "GET",
            "headers": {
              "content-type": "application/json",
              "x-apikey": APIKEY,
              "cache-control": "no-cache"
            }
          }
          
          $.ajax(settings).done(function (response) {
            console.log(response);
<<<<<<< Updated upstream
            $('#test').append(`<h1>${subject}</h1>`);
=======
            $('.quizzes').append(`<h1>${subject}</h1>`);
                
>>>>>>> Stashed changes
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
            "url": "https://clowncar2-516f.restdb.io/rest/account",
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
            "url": "https://clowncar2-516f.restdb.io/rest/quiz",
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