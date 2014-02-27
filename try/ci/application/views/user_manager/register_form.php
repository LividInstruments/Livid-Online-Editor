<?
$this->load->helper('form_helper');
echo $msg;
?>
	<form action="register" method="post">
<table>
	<tr>
		<td>Username</td>
		<td><input type="text" name="username" value="<? echo $username; ?>" /></td>
		<td><? echo form_error('username'); ?></td>
	</tr>
	<tr>
		<td>Password</td>
		<td><input type="password" name="password" value="" /></td>
		<td><? echo form_error('password'); ?></td>
	</tr>
	<tr>
		<td>Password again</td>
		<td><input type="password" name="password2" value="" /></td>
		<td><? echo form_error('password2'); ?></td>
	</tr>
	<tr>
		<td>email</td>
		<td><input type="text" name="email" value="<? echo $email; ?>" /></td>
		<td><? echo form_error('email'); ?></td>
	</tr>
	<tr>
		<td>First name</td>
		<td><input type="text" name="firstname" value="<? echo $firstname; ?>" /></td>
		<td><? echo form_error('firstname'); ?></td>
	</tr>
	<tr>
		<td>Second name</td>
		<td><input type="text" name="secondname" value="<? echo $secondname; ?>" /></td>
		<td><? echo form_error('secondname'); ?></td>
	</tr>
	<tr>
		<td>Last name</td>
		<td><input type="text" name="lastname" value="<? echo $lastname; ?>" /></td>
		<td><? echo form_error('lastname'); ?></td>
	</tr>
	<tr>
		<td>Date of birth</td>
		<td><input type="text" name="dateofbirth" value="<? echo $dateofbirth; ?>" /></td>
		<td><? echo form_error('dateofbirth'); ?></td>
	</tr>
	<tr>
		<td>Country</td>
		<td><? echo form_dropdown('country',$country_list,$default_country); ?></td>
		<td><? echo form_error('country'); ?></td>
	</tr>
	<tr>
		<td></td>
		<td><input type="submit" name="submit" value="submit" /></td>
		<td></td>
	</tr>
</table>
</form>
<a href="<? echo base_url();?>login">login</a>