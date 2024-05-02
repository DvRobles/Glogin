


//!funcional
document.addEventListener("DOMContentLoaded", function() {
    // Realizar una solicitud al servidor para obtener los datos del usuario
    fetch('perfil.php')
    .then(response => response.json())
    .then(data => {
        // Verificar si hay un error en la respuesta
        if (data.error) {
            console.error('Error:', data.error);
            return;
        }

        // Obtener el nombre de usuario del objeto de datos
        const username = data.nombre_us;

        // Mostrar el nombre de usuario en la bienvenida
        const welcomeText = document.getElementById("welcomeText");
        welcomeText.textContent = `Welcome, ${username}!`;

        // Construir la tarjeta de información del usuario con los datos recibidos
        const userCard = document.getElementById("userCard");
        const userCardHTML = `
            <div class="card">
                <br></br>
                <p>Correo electrónico: ${data.email}</p>
                <p>Facultad: ${data.facultad}</p>
                <p>Teléfono: ${data.telefono}</p>
                <button class="edit-button">Editar <i class="fas fa-pencil-alt"></i></button>
            </div>
        `;
        userCard.innerHTML = userCardHTML;

        // Agregar evento de click al botón de editar
        const editButton = document.querySelector(".edit-button");
        editButton.addEventListener("click", function() {
            // Abrir el modal de edición
            const modal = document.getElementById("editModal");
            modal.style.display = "block";

            // Rellenar los campos del formulario con los datos del usuario actual
            document.getElementById("editEmail").value = data.email;
            document.getElementById("editFaculty").value = data.facultad;
            document.getElementById("editPhone").value = data.telefono;
        });

        // Obtener el botón de cerrar del modal
        const closeButton = document.querySelector(".close");

        // Cerrar el modal al hacer clic en el botón de cerrar (x)
        closeButton.addEventListener("click", function() {
            const modal = document.getElementById("editModal");
            modal.style.display = "none";
        });

        // Cerrar el modal al hacer clic fuera del modal
        window.onclick = function(event) {
            const modal = document.getElementById("editModal");
            if (event.target === modal) {
                modal.style.display = "none";
            }
        };

        // Agregar evento de envío para el formulario de edición
        const editForm = document.getElementById("editForm");
        editForm.addEventListener("submit", async function(event) {
            event.preventDefault(); // Evitar el envío del formulario por defecto

            // Obtener los nuevos valores del formulario
            const editedEmail = document.getElementById("editEmail").value;
            const editedFaculty = document.getElementById("editFaculty").value;
            const editedPhone = document.getElementById("editPhone").value;

            try {
                // Enviar datos del formulario al servidor PHP usando fetch
                const response = await fetch('editperfil.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded', // Tipo de contenido
                    },
                    body: new URLSearchParams({
                        'editedEmail': editedEmail,
                        'editedFaculty': editedFaculty,
                        'editedPhone': editedPhone
                    })
                });

                // Obtener la respuesta del servidor
                const responseData = await response.json();

                // Manejar la respuesta del servidor
                if (responseData.success) {
                    // Datos actualizados exitosamente
                    alert(responseData.message);
                    // Cerrar el modal después de guardar los cambios
                    const modal = document.getElementById("editModal");
                    modal.style.display = "none";
                } else {
                    // Error al actualizar los datos
                    alert(responseData.error);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });

        // Resto del código para manejar la edición del perfil...
    })
    .catch(error => console.error('Error:', error));
});

// const tienditaBtn = document.getElementById('tienditaBtn');
// const productosContainer = document.getElementById('productosContainer');

// if (tienditaBtn) {
//     tienditaBtn.addEventListener('click', function() {
//         console.log("Botón Tiendita presionado");
//         if (productosContainer.style.display === 'none' || productosContainer.innerHTML.trim() === '') {
//             fetch('../products_view.php') // Verifica que la URL sea correcta
//             .then(response => response.json())
//             .then(productos => {
//                 if (productos.length === 0) {
//                     productosContainer.innerHTML = '<p>No hay productos disponibles en este momento.</p>';
//                 } else {
//                     productos.forEach(producto => {
//                         const productoCard = `
//                             <div class="card producto">
//                                 <img src="${producto.url_foto || 'path_to_default_image.jpg'}" alt="Imagen del producto" style="width:100%">
//                                 <h3>${producto.nombre_producto}</h3>
//                                 <p>${producto.descripcion}</p>
//                                 <p>Stock: ${producto.stock}</p>
//                                 <p>Precio: $${producto.precio}</p>
//                             </div>
//                         `;
//                         productosContainer.innerHTML += productoCard;
//                     });
//                 }
//                 productosContainer.style.display = 'block';
//             })
//             .catch(error => {
//                 console.error('Error al cargar los productos:', error);
//                 productosContainer.innerHTML = '<p>Hubo un error al cargar los productos.</p>';
//             });
//         } else {
//             productosContainer.style.display = productosContainer.style.display === 'none' ? 'block' : 'none'; // Alternar visibilidad
//         }
//     });
// }

// document.addEventListener("DOMContentLoaded", function() {
//     const tienditaBtn = document.getElementById('tienditaBtn');
//     const productosContainer = document.getElementById('productosContainer');

//     // Crear el botón de cerrar si no existe
//     let closeButton = document.querySelector('.close-button');
//     if (!closeButton) {
//         closeButton = document.createElement('span');
//         closeButton.innerHTML = '&times;';
//         closeButton.classList.add('close-button');
//         closeButton.onclick = function() {
//             productosContainer.style.display = 'none';
//         };
//         productosContainer.appendChild(closeButton);
//     }

//     tienditaBtn.addEventListener('click', function() {
//         productosContainer.style.display = 'block';
//         fetch('../products_view.php')
//         .then(response => response.json())
//         .then(productos => {
//             productosContainer.innerHTML = closeButton.outerHTML; // Mantener el botón de cerrar siempre visible
//             productos.forEach(producto => {
//                 const productoCard = `
//                     <div class="card producto">
//                         <img src="${producto.url_foto || 'path_to_default_image.jpg'}" alt="Imagen del producto" widht="140px" height="140px">
//                         <div>
//                             <h3>${producto.nombre_producto}</h3>
//                             <p>${producto.descripcion}</p>
//                             <p>Stock: ${producto.stock}</p>
//                             <p>Precio: $${producto.precio}</p>
//                             <button class="add-to-cart-button"><i class="fas fa-cart-plus"></i>Agregar al carrito</button>
//                         </div>
//                     </div>
//                 `;
//                 productosContainer.innerHTML += productoCard;
//             });
//             productosContainer.appendChild(closeButton);
//         })
//         .catch(error => {
//             console.error('Error al cargar los productos:', error);
//             productosContainer.innerHTML = `<p>Hubo un error al cargar los productos.</p>${closeButton.outerHTML}`;
//         });
//     });
// });




document.addEventListener("DOMContentLoaded", function() {
    const tienditaBtn = document.getElementById('tienditaBtn');
    const productosContainer = document.getElementById('productosContainer');

    let closeButton = document.querySelector('.close-button');
    if (!closeButton) {
        closeButton = document.createElement('span');
        closeButton.innerHTML = '&times;';
        closeButton.classList.add('close-button');
        closeButton.style.top = '10px';
        closeButton.style.right = '10px';
        closeButton.style.color = '#836fff';
        closeButton.style.cursor = 'pointer';
        closeButton.style.fontSize = '32px';
        closeButton.style.border = 'none';
        closeButton.style.background = 'none';
        closeButton.onclick = function() {
            productosContainer.style.display = 'none';
        };
        productosContainer.appendChild(closeButton);
    }

    tienditaBtn.addEventListener('click', function() {
        productosContainer.style.display = 'block';
        fetch('../products_view.php')
        .then(response => response.json())
        .then(productos => {
            productosContainer.innerHTML = '';
            productosContainer.appendChild(closeButton);
            productos.forEach(producto => {
                const productoCard = document.createElement('div');
                productoCard.classList.add('card', 'producto');
                productoCard.innerHTML = `
                    <img src="${producto.url_foto || 'path_to_default_image.jpg'}" alt="Imagen del producto" width="140px" height="140px">
                    <div>
                        <h3>${producto.nombre_producto}</h3>
                        <p>${producto.descripcion}</p>
                        <p>Stock: ${producto.stock}</p>
                        <p>Precio: $${producto.precio}</p>
                        <button class="add-to-cart-button" data-product-id="${producto.id}"><i class="fas fa-cart-plus"></i>Comprar</button>
                    </div>
                `;
                productosContainer.insertBefore(productoCard, closeButton);
            });
            addToCartHandler(); // Llama a la función después de agregar los productos al DOM
        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
            productosContainer.innerHTML = '';
            productosContainer.appendChild(closeButton);
            productosContainer.innerHTML += '<p>Hubo un error al cargar los productos.</p>';
        });
    });

    function addToCartHandler() {
        const addToCartButtons = document.querySelectorAll('.add-to-cart-button');
        
        addToCartButtons.forEach(button => {
            button.addEventListener('click', async function() {
                const productoId = button.dataset.productId; // Obtén el ID del producto del atributo personalizado
                const cantidad = 1;
    
                try {
                    const response = await fetch('agregar_carrito.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        body: new URLSearchParams({
                            'producto_id': productoId,
                            'cantidad': cantidad
                        })
                    });
    
                    const responseData = await response.json();
    
                    if (responseData.success) {
                        alert(responseData.message);
                    } else {
                        alert(responseData.error);
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            });
        });
    }
});
