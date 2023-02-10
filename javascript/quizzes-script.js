$(document).ready(function(){
    const APIKEY = "63e6560e478852088da68030";

    retrieveQuizData();
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
        let content = "";

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
            
            // For creating the categories
            for (var i = 0; i < response.length; i++){
                if ($('#' + response[i].QuizCat + '-category').length){
                }
                else{
                    content = `${content}
                    <div class="category-heading">
                        <h1>${response[i].QuizCat}</h1>
                        <a href="#">
                            <p>more...</p>
                        </a>
                    </div>
                    <div class="wrapped" id="${response[i].QuizCat}-category">
                        <div id = "inner-content">
                        </div>  
                    </div>`
                }
                
                $("#test").html(content);
            }

            for (var i = 0; i < response.length; i++){
                if ($('#' + response[i].QuizCat + '-category' + ' ' + '.quiz-details').length < 5){
                    $('#' + response[i].QuizCat + '-category #inner-content').append(`
                        <div class="item">
                            <a href="#">
                                <div class="card">
                                    <img src="${response[i].Image}" alt="...">
                                    <div class="card-body">
                                        <h5 class="card-title text-center">${response[i].QuizName}</h5>
                                    </div>
                                </div>
                            </a>
                        </div>`)
                    }
                }
        });
    }
})