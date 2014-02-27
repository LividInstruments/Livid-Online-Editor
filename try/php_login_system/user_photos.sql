CREATE TABLE `user_photos` (
`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
`profile_id` INT NOT NULL ,
`title` VARCHAR( 128 ) NOT NULL ,
`size` INT NOT NULL ,
`type` VARCHAR( 128 ) NOT NULL ,
`reference` VARCHAR( 255 ) NOT NULL 
) ENGINE = MYISAM 