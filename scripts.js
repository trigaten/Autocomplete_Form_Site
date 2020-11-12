var Email = "";
var questionItem = "";
try{
var itemList = loadItemList();
}catch(e){alert("Error " + e);}
var currentItem = 0;

/**
 * UNUSED due to switch from cookies to drop down menu
 * First js function to be called
 * Sets up currentItem data using saved cookie or creates a new cookie if there is no saved data
 */
function preLoad(){
    var cookie = document.cookie

    //if there is no saved data, make new cookie that expires in a long time
    if (cookie == ""){
        document.cookie = "i=0; expires=Fri, 31 Dec 9999 23:59:59 GMT"
    }else{
        let splits = cookie.split(";")
        let data = splits[0]
        let dataSplit = data.split("=")
        currentItem = parseInt(dataSplit[1])
    }
}

/**
 * "Logs user in" by saving their entered email
 * It will be stored with data they submit
 */
function login(){
    Email = document.getElementById("email_area").value;
    // alert("Logged in as " + Email)
    //HTML message that says they are logged in
    document.getElementById("logged_in_message").innerHTML = "Logged in as " + Email;
}

/**
 * UNUSED due to switch from cookies to drop down
 * updates the saved cookie with the new value of currentItem
 */
function updateCookie(){
    document.cookie = "i=" + currentItem + "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
}

/**
 * Loads itemList data into webpage (client side/frontend) memory 
 * @param {String} textFile - location/name of file
 */
function loadItemList(textFile = "germany.txt"){
    //Synchronous ajax call to getItemData.php
    var requestData = $.ajax({
        url:"getItemData.php",   
        type: "post",   
        dataType: 'text',
        data: {"textFile": textFile},
        async: false,
    })
    itemList = JSON.parse(requestData.responseText);
    return itemList;
}

/**
 * Pops a random value from itemList and returns it
 * If there are no more items, invokes noItemsLeft()
 */
function pullFromList(){
    if (itemList.length > 0 && itemList.length > currentItem){
        return itemList[currentItem];
    }else{
        return -1;
    }
}

/**
 * Returns length of the item list
 */
function getLengthOfList(){
    return itemList.length;
}

/**
 * Hides data entry information
 */
function noItemsLeft(){
    let user_data = document.getElementById("user_data");
    user_data.style.display = "none";
    let user_data_button = document.getElementById("user_data_button");
    user_data_button.style.display = "none";
    let item_selection_area = document.getElementById("item_selection_area");
    item_selection_area.style.visibility = "hidden";
    document.getElementById("item_area").innerHTML = "All done, thank you";
}

/**
 * Called when submit button pressed
 * Gets all user data and sends it to backend where it is saved
 */
function submitData(){
    if (Email != ""){
        var data = {};
        data["question_item"] = questionItem;
        data["user_data"] = document.getElementById("user_data").value;
        data["email"] = Email;

        data = JSON.stringify(data);
        //sends data to saveData.php with ajax
        $.ajax({
            url:"saveData.php",   
            type: "post",   
            dataType: 'json',
            data: {"data": data}
        });
        currentItem++;
        // updateCookie();
        //loads new item and clears user response
        loadNewItem();
    }else{
        alert("Please login before submitting data");
    }
}

/**
 * Updates question with new item
 * Clears user response
 */
function loadNewItem(){
    questionItem = pullFromList();
    if (questionItem != -1){
        document.getElementById("user_data").value = "";
        document.getElementById("item_area").innerHTML = "<b>"+questionItem+"</b>";
        document.getElementById("item_selector").value = currentItem+1;
        setSuggestionDescription(questionItem);
    }else{
        noItemsLeft();
    }
}

/**
 * Changes question to item at user selected index
 */
function loadItemAtIndex(){
    let index = parseInt(document.getElementById("item_selector").value)-1;
    let item = -1
    if (itemList.length > 0 && itemList.length > index){
        item = itemList[index];
    }
    if (item != -1){
        document.getElementById("item_area").innerHTML = "<b>"+item+"</b>";
        setSuggestionDescription(item);
        currentItem = index;
    }else{
        noItemsLeft();
    }
    
}

function setSuggestionDescription(searchString){
//// document.getElementById("item_description_area").innerHTML = 
    let url = `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${searchString}&exsentences=5`
    $.ajax({
        type: "GET",
        url: url,
        origin: "*",
        dataType: "jsonp",
        aysnc: false,
        success: function(data){
            let query = data.query;
            let pages = query.pages;
            let page = Object.values(pages)[0];
            let extract = page.extract;
            if (extract != undefined){
                document.getElementById("item_description_area").innerHTML = page.extract
            }else{
                document.getElementById("item_description_area").innerHTML = "No English description."
            }
        }
    })
    // console.log(JSON.parse(x.responseText));
    // // await x.query.pages.forEach(page =>{
    // //     alert("D")
    // // })
    // console.log(x.query.pages)
    // var m = x.query.pages;
    // console.log(m)
    // for (var t of m){
    //     alert("E")
    // }
    // // var v = await m[0]
    // console.log(v)
    // console.log(m.stringify())
    // .then(function(data){
    //     alert(data)
    // })
    // .then(data){

    // };

    // $.ajax({
    //     url: 'url',
    //     error: function(error) {
    //       alert("error " + error)
    //     },
    //     dataType: 'json',
    //     success: function(data) {
    //       alert(data)
    //     },
    //     type: 'GET'
    //   });

    // $.ajax({
    //     type: 'GET',
    //     url: url,
    //     dataType: 'json',
    //     async: false,
    //     success: function (data) {
    //       alert("STR " + typeof data)
    //     },
    //     error: function(error){
    //         alert("ER" + error)
    //     }
    //   });
    
    
    // var requestData = $.ajax({
    //     url: url, 
    //     dataType: "jsonp",
    //     success:function(result){alert(result)}
    // })
    // alert("F")
    // alert(requestData)
    // var requestData = $.ajax({
    //     url:"getDescription.php",   
    //     type: "post",   
    //     dataType: 'text',
    //     data: {"str": str},
    //     async: false
    // })
    // let response = requestData.responseText;
    // return response
}
