<?
$this->load->helper('date');
?>
<table border="0">
	<tr>
		<td><? echo $username ?><br/>
		<img src="<? echo base_url().$dp;?>_thumb.jpg" /></td>
		<td>Profile privacy : <? echo $profileprivacy ?><br>
        You are now : <? echo $appearonline ?></td>
		<td>Country : <? echo $country ?><br>
Last login on <? echo unix_to_human($lastloggenindate) ?>
	</td>
	</tr>
    
 	<tr>
		<td>Full name on account</td>
		<td><? echo $firstname ?> <? echo $secondname ?> <? echo $lastname ?></td>
		<td>&nbsp;</td>
	</tr>
    
 	<tr>
		<td>Date of birth</td>
		<td><? echo $dateofbirth ?></td>
		<td>&nbsp;</td>
	</tr>
 	<tr>
		<td>Address</td>
		<td><? echo $address ?></td>
		<td>&nbsp;</td>
	</tr>
	<tr>
		<td>account email</td>
		<td><? echo $email ?></td>
		<td>Interests<br><? echo $interests ?>
</td>
	</tr>
	<tr>
		<td>You registered on </td>
		<td><? echo unix_to_human($registereddate) ?></td>
		<td>&nbsp;</td>
	</tr>
</table>
<a href="<? echo base_url();?>logout">logout</a>
<?
if ($this->user_manager->this_user_name()==$username){
	echo '<a href="'. base_url().'editprofile">edit profile</a>';
}
if ($this->user_manager->is_this_admin()){
	echo '<a href="'. base_url().'editprofile/'.$username.'">edit this persons profile</a>';
}
?>