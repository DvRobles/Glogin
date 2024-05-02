<?php



include('config.php');

//Reset OAuth access token
$google_client->revokeToken();




// Elimina todas las variables de sesión.
$_SESSION = array();

if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}

session_destroy(); // Destruye la sesión.
header("Location: index.php"); // Redirige al usuario al index.php.
exit();
?>
