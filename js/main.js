async function filtroCategorias(cat){
    await consumirJSON();
    let links = document.querySelectorAll('.nav-link');
    // console.log(links);
    links.forEach(link => {
        // console.log(link.textContent);
        if(link.textContent == cat){
            link.classList.add("active");
        }
    });

    if(cat === "Todos" || null){
        return productos
    }
    const productosFiltrados = productos.filter(producto => producto.categoria == cat);
    // console.log(productosFiltrados);
    return productosFiltrados;
}

// MOSTRAR PRODUCTOS EN INICIO
async function renderProductos(listadoProductos){
    // await consumirJSON();
    // const listadoProductos = showProductos || productos;
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
        </div>`
    }
    document.getElementById("productos").innerHTML = productosHTML;
}

async function filtrarYRenderizarProductos(categoria){
    const productosFiltrados = await filtroCategorias(categoria);
    renderProductos(productosFiltrados);
}
// renderProductos(productos);
filtrarYRenderizarProductos("Todos");
totalItemsCarro();
