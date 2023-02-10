$(document).ready(function () {
    const APIKEY = "63e60c29478852088da68009";

    getAccountDetails();

    function getAccountDetails(){
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
            for (var i = 0; i < response.length; i++){
<<<<<<< Updated upstream
                //if(response[i]._id == localstorage.getItem("id")){}
                 // for categories in item list
                for (var i  = 0; i < response[0]["item-list"].length; i++) {
                    $('#profile-img').val(response[0].ProfilePic);
                    $('#profile-name').val(response[0].Username);               
                }
                
                for (var x  = 0; x < response[0]["item-list"].length; x++){
                    if ($('#' + response[0]["item-list"][x]["item-cat"] ).length){
=======
                if(response[i]._id == localStorage.getItem("id")){
                    $('#profile-img').val(response[i].ProfilePic);
                    $('#profile-name').val(response[i].Username); 

                    for (var x  = 0; x < response[i]["item-list"].length; x++){
                        if ($('#' + response[i]["item-list"][x]["item-cat"] ).length){
                        }
                        else{
                            $('#test').append( `
                            <p id="${response[i]["item-list"][x]["item-cat"]}">${response[i]["item-list"][x]["item-cat"]}</p>
                            `)
                        }
>>>>>>> Stashed changes
                    }

                    for (var x = 0; x < response[i]["item-list"].length; x ++){
                        $('#' + response[i]["item-list"][x]["item-cat"]).append(`
                            <p id="${response[i]["item-list"][x]["item-name"]}">${response[i]["item-list"][x]["item-name"]}</p>
                            <input type="button" value="Equip" id="${response[i]["item-list"][x]._id + "-button"}">
                        `)

                        let itemID = response[i]["item-list"][x]._id
                        let accountID = response[i]["_id"]
                        console.log(itemID)

                        $(`#${response[i]["item-list"][x]._id + "-button"}`).on('click',
                        function (){
                            console.log(itemID)
                            equipItems(itemID, accountID)
                        })
                    }
                }
            }
        });
    }


    function equipItems(itemID, accountID){
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://clowncar2-516f.restdb.io/rest/",
            "method": "GET",
            "headers": {
              "content-type": "application/json",
              "x-apikey": APIKEY,
              "cache-control": "no-cache"
            }
        }
          
        $.ajax(settings).done(function (response) {
            for(var i = 0; i < response.length; i++){
                if(response[i]._id == itemID){
                    change = response[i]["change"];
                    category = response[i]["item-cat"];

                    if(category == "Text"){
                        var jsondata = {"text-color" : change};
                    }
                    else if(category == "Title"){
                        var jsondata = {"profile-title" : change};
                    }

                    var settings = {
                        "async": true,
                        "crossDomain": true,
                        "url": `https://clowncar2-516f.restdb.io/rest/account/${accountID}`,
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
        
    }

    
    /*
    function getItems(itemID){
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://clowncar2-516f.restdb.io/rest/",
            "method": "GET",
            "headers": {
              "content-type": "application/json",
              "x-apikey": APIKEY,
              "cache-control": "no-cache"
            }
        }
          
        $.ajax(settings).done(function (response) {
            for (var i = 0; i < response[i].length; i++){
                if (response[i]._id == itemID){
                    equipItems(response[i]);
                }
            }
        });
    }*/

});
