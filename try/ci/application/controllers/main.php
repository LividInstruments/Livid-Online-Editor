<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Main extends CI_Controller {
//this is a test controller
	public function index(){
		$this->load->view('user_manager/um_test');
	}


}

