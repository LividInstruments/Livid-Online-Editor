<?php
session_start();
include "db_connect.php";

if($_SESSION['id'])
{
	$sql = "SELECT username FROM `users` WHERE `id`='".$_SESSION['id']."'";
	$res = mysql_query($sql) or die(mysql_error());
	
	if(mysql_num_rows($res) != 1)
	{
		session_destroy();
		echo "<script language=\"Javascript\" type=\"text/javascript\">document.location.href='index.php'</script>";
	}
	else
	{
	$row = mysql_fetch_assoc($res);
	
	$title = protect($_POST['title']);
	
	if(!$title)
	{
		echo "<script language=\"Javascript\" type=\"text/javascript\">
				alert(\"You must choose a title for your picture!\")
				document.location.href='profilecp.php'</script>";
		
	}
	
	$target = $row['username'];
	if(!is_dir($target)) @mkdir($target);
	$target = $target . '/pics';
	
	if(!is_dir($target)) @mkdir($target);
	
		$target = $target."/".basename($_FILES['pics']['name']) ;
		$size = $_FILES['pics']['size'];
		$pic = $_FILES['pics']['name'];
		$type = $_FILES['pics']['type'];
							
			$sql2= "INSERT INTO `user_photos` (`profile_id`,`title`,`size`,`type`,`reference`)
			VALUES ('".$_SESSION['id']."','$title','$size','$type','$pic'); ";
			
			$res2 = mysql_query($sql2) or die(mysql_error());

				if(move_uploaded_file($_FILES['pics']['tmp_name'], $target))
				{
					echo "<script language=\"Javascript\" type=\"text/javascript\">
					alert(\"Your picture has been uploaded\")
					document.location.href='profilecp.php'</script>";
				}
				else
				{
					echo "<script language=\"Javascript\" type=\"text/javascript\">
					alert(\"There was an error, try again\")
					document.location.href='profilecp.php'</script>";
				}
			
		
		$target2 = $row['username'];
		$target2 = $target2 . '/pics';
		$target2 = $target2 . '/thumbs';
		if(!is_dir($target2)) @mkdir($target2);
		$target2 = $target2."/".basename($_FILES['pics']['name']) ;
		createthumb($target,$target2,150,150);
		
	}
}else echo "<script language=\"Javascript\" type=\"text/javascript\">document.location.href='index.php'</script>";

?>
