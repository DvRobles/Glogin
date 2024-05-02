
document.addEventListener("DOMContentLoaded", function() {
    // Obtener el cuerpo de la tabla de usuarios
    const userTableBody = document.getElementById("userTableBody");

    // Realizar una solicitud al servidor para obtener los datos de los usuarios
    fetch('listar_usuarios.php')
    .then(response => response.json())
    .then(users => {
        // Verificar si se han obtenido datos de usuarios
        if (users.length > 0) {
            // Iterar sobre cada usuario y agregarlo a la tabla
            users.forEach(user => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${user.nombre_us}</td>
                    <td>${user.email}</td>
                    <td>${user.facultad}</td>
                    <td>${user.telefono}</td>
                    <td>${user.num_cuenta}</td>
                    <td>
                        <button class="action-button accept-button" data-id="${user.id}">Accept</button>
                        <button class="action-button deny-button" data-id="${user.id}">Deny</button>
                        <button class="action-button delete-button" data-id="${user.id}">Delete</button>
                    </td>
                `;
                userTableBody.appendChild(row);
            });
        } else {
            // Si no hay usuarios, mostrar un mensaje o tomar otra acción
            console.log("No hay usuarios para mostrar");
        }
    })
    .catch(error => console.error('Error:', error));

    // Agregar event listener para los botones de aceptar, denegar y eliminar
    userTableBody.addEventListener("click", function(event) {
        const target = event.target;
        const id_usuario = target.dataset.id;

        if (target.classList.contains("accept-button")) {
            updateUserStatus(id_usuario, 1); // Aceptar usuario (activar)
        } else if (target.classList.contains("deny-button")) {
            updateUserStatus(id_usuario, 0); // Denegar usuario (bloquear)
        } else if (target.classList.contains("delete-button")) {
            deleteUser(id_usuario); // Eliminar usuario
        }
    });

    // Función para actualizar el estado del usuario (aceptar o denegar)
    function updateUserStatus(id_usuario, status) {
        fetch(`update_user_status.php?id_usuario=${id_usuario}&status=${status}`, {
            method: 'PATCH'
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log(data.message);
                // Actualizar visualmente el estado del usuario si es necesario
            } else {
                console.error(data.error);
            }
        })
        .catch(error => console.error('Error:', error));
    }

    // Función para eliminar un usuario
    function deleteUser(id_usuario) {
        fetch('delete_user.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                'id_usuario': id_usuario
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log(data.message);
                // Eliminar la fila de la tabla
                //target.closest('tr').remove(); // Eliminar visualmente la fila si es necesario
            } else {
                console.error(data.error);
            }
        })
        .catch(error => console.error('Error:', error));
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const tienditaBtn = document.getElementById('tienditaBtn');

    // Agregar evento click al botón tienditaBtn
    tienditaBtn.addEventListener('click', function() {
        cambiarATiendita(tienditaBtn);
    });
});

// Función para redirigir a la página tiendita.html
function cambiarATiendita() {
    window.location.href = 'admin_agregar_producto.html';
}

// document.addEventListener("DOMContentLoaded", function() {
//     const tienditaBtn = document.getElementById('tienditaBtn');

//     tienditaBtn.addEventListener('click', function() {
//         fetch('listar_productos.php')
//         .then(response => response.json())
//         .then(productos => {
//             mostrarListaProductos(productos);
//         })
//         .catch(error => {
//             console.error('Error al cargar los productos:', error);
//             // Mostrar un mensaje de error si falla la carga de productos
//             alert('Error al cargar los productos. Por favor, inténtalo de nuevo más tarde.');
//         });
//     });
// });

// // Función para mostrar la lista de productos en la interfaz
// function mostrarListaProductos(productos) {
//     const adminPanel = document.querySelector('.admin-panel');
//     adminPanel.innerHTML = ''; // Limpiar el contenido anterior

//     // Crear la tabla de productos
//     const tablaProductos = document.createElement('table');
//     tablaProductos.classList.add('product-table');

//     // Crear el encabezado de la tabla
//     const encabezado = `
//         <thead>
//             <tr>
//                 <th>ID</th>
//                 <th>Nombre</th>
//                 <th>Descripción</th>
//                 <th>Stock</th>
//                 <th>Precio</th>
//                 <th>Imagen</th>
//                 <th>Acciones</th>
//             </tr>
//         </thead>
//     `;
//     tablaProductos.innerHTML = encabezado;

//     // Crear el cuerpo de la tabla
//     const cuerpoTabla = document.createElement('tbody');

//     productos.forEach(producto => {
//         // Crear una fila para cada producto
//         const fila = document.createElement('tr');
//         fila.innerHTML = `
//             <td>${producto.id}</td>
//             <td>${producto.nombre_producto}</td>
//             <td>${producto.descripcion}</td>
//             <td>${producto.stock}</td>
//             <td>${producto.precio}</td>
//             <td><img src="${producto.url_foto || 'path_to_default_image.jpg'}" alt="Imagen del producto" width="140px" height="140px"></td>
//             <td>
//                 <button class="edit-button" data-id="${producto.id}">Editar</button>
//                 <button class="delete-button" data-id="${producto.id}">Eliminar</button>
//             </td>
//         `;
//         cuerpoTabla.appendChild(fila);
//     });

//     // Agregar el cuerpo de la tabla al elemento de la tabla
//     tablaProductos.appendChild(cuerpoTabla);

//     // Mostrar la tabla de productos en la interfaz
//     adminPanel.appendChild(tablaProductos);

//     // Agregar botón para agregar producto
//     const agregarProductoBtn = document.createElement('button');
//     agregarProductoBtn.textContent = 'Agregar Producto';
//     agregarProductoBtn.classList.add('add-product-button');
//     agregarProductoBtn.addEventListener('click', mostrarFormularioAgregarProducto);
//     adminPanel.appendChild(agregarProductoBtn);
// }

// // Función para mostrar el formulario de agregar producto
// function mostrarFormularioAgregarProducto() {
//     const adminPanel = document.querySelector('.admin-panel');
//     adminPanel.innerHTML = ''; // Limpiar el contenido anterior

//     // Crear el formulario
//     const formularioAgregarProducto = document.createElement('form');
//     formularioAgregarProducto.classList.add('add-product-form');
//     formularioAgregarProducto.innerHTML = `
//         <button class="close-button">×</button>
//         <h2>Agregar Nuevo Producto</h2>
//         <input type="hidden" id="vendedorId" name="vendedorId" value="2768">
//         <label for="nombreProducto">Nombre:</label>
//         <input type="text" id="nombreProducto" name="nombreProducto" required><br>
//         <label for="descripcionProducto">Descripción:</label>
//         <textarea id="descripcionProducto" name="descripcionProducto" rows="4" required></textarea><br>
//         <label for="stockProducto">Stock:</label>
//         <input type="number" id="stockProducto" name="stockProducto" required><br>
//         <label for="precioProducto">Precio:</label>
//         <input type="number" id="precioProducto" name="precioProducto" step="0.01" required><br>
//         <label for="urlFoto">URL de la Imagen:</label>
//         <input type="url" id="urlFoto" name="urlFoto" required><br>
//         <button type="submit">Agregar</button>
//     `;

//     // Agregar el evento submit para manejar la inserción de productos
//     formularioAgregarProducto.addEventListener('submit', function(event) {
//         event.preventDefault();

//         const formData = new FormData(formularioAgregarProducto);

//         // Enviar los datos del nuevo producto al servidor para la inserción en la base de datos
//         fetch('insertar_producto.php', {
//             method: 'POST',
//             body: formData
//         })
//         .then(response => response.json())
//         .then(data => {
//             if (data.success) {
//                 // Si la inserción fue exitosa, mostrar la lista de productos nuevamente
//                 mostrarListaProductos();
//             } else {
//                 // Si la inserción falló, mostrar un mensaje de error específico
//                 alert('Error al insertar el producto: ' + data.error);
//             }
//         })
//         .catch(error => {
//             console.error('Error al insertar el producto:', error);
//             // Mostrar un mensaje de error genérico si falla la inserción del producto
//             alert('Error al insertar el producto. Por favor, inténtalo de nuevo más tarde.');
//         });
//     });

//     // Agregar el evento click al botón de cerrar
//     const closeButton = formularioAgregarProducto.querySelector('.close-button');
//     closeButton.addEventListener('click', function() {
//         // Mostrar nuevamente la lista de productos al cerrar el formulario
//         mostrarListaProductos();
//     });

//     // Mostrar el formulario en la interfaz
//     adminPanel.appendChild(formularioAgregarProducto);
// }
