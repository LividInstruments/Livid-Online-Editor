<?php

class Um_hook extends CI_Controller{
	
	/*
	this hook will update the user status on to the database
	*/
	public function update_user_status(){
	if($this->session->userdata('logged_in')){
		//cleanup old logins
		$this->um_users_model->cleanup_expired_logins();
		//report the current status
		$session_data= $this->session->userdata('logged_in');
		$dbdata=array(
			'loggedusername'=>$session_data['username'],
			'ip'=>$this->session->userdata('ip_address'),
			'lastactivity'=>time(),
			'useragent'=>$this->session->userdata('user_agent'),
			'online'=>$this->um_users_model->get_user_online_setting($session_data['username'])
		);
		
		if($this->um_users_model->is_user_logged_in($session_data['username'])){
			$this->um_users_model->update_user_logged_in($session_data['username'],$dbdata);
		}else{
			$this->um_users_model->register_user_as_logged_in($dbdata);
		}
	
	}
	}
	
	
	
}


?>