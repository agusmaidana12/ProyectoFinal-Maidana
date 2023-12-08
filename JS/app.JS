const productos = [
    { id: 1, nombre: 'PlayStation 5', precio: 500, imagen: 'img/play5.png' },
    { id: 2, nombre: 'PlayStation 4', precio: 299, imagen: 'img/play4.png' },
    { id: 3, nombre: 'Iphone 14 Pro Max', precio: 1200, imagen: 'img/iphone14.png' },
    { id: 4, nombre: 'Pc Gamer', precio: 700, imagen: 'img/pcgamer.png' },
    { id: 5, nombre: 'Procesador i9', precio: 800, imagen: 'img/procesador.png' },
    { id: 6, nombre: 'Mouse Razer', precio: 200, imagen: 'img/mouse.png' },
    { id: 7, nombre: 'Fifa 23', precio: 60, imagen: 'img/fifa23.jpg' },
    { id: 8, nombre: 'Iphone 15 Pro Max', precio: 1700, imagen: 'img/iphone15.png' },
    { id: 9, nombre: 'Silla Gamer', precio: 290, imagen: 'img/sillagamer.png' },
    { id: 10, nombre: 'Motherboard Asus H610', precio: 250, imagen: 'img/mother.png' },
];
const moneda = 'US$';
let carrito = [];

document.addEventListener('DOMContentLoaded', () => {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
}

mostrarProductos(productos);

const filtroInput = document.getElementById('filtro');
filtroInput.addEventListener('input', filtrarProductos);

const verCarritoBtn = document.getElementById('verCarrito');
verCarritoBtn.addEventListener('click', toggleCarrito);
});

function mostrarProductos(productosMostrados) {
    const listaProductos = document.getElementById('lista-productos');
    listaProductos.innerHTML = '';

    productosMostrados.forEach(producto => {
    const divProducto = document.createElement('div');
    divProducto.classList.add('producto');

const imagen = document.createElement('img');
    imagen.src = producto.imagen;
    imagen.alt = producto.nombre;

    const nombrePrecio = document.createElement('div');
    nombrePrecio.textContent = `${producto.nombre} - ${moneda}${producto.precio}`;

    const botonAgregar = document.createElement('button');
    botonAgregar.textContent = 'Agregar al carrito';
    botonAgregar.addEventListener('click', () => agregarAlCarrito(producto));

    divProducto.appendChild(imagen);
    divProducto.appendChild(nombrePrecio);
    divProducto.appendChild(botonAgregar);

    listaProductos.appendChild(divProducto);
});
console.log('Productos mostrados en la lista.');
}

function agregarAlCarrito(producto) {
    const productoEnCarrito = carrito.find(item => item.id === producto.id);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad += 1;
    }else{
    carrito.push({ ...producto, cantidad: 1 });
}
console.log(`Agregado al carrito: ${producto.nombre}`);
    actualizarCarritoEnStorage();
    mostrarCarrito();
    actualizarContadorCarrito();
}

function toggleCarrito() {
    const carritoResumen = document.getElementById('carrito-resumen');
    carritoResumen.innerHTML = '';

    if (carrito.length > 0) {
        carrito.forEach(item => {
            const itemCarrito = document.createElement('div');
            itemCarrito.classList.add('item-carrito');

            const nombreCantidad = document.createElement('div');
            nombreCantidad.textContent = `${item.nombre} x${item.cantidad}`;

            const botonQuitar = document.createElement('button');
            botonQuitar.textContent = 'Quitar';
            botonQuitar.addEventListener('click', () => quitarDelCarrito(item));

            itemCarrito.appendChild(nombreCantidad);
            itemCarrito.appendChild(botonQuitar);

            carritoResumen.appendChild(itemCarrito);
});

    const totalCarrito = carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);

    const totalCarritoElement = document.createElement('div');
    totalCarritoElement.textContent = `Total: ${moneda}${totalCarrito}`;

    const confirmarCompraBtn = document.createElement('button');
    confirmarCompraBtn.textContent = 'Confirmar Compra';
    confirmarCompraBtn.addEventListener('click', confirmarCompra);

    const cancelarCompraBtn = document.createElement('button');
    cancelarCompraBtn.textContent = 'Cancelar Compra';
    cancelarCompraBtn.addEventListener('click', cancelarCompra);

    carritoResumen.appendChild(totalCarritoElement);
    carritoResumen.appendChild(confirmarCompraBtn);
    carritoResumen.appendChild(cancelarCompraBtn);
}

carritoResumen.style.display = 'block'; // Mostrar el carrito
    actualizarContadorCarrito();
}

function quitarDelCarrito(item) {
    carrito = carrito.filter(i => i.id !== item.id);
    actualizarCarritoEnStorage();
    toggleCarrito();
    console.log(`Quitado del carrito: ${item.nombre}`);
    actualizarContadorCarrito();
}

function confirmarCompra() {
    carrito = [];
    actualizarCarritoEnStorage();
    mostrarProductos(productos);
    toggleCarrito();
    console.log('¡Compra confirmada! Gracias por tu compra.');
    actualizarContadorCarrito();
}

function cancelarCompra() {
    carrito = [];
    actualizarCarritoEnStorage();
    toggleCarrito();
    mostrarProductos(productos);
    console.log('Compra cancelada. Puedes seguir agregando productos.');
    actualizarContadorCarrito();
}

function filtrarProductos() {
    const filtro = document.getElementById('filtro').value.toLowerCase();
    const productosFiltrados = productos.filter(producto => producto.nombre.toLowerCase().includes(filtro));
    mostrarProductos(productosFiltrados);

    console.log(`Productos filtrados por: ${filtro}`);
}

function actualizarCarritoEnStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function mostrarCarrito() {
    toggleCarrito();
}

function actualizarContadorCarrito() {
    const contadorCarrito = document.getElementById('cantidadCarrito');
    contadorCarrito.textContent = carrito.reduce((total, item) => total + item.cantidad, 0).toString();
}
