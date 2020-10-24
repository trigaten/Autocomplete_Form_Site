var Email = "";
var questionItem = "";
var itemList = loadItemList();

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
 * @param {String} textFile - location/name of file
 */
function pullFromList(textFile = "germany.txt"){
    if (itemList.length > 0){
        const randomIndex = Math.floor(Math.random() * itemList.length);
        const randomElement = itemList[randomIndex];
        //remove element at randomIndex
        itemList.splice(randomIndex, 1);
        return randomElement;
    }else{
        noItemsLeft();
        return "All done, have a nice day!";
    }
}
/**
 * Hides data entry box and submit button
 */
function noItemsLeft(){
    var data_entry = document.getElementById("user_data");
    data_entry.style.display = "none";
    var data_entry = document.getElementById("user_data_button");
    data_entry.style.display = "none";
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
    document.getElementById("item_area").innerHTML = questionItem;
    document.getElementById("user_data").value = "";
}
