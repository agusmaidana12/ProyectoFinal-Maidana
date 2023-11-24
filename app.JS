const productos = [
    { id: 1, nombre: 'PlayStation 5', precio: 850000, imagen: './img/play5.png' },
    { id: 2, nombre: 'PlayStation 4', precio: 459000, imagen: './img/play4.png' },
    { id: 3, nombre: 'Iphone 14 Pro Max', precio: 900000, imagen: './img/iphone14.png' },
    { id: 4, nombre: 'Pc Gamer', precio: 719000, imagen: './img/pcgamer.png' },
    { id: 5, nombre: 'Procesador i9', precio: 725000, imagen: './img/procesador.png' },
    { id: 6, nombre: 'Mouse Razer', precio: 50000, imagen: './img/mouse.png' },
    { id: 7, nombre: 'Fifa 23', precio: 45000 , imagen: './img/fifa23.jpg' },
    { id: 8, nombre: 'Iphone 15 Pro Max', precio: 0, imagen: './img/iphone15.png' },
    { id: 9, nombre: 'Silla Gamer', precio: 110000, imagen: './img/sillagamer.png' },
    { id: 10, nombre: 'Motherboard Asus H610', precio: 170.000, imagen: './img/mother.png' },
];

const carrito = [];

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
    nombrePrecio.textContent = `${producto.nombre} - $${producto.precio}`;

    const botonAgregar = document.createElement('button');
    botonAgregar.textContent = 'Agregar al carrito';
    botonAgregar.onclick = () => agregarAlCarrito(producto);

    divProducto.appendChild(imagen);
    divProducto.appendChild(nombrePrecio);
    divProducto.appendChild(botonAgregar);

    listaProductos.appendChild(divProducto);
});

    console.log('Productos mostrados en la lista.');
}

function agregarAlCarrito(producto) {
    const productoEnCarrito = carrito.find(item => item.id === producto.id);
    const cantidad = productoEnCarrito ? productoEnCarrito.cantidad + 1 : 1;

    carrito.push({ ...producto, cantidad });
    console.log(`Agregado al carrito: ${producto.nombre} x${cantidad}`);

    mostrarCarrito();
}

function mostrarCarrito() {
    const resumenCarrito = carrito.reduce((resumen, item) => {
    return `${resumen}${item.nombre} - $${item.precio} x${item.cantidad}\n`;
}, 'Carrito de Compras:\n');

    console.log('Resumen del carrito:');
    console.log(resumenCarrito);

    alert(resumenCarrito);
}

function filtrarProductos() {
    const filtro = document.getElementById('filtro').value.toLowerCase();
    const productosFiltrados = productos.filter(producto => producto.nombre.toLowerCase().includes(filtro));
    mostrarProductos(productosFiltrados);

    console.log(`Productos filtrados por: ${filtro}`);
}

mostrarProductos(productos);
