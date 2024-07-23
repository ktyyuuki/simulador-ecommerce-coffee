// MOSTRAR PRODUCTOS EN INICIO
function renderProductos(){
    let productosHTML = "";

    for (const producto of productos) {
        productosHTML += `<div class="col-6 col-lg-3">
            <div class="card">
                <img src="./img/${producto.img}" class="img-fluid mb-2" alt="">
                <div class="card-body">
                    <p class="titulo-producto mb-1">${producto.nombre}</p>
                    <p class="precio">$${producto.precioFinal}</p>
                    <p class="breve">${producto.breve}</p>
                </div>
                <div class="card-footer">
                    <a href="./detalle.html" onclick="guardarProductoID(${producto.id});" class="btn btn-color stretched-link w-100">Ver detalle</a>
                </div>
            </div>
        </div>`
    }
    document.getElementById("productos").innerHTML = productosHTML;
}
renderProductos();
totalItemsCarro();
