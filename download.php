<?php
$file = $_GET['file']; 
$filename = $file."txt"
header("Content-disposition: attachment; filename=".$filename);
header('Content-type: text/plain');
readfile($file."pdf");
?>