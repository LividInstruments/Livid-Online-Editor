<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed'); 


class User_manager {

	function __construct(){

	}
	
	//generates a random hash
    public function salt_gen(){
		$CI =& get_instance();
		$CI->load->library('encrypt');
		return $CI->encrypt->encode(time(), md5('KYnIgZxWKew0nOm2bu4Zd7cMX1pZv0KbavSEdpFlCru'));
    }
	
	//generates a random hash based on the salt
	public function activation_gen($salt){
		$CI =& get_instance();
		$CI->load->library('encrypt');
		return md5($CI->encrypt->encode(time(),$salt));
    }
	
	//encodes the password in to a unique hash 
	public function encode_password($pass){
		$CI =& get_instance();
		$CI->load->library('encrypt');
		return $CI->encrypt->sha1($pass);
	}
	
	//registers a user with the given data
	public function register_user($dbdata){
	$CI =& get_instance();
	
		$salt=$this->salt_gen();//generates a unique salt for this user
		//data prep
		$def_dbdata=array(
			'salt'=>$salt,
			'activationkey'=>$this->activation_gen($salt),//genarate an activation key bsd on the salt
			'accountactive'=>$CI->config->item('um_accountactive'),
			'accountblocked'=>$CI->config->item('um_accountblocked'),
			'registereddate'=>time(),
			'lastloggenindate'=>0,
			'userlvl'=>0,
			
			'address'=>'',
			'interests'=>'',
			'profileprivacy'=>$CI->config->item('um_profileprivacy'),
			'appearonline'=>$CI->config->item('um_appearonline')
			);
		$dbdata=array_merge($dbdata,$def_dbdata);
		
		$dbdata['password']=$this->encode_password($dbdata['password'],$salt);
		
		$CI->um_users_model->register_user($dbdata);
		$this->send_activation_email($dbdata['username'],$dbdata['email'],$def_dbdata['activationkey']);		
	}
	
	//logs in a user
	public function login_user($username,$password){
		$CI =& get_instance();
		$CI->load->library('session');
	
		$sess_data=array(
		'username'=>$username,
		'password'=>$password
		);
		$CI->session->set_userdata('logged_in',$sess_data);
		$CI->um_users_model->update_lastlogin_date($username);
	}
	
	//logout and clears the session for a user
	public function logout_user(){
		$CI =& get_instance();
		$CI->load->library('session');
	
		$CI->session->unset_userdata('logged_in');
		$CI->session->sess_destroy();
		redirect('login', 'refresh');
	}
	
	//updates the password for a user
	public function update_password($email,$token,$newpassword){
		$CI =& get_instance();
		$CI->load->library('email');
		
		if($CI->um_users_model->is_user_exist2($email)){
			$dbtoken=$CI->um_users_model->get_activation_key_by_email($email);
			if($token==$dbtoken){
				$CI->um_users_model->update_password($email,$this->encode_password($newpassword));
				//and reset the activation key no more resetting
				$salt=$CI->um_users_model->get_salt_by_email($email);
				$new_activation=$this->activation_gen($salt);
				$CI->um_users_model->update_activation_key($email,$new_activation);
				return true;
			}else{
				return false;
			}
		}else{
			return false;
		}
	}
	
	//updates user info
	public function update_user_info($username,$dbdata){
		$CI =& get_instance();
		$CI->load->library('email');
		
		if($CI->um_users_model->is_user_exist($username)){
			$CI->um_users_model->update_user($username,$dbdata);
			return true;
		}else{
			return false;
		}
	}
	

	/*
	emails - see email.php in config for settings
	*/
	
	/*
	send account activation email to the user
	*/
	public function send_activation_email($username,$email,$activationkey){
		$CI =& get_instance();
		$CI->load->library('email');
		
		$CI->email->from($CI->config->item('um_email_from'), $CI->config->item('um_email_from_name'));
		$CI->email->to($email); 
		
		$CI->email->subject($CI->config->item('um_email_activate_subject'));
		$CI->email->message( '<h1>Hello '.$username.' !</h1><br />
		<a href="'.base_url().'activate?email='.$email.'&token='.$activationkey.'">activate your account now !!</a>');	
		
		$CI->email->send();
		//echo $CI->email->print_debugger();//turn this on for debugging if needed
	}
	
	/*
	send the password reset mail to the user
	*/
	public function send_pass_reset_email($email){
		$CI =& get_instance();
		//first see if this user really exist
		if($CI->um_users_model->is_user_exist2($email)){
			//is the users account active?
			if($CI->um_users_model->is_account_active($email)){
				$username=$CI->um_users_model->get_username_by_email($email);
				//reset the activation key
				$salt=$CI->um_users_model->get_salt_by_username($username);
				$new_activation=$this->activation_gen($salt);
				$CI->um_users_model->update_activation_key($email,$new_activation);
				
				//now send the email
				$CI->load->library('email');
			
				$CI->email->from($CI->config->item('um_email_from'), $CI->config->item('um_email_from_name'));
				$CI->email->to($email); 
				
				$CI->email->subject($CI->config->item('um_email_reset_subject'));
				$CI->email->message('<h1>Hello '.$username.' !</h1><h3>You requested a password reset for your account</h3>
				<br />
				<a href="'.base_url().'resetpass?email='.$email.'&token='.$new_activation.'">Click here to reset your password
				</a>');	
				
				$CI->email->send();
				//echo $CI->email->print_debugger();//turn this on for debugging if needed
				return true;
			}else{
				//cannot reset pass for an account that has not been activated yet
				return false;
			}
		}else{
			return false;
		}
	}
	
	/*
	returns the current username
	*/
	public function this_user_name(){
		$CI =& get_instance();
		
		$session_data= $CI->session->userdata('logged_in');
		 if($CI->um_users_model->is_user_exist($session_data['username'])){
		 	return $session_data['username'];
		 }else{
		 	show_404();
		 }
	}

	/*
	returns true if the current user is admin
	*/
	public function is_this_admin(){
		$CI =& get_instance();
		
		if($CI->um_users_model->get_user_lvl($this->this_user_name())>'0'){
			return true;
		}else{
			return false;
		}
	}	
	/*
	uploads and resizes the dp image
	*/
	public function process_dp($field){
		$CI =& get_instance();

		$config['upload_path'] = $CI->config->item('um_img_dp_path');
		$config['allowed_types'] = $CI->config->item('um_img_allowed_types');
		$config['max_size']	= $CI->config->item('um_img_max_size');
		$config['max_width']  =$CI->config->item('um_img_max_width');
		$config['max_height']  = $CI->config->item('um_img_max_height');
		
		$config['file_name']  = $this->this_user_name();
		$config['overwrite']  = true;
		
		$CI->load->library('upload', $config);

		if ( ! $CI->upload->do_upload($field)){
			//print_r($CI->upload->display_errors());//turn on for debugging
			return false;
		}else{
			//print_r($CI->upload->data());//turn on for debugging
			
			$return=$CI->upload->data();
			$filename=$return['full_path'];
			
			//now lets resize it
			$config['image_library'] = 'gd2';
			$config['source_image']	= $filename;
			$config['create_thumb'] = TRUE;
			$config['maintain_ratio'] = TRUE;
			$config['width']=$CI->config->item('um_img_dp_thumb_w');
			$config['height']=$CI->config->item('um_img_dp_thumb_h');
			
			$CI->load->library('image_lib', $config); 
			$CI->image_lib->resize();
			
			return true;
		}
	}
	
	/*
	deletes or resets the profile picture
	*/
	public function delete_dp($username){
	$CI =& get_instance();
	$CI->load->helper('file');
		if (file_exists($CI->config->item('um_img_dp_path').$username.'.jpg')){
			delete_files(base_url().'dps\''.$username.'.jpg');
			delete_files(base_url().'dps\''.$username.'_thumb.jpg');
		}
	}
	
	/*
	this function sees if there's a dp for this user or not and returns whats best
	*/
	public function get_dp($username){
	$CI =& get_instance();

		if (file_exists($CI->config->item('um_img_dp_path').$username.'.jpg')){
			return $CI->config->item('um_img_dp_path').$username;
		}else{
			return $CI->config->item('um_img_dp_path').'default';
		}
	}
	
}