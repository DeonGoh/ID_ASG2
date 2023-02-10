$(document).ready(function () {
    const APIKEY = "63e60c29478852088da68009";

    getItem();
    getAccountInventory();

    function getItem(){
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://clowncar2-516f.restdb.io/rest/item-list",
            "method": "GET",
            "headers": {
            "content-type": "application/json",
            "x-apikey": APIKEY,
            "cache-control": "no-cache"
            }
        }
        
        $.ajax(settings).done(function (response) {
            for(var i = 0; i < response.length; i++){
                if(response[i]["item-cat"] == "Text"){
                    $('.left-shop').append(`
                        <div class="item-container">
                            <img src="${response[i]["item-image"]}">
                            <p>${response[i]["item-name"]}</p>
                            <input type="button" value="Buy" id="${response[i]["_id"]}-button">
                        </div>
                    `)
                }
                else if (response[i]["item-cat"] == "Title"){
                    $('.right-shop').append(`
                    <div class="item-container">
                        <img src="${response[i]["item-image"]}">
                        <p>${response[i]["item-name"]}</p>
                        <input type="button" value="Buy" id="${response[i]["_id"]}-button">
                    </div>
                    `)
                }

                let itemID = response[i]["_id"];

                $(`#${itemID}-button`).on("click", function(){
                    purchaseItems(itemID);
                })
            }
        });
    }

    function getAccountInventory(){
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

            var itemSettings = {
                "async": true,
                "crossDomain": true,
                "url": "https://clowncar2-516f.restdb.io/rest/item-list",
                "method": "GET",
                "headers": {
                  "content-type": "application/json",
                  "x-apikey": APIKEY,
                  "cache-control": "no-cache"
                }
              }
              
            $.ajax(itemSettings).done(function (itemResponse) {
                for(var i = 0; i < response.length; i++){
                    console.log(response)
                    if(response[i]._id == localStorage.getItem("id")){
                        console.log(response[i]);
                        for(var z = 0; z < itemResponse.length; z ++){
                            for(var x = 0; x < response[i]["item-list"].length; x++){
                                if (response[i]["item-list"][x]["_id"] == itemResponse[z]["_id"]){
                                    $("#" + itemResponse[x]["_id"] + "-button").prop( "disabled", true);
                                }
                            }
                        }
                    }
                }
            });
        });
    }

    function purchaseItems(itemID){
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://clowncar2-516f.restdb.io/rest/item-list",
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
                    var accountSettings = {
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

                    var item = response[i];

                    $.ajax(accountSettings).done(function (accountResponse) {
                        for (var x = 0; x < accountResponse.length; x++){
                            if (accountResponse[x]["_id"] == localStorage.getItem("id")){
                                if (accountResponse[x]["Points"] >= item["cost"]){
                                    newPoints = accountResponse[x]["Points"] - item["cost"];
    
                                    var data = accountResponse[x];
                                    data["item-list"].push(item);
                                    console.log(data)
    
                                    var jsondata = {"item-list": data["item-list"],"Points": newPoints};
                                    var settings = {
                                    "async": true,
                                    "crossDomain": true,
                                    "url": `https://clowncar2-516f.restdb.io/rest/account/${accountResponse[x]._id}`,
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
                                else{
                                    alert("You have insufficient points!")
                                }
                            }
                        }
                    });
                }
            }
        });
    }
})