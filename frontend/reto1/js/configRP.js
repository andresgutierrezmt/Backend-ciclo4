if(localStorage.getItem("type") != "ADMIN"){
    document.location = "login.html";
}

window.addEventListener('load',()=>{
    inicio();
});

function inicio(){
    document.querySelector("#registrar_producto").addEventListener('click', () => {
        let producto ={
            referencia: document.querySelector("#reference").value,
            marca: document.querySelector("#brand").value,
            categoria: document.querySelector("#category").value,
            objetivo: document.querySelector("#objetivo").value,
            precio: document.querySelector("#price").value,
            cantidad: document.querySelector("#quantity").value,
            disponible: document.querySelector("#availability").value,
            descripcion: document.querySelector("#description").value,
        }
        validarP(producto);
    });
}

async function enviarProducto(producto){
    let objeto = {
        reference: producto.referencia,
        brand: producto.marca,
        category: producto.categoria,
        objetivo: producto.objetivo,
        description: producto.descripcion,
        availability: producto.disponible,
        price: producto.precio,
        quantity: producto.cantidad,
        photography: "none",
    };

    objeto = JSON.stringify(objeto);

    alert("enviare estos datos"+objeto);

    try {
        response = await fetch("http://" + url +"/api/supplements/new",{
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: objeto,
        });
        Swal.fire({
            title: 'Producto registrado',
            text: "Se registro un producto correctamente",
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'aceptar'
            }).then((result) => {
            if (result.isConfirmed) {
                document.location = "bienvenido.html"
            }
            });
    } catch (error) {
        console.log(error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error al enviar datos',
            footer: '<p>hubo un error en el servidor (' +error+ ')</p>'
        })
    }
}