function estadoBtn() {
    const carrito = agruparItemsCarro();
    let btnFinalizar = document.getElementById("btnFinalizar");

    if (carrito.length > 0){
        btnFinalizar.classList.remove("disabled");
        
        btnFinalizar.addEventListener("click", () => {
            Swal.fire({
                title: '<h3>Pedido Realizado</h3>',
                html: `<p class="text-secondary">Tu pedido ha sido realizado con éxito. <br><b>¡Gracias por tu compra!</b></p>`,
                icon: 'success',
                confirmButtonText: `<i class="bi bi-check2-circle me-1"></i> Finalizar Compra`,
                confirmButtonColor: '#198754',
                showCloseButton: true,
                buttonsStyling: false,
                customClass: {
                    actions: 'w-100 px-4',
                    confirmButton: 'btn btn-color py-3 w-100',
                }
            }).then((result) => {
                if(result.isConfirmed){
                    localStorage.removeItem("carro");
                    estadoBtn();
                    renderCarro();
                    totalItemsCarro();
                    resumenPedido();
                }
            })
        })
    } else {
        btnFinalizar.classList.add("disabled");
    }
}

function renderCarro(){
    const carrito = agruparItemsCarro();

    let carroHTML;
    if(cantidadItemsCarro() > 0){
        carroHTML = `<table class="table table-carro">
        <tbody>
        <tr><td colspan="5" class="text-end"><button type="button" class="btn btn-sm btn-secondary py-2" onclick="vaciarCarrito()"><i class="bi bi-trash3 me-1"></i> Vaciar Carro</button></td></tr>`;

        for (const producto of carrito) {
            carroHTML += `<tr id="prod${producto.id}${producto.tamano ? producto.tamano.medida : ''}">
            <td width="100" class="align-content-center">
                <figure>
                    <img src="./img/${producto.img}" class="img-fluid" alt="">
                </figure>
            </td>
            <td class="align-content-center">
                <h6 class="nombre">${producto.nombre}</h6>`;
                if(producto.tamano){
                    carroHTML += `<p class="info">${producto.tamano.nombre} &middot; ${producto.tamano.medida}ml</p>`;
                }
                carroHTML += `<p class="precio">$${producto.precioFinal}</p>
            </td>
            <td width="110" class="align-content-center">
                <label for="cantidad${producto.id}${producto.tamano ? producto.tamano.nombre : ''}" class="form-label">Cantidad</label>
                <input type="number" name="cantidad" id="cantidad${producto.id}${producto.tamano ? producto.tamano.nombre : ''}" class="form-control" value="${producto.cantidad}" disabled>
            </td>
            <td width="120" class="align-content-center text-end">
                <p class="form-label mb-2 lh-1">Total</p>
                <p class="fw-bold mb-1 mt-3 text-verde">$${producto.precioFinal * producto.cantidad}</p>
            </td>
            <td width="130" class="align-content-center text-end">
                <button type="button" onclick="eliminarDelCarro(${producto.id}, ${producto.tamano ? producto.tamano.medida : ''})" class="btn btn-link text-secondary text-decoration-none mt-4"><i class="bi bi-trash3"></i> Quitar</button>
            </td>
        </tr>`;
        }

        carroHTML += `</tbody>
        </table>`;
    } else {
        carroHTML = `<p class="fs-5 fw-bold mb-0">No haz agregado artículos a tu pedido</p>`;
    }

    return new Promise((resolve)=>{
        setTimeout(() => {
            resolve(document.getElementById("productosCarro").innerHTML = carroHTML);
        }, 500)
    })
}

estadoBtn();
renderCarro();
totalItemsCarro();
resumenPedido();