<?php 
session_start();
?>

<html>
<head><link rel="stylesheet" href="style.css"></head>

<div class="divider">

<?php
if($_SESSION['id'])
{
echo "<strong>Welcome ",$_SESSION['username'],"</strong>";

echo "<br/><a href=\"profilecp.php\">Edit Profile</a>";
echo "<br/><a href=\"profile.php?username=".$_SESSION['username']."\">View Profile</a>";
echo "<br/><a href=\"logout.php\">Logout</a>" ;
}
else
{
echo "You don't belong here!";
}
?>
</div>
</html>