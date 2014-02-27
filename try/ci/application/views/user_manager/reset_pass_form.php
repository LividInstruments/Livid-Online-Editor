<?
echo $msg;

?>
<form action="resetpass" method="post">
<table>
	<tr>
		<td>new password</td>
		<td><input type="password" name="password" value="" /></td>
		<td><? echo form_error('password'); ?></td>
	</tr>
	<tr>
		<td>new password again</td>
		<td><input type="password" name="password2" value="" /></td>
		<td><? echo form_error('password2'); ?></td>
	</tr>
	<tr>
		<td>
		<input type="hidden" name="token" value="<? echo $token ?>" />
		<input type="hidden" name="email" value="<? echo $email ?>" />
		&nbsp;</td>
		<td><input type="submit" value="reset" name="submit" /></td>
		<td>&nbsp;</td>
	</tr>
</table></form>
