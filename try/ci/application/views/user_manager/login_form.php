<?php
echo $msg;
?>
<form action="login" method="post">
<table>
	<tr>
		<td>Username</td>
		<td><input name="username" type="text" value="<? echo $username ?>" /></td>
		<td><? echo form_error('username'); ?></td>
	</tr>
	<tr>
		<td>Password</td>
		<td><input name="password" type="password" value="" /></td>
		<td><? echo form_error('password'); ?></td>
	</tr>
	<tr>
		<td></td>
		<td><input name="login" type="submit" value="login" /></td>
		<td></td>
	</tr>
</table>
</form>
<a href="<? echo base_url();?>reset">reset my password</a> 
<a href="<? echo base_url();?>register">register</a>