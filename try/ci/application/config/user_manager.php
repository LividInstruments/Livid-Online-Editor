<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

////////////////////////////////////////
//////USER MANAGER FOR CODEIGNITER//////
/////////////version 1.0.0//////////////
////////////////////////////////////////
///written by - Anuradha Jayathilaka
///email - me@anu3d.info
///web - www.anu3d.info
////////////////////////////////////////
//This code is free to use in any project.
//please leave this information if you're using this. thanks :)
////////////////////////////////////////


/*
settings for new users
*/
$config['um_accountactive']=false;
$config['um_accountblocked']=false;
$config['um_profileprivacy']='public';
$config['um_appearonline']=1;

/*
users who didnt show any activity more than this time will be considered as logged out 
value is in minutes. works only when the hook is enabled.900=15mins
*/
$config['um_login_timeout']=900;

//default country that will be selected on the registration form.
$config['um_default_country']='USA';

//email settings
$config['um_email_from']='info@lividinstruments.com';
$config['um_email_from_name']='Livid Artist Page';
$config['um_email_activate_subject']='Activate your account';
$config['um_email_reset_subject']='Did you requested a password reset?';

/*
image processing
*/
$config['um_img_dp_path']='./dps/';
$config['um_img_pics_path']='./pics/';
$config['um_img_allowed_types']='gif|jpg';
$config['um_img_max_size']=1000;
$config['um_img_max_width']=1000;
$config['um_img_max_height']=1000;

$config['um_img_dp_thumb_w']=75;
$config['um_img_dp_thumb_h']=75;


/*
this array defines the rules for the registration form
you may add your own. but it should match the database and the model
*/
$config['um_register_rules']=array(
               array(
                     'field'   => 'username', 
                     'label'   => 'Username', 
                     'rules'   => 'trim|required|is_unique[users.username]|min_length[6]|max_length[20]|xss_clean'
                  ),
               array(
                     'field'   => 'password', 
                     'label'   => 'Password', 
                     'rules'   => 'trim|required|min_length[6]|max_length[10]'
                  ),
			 array(
                     'field'   => 'password2', 
                     'label'   => 'Password2', 
                     'rules'   => 'trim|required|min_length[6]|max_length[10]|matches[password]'
                  ),
               array(
                     'field'   => 'email', 
                     'label'   => 'Email', 
                     'rules'   => 'trim|required|is_unique[users.email]|xss_clean'//valid_email
                  ),   
               array(
                     'field'   => 'firstname', 
                     'label'   => 'Firstname', 
                     'rules'   => 'trim|required'
                  ),
               array(
                     'field'   => 'secondname', 
                     'label'   => 'Secondname', 
                     'rules'   => 'trim'
                  ),
               array(
                     'field'   => 'lastname', 
                     'label'   => 'Lastname', 
                     'rules'   => 'trim|required'
                  ),
			   array(
                     'field'   => 'country', 
                     'label'   => 'Country', 
                     'rules'   => 'trim|required'
                  ),
               array(
                     'field'   => 'dateofbirth', 
                     'label'   => 'Date of birth', 
                     'rules'   => 'trim|required'
                  )
            );

/*
this array defines the rules for the password reset form 2
*/
$config['um_pwd_reset_rules']=array(
               array(
                     'field'   => 'password', 
                     'label'   => 'Password', 
                     'rules'   => 'trim|required|min_length[6]|max_length[10]'
                  ),
			 array(
                     'field'   => 'password2', 
                     'label'   => 'Password2', 
                     'rules'   => 'trim|required|min_length[6]|max_length[10]|matches[password]'
                  ),
               array(
                     'field'   => 'email', 
                     'label'   => 'Email', 
                     'rules'   => 'trim|required|xss_clean'//valid_email
                  ),   
			   array(
                     'field'   => 'token', 
                     'label'   => 'token', 
                     'rules'   => 'trim|required'
                  )
            );

/*
this array defines the rules for the profile editor
*/
$config['um_profile_rules']=array(
               array(
                     'field'   => 'password', 
                     'label'   => 'Password', 
                     'rules'   => 'trim|min_length[6]|max_length[10]'
                  ), 
			 array(
                     'field'   => 'password2', 
                     'label'   => 'Password2', 
                     'rules'   => 'trim|min_length[6]|max_length[10]|matches[password]'
                  ),
               array(
                     'field'   => 'email', 
                     'label'   => 'Email', 
                     'rules'   => 'trim|required|xss_clean|callback_check_unique_pass'//valid_email
                  ),   
               array(
                     'field'   => 'firstname', 
                     'label'   => 'Firstname', 
                     'rules'   => 'trim|required'
                  ),
               array(
                     'field'   => 'secondname', 
                     'label'   => 'Secondname', 
                     'rules'   => 'trim'
                  ),
               array(
                     'field'   => 'lastname', 
                     'label'   => 'Lastname', 
                     'rules'   => 'trim|required'
                  ),
			   array(
                     'field'   => 'country', 
                     'label'   => 'Country', 
                     'rules'   => 'trim|required'
                  ),
			   array(
					 'field'   => 'interests', 
                     'label'   => 'Interests', 
                     'rules'   => 'trim'
                  ),
			   array(
					 'field'   => 'address', 
                     'label'   => 'Address', 
                     'rules'   => 'trim'
                  ),
               array(
                     'field'   => 'dateofbirth', 
                     'label'   => 'Date of birth', 
                     'rules'   => 'trim|required'
                  )
            );

// country list that appears on the form
$config['um_country_list'] = array("LK"=>"Sri Lanka","GB"=>"United Kingdom","US"=>"United States","AF"=>"Afghanistan","AL"=>"Albania","DZ"=>"Algeria","AS"=>"American Samoa","AD"=>"Andorra","AO"=>"Angola","AI"=>"Anguilla","AQ"=>"Antarctica","AG"=>"Antigua And Barbuda","AR"=>"Argentina","AM"=>"Armenia","AW"=>"Aruba","AU"=>"Australia","AT"=>"Austria","AZ"=>"Azerbaijan","BS"=>"Bahamas","BH"=>"Bahrain","BD"=>"Bangladesh","BB"=>"Barbados","BY"=>"Belarus","BE"=>"Belgium","BZ"=>"Belize","BJ"=>"Benin","BM"=>"Bermuda","BT"=>"Bhutan","BO"=>"Bolivia","BA"=>"Bosnia And Herzegowina","BW"=>"Botswana","BV"=>"Bouvet Island","BR"=>"Brazil","IO"=>"British Indian Ocean Territory","BN"=>"Brunei Darussalam","BG"=>"Bulgaria","BF"=>"Burkina Faso","BI"=>"Burundi","KH"=>"Cambodia","CM"=>"Cameroon","CA"=>"Canada","CV"=>"Cape Verde","KY"=>"Cayman Islands","CF"=>"Central African Republic","TD"=>"Chad","CL"=>"Chile","CN"=>"China","CX"=>"Christmas Island","CC"=>"Cocos (Keeling) Islands","CO"=>"Colombia","KM"=>"Comoros","CG"=>"Congo","CD"=>"Congo","CK"=>"Cook Islands","CR"=>"Costa Rica","CI"=>"Cote D'Ivoire","HR"=>"Croatia","CU"=>"Cuba","CY"=>"Cyprus","CZ"=>"Czech Republic","DK"=>"Denmark","DJ"=>"Djibouti","DM"=>"Dominica","DO"=>"Dominican Republic","TP"=>"East Timor","EC"=>"Ecuador","EG"=>"Egypt","SV"=>"El Salvador","GQ"=>"Equatorial Guinea","ER"=>"Eritrea","EE"=>"Estonia","ET"=>"Ethiopia","FK"=>"Falkland Islands (Malvinas)","FO"=>"Faroe Islands","FJ"=>"Fiji","FI"=>"Finland","FR"=>"France","FX"=>"France, Metropolitan","GF"=>"French Guiana","PF"=>"French Polynesia","TF"=>"French Southern Territories","GA"=>"Gabon","GM"=>"Gambia","GE"=>"Georgia","DE"=>"Germany","GH"=>"Ghana","GI"=>"Gibraltar","GR"=>"Greece","GL"=>"Greenland","GD"=>"Grenada","GP"=>"Guadeloupe","GU"=>"Guam","GT"=>"Guatemala","GN"=>"Guinea","GW"=>"Guinea-Bissau","GY"=>"Guyana","HT"=>"Haiti","HM"=>"Heard And Mc Donald Islands","VA"=>"Holy See (Vatican City State)","HN"=>"Honduras","HK"=>"Hong Kong","HU"=>"Hungary","IS"=>"Iceland","IN"=>"India","ID"=>"Indonesia","IR"=>"Iran (Islamic Republic Of)","IQ"=>"Iraq","IE"=>"Ireland","IL"=>"Israel","IT"=>"Italy","JM"=>"Jamaica","JP"=>"Japan","JO"=>"Jordan","KZ"=>"Kazakhstan","KE"=>"Kenya","KI"=>"Kiribati","KP"=>"Korea","KR"=>"Korea, Republic Of","KW"=>"Kuwait","KG"=>"Kyrgyzstan","LA"=>"Lao","LV"=>"Latvia","LB"=>"Lebanon","LS"=>"Lesotho","LR"=>"Liberia","LY"=>"Libyan Arab Jamahiriya","LI"=>"Liechtenstein","LT"=>"Lithuania","LU"=>"Luxembourg","MO"=>"Macau","MK"=>"Macedonia","MG"=>"Madagascar","MW"=>"Malawi","MY"=>"Malaysia","MV"=>"Maldives","ML"=>"Mali","MT"=>"Malta","MH"=>"Marshall Islands","MQ"=>"Martinique","MR"=>"Mauritania","MU"=>"Mauritius","YT"=>"Mayotte","MX"=>"Mexico","FM"=>"Micronesia","MD"=>"Moldova, Republic Of","MC"=>"Monaco","MN"=>"Mongolia","MS"=>"Montserrat","MA"=>"Morocco","MZ"=>"Mozambique","MM"=>"Myanmar","NA"=>"Namibia","NR"=>"Nauru","NP"=>"Nepal","NL"=>"Netherlands","AN"=>"Netherlands Antilles","NC"=>"New Caledonia","NZ"=>"New Zealand","NI"=>"Nicaragua","NE"=>"Niger","NG"=>"Nigeria","NU"=>"Niue","NF"=>"Norfolk Island","MP"=>"Northern Mariana Islands","NO"=>"Norway","OM"=>"Oman","PK"=>"Pakistan","PW"=>"Palau","PA"=>"Panama","PG"=>"Papua New Guinea","PY"=>"Paraguay","PE"=>"Peru","PH"=>"Philippines","PN"=>"Pitcairn","PL"=>"Poland","PT"=>"Portugal","PR"=>"Puerto Rico","QA"=>"Qatar","RE"=>"Reunion","RO"=>"Romania","RU"=>"Russian Federation","RW"=>"Rwanda","KN"=>"Saint Kitts And Nevis","LC"=>"Saint Lucia","WS"=>"Samoa","SM"=>"San Marino","ST"=>"Sao Tome And Principe","SA"=>"Saudi Arabia","SN"=>"Senegal","SC"=>"Seychelles","SL"=>"Sierra Leone","SG"=>"Singapore","SK"=>"Slovakia","SI"=>"Slovenia","SB"=>"Solomon Islands","SO"=>"Somalia","ZA"=>"South Africa","GS"=>"South Georgia","ES"=>"Spain","SH"=>"St. Helena","PM"=>"St. Pierre And Miquelon","SD"=>"Sudan","SR"=>"Suriname","SJ"=>"Svalbard","SZ"=>"Swaziland","SE"=>"Sweden","CH"=>"Switzerland","SY"=>"Syrian Arab Republic","TW"=>"Taiwan","TJ"=>"Tajikistan","TZ"=>"Tanzania","TH"=>"Thailand","TG"=>"Togo","TK"=>"Tokelau","TO"=>"Tonga","TT"=>"Trinidad And Tobago","TN"=>"Tunisia","TR"=>"Turkey","TM"=>"Turkmenistan","TC"=>"Turks And Caicos Islands","TV"=>"Tuvalu","UG"=>"Uganda","UA"=>"Ukraine","AE"=>"United Arab Emirates","UY"=>"Uruguay","UZ"=>"Uzbekistan","VU"=>"Vanuatu","VE"=>"Venezuela","VN"=>"Viet Nam","VG"=>"Virgin Islands (British)","VI"=>"Virgin Islands (U.S.)","WF"=>"Wallis And Futuna Islands","EH"=>"Western Sahara","YE"=>"Yemen","YU"=>"Yugoslavia","ZM"=>"Zambia","ZW"=>"Zimbabwe");



