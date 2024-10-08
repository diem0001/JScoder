let carrito = [];
let productos = []; 

// cargar carrito desde localStorage al iniciar
function cargarCarrito() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        mostrarCarrito();
    }
}

// guardar el carrito en localStorage
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// mostrar productos
function mostrarProductos(productosData) {
    const productosContainer = document.getElementById('productos');
    productosData.forEach(producto => {
        const div = document.createElement('div');
        div.classList.add('producto');
        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.titulo}">
            <h3>${producto.titulo}</h3>
            <p>Precio: $${producto.precio}</p>
            <button onclick="agregarAlCarrito('${producto.id}')">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="green" class="bi bi-cart" viewBox="0 0 16 16">
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                </svg>
            </button>
        `;
        productosContainer.appendChild(div);
    });
}

// agregar al carrito
function agregarAlCarrito(id) {
    const productoExistente = carrito.find(producto => producto.id === id);  carrito
    const producto = productos.find(producto => producto.id === id); 
    if (productoExistente) {
        productoExistente.cantidad += 1; 
    } else {
        carrito.push({...producto, cantidad: 1}); 
    }
    guardarCarrito(); 
    Toastify({
        text: `${producto.titulo} - ${producto.categoria} agregado al carrito`, 
        duration: 3000,
        gravity: "top",
        position: 'right',
        backgroundColor: "#28a745",
    }).showToast();
    mostrarCarrito();
}

// mostrar carrito
function mostrarCarrito() {
    const carritoContainer = document.getElementById('carrito');
    carritoContainer.innerHTML = '';

    if (carrito.length === 0) {
        carritoContainer.innerHTML = '<h2>El carrito está vacío</h2>';
        return;
    }
    // inicializar total
    let total = 0; 
    carrito.forEach((producto, index) => {
        const div = document.createElement('div');
        div.classList.add('producto-carrito');
        div.innerHTML = `
            <h3 style="display: inline;">${producto.titulo} - ${producto.categoria}</h3>
            
            <img src="${producto.imagen}" alt="${producto.titulo}" style="width: 20px; height: auto; display: inline-block; margin-left: 20px;">

            <p style="display: inline;"> Precio: $${producto.precio} (Cantidad: ${producto.cantidad})</p>
            <button onclick="eliminarDelCarrito(${index})" style="background: none; border: none; cursor: pointer;">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                </svg>
            </button>
        `;
        carritoContainer.appendChild(div);
        total += producto.precio * producto.cantidad; // sumar al total
    });

    // mostrar total
    const totalDiv = document.createElement('div');
    totalDiv.innerHTML = `<h3>Total: $${total}</h3>`; 
    carritoContainer.appendChild(totalDiv);

    // botón de comprar
    const comprarBtn = document.createElement('button');
    comprarBtn.textContent = 'Comprar';
    comprarBtn.onclick = realizarCompra; 
    carritoContainer.appendChild(comprarBtn);
}

// eliminar del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    guardarCarrito(); 
    mostrarCarrito();
}

// vaciar carrito
document.getElementById('vaciar-carrito').addEventListener('click', () => {
    carrito = [];
    localStorage.removeItem('carrito'); 
    mostrarCarrito();
    Toastify({
        text: "Carrito vacío",
        duration: 3000,
        gravity: "top",
        position: 'right',
        backgroundColor: "#dc3545",
    }).showToast();
});

// realizar compra
function realizarCompra() {
    carrito = []; 
    localStorage.removeItem('carrito'); 
    mostrarCarrito();
    Toastify({
        text: "Gracias por comprar!",
        duration: 3000,
        gravity: "top",
        position: 'right',
        backgroundColor: "#28a745",
    }).showToast();
}

// cargar productos desde el json
fetch('productos.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al cargar los productos');
        }
        return response.json();
    })
    .then(data => {
        productos = data; 
        mostrarProductos(productos);
        cargarCarrito(); 
    })
    .catch(error => {
        console.error('Error:', error);
    });
