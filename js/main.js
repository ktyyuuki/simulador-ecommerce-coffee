async function filtroCategorias(cat = null){
    await consumirJSON();
    
    spinner("productos");
    
    let productosFiltrados;
    if(cat == null){
        productosFiltrados = productos;
    } else{
        productosFiltrados = productos.filter(producto => producto.categoria == cat);
    }

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(renderProductos(productosFiltrados));
            // resolve(productosFiltrados);
        },1500);
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

filtroCategorias();
totalItemsCarro();
