let productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];

const contenedorCarritoVacio = document.querySelector('#carrito-vacio');
const contenedorCarritoProductos = document.querySelector('#carrito-productos');
const contenedorCarritoAcciones = document.querySelector('#carrito-acciones');
const contenedorCarritoComprado = document.querySelector('#carrito-comprado');
const botonVaciar = document.querySelector('#carrito-acciones-vaciar');
const botonComprar = document.querySelector('#carrito-acciones-comprar');
const contenedorTotal = document.querySelector('#total');

// Inicializa la visualización del carrito
function initCarrito() {
    if (productosEnCarrito.length > 0) {
        mostrarCarritoConProductos();
        renderizarProductos();
    } else {
        mostrarCarritoVacio();
    }
    actualizarBotonesEliminar();
    actualizarTotal();
}

// Muestra el carrito con productos
function mostrarCarritoConProductos() {
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.remove("disabled");
    contenedorCarritoAcciones.classList.remove("disabled");
    contenedorCarritoComprado.classList.add("disabled");
}

// Muestra el carrito vacío
function mostrarCarritoVacio() {
    contenedorCarritoVacio.classList.remove("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.add("disabled");
}

// Renderiza los productos en el carrito
function renderizarProductos() {
    contenedorCarritoProductos.innerHTML = ""; // Limpiar contenedor antes de renderizar

    productosEnCarrito.forEach(producto => {
        const cardProducto = crearCardCarrito(producto);
        contenedorCarritoProductos.innerHTML += cardProducto; // Agregar cada tarjeta al contenedor
    });
}

// Crea el HTML para un producto en el carrito
function crearCardCarrito(producto) {
    return `
        <div class="carrito-producto">
            <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="carrito-producto-titulo">
                <small>Titulo</small>
                <h3>${producto.titulo}</h3>
            </div>
            <div class="carrito-producto-cantidad">
                <small>Cantidad</small>
                <p>${producto.cantidad}</p>
            </div>
            <div class="carrito-producto-precio">
                <small>Precio</small>
                <p>$${producto.precio}</p>
            </div>
            <div class="carrito-producto-subtotal">
                <small>Subtotal</small>
                <p>$${producto.precio * producto.cantidad}</p>
            </div>
            <button class="carrito-producto-eliminar" id="${producto.id}">
                <i class="bi bi-trash3-fill"></i>
            </button>
        </div>
    `;
}

// Cargar productos en el carrito al iniciar
initCarrito();

// Actualizar botones de eliminar
function actualizarBotonesEliminar() {
    const botonesEliminar = document.querySelectorAll('.carrito-producto-eliminar');
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

// Eliminar un producto del carrito
function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);

    if (index !== -1) {
        productosEnCarrito.splice(index, 1);
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
        initCarrito();
    }
}

// Vaciar el carrito
botonVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {
    productosEnCarrito = [];
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    initCarrito();
}

// Actualizar total en el carrito
function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    contenedorTotal.innerText = `$${totalCalculado}`;
}

// Comprar productos en el carrito
botonComprar.addEventListener("click", comprarCarrito);

function comprarCarrito() {
    productosEnCarrito = [];
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");
}

// Cargar productos en el carrito inicialmente
initCarrito();
