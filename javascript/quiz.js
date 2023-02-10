$(document).ready(function () {
    const APIKEY = "63e6560e478852088da68030";
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

    var QuizName = localStorage.getItem("QuizName");
    var userID = localStorage.getItem("id");
    var timeForQuiz = 0;
    var totalPoints = 0;
    var difficulty = 0;
    var difference = 0;
    var answers = "";
    var x = "";
    var winOrLose = true;
    var score = 0;

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
        for (var i = 0; i < response.length; i++){
            if(response[i]["QuizName"] == QuizName){
                timeForQuiz = response[i]["TimeAllowed"];
                var quizCategory = response[i]["QuizCat"];
                var quizName = response[i]["QuizName"];
                answers = response[i].ActualAnswers.split(',');
                $('#total-score').text(answers.length);
            }
        }

        $('.cat-heading').text(quizCategory);
        $('.cat-title').text(quizName);
    });

    $('#answer-input').hide();
    $('#submit-button').hide();
    $('#score-display').text(0);

    var minutes = Math.floor((timeForQuiz % (100 * 60 * 60)) / (1000 * 60))
    var seconds = Math.floor((timeForQuiz % (1000 * 60)) / 1000);

    $('.timer').text(minutes + "m " + seconds + "s");

    $('#start-quiz-button').on('click', function(event){
        event.preventDefault();

        $('#answer-input').show();
        $('#submit-button').show();
        $('#start-quiz-button').hide();

        difference = timeForQuiz;

        x = setInterval(function(){
            difference -= 1000
            var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((difference % (1000 * 60)) / 1000);

            $('.timer').text(minutes + "m " + seconds + "s")

            if(difference < 0){
                gameOver();
                clearInterval(x);
            }
        }, 1000);
    })

    $('#submit-button').on("click", function(){
        for (var i = 0; i < answers.length; i++){
            if ($('#answer-input').val() == answers[i]){
                answers.splice(i,1);
                score++;
                $('#score-display').text(score);
                if (answers.length <= 0){
                    winOrLose = false;
                    clearInterval(x);
                    gameOver();
                }
            } 
        }   
        $('#answer-input').val("")
    })
    
    function gameOver(){
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
            console.log(response)
            for (var i = 0; i < response.length; i++){
                if (response[i]["_id"] == userID){
                    totalPoints = Math.round(response[i]["Points"]);
                    totalPoints += ((score * 10) * difficulty) + ((timeForQuiz - difference) / 1000)

                   var jsondata = {"Points" : totalPoints}

                    var settings = {
                        "async": true,
                        "crossDomain": true,
                        "url": `https://quizone-4a11.restdb.io/rest/account/${response[i]["_id"]}`,
                        "method": "PUT",
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
                    });
                }
            }
        });

        if (winOrLose == false){
            // YOU LOSE
        }
        else{
            // YOU WIN        
        }
        $('#answer-input').hide();
        $('#submit-button').hide();
    }
})