<?php
// Conexión a la base de datos
include_once '../conexion.php';

// Verificar si se ha enviado el formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener los datos del formulario
    $nombre_producto = $_POST["nombre_producto"];
    $descripcion = $_POST["descripcion"];
    $stock = $_POST["stock"];
    $precio = $_POST["precio"];
    $url_foto = $_POST["url_foto"];
    $vendedor_id = 2768; // Vendedor por defecto

    // Preparar la consulta SQL
    $sql = "INSERT INTO products (vendedor_id, nombre_producto, descripcion, stock, precio, url_foto)
    VALUES ($vendedor_id, '$nombre_producto', '$descripcion', $stock, $precio, '$url_foto')";

    // Ejecutar la consulta SQL
    if ($conn->query($sql) === TRUE) {
        echo "Producto agregado exitosamente.";
    } else {
        echo "Error al agregar producto: " . $conn->error;
    }
}

// Cerrar la conexión
$conn->close();
?>
