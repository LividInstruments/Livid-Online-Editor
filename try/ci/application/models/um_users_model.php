<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Um_users_model extends CI_Model {
    function __construct(){
        parent::__construct();
    }
    
	/*
	GET
	*/
	function get_user_details($username){
		$this->db->select('*');
		$this->db->where('username = "'.$username.'"');
		$query=$this->db->get('users');
		return $query->row_array(); 
	}
	
	function get_username_by_email($email){
		$this->db->select('username');
		$this->db->where('email = "'.$email.'"');
		$query=$this->db->get('users');
		$query=$query->row_array(); 
		return $query['username'];
	}
	
	function get_email_by_username($username){
		$this->db->select('email');
		$this->db->where('username = "'.$username.'"');
		$query=$this->db->get('users');
		$query=$query->row_array(); 
		return $query['email'];
	}
	
	function get_activation_key_by_email($email){
		$this->db->select('activationkey');
		$this->db->where('email = "'.$email.'"');
		$query=$this->db->get('users');
		$query=$query->row_array(); 
		return $query['activationkey'];
	}
	
	function get_salt_by_username($username){
		$this->db->select('salt');
		$this->db->where('username = "'.$username.'"');
		$query=$this->db->get('users');
		$query=$query->row_array(); 
		return $query['salt'];
	}	
	
	function get_salt_by_email($email){
		$this->db->select('salt');
		$this->db->where('email = "'.$email.'"');
		$query=$this->db->get('users');
		$query=$query->row_array(); 
		return $query['salt'];
	}	
	
	
	public function get_password_by_username($username){
		$this->db->select('password');
		$this->db->where('username = "'.$username.'"');
		$query=$this->db->get('users');
		$query=$query->row_array(); 
		return $query['password'];
	}

	public function get_user_online_setting($username){
		$this->db->select('appearonline');
		$this->db->where('username = "'.$username.'"');
		$query=$this->db->get('users');
		$query=$query->row_array(); 
		return $query['appearonline'];
	}
	
	public function get_user_lvl($username){
		$this->db->select('userlvl');
		$this->db->where('username = "'.$username.'"');
		$query=$this->db->get('users');
		$query=$query->row_array(); 
		return $query['userlvl'];
	}
	
	public function get_all_users($start,$per_page){
		$this->db->select('*');
		$this->db->limit($start,$per_page);
		$this->db->order_by('cie_users_id');
		$query= $this->db->get('users');
		return $query->result_array();
	}
	
	/*
	COMMON FUNCTIONS
	*/
	function register_user($dbdata){
		return $this->db->insert('users', $dbdata);
	}
	
	public function activate_account($email){
		$this->db->where('email = "'.$email.'"');
		return $this->db->update('users', array('accountactive'=>'1'));
	}
	
	public function update_activation_key($email,$new_activation){
		$this->db->where('email = "'.$email.'"');
		return $this->db->update('users', array('activationkey'=>$new_activation));
	}	
		
	public function update_password($email,$new_pass){
		$this->db->where('email = "'.$email.'"');
		return $this->db->update('users', array('password'=>$new_pass));
	}	
	
	public function update_lastlogin_date($username){
		$this->db->where('username = "'.$username.'"');
		return $this->db->update('users', array('lastloggenindate'=>time()));
	}	
	
	function update_user($username,$dbdata){
		$this->db->where('username = "'.$username.'"');
		return $this->db->update('users', $dbdata);
	}	
	
	/*
	CHECK
	*/
	public function is_account_active($email){
		$this->db->select('accountactive');
		$this->db->where('email = "'.$email.'"');
		$query=$this->db->get('users');
		$query=$query->row_array(); 
		return $query['accountactive'];
	}
	
	public function is_account_active_2($username){
		$this->db->select('accountactive');
		$this->db->where('username = "'.$username.'"');
		$query=$this->db->get('users');
		$query=$query->row_array(); 
		return $query['accountactive'];
	}
		
	public function is_account_blocked($username){
		$this->db->select('accountblocked');
		$this->db->where('username = "'.$username.'"');
		$query=$this->db->get('users');
		$query=$query->row_array(); 
		if($query['accountblocked']=='0'){
			return true;
		}else{
			return false;
		}

	}
	
	public function is_user_exist($username){
		$this->db->select('*');
		$this->db->where('username = "'.$username.'"');
		$query=$this->db->get('users');
		if($query -> num_rows()> 0){
			return true;
		}else{
			return false;
		}
	}
	
	public function is_user_exist2($email){
		$this->db->select('*');
		$this->db->where('email = "'.$email.'"');
		$query=$this->db->get('users');
		if($query -> num_rows()> 0){
			return true;
		}else{
			return false;
		}
	}
	
	public function is_user_logged_in($username){
		$this->db->select('*');
		$this->db->where('loggedusername = "'.$username.'"');
		$query=$this->db->get('loggedin_users');
		if($query -> num_rows()> 0){
			return true;
		}else{
			return false;
		}
	}
	

	/*
	loggedin users table
	*/
	public function register_user_as_logged_in($dbdata){
		return $this->db->insert('loggedin_users', $dbdata);
	}
	
	public function update_user_logged_in($username,$dbdata){
		$this->db->where('loggedusername = "'.$username.'"');
		return $this->db->update('loggedin_users', $dbdata);
	}
	
	public function un_register_user_as_logged_in($username){
		$this->db->where('loggedusername = "'.$username.'"');
		$this->db->delete('loggedin_users');
	}
	
	public function cleanup_expired_logins(){
		$time=time() - $this->config->item('um_login_timeout');
		$this->db->where('lastactivity < "'.$time.'"');
		$this->db->delete('loggedin_users');
	}
	
}
?>