<?php
session_start();

//logout (logout.php)

include "db_connect.php";
 
if($_SESSION['id'])
{
session_destroy();
echo "<script language=\"Javascript\" type=\"text/javascript\">
	alert(\"You have logged out\"); 
	window.location=\"index.php\";
	</script>";
}
?>