<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class User_manager_controller extends CI_Controller {

	public function index(){

	}
	
	/*
	displays the registration form and process the requests
	*/
	public function register(){
		if($this->session->userdata('logged_in')){
			//user is already logged in
			redirect('profile');
			}else{
			//init
			$data['country_list']=$this->config->item('um_country_list');
			$data['username']='';
			$data['email']='';
			$data['firstname']='';
			$data['secondname']='';
			$data['lastname']='';
			$data['dateofbirth']='';
			$data['default_country']=$this->config->item('um_default_country');
			//load rules
			$rules=$this->config->item('um_register_rules');
			//default msg
			$data['msg']=$this->lang->line('um_form_msg');
					
			if(isset($_POST['submit'])){
				//the user has submitted the form
				//get the user input
				$data['username']=$this->input->post('username');
				$data['email']=$this->input->post('email');
				$data['firstname']=$this->input->post('firstname');
				$data['secondname']=$this->input->post('secondname');
				$data['lastname']=$this->input->post('lastname');
				$data['dateofbirth']=$this->input->post('dateofbirth');
				$data['default_country']=$this->input->post('country');
				
				$this->form_validation->set_rules($rules);//check with the rules
				if ($this->form_validation->run() === FALSE){
					//validation failed
					$data['msg']=$this->lang->line('um_form_error');
					$this->load->view('user_manager/register_form',$data);
				}else{
					//validation passed
					$dbdata=array(
						'username'=>$this->input->post('username'),
						'password'=>$this->input->post('password'),
						'email'=>$this->input->post('email'),
						'firstname'=>$this->input->post('firstname'),
						'secondname'=>$this->input->post('secondname'),
						'lastname'=>$this->input->post('lastname'),
						'dateofbirth'=>$this->input->post('dateofbith'),
						'country'=>$this->input->post('country')
					);
					
					$this->user_manager->register_user($dbdata);
					
					$data['msg']=$this->lang->line('um_form_activate');
					
					//render the view
					$this->load->view('user_manager/um_msg',$data);
				}
			}else{
				//render the view
				$this->load->view('user_manager/register_form',$data);
			}
		}
	}

	/*
	first sees if the account is already activated if not activates an account.
	*/
	public function activate(){
	if($this->session->userdata('logged_in')){
		//uesr is already logged in
		redirect('profile');
		}else{

			if($this->input->get('email') & $this->input->get('token')){
				$email=$this->input->get('email');
				$token=$this->input->get('token');
				
				if($this->um_users_model->is_user_exist2($email)){
					if($this->um_users_model->is_account_active($email)==false){
						if($this->um_users_model->get_activation_key_by_email($email)!=$token){
							$data['msg']=$this->lang->line('um_form_activate_failed');
						}else{
							$this->um_users_model->activate_account($email);
							$data['msg']=$this->lang->line('um_form_activate_success');
						}			
					}else{
						$data['msg']=$this->lang->line('um_form_activate_error');
					}
					//render the view
					$this->load->view('user_manager/um_msg',$data);
				}else{
					show_404();
				}
			}else{
				show_404();
			}
		}
	}
	
	/*
	logges the user in
	*/
	public function login(){
		if($this->session->userdata('logged_in')){
		//user is already logged in
		redirect('profile');
		}else{
		$data['username']='';
			if(isset($_POST['login'])){
				$data['username']=$username=$this->input->post('username');
				 if($this->um_users_model->is_user_exist($username)){
				 	if($this->um_users_model->is_account_active_2($username)){
				 		if($this->um_users_model->is_account_blocked($username)){
							$dbpass=$this->um_users_model->get_password_by_username($username);
							$password=$this->input->post('password');
							$password=$this->user_manager->encode_password($this->input->post('password'));
							if($dbpass==$password){
								//login the user
								$this->user_manager->login_user($username,$password);
								redirect('profile','refresh');
							}else{
					 			$data['msg']=$this->lang->line('um_login_invalid_pass');
								$this->load->view('user_manager/login_form',$data);	
							}
				 		}else{
					 		$data['msg']=$this->lang->line('um_login_blocked');
							$this->load->view('user_manager/login_form',$data);	
						}
				 	}else{
						$data['msg']=$this->lang->line('um_login_not_active');
						$this->load->view('user_manager/login_form',$data);	
					}
				 }else{
					 $data['msg']=$this->lang->line('um_login_user_not_found');
					 $this->load->view('user_manager/login_form',$data);	
				 }
			}else{
				$data['msg']=$this->lang->line('um_login_msg');
				$this->load->view('user_manager/login_form',$data);			
			}
		}
	}
	
	
	/*
	logout the user 
	*/
	public function logout(){
		$username=$this->user_manager->this_user_name();
		$this->um_users_model->un_register_user_as_logged_in($username);
		$this->session->unset_userdata('logged_in');
		$this->session->sess_destroy();
		redirect('login', 'refresh');
	}
	
	/*
	resets the password 
	*/
	public function reset(){
	if($this->session->userdata('logged_in')){
		//user is already logged in
		redirect('profile');
		}else{
			$data['msg']=$this->lang->line('um_reset_msg');
			$data['email']='';
			if(isset($_POST['submit'])){
				$email=$this->input->post('email');
				$data['email']=$email;
					if($this->user_manager->send_pass_reset_email($email)==true){
						$data['msg']=$this->lang->line('um_reset_sent');
					}else{
						$data['msg']=$this->lang->line('um_reset_failed');
					}
			}
			$this->load->view('user_manager/reset_form',$data);	
		}		
	}
	
	
	public function reset_pass(){
	if($this->session->userdata('logged_in')){
		//user is already logged in
		redirect('profile');
		}else{
			if($this->input->get('email') & $this->input->get('token')){
				$email=$this->input->get('email');
				$token=$this->input->get('token');
				
				$data['msg']=$this->lang->line('um_reset_msg2');
				$data['email']=$email;
				$data['token']=$token;
				
				$this->load->view('user_manager/reset_pass_form',$data);
				
			}else{
				if(isset($_POST['submit'])){
					$rules=$this->config->item('um_pwd_reset_rules');
					$this->form_validation->set_rules($rules);
					$data['email']=$this->input->post('email');;
					$data['token']=$this->input->post('token');
					
					if ($this->form_validation->run() === FALSE){
						//validation failed
						$data['msg']=$this->lang->line('um_reset_failed');
						$this->load->view('user_manager/reset_pass_form',$data);
					}else{
						$password= $this->input->post('password');
						$email= $this->input->post('email');
						$token =$this->input->post('token');	
						
						if($this->user_manager->update_password($email,$token,$password)){
							$data['msg']=$this->lang->line('um_reset_success');						
						}else{
							$data['msg']=$this->lang->line('um_reset_error');						
						}
						$this->load->view('user_manager/um_msg',$data);
					}
				}else{
					show_404();
				}
			}
		}
	}
	
	
	
	/*
	shows the user's profile page
	*/
	public function show_profile($username=null){
		if($username==null){
			if($this->session->userdata('logged_in')){
				
				$username=$this->user_manager->this_user_name();
				$data=$this->um_users_model->get_user_details($username);
				$data['dp']=$this->user_manager->get_dp($username);
				$this->load->view('user_manager/profile',$data);
			}else{
				redirect('login','refresh');
			}
		}else{
			if($this->um_users_model->is_user_exist($username)){
				$data=$this->um_users_model->get_user_details($username);
				$data['dp']=$this->user_manager->get_dp($username);
				$this->load->view('user_manager/profile',$data);
			}else{
				show_404();
			}
		}
		
	}
	
	/*
	show edit profile form and save changes
	*/
	public function edit_profile(){
		if($this->session->userdata('logged_in')){
			$username=$this->user_manager->this_user_name();
			
			$data['msg']=$this->lang->line('um_profile_msg');
			$data['country_list']=$this->config->item('um_country_list');
			$data['default_country']=$this->config->item('um_default_country');			//save input first
			
			if(isset($_POST['submit'])){
				$rules=$this->config->item('um_profile_rules');
				$this->form_validation->set_rules($rules);
				if ($this->form_validation->run() === FALSE){
					$data['msg']=$this->lang->line('um_profile_update_failed');
				}else{
					//validation passed
					//if there's a dp image we need to process it
					$this->user_manager->process_dp('dp');
					//do we need to delete the dp?
					if($this->input->post('deletedp')=='on'){
						$this->user_manager->delete_dp($username);
					}
					//data prep
					$dbdata=array(
						'email'=>$this->input->post('email'),
						'firstname'=>$this->input->post('firstname'),
						'secondname'=>$this->input->post('secondname'),
						'lastname'=>$this->input->post('lastname'),
						'dateofbirth'=>$this->input->post('dateofbirth'),
						'address'=>$this->input->post('address'),
						'country'=>$this->input->post('country'),
						'interests'=>$this->input->post('interests'),
						'profileprivacy'=>$this->input->post('profileprivacy'),
						'appearonline'=>$this->input->post('appearonline'),
						'appearonline'=>$this->input->post('appearonline')
					);
					
					if($this->input->post('password')!=null){
					//do we need to update the password?
						$dbdata['password']=$this->user_manager->encode_password($this->input->post('password'));
					}
					
					if($this->user_manager->update_user_info($username,$dbdata)){
						$data['msg']=$this->lang->line('um_profile_update_success');
					}else{
						$data['msg']=$this->lang->line('um_profile_update_error');
					}
				}
			}
			
			//get the data on the db
			$this_user_data=$this->um_users_model->get_user_details($username);
			$data=array_merge($this_user_data,$data);
			$data['dp']=$this->user_manager->get_dp($username);
				
			$this->load->view('user_manager/edit_profile_form',$data);
		}else{
			redirect('login','refresh');
		}
	}
	
	

	/*
	this is a form validation callback to check if anybody else is having the same email
	used at the edit_profile() function
	*/
	function check_unique_pass($email){
		$username=$this->user_manager->this_user_name();
		if ($this->um_users_model->is_user_exist2($email)){
			//check if the current user owns this email
			$current_users_email=$this->um_users_model->get_email_by_username($username);
			if($current_users_email==$email){
				return true;
			}else{
				$this->form_validation->set_message('email', 'theres an account accociated with this email');
				return false;
			}
		}else{
			return true;
		}
		
	}	
	
	
	
	
	
	
}