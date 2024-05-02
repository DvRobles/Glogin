<?php
// Verificar si se recibieron los datos del formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener el ID del producto y la cantidad del formulario
    $productoId = $_POST['producto_id'];
    $cantidad = $_POST['cantidad'];
    
    // Establecer la conexión a la base de datos
    include_once '../conexion.php';


    // Consulta SQL para agregar una nueva fila en la tabla de ventas
    $sql_venta = "INSERT INTO ventas (id_producto, cantidad) VALUES ('$productoId', '$cantidad')";

    if ($conn->query($sql_venta) === TRUE) {
        // Consulta SQL para actualizar el stock del producto en la tabla de productos
        //$sql_stock = "UPDATE mierda SET stock = stock - $cantidad WHERE id = '$productoId'";
        
        if ($conn->query($sql_stock) === TRUE) {
            // Si tanto la inserción en ventas como la actualización del stock tienen éxito, se devuelve un mensaje de éxito
            $response = array("success" => true, "message" => "Producto agregado al carrito exitosamente.");
            echo json_encode($response);
        } else {
            // Si falla la actualización del stock, se devuelve un mensaje de error
            $response = array("success" => false, "error" => "Error al actualizar el stock del producto: " . $conn->error);
            echo json_encode($response);
        }
    } else {
        // Si falla la inserción en la tabla de ventas, se devuelve un mensaje de error
        $response = array("success" => false, "error" => "Error al agregar el producto al carrito: " . $conn->error);
        echo json_encode($response);
    }

    // Cerrar la conexión a la base de datos
    $conn->close();
} else {
    // Si no se recibieron los datos del formulario, se devuelve un mensaje de error
    $response = array("success" => false, "error" => "No se recibieron datos del formulario.");
    echo json_encode($response);
}
?>
