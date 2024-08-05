// DETALLE DE PRODUCTO  
async function renderDetalle(){
    await consumirJSON();
    const producto = verDetalleProducto();

    let infoHTML = `<h1 class="detalle-titulo">${producto.nombre}</h1>
    <p class="detalle-precio" id="precio"></p>
    <p class="detalle-descripcion">${producto.descripcion}</p>`
    
    if(producto.variantes){
        infoHTML += `<p class="form-label">Tamaño de vaso</p>`;
        for (const variante of producto.variantes) {
            let posVariante = producto.variantes.indexOf(variante);
            
            infoHTML += `<input type="radio" class="btn-check" name="tamano" id="${variante.nombre.toLowerCase()}" value="${variante.nombre}" autocomplete="off" ${posVariante == 0 ? 'checked' : ''}>
            <label class="btn btn-outline-success py-2 px-3" for="${variante.nombre.toLowerCase()}">${variante.nombre} &middot; ${variante.medida} ml</label>`;
        }
    }
    
    infoHTML += `<div class="row gx-3 my-4">
        <div class="col-12">
            <label for="cantidad" class="form-label">Cantidad</label>
        </div>
        <div class="col-4 col-sm-4 col-md-3">
            <input type="number" name="cantidad" id="cantidad" class="form-control h-100" min="1" step="1" max="10" value="1">
        </div>
        <div class="col-8 col-sm-8 col-md-9">
            <button type="button" id="btnCart" onclick="agregarAlCarro(${producto.id})" class="btn btn-color py-3 px-5"><i class="bi bi-cart3 me-1"></i> Agregar al carro</button>
        </div>
    </div>
    <a href="./index.html" class="btn btn-outline-secondary px-3 py-2">Volver</a>`;

    let imgHTML = `<img src="./img/${producto.img}" class="img-fluid" alt="${producto.nombre}" title="${producto.nombre}">`;

    document.getElementById("infoProd").innerHTML = infoHTML;
    document.getElementById("imgProd").innerHTML = imgHTML;

    mostrarPrecio(producto);

    document.getElementById("btnCart").addEventListener("click", toastAdded);
}

// Toastify
function toastAdded(){
    Toastify({
        text: "Producto añadido al Carro ",
        avatar: "./img/check-icon.png",
        duration: 2500,
        destination: "./carro.html",
        close: true,
        gravity: "bottom",
        position: "right",
        style: {
            background: "#C5EEDB",
            padding: "1rem .5rem",
            borderRadius: "5px",
            borderLeft: "4px solid #4CAF50",
            color: "#4CAF50"
        },
        offset: {
            x: '1rem',
            y: '1rem'
        }
    }).showToast();
}

renderDetalle();
totalItemsCarro();