var Email = "";
var questionItem = "";
var itemList = loadItemList();
/**
 * 
 */
function login(){
    Email = document.getElementById("email_area").value;
    alert("Logged in as " + Email)
    document.getElementById("logged_in_message").innerHTML = "Logged in as " + Email;
}

function loadItemList(textFile = "germany.txt"){
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
 * If there are no more items, invokes noItemsLeft
 * @param {String} textFile - optional param, name of file
 */
function pullFromList(textFile = "germany.txt"){
    if (itemList.length > 0){
        const randomIndex = Math.floor(Math.random() * itemList.length);
        const randomElement = itemList[randomIndex];
        itemList.splice(randomIndex, 1);
        return randomElement;
    }else{
        noItemsLeft();
        return "All done, have a nice day!";
    }
}
/**
 * Hides dataa entry box and submit button
 */
function noItemsLeft(){
    var data_entry = document.getElementById("user_data");
    data_entry.style.display = "none";
    var data_entry = document.getElementById("user_data_button");
    data_entry.style.display = "none";
}

function submitData(){
    var data = {};
    data["question_item"] = questionItem;
    data["user_data"] = document.getElementById("user_data").value;
    data["email"] = Email;

    data = JSON.stringify(data);
    try{
        $.ajax({
            url:"saveData.php",   
            type: "post",   
            dataType: 'json',
            data: {"data": data},
            success:function(result){
                // alert("success")
            }
        });
    }catch(e){
        console.log(e)
    }

    loadNewItem();
}

function loadNewItem(){
    questionItem = pullFromList();
    document.getElementById("item_area").innerHTML = questionItem;
    document.getElementById("user_data").value = "";
}

function autocomplete(str){
    if (str.length == 0) {
        document.getElementById("txtHint").innerHTML = "";
        return;
      } else {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            document.getElementById("txtHint").innerHTML = this.responseText;
          }
        };
        xmlhttp.open("GET", "gethint.php?q=" + str, true);
        xmlhttp.send();
      }
}

function search(request) {
    $.ajax({
        url: "http://en.wikipedia.org/w/api.php",
        dataType: "jsonp",
        data: {
            'action': "opensearch",
            'format': "json",
            'search': request
        },
        success: function(data) {
            response(data[1]);
        }
    });
}
