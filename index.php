<?php

require_once 'config.php';

if (isset($_GET["code"])) {
    $token = $google_client->fetchAccessTokenWithAuthCode($_GET["code"]);
    if (!isset($token['error'])) {
        $google_client->setAccessToken($token['access_token']);
        $_SESSION['access_token'] = $token['access_token'];

        $google_service = new Google_Service_Oauth2($google_client);
        $data = $google_service->userinfo->get();

        // Almacena los datos del usuario en la sesión
        $_SESSION['user_first_name'] = $data['given_name'];
        $_SESSION['user_last_name'] = $data['family_name'];
        $_SESSION['user_email_address'] = $data['email'];
        $_SESSION['user_image'] = $data['picture'];

        // Redirige al perfil del usuario
        header('Location: perfil/perfilG.php');
        exit();
    }
}

// Si no hay una sesión activa, muestra el botón de login
if (!isset($_SESSION['access_token'])) {
    $login_url = $google_client->createAuthUrl();
    echo "<script>var googleLoginUrl = '" . $login_url . "';</script>";
    include("main.html");
}
?>
