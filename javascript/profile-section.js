$(document).ready(function () {
    const APIKEY = "63e4e4f5478852088da67f32";

    getAccountDetails();
    getNavBarAccountDetails();

    function getNavBarAccountDetails(){
        var id = localStorage.getItem("id");
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

    function getAccountDetails(){
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
            for (var i = 0; i < response.length; i++){
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
            "url": "https://clowncar-fd03.restdb.io/rest/item-list",
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
                        "url": `https://clowncar-fd03.restdb.io/rest/account/${accountID}`,
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
});
