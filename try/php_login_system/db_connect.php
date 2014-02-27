 
<?php
/* Database config */

$db_host		= 'editor.lividserver.com';
$db_user		= 'livid';
$db_pass		= '8=yes2me';
$db_database	= 'lividedit'; 

//db_connect.php
$con = mysql_connect($db_host,$db_user,$db_pass) or die(mysql_error());
$db = mysql_select_db($db_database,$con);
 
function protect($string)
{
 $string = mysql_real_escape_string($string);
 return $string;
}

function createthumb($name,$filename,$new_w,$new_h)
{
	$system=explode(".",$name);
	if (preg_match("/jpg|jpeg/",$system[1])){$src_img=imagecreatefromjpeg($name);}
	if (preg_match("/png/",$system[1])){$src_img=imagecreatefrompng($name);}
	$old_x=imageSX($src_img);
	$old_y=imageSY($src_img);
	if ($old_x > $old_y) 
	{
		$thumb_w=$new_w;
		$thumb_h=$old_y*($new_h/$old_x);
	}
	if ($old_x < $old_y) 
	{
		$thumb_w=$old_x*($new_w/$old_y);
		$thumb_h=$new_h;
	}
	if ($old_x == $old_y) 
	{
		$thumb_w=$new_w;
		$thumb_h=$new_h;
	}
	$dst_img=ImageCreateTrueColor($thumb_w,$thumb_h);
	imagecopyresampled($dst_img,$src_img,0,0,0,0,$thumb_w,$thumb_h,$old_x,$old_y); 
	if (preg_match("/png/",$system[1]))
	{
		imagepng($dst_img,$filename); 
	} else {
		imagejpeg($dst_img,$filename); 
	}
	imagedestroy($dst_img); 
	imagedestroy($src_img); 
}
?>