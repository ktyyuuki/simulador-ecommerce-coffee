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
function varianteSeleccionada(){
    let seleccionado = document.querySelector("input[name='tamano']:checked");
    return seleccionado ? producto.variantes.find(item => item.nombre == seleccionado.value) : null; 
}

function mostrarPrecio(){
    let txtPrecio = document.getElementById("precio");
    if(producto.variantes){
        let radiosVariantes = document.querySelectorAll('input[name="tamano"]');
        radiosVariantes.forEach(radio => {
            radio.addEventListener("change", () => {
                let seleccionado = varianteSeleccionada();
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
        producto.tamano = varianteSeleccionada();
        radiosVariantes.forEach(radio => {
            radio.addEventListener("change", () => {
                producto.tamano = varianteSeleccionada();
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
    console.log(carroAgrupado);
    carritoActualizado = carroAgrupado.filter(item => {
        if (tamano){
            return !(item.id == id && item.tamano && item.tamano.medida == tamano);
        } else {
            return item.id != id;
        }
    });
    guardarCarroLS(carritoActualizado);
    renderCarro();
    totalItemsCarro();
    resumenPedido();
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
    localStorage.removeItem("carro");
    renderCarro();
    totalItemsCarro();
    resumenPedido();
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