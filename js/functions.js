const productos = [];

class Producto{
    constructor(objeto){
        this.id = this.generarId();
        this.nombre = objeto.nombre;
        this.img = objeto.img;
        this.categoria = objeto.categoria;
        this.precio = objeto.precio;
        this.breve = objeto.breve;
        this.descripcion = objeto.descripcion;
        this.variantes = objeto.variantes;
        this.precioFinal = this.obtenerPrecio();
        productos.push(this);
    }
    generarId(){
        return productos.length + 1;
    }
    obtenerPrecio(){
        let salida = this.precio;
        if(this.variantes){
            this.variantes.forEach(variante => {
                const precio = this.variantes.find(item => item[0] == variante[0]);
                if(precio){
                    salida = precio.precio;
                }
            });
        }
        return salida;
    }
}

// Cargar productos de JSON
async function consumirJSON() {
    if (productos.length === 0){
        const response = await fetch("./json/productos.json");
        const data = await response.json(); // Array de productos
        data.forEach(item => {
            new Producto(item);
        });
        return productos;
    }
}

// Spinner para cargar de contenido
const spinner = (id) => {
    let spinnerHTML = `<div class="text-center my-3">
        <div class="spinner-grow" role="status" style="width: 3rem; height: 3rem; color: var(--crema)">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>`;
    document.getElementById(id).innerHTML = spinnerHTML;
}

// Clase active según filtro categoria
function linkSeleccionado(categoria = null){
    let links = document.querySelectorAll(".nav-link");
    let categoriaSeleccionada = categoria || "Todos";

    links.forEach(link => {
        if(link.textContent == categoriaSeleccionada){
            link.classList.add("active");
        }

        link.addEventListener("click",() => {
            let seleccionado = document.querySelector(".nav-link.active");
            if(seleccionado && seleccionado !== link){
                seleccionado.classList.remove("active");
            }
            link.classList.add("active");
        })
    });
}

// Guardar categoria para filtrar
function setCategoria(categoria){
    localStorage.setItem("categoriaSeleccionada", categoria);
}

// Cargar categoria para filtrar desde otra sección en el inicio
function recuperarCategoria(){
    document.addEventListener('DOMContentLoaded', () => {
        const categoria = localStorage.getItem("categoriaSeleccionada");
        if (categoria){
            filtroCategorias(categoria);
            linkSeleccionado(categoria);
            localStorage.removeItem("categoriaSeleccionada");
        } else {
            filtroCategorias();
            linkSeleccionado();
        }
    })
}

// ===== INDEX ===== //
function guardarProductoID(id){
    localStorage.setItem("productoID", JSON.stringify(id));
}

function verDetalleProducto(){
    let id = JSON.parse(localStorage.getItem("productoID"));
    const producto = productos.find(item => item.id == id);
    return producto;
}

// ===== VISTA DETALLE PRODUCTO ===== //
function varianteSeleccionada(producto){
    let seleccionado = document.querySelector("input[name='tamano']:checked");
    return seleccionado ? producto.variantes.find(item => item.nombre == seleccionado.value) : null; 
}

function mostrarPrecio(producto){
    let txtPrecio = document.getElementById("precio");
    if(producto.variantes){
        let radiosVariantes = document.querySelectorAll('input[name="tamano"]');
        radiosVariantes.forEach(radio => {
            radio.addEventListener("change", () => {
                let seleccionado = varianteSeleccionada(producto);
                if(seleccionado){
                    producto.precioFinal = seleccionado.precio;
                    txtPrecio.innerHTML = `$${producto.precioFinal}`;
                }
            });
        });
    }   
    txtPrecio.innerHTML = `$${producto.precioFinal}`;
}

// ===== CARRO DE COMPRAS ===== //
function agregarAlCarro(id){
    const producto = productos.find(item => item.id == id);
    producto.cantidad = parseInt(document.getElementById("cantidad").value);
    if(producto.variantes){
        let radiosVariantes = document.querySelectorAll('input[name="tamano"]');
        producto.tamano = varianteSeleccionada(producto);
        radiosVariantes.forEach(radio => {
            radio.addEventListener("change", () => {
                producto.tamano = varianteSeleccionada(producto);
            });
        });
    }
    const carrito = cargarCarroLS();
    carrito.push(producto);
    guardarCarroLS(carrito);
    totalItemsCarro();
}

function eliminarDelCarro(id, tamano = null){
    const carroAgrupado = agruparItemsCarro();
    let prodId = `prod${id}`;

    carritoActualizado = carroAgrupado.filter(item => {
        if (tamano){
            prodId = `prod${id}${tamano}`;
            console.log(prodId);
            return !(item.id == id && item.tamano && item.tamano.medida == tamano);
        } else {
            return item.id != id;
        }
    });

    let productoFila = document.getElementById(prodId);
    if(productoFila){
        productoFila.innerHTML = `<td colspan="5" id="spinner"></td>`;
        spinner("spinner");
    }

    setTimeout(() => {
        guardarCarroLS(carritoActualizado);
        estadoBtn();
        renderCarro();
        totalItemsCarro();
        resumenPedido();
    }, 200);
}

function cargarCarroLS(){
    return JSON.parse(localStorage.getItem("carro")) || [];
}
function guardarCarroLS(carroCompras){
    localStorage.setItem("carro", JSON.stringify(carroCompras));
}
function cantidadItemsCarro(){
    let carrito = cargarCarroLS();
    let resultado = 0;
    carrito.forEach(item => {
        const cantidad = JSON.parse(item.cantidad);
        resultado = resultado + cantidad;
    });
    return resultado;    
}
function totalItemsCarro(){
    let total = cantidadItemsCarro();
    document.getElementById("totalItems").innerHTML = total;
}

function agruparItemsCarro(){
    const carrito = cargarCarroLS();
    let carroAgrupado = [];
    carrito.forEach(producto => {
        let productoCarro;
        if(producto.tamano){
            productoCarro = carroAgrupado.find(item => item.id == producto.id && item.tamano && item.tamano.medida == producto.tamano.medida);
        } else {
            productoCarro = carroAgrupado.find(item => item.id == producto.id && !item.tamano);
        }
        if(productoCarro){
            productoCarro.cantidad += producto.cantidad;
        } else {
            carroAgrupado.push({...producto})
        }
    });
    return carroAgrupado;
}

function vaciarCarrito(){
    spinner("productosCarro");
    setTimeout(() => {
        localStorage.removeItem("carro");
        estadoBtn();
        renderCarro();
        totalItemsCarro();
        resumenPedido();
    }, 500);
}

// ===== RESUMEN PEDIDO ===== //
function calcularSubtotal(){
    const carrito = agruparItemsCarro();
    let total = 0;
    carrito.forEach(producto => {
        let totalProd = producto.precioFinal * producto.cantidad;
        total = total + totalProd;
    });
    return total;
}
function calcularIva(){
    return calcularSubtotal() * 0.19;
}
function calcularTotalCarro(){
    return calcularSubtotal() + calcularIva();
}
function resumenPedido(){
    document.getElementById("subtotal").innerHTML = `$${calcularSubtotal()}`;
    document.getElementById("iva").innerHTML = `$${calcularIva()}`;
    document.getElementById("total").innerHTML = `$${calcularTotalCarro()}`;
}