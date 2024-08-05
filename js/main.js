// FILTRAR PRODUCTOS
async function filtroCategorias(cat = null){
    await consumirJSON();
    spinner("productos");
    let productosFiltrados;
    if(cat == null || cat.toUpperCase() == "TODOS"){
        productosFiltrados = productos;
    } else{
        productosFiltrados = productos.filter(producto => producto.categoria == cat);
    }
    
    return new Promise((resolve) => {
        setTimeout(() => {
            if(productosFiltrados == 0){
                document.getElementById("productos").innerHTML = `<h5>No hay productos para mostrar en esta categoría</h5>`;
            } else {

                resolve(renderProductos(productosFiltrados));
            }
        },1000);
    })
}

// MOSTRAR PRODUCTOS EN INICIO
async function renderProductos(listadoProductos){

    document.getElementById("productos").innerHTML = "";

    let productosHTML = "";
    for (const producto of listadoProductos) {
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
        </div>`;
        document.getElementById("productos").innerHTML = productosHTML;
    }
}

recuperarCategoria();
totalItemsCarro();
