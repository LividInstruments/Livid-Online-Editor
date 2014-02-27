<?php
session_start();
include "db_connect.php";

$sql="SELECT * from `users` WHERE `username`='".$_GET['username']."'";
$res=mysql_query($sql) or die(mysql_error());

if(mysql_num_rows($res) != 1)
{
echo "<script language=\"Javascript\" type=\"text/javascript\">
	alert(\"This user does not exist\")
	document.location.href='index.php'</script>";
}
else
{
	$row=mysql_fetch_assoc($res);

	?>
	<html>
	<head><link rel="stylesheet" href="style.css"></head>
	
	<div class="divider">
	<strong><?php echo $_SESSION['username'] ; ?>'s Profile</strong><br/>
	Name: <?php echo $row['first']. " " .$row['last'] ?> <br/>
	Email: <?php echo $row['email'] ?> <br/>
	About: <?php echo $row['about'] ?> <br/>
    </div>
	
	<div class="divider">
	<strong>Pictures</strong><br/><br/>
<?php

	$result = mysql_query("SELECT reference FROM user_photos WHERE`profile_id`='".$row['id']."'");
	
	while ($row2 = mysql_fetch_array($result, MYSQL_ASSOC))
	{
		echo "<a href=\"".$_GET['username']."/pics/".$row2['reference']."\">
		<img src=\"".$_GET['username']."/pics/thumbs/".$row2['reference']."\"></a><br/><br/>";
	}
}
?>
