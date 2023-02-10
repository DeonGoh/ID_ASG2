$(document).ready(function () {
    const APIKEY = "63ce80d5969f06502871b127";

    var subject = localStorage.getItem("subject");

    retrieveQuizData();

    function retrieveQuizData(){
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://idasg2-e35e.restdb.io/rest/quiz",
            "method": "GET",
            "headers": {
              "content-type": "application/json",
              "x-apikey": APIKEY,
              "cache-control": "no-cache"
            }
          }
          
          $.ajax(settings).done(function (response) {
            console.log(response);
            $('#test').append(`<h1>${subject}</h1>`);
                
            for(var i = 0; i < response.length; i++){
                if(response[i]["QuizCat"] == subject){
                    
                    $('#test').append(`
                    <div class="item">
                            <a href="#">
                                <div class="card">
                                    <img src="${response[i].Image}" alt="...">
                                    <div class="card-body">
                                        <h5 class="card-title text-center">${response[i].QuizName}</h5>
                                        <p class="card-text">${response[i].QuizDesc}</p>
                                    </div>
                                </div>
                            </a>
                        </div>`)
                }
            }
        });
    }
});