var Email = ""
var questionItem = ""

function login(){
    Email = document.getElementById("email_area").value;
    alert("Logged in as " + Email)
    document.getElementById("logged_in_message").innerHTML = "Logged in as " + Email;
}

//https://stackoverflow.com/questions/23331546/how-to-use-javascript-to-read-local-text-file-and-read-line-by-line
function pullFromList(input = "germany.txt"){
    // const file = input.target.files[0];
    // const reader = new FileReader();
    // const arr = []
    // reader.onload = (event) => {
    //     const file = event.target.result;
    //     const allLines = file.split(/\r\n|\n/);
    //     // Reading line by line
    //     allLines.forEach((line) => {
    //         console.log(line);
    //         arr.push(line)
    //     });
    // };

    // return arr[0]
    arr = ["Angela Merkel",
        "Boris Becker",
        "Guido Westerwelle",
        "Thomas Mann",
        "Hannah Höch"]

    const randomElement = arr[Math.floor(Math.random() * arr.length)];
    return randomElement;
}

function submitData(){
    var data = {};
    data["question_item"] = questionItem;
    data["user_data"] = document.getElementById("user_data").value;
    data["email"] = Email;

    data = JSON.stringify(data);
    alert(data);
    try{
        $.ajax({
            url:"saveData.php",   
            type: "post",   
            dataType: 'json',
            data: {"data": data},
            success:function(result){
                alert("success")
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
    document.getElementById("user_data").innerHTML = "";
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
