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
    listarVariantes(){
        this.variantes.forEach(item => {
            console.log(item);
            return item;
        });
    }

}



function guardarProductoID(id){
    localStorage.setItem("productoID", JSON.stringify(id));
}

function verDetalleProducto(){
    let id = JSON.parse(localStorage.getItem("productoID"));
    const producto = productos.find(item => item.id == id);
    return producto;
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

function agregarAlCarro(id){
    const producto = productos.find(item => item.id == id);
    producto.cantidad = document.getElementById("cantidad").value;
    if(producto.variantes){
        let radiosVariantes = document.querySelectorAll('input[name="tamano"]');
        // producto.precioFinal = varianteSeleccionada().precio;
        producto.tamano = varianteSeleccionada();

        radiosVariantes.forEach(radio => {
            radio.addEventListener("change", () => {
                // producto.precioFinal = varianteSeleccionada().precio;
                producto.tamano = varianteSeleccionada();
            });
        });
    }
  
    const carrito = cargarCarroLS();
    carrito.push(producto);
    guardarCarroLS(carrito);
    totalItemsCarro();
}


function varianteSeleccionada(){
    let seleccionado = document.querySelector("input[name='tamano']:checked");
    let varSeleccionada = producto.variantes.find(item => item.nombre == seleccionado.value);
    return varSeleccionada;
}

function mostrarPrecio(){
    let txtPrecio = document.getElementById("precio");
    if(producto.variantes){
        let radiosVariantes = document.querySelectorAll('input[name="tamano"]');
        
        radiosVariantes.forEach(radio => {
            radio.addEventListener("change", () => {
                seleccionado = document.querySelector("input[name='tamano']:checked");
                if(seleccionado){
                    producto.precioFinal = varianteSeleccionada().precio;
                    txtPrecio.innerHTML = `$${producto.precioFinal}`;
                }
            });
        });
    }   
    txtPrecio.innerHTML = `$${producto.precioFinal}`;
}
