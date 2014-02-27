<?php
session_start();

//Login form (index.php)

include "db_connect.php";
if(!$_POST['submit'])
{
?>

<html>
<head><link rel="stylesheet" href="style.css"></head>

<div class="divider">

<strong>Login</strong>
<form method="post" action="index.php">

<div class="formElm">
<label for="username">Username</label>
<input id="username" type="text" name="username" maxlength="16">
</div>

<div class="formElm">
<label for="password">Password</label>
<input type="password" name="password" maxlength="16">
</div>

<input type="submit" name="submit" value="Login">
</form>
<a href="register.php">Register Here</a>

</div>
</html>

<?php
}
else
{
  $user = protect($_POST['username']);
  $pass = protect($_POST['password']);
 
if($user && $pass)
{
$pass = md5($pass); //compare the encrypted password
$sql="SELECT id,username FROM `users` WHERE `username`='$user' AND `password`='$pass'";
$query=mysql_query($sql) or die(mysql_error());
 
    if(mysql_num_rows($query) > 0)
    {
      $row = mysql_fetch_assoc($query);
      $_SESSION['id'] = $row['id'];
      $_SESSION['username'] = $row['username'];
    
      echo "<script type=\"text/javascript\">window.location=\"home.php\"</script>";	
    }
    else
   {
    echo "<script type=\"text/javascript\">
	alert(\"Username and password combination is incorrect!\");
	window.location=\"index.php\"</script>";
   }	
}
else
{			
   echo "<script type=\"text/javascript\">
	alert(\"You need to gimme a username AND password!\");
	window.location=\"index.php\"</script>";
}
}
?>