var Email = "";
var questionItem = "";
var itemList = loadItemList();
var currentItem = 0;

/**
 * First js function to be called
 * Sets up currentItem data using saved cookie or creates a new cookie if there is no saved data
 */
function preLoad(){
    var cookie = document.cookie
    //if there is no saved data, make new cookie that expires in a long time
    if (cookie == ""){
        document.cookie = "i=0; expires=Fri, 31 Dec 9999 23:59:59 GMT"
    }else{
        splits = cookie.split(";")
        data = splits[0]
        dataSplit = data.split("=")
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
 * Hides data entry box and submit button
 */
function noItemsLeft(){
    var user_data = document.getElementById("user_data");
    user_data.style.display = "none";
    var user_data_button = document.getElementById("user_data_button");
    user_data_button.style.display = "none";
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
        updateCookie();
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
        document.getElementById("item_area").innerHTML = questionItem;
    }else{
        noItemsLeft();
    }
    
}
