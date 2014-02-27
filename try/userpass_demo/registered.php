<?php

session_name('tzLogin');
session_set_cookie_params(2*7*24*60*60);
session_start();
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Registered users only! | Tutorialzine demo</title>
    
    <link rel="stylesheet" type="text/css" href="demo.css" media="screen" />
    
</head>

<body>

<div id="main">
  <div class="container">
    <h1>Registered Users Only!</h1>
    <h2>Login to view this resource!</h2>
    </div>
    
    <div class="container">
    
    <?php
	if($_SESSION['id'])
	echo '<h1>Hello, '.$_SESSION['usr'].'! You are registered and logged in!</h1>';
	else echo '<h1>Please, <a href="demo.php">login</a> and come back later!</h1>';
    ?>
    </div>
    
  <div class="container tutorial-info">
  This is a tutorialzine demo. View the <a href="http://tutorialzine.com/2009/10/cool-login-system-php-jquery/" target="_blank">original tutorial</a>, or download the <a href="demo.zip">source files</a>.    </div>
</div>


</body>
</html>
