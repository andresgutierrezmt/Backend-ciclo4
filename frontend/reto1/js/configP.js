
if(localStorage.getItem("type") != "ADMIN"){
    document.location = "bienvenido.html";
}

window.addEventListener('load',()=>{
    contentadd();
    configProductos();
});

async function configProductos(){
    try {
        response = await fetch("http://" + url +"/api/supplements/all");
        responseJson = await response.json();
        tablaProductos(responseJson);
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error al obtener datos de la tabla',
            footer: '<p>hubo un error en el servidor (' +error+ ')</p>'
        })
    }
}

function tablaProductos(items){
    let tabla = `   
    <table class="table">
                <thead>
                    <tr>
                        <th>Referencia</th>
                        <th>Marca</th>
                        <th>Categoria</th>
                        <th>Disponibilidad</th>
                        <th>Stock</th>
                        <th>Precio</th>
                        <th colspan="2">Acciones</th>
                    </tr>
                </thead>
                <tbody>`;
    console.log(items);
    for (let i = 0; i < items.length; i++) {
            tabla += `
            <tr>
                <td>${items[i].reference}</td>
                <td>${items[i].brand}</td>
                <td>${items[i].category}</td>
                <td>${items[i].availability}</td>
                <td>${items[i].quantity}</td>
                <td>${items[i].price}</td>
                <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal" onclick="productoVer('${items[i].reference}');">perfil</button></td>
                <td><button class="btn btn-danger" onclick="EliminarP('${items[i].reference}');">Eliminar</button></td>
            </tr>
            `;
    }
    tabla += `
        </tbody>
    </table>    
    `
    document.querySelector("#tabla-container-productos").innerHTML = tabla;
}

async function EliminarP(reference){
    try {
        response = await fetch("http://" + url +"/api/supplements/"+reference,{
            method: 'DELETE',
            headers: {
                'content-Type':'application/json'
            },
        });
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Se ha eliminado correctamente',
            showConfirmButton: false,
            timer: 3500
        });
        configProductos();
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error al obtener datos de la tabla',
            footer: '<p>hubo un error en el servidor (' +error+ ')</p>'
        })
        console.log(error);
    }
}

function productoVer(reference){
    console.log("hola")
}