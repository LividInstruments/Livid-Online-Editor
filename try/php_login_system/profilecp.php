<?php
session_start();
include "db_connect.php";
?>

<html>
  
  <head>
  <link rel="stylesheet" href="style.css">  
  <title><?php echo $_SESSION['username']; ?>'s Homepage</title>
  </head>

<body>
<div class="divider">
<?php

if($_SESSION['id'])
{

	echo "<a href=\"home.php\">Home</a><br/>";
	echo "<a href=\"logout.php\">Logout</a><br/>";
	
	$sql="SELECT * from `users` WHERE `id`='".$_SESSION['id']."'";
	$res=mysql_query($sql);
	$row=mysql_fetch_assoc($res);

	////////////////////////////////////////////////////////////
	//-----------------------PRINT FORM-----------------------//
	////////////////////////////////////////////////////////////

	if(!$_POST['update'])
	{
	?>
	</div>
	<div class="divider">
	<form method="post" action="profilecp.php">
	<br/><strong>Profile Control Panel</strong><br/><br/>
	
	<div class="formElm">
	<label for="first">First Name</label>
	<input id="first" type="text" name="first" maxlength="32" value="<?php echo $row['first']; ?>">
	</div>
	
	<div class="formElm">
	<label for="last">Last Name</label>
	<input id="last" type="text" name="last" maxlength="32" value="<?php echo $row['last']; ?>">
	</div>
	
	<div class="formElm">
	<label for="email">Email</label>
	<input id="email" type="text" name="email" maxlength="255" value="<?php echo $row['email']; ?>">
	</div>
	
	<div class="formElm">
	<label for="about">About</label>
	<textarea id="about" cols="40" rows="6" name="about"><?php echo $row['about']; ?></textarea>
	</div>

	<input type="submit" name="update" value="Update">
	</form></div>

	<!-----------------------ADD PICTURES-----------------------//-->
	
	<div class="divider">
	<form enctype="multipart/form-data" action="addpics.php" method="POST"><br/>
	<strong>Upload Pictures</strong><br/><br/>
	
	<div class="formElm">
	<label for="title">Title</label>
	<input id="title" type="text" name="title" maxlength="32"><br/>
	</div>
	
	<div class="formElm">
	<label for="file">File</label>
	<input id="file" type="file" name="pics" maxlength="255"><br/>
	</div>
	
	<input type="submit" value="Add">
	</form>
	</div>
	
	<!--------------------DELETE PICTURES---------------------//-->
    
	<div class="divider">
	
	<?php
	$sql2 = "SELECT * FROM user_photos WHERE profile_id =".$_SESSION['id'];
	$res2 = mysql_query($sql2) or die(mysql_error());

		if(mysql_num_rows($res2) > 0)
		{
		echo "<strong>Delete Pictures</strong><br/><br/>";
		echo "<form name=\"deletefile\" method=\"post\" action=\"deletefile.php\">";

			while($file = mysql_fetch_array($res2))
			{
				echo "<input name=\"files[]\" type=\"checkbox\" value=\"".$file['reference']."\">";
				echo "<a href=\"".$_SESSION['username']."/pics/".$file['reference']."\"/>
				<img src=\"".$_SESSION['username']."/pics/thumbs/".$file['reference']."\"/></a><br/><br/>";
			}
		echo "<input type=\"submit\" name=\"delfile\" value=\"Delete Files\">";
		echo "</form>";
		}
		else
		{
			echo "Please upload some pictures!<br/>";
		}
	///////////////////////////////////////////////////////////////////
	//-----------------------UPDATE DATABASE-------------------------//
	///////////////////////////////////////////////////////////////////
    }
	else
	{

		$first_name=protect($_POST['first']);
		$last_name=protect($_POST['last']);
		$about=protect($_POST['about']);
		$email=protect($_POST['email']);

		$sql3 =	"UPDATE `users` SET `first`='$first_name',`last`='$last_name',`email`='$email',`about`='$about' WHERE `id`='".$_SESSION['id']."'";
		$res3 = mysql_query($sql3) or die(mysql_error());
		echo "Your profile has been successfully updated!";

	}
	
}else echo "<script language=\"Javascript\" type=\"text/javascript\">document.location.href='index.php'</script>";

?>
</div>
</body>
</html>
