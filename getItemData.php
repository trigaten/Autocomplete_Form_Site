<?php
$file = $_POST['textFile'];
$handle = fopen($file, "r");
$items = array();

if ($handle) {
    while (($line = fgets($handle)) !== false) {
        // process the line read.
        array_push($items, $line);
        // echo $line;
    }

    fclose($handle);
    echo json_encode($items);
} else {
    // error opening the file.
} 
?>