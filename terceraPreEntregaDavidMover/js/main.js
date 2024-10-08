const productos = [
    {
        id: "vino01",
        titulo: "Luigi",
        imagen: "./img/vino malbec.webp",
        categoria: {
            nombre: "Luigi Bosca",
            id: "malbec"
        },
        precio: 1000,
    },
    {
        id: "vino02",
        titulo: "Rutini",
        imagen: "./img/vino cabernet.webp",
        categoria: {
            nombre: "Rutini",
            id: "cabernet"
        },
        precio: 1000,
    },
    {
        id: "vino03",
        titulo: "Luigi",
        imagen: "./img/vino pinot.webp",
        categoria: {
            nombre: "Rutini",
            id: "pinot"
        },
        precio: 1000,
    }
];

const contenedorProductos = document.querySelector('#contenedor-productos');
const botonesCategorias = document.querySelectorAll('.boton-categoria');
const tituloPrincipal = document.querySelector('#titulo-principal');
const numero = document.querySelector('#numero');

let productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];

// Inicializa la aplicación
function init() {
    cargarProductos(productos);
    actualizarNumero();
    agregarEventosCategoria();
}

// Cargar productos en el contenedor
function cargarProductos(productosElegidos) {
    contenedorProductos.innerHTML = ""; // Limpiar contenedor antes de cargar productos

    productosElegidos.forEach(producto => {
        const cardProducto = crearCardProducto(producto);
        contenedorProductos.innerHTML += cardProducto; // Agregar cada tarjeta al contenedor
    });

    actualizarBotonesAgregar();
}

// Crea el HTML para un producto
function crearCardProducto(producto) {
    return `
        <div class="productos">
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">${producto.precio} €</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        </div>
    `;
}

// Agrega eventos a los botones de agregar
function actualizarBotonesAgregar() {
    const botonesAgregar = document.querySelectorAll('.producto-agregar');
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

// Agrega un producto al carrito
function agregarAlCarrito(e) {
    const productoAgregado = productos.find(producto => producto.id === e.currentTarget.id);
    const productoExistente = productosEnCarrito.find(producto => producto.id === productoAgregado.id);

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumero();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

// Actualiza el número de productos en el carrito
function actualizarNumero() {
    numero.innerText = productosEnCarrito.reduce((acc, producto) => acc + (producto.cantidad || 0), 0);
}

// Filtra productos por categoría
function filtrarProductosPorCategoria(categoriaId) {
    return categoriaId === "todos" ? productos : productos.filter(producto => producto.categoria.id === categoriaId);
}

// Agrega eventos a los botones de categoría
function agregarEventosCategoria() {
    botonesCategorias.forEach(boton => {
        boton.addEventListener("click", (e) => {
            botonesCategorias.forEach(b => b.classList.remove("active"));
            e.currentTarget.classList.add("active");

            const categoriaId = e.currentTarget.id;
            const productosFiltrados = filtrarProductosPorCategoria(categoriaId);
            tituloPrincipal.innerText = categoriaId !== "todos" ? categoriaId : "Todos los productos";
            cargarProductos(productosFiltrados);
        });
    });
}

// Inicializar la aplicación al cargar
init();
