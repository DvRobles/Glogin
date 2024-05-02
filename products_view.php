<?php
// Asegúrate de incluir el archivo de conexión a la base de datos
include 'conexion.php'; // Ajusta este include al archivo correcto si es necesario

header('Content-Type: application/json'); // Establece el tipo de contenido a JSON para la respuesta

try {
    // Consulta para obtener todos los productos del vendedor con ID 2768
    $query = "SELECT * FROM products WHERE vendedor_id = 2768";
    $result = $conn->query($query);

    $productos = [];

    // Verificar si hay resultados
    if ($result->num_rows > 0) {
        // Recorrer cada fila y agregarla al array de productos
        while($row = $result->fetch_assoc()) {
            $productos[] = $row;
        }
        echo json_encode($productos); // Devolver los productos en formato JSON
    } else {
        echo json_encode([]); // Devolver un array vacío si no hay productos
    }
} catch (Exception $e) {
    // Devolver un mensaje de error en caso de falla en la consulta
    echo json_encode(['error' => $e->getMessage()]);
}

// Cerrar la conexión a la base de datos
$conn->close();
?>
