$(document).ready(function(){
    const APIKEY = "63e60c29478852088da68009";

    retrieveQuizData();

    function retrieveQuizData(){
        let content = "";

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