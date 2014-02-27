<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

if ( ! function_exists('set_radio_state')){
	
	//this will help radio boxes to select it self
	function set_radio_state($var,$val){
		if(isset($var)){
			if ($var==$val){
				echo 'checked="checked"';
			}
		}
	}

	
	
}


?>