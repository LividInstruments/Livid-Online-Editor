<?php
   $json = $_POST['json'];

   if (json_decode($json) != null) { /* sanity check */
     $file = fopen('controllerpreset.json','w+');
     fwrite($file, $json);
     fclose($file);
   } else {
     // handle error 
   }
?>