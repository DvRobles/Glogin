<?php
session_start();

header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT"); // Fecha en el pasado

if (!isset($_SESSION['access_token'])) {
    header('Location: ../index.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Perfil de Usuario Google</title>
    <link rel="stylesheet" href="styles.css">
    <style>
        body.dark-mode {
            background-color: #121212;
            color: #fff;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            padding: 20px;
        }
        .profile-card {
            background-color: #333;
            border-radius: 8px;
            padding: 20px;
            text-align: center;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        .profile-card img {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            margin: 0 auto;
            display: block;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .logout-button {
            background-color: #f44336;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            text-decoration: none;
            font-size: 16px;
            position: absolute;
            top: 20px;
            right: 20px;
        }
        .profile-card h1, .profile-card p {
            margin: 10px 0;
        }
    </style>
</head>
<body class="dark-mode">
    <div class="container">
        <a href="../logout.php" class="logout-button">Cerrar Sesión</a>
        <div class="profile-card">
            <img src="<?php echo $_SESSION['user_image']; ?>" alt="Imagen de perfil">
            <h1><?php echo $_SESSION['user_first_name'] . ' ' . $_SESSION['user_last_name']; ?></h1>
            <p><?php echo $_SESSION['user_email_address']; ?></p>
            <!-- Aquí puedes agregar más información del perfil si es necesario -->
        </div>
    </div>
</body>
</html>
