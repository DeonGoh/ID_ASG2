$(document).ready(function () {
    const APIKEY = "63e6560e478852088da68030";
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