const productos = [
    { id: 1, nombre: 'Mantecol', precio: 4500.00 },
    { id: 2, nombre: 'Garrapi', precio: 7000.00 },
    { id: 3, nombre: 'fernet', precio: 6000.00 }
  ];
  

const carrito = [];

function mostrarProductos() {
  const listaProductos = document.getElementById('lista-productos');

  productos.forEach(producto => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `${producto.nombre} - $${producto.precio.toFixed(2)} 
      <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>`;
    listaProductos.appendChild(listItem);
  });
}

function actualizarCarrito() {
  const listaCarrito = document.getElementById('lista-carrito');
  const totalElement = document.getElementById('total');
  listaCarrito.innerHTML = '';

  let total = 0;

  carrito.forEach(item => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `${item.producto.nombre} - $${item.producto.precio.toFixed(2)} 
      <input class="cantidad-input" type="number" min="1" value="${item.cantidad}" 
      onchange="actualizarCantidad(${item.producto.id}, this.value)"> 
      <button onclick="eliminarDelCarrito(${item.producto.id})">Eliminar</button>`;
    listaCarrito.appendChild(listItem);

    total += item.producto.precio * item.cantidad;
  });

  totalElement.textContent = total.toFixed(2);
}

function agregarAlCarrito(id) {
  const productoEncontrado = productos.find(producto => producto.id === id);

  if (productoEncontrado) {
    const itemExistente = carrito.find(item => item.producto.id === id);

    if (itemExistente) {
      itemExistente.cantidad++;
    } else {
      carrito.push({ producto: productoEncontrado, cantidad: 1 });
    }

    actualizarCarrito();
  }
}

function eliminarDelCarrito(id) {
  const index = carrito.findIndex(item => item.producto.id === id);

  if (index !== -1) {
    carrito.splice(index, 1);
    actualizarCarrito();
  }
}

function actualizarCantidad(id, cantidad) {
  const itemExistente = carrito.find(item => item.producto.id === id);

  if (itemExistente) {
    itemExistente.cantidad = parseInt(cantidad, 10);
    actualizarCarrito();
  }
}

function realizarPago() {
  alert('Simulación de pago realizada con éxito. Gracias por su compra.');
}

window.onload = () => {
  mostrarProductos();
  actualizarCarrito();
};