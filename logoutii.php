<?php

//logout.php
//!NO SE ESTA UTILIZANDO LO CLONE CON EL DE LOGOUT SENCILLO IGUAL EL INDEXII.PHP 
include('config.php');

//Reset OAuth access token
$google_client->revokeToken();

//Destroy entire session data.
session_destroy();

//redirect page to index.php
header('location:index.php');

?>