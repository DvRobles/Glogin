<?php
// Conexión a la base de datos (reemplaza los valores con los tuyos)
include_once '../conexion.php';


// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// ID del vendedor
$vendedor_id = 2768;

// Consulta para obtener los productos del vendedor con el ID especificado
$sql = "SELECT * FROM products WHERE vendedor_id = $vendedor_id";
$result = $conn->query($sql);

// Verificar si se encontraron productos
if ($result->num_rows > 0) {
    // Crear un array para almacenar los productos
    $productos = array();

    // Iterar sobre los resultados y almacenar cada producto en el array
    while($row = $result->fetch_assoc()) {
        $productos[] = $row;
    }

    // Devolver los productos como JSON
    echo json_encode($productos);
} else {
    // Si no se encontraron productos, devolver un mensaje de error
    echo json_encode(array('error' => 'No se encontraron productos para el vendedor con ID ' . $vendedor_id));
}

// Cerrar conexión
$conn->close();
?>
