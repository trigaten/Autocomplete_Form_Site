<?php
    $data = $_POST['data'];
    $date = getdate()[0];
    $myfile = fopen("data/Entry($date).txt", "w");
    fwrite($myfile, $data);
?>

