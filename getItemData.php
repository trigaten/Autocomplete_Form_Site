<?php
    //opens file at passed location
    $file = $_POST['textFile'];
    $handle = fopen($file, "r");
    //creates empty array of items
    $items = array();
    
    if ($handle) {
        //goes through each line of the file
        while (($line = fgets($handle)) !== false) {
            array_push($items, $line);
        }

        fclose($handle);
        echo json_encode($items);
    } else {
        // error opening the file.
    } 
?>