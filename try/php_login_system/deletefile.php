<?php
session_start();
header("Location:profilecp.php");
include "db_connect.php";

$profile_id = $_SESSION['id'];

if(!$profile_id) 
{	
	echo "<script language=\"Javascript\" type=\"text/javascript\">
	alert(\"You are not logged in!\");document.location.href='index.php';
	</script>";
}
else
{            
	foreach($_POST['files'] as $num => $id)
	{
		//delete reference in database
		@mysql_query("DELETE FROM user_photos WHERE profile_id='$profile_id' AND reference='$id'"); 
		unlink($_SESSION['username']."/pics/".$id); //delete pic in directory
		unlink($_SESSION['username']."/pics/thumbs/".$id); //delete thumbnail
	}
}
?>
