<?php

$keyword = $_POST['str'];

function getDescription($keyword){
    $url='http://lookup.dbpedia.org/api/search.asmx/KeywordSearch?QueryString='.urlencode($keyword).'&MaxHits=1&exsentences=1';
    $xml=simplexml_load_file($url);
    return $xml->Result->Description;
}

echo getDescription($keyword);

?>