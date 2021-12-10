
if(localStorage.getItem("type") != "ADMIN"){
    document.location = "bienvenido.html";
}

window.addEventListener('load',()=>{
/*     setTimeout(()=>{
        document.querySelector("[data-bs-target='#myModal']").click() //Buscar elemento por atributo
    },1000) abrir ventana modal sin oprimir un boton*/;
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
            const strobj = JSON.stringify(items[i])
            console.log(strobj);
            tabla += `
            <tr>
                <td>${items[i].reference}</td>
                <td>${items[i].brand}</td>
                <td>${items[i].category}</td>
                <td>${items[i].availability}</td>
                <td>${items[i].quantity}</td>
                <td>${items[i].price}</td>
                <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal" onclick="productoVer('${btoa(strobj)/* btoa convierte a base 64 un JSON */}');">perfil</button></td>
                <td><button class="btn btn-danger" onclick="EliminarP('${btoa(strobj)}');">Eliminar</button></td>
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
    const item = JSON.parse(atob(reference));
    try {
        response = await fetch("http://" + url +"/api/supplements/"+item.reference,{
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
    /* document.querySelector("#body_p").classList.remove("bg-primary") //agregar una clase add, remove, toggle
    document.querySelector("#body_p").setAttribute("title","Hola como estas")//agregar un atributo
    document.querySelector("#body_p").innerHTML= "Hola como estan"//agregar contenido*/
    const item = JSON.parse(atob(reference)); /* atob desencripta un JSON de base 64*/
        console.log(item.photography);
    body = `
    <div class="container d-flex justify-content-center">
        <img src="${item.photography}" width="150px">
    </div>
    <h6><strong>Referencia</strong></h2>
    <p>${item.reference}</p>
    <h6><strong>Marca</strong></h2>
    <p>${item.brand}</p>
    <h6><strong>Categoria</strong></h2>
    <p>${item.category}</p>
    <h6><strong>Objetivo</strong></h2>
    <p>${item.objetivo}</p>
    <h6><strong>Disponibilidad</strong></h2>
    <p>${item.availability}</p>
    <h6><strong>Cantidad</strong></h2>
    <p>${item.quantity}</p>
    <h6><strong>Precio</strong></h2>
    <p>${item.price}</p>
    <h6><strong>Descripcion</strong></h2>
    <p>${item.description}</p>
    `;
    document.querySelector("#body_p").innerHTML = body;
    update_btn = document.querySelector("#updateP");

    update_btn.addEventListener('click', ()=>{
        localStorage.setItem("productoA",reference);
        document.location = "actualizarP.html"
    });

}



