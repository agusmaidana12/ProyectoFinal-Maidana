const moneda = 'US$';
let carrito = [];
let productos = []; 
let carritoVisible = false;

document.addEventListener('DOMContentLoaded', async () => {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    }

    await cargarProductos();

    const filtroInput = document.getElementById('filtro');
    filtroInput.addEventListener('input', filtrarProductos);

    const verCarritoBtn = document.getElementById('verCarrito');
    verCarritoBtn.addEventListener('click', () => {
        carritoVisible = !carritoVisible;
        toggleCarrito();
    });
});

async function cargarProductos() {
    try {
        const response = await fetch('productos.json');
        if (!response.ok) {
            throw new Error('Error al cargar productos');
        }

        productos = await response.json(); 
        mostrarProductos(productos);

        console.log('Productos cargados desde el archivo JSON.');
    } catch (error) {
        console.error('Error:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al cargar productos. Por favor, intenta de nuevo.',
        });
    }
}

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
    const { id, nombre, cantidad } = producto;
    const productoEnCarrito = carrito.find(item => item.id === id);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    console.log(`Agregado al carrito: ${nombre}`);
    actualizarCarritoEnStorage();
    mostrarCarrito();
    actualizarContadorCarrito();
}

function toggleCarrito() {
    const carritoResumen = document.getElementById('carrito-resumen');
    carritoResumen.innerHTML = '';

    if (carritoVisible && carrito.length > 0) {
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

    carritoResumen.style.display = carritoVisible && carrito.length > 0 ? 'block' : 'none';
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
    cargarProductos();
    toggleCarrito();

    Swal.fire({
        icon: 'success',
        title: 'Compra confirmada',
        text: '¡Gracias por tu compra!',
    });

    actualizarContadorCarrito();
}

function cancelarCompra() {
    carrito = [];
    actualizarCarritoEnStorage();
    cargarProductos();
    toggleCarrito();

    Swal.fire({
        icon: 'info',
        title: 'Compra cancelada',
        text: 'Puedes seguir agregando productos.',
    });

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
