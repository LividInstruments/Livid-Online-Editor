<?
echo $msg;
?>
<form action="reset" method="post">
<table>
	<tr>
		<td>your email</td>
		<td><input type="text" name="email" value="<? echo $email ?>" /></td>
		<td><? echo form_error('email'); ?></td>

	</tr>
	<tr>
		<td>&nbsp;</td>
		<td><input type="submit" value="reset" name="submit" /></td>
		<td></td>
	</tr>
</table></form>
<a href="<? echo base_url();?>login">login</a>