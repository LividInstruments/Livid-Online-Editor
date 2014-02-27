<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class User_admin_controller extends CI_Controller {

	public function index(){
		
	}
	
	/*
	list users 
	*/
	public function list_users($cur_page=1){
		
		$per_page=5;
		
		$start=(($cur_page-1)*$per_page);
		
		$this->load->library('pagination');

		$config['base_url'] = base_url().'admin/users/';
		$config['total_rows'] = 12;
		$config['per_page'] = $per_page; 
		$config['uri_segment'] = 3;
		
		$this->pagination->initialize($config); 
		
		$list=$this->um_users_model-> get_all_users($per_page,$start);
		
		//print_r($list);
		foreach($list as $k=>$v){
			echo($v['username']);
			echo '<br>';
		}
		
		echo $this->pagination->create_links();
		
	}

}

?>