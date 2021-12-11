
if(localStorage.getItem('type') != ADMIN){
    document.location = "bienvenido.html";
}

window.addEventListener('load',()=>{
    configMiembros();
});

function configMiembros(){
    contentadd();
    listar();
}

async function listar(){
    try {
        response = await fetch("http://" + url +"/api/user/all");
        responseJson = await response.json();
        tabla(responseJson);
    } catch (error) {
        console.log(error);
    }
}

function tabla(items){
    let tabla = `   <table class="table">
                <thead>
                    <tr>
                        <th>identificacion</th>
                        <th>Nombre</th>
                        <th>Correo electronico</th>
                        <th>celular</th>
                        <th>Cargo</th>
                        <th>zona</th>
                        <th colspan="2">Acciones</th>
                    </tr>
                </thead>
                <tbody>`;
    console.log(items);
    for (let i = 0; i < items.length; i++) {
        if(items[i].type != "ADMIN"){
            tabla += `
            <tr>
                <td>${items[i].identification}</td>
                <td>${items[i].name}</td>
                <td>${items[i].email}</td>
                <td>${items[i].cellPhone}</td>
                <td>${items[i].type}</td>
                <td>${items[i].zone}</td>
                <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal" onclick="perfil(${items[i].id})">perfil</button></td>
                <td><button class="btn btn-danger" onclick="Eliminar(${items[i].id})">Eliminar</button></td>
            </tr>
            `;
        }
    }
    tabla += `
        </tbody>
    </table>    
    `
    /* $("#tabla-container").html(tabla); */
    document.querySelector("#tabla-container").innerHTML = tabla;
}

async function Eliminar(id){
    try {
        response = await fetch("http://" + url +"/api/user/"+id,{
            method: 'DELETE',
            headers: {
                'content-Type':'application/json'
            },
        });
        listar();
    } catch (error) {
        alert("Error en el servidor :(")
        console.log(error);
    }
}

async function perfil(id){
    try {
        response = await fetch("http://" + url +"/api/user/get/"+id)
        responsejson = await response.json();
        console.log(responsejson);
        mostrar(responsejson);

    } catch (error) {
        alert("Error en el servidor :(")
        console.log(error);
    }
}

function mostrar(user){
    modal = `
    <h6><strong>id DB</strong></h6>
    <p>${user.id}</p> 
    <h6><strong>identificacion</strong></h6>
    <p>${user.identification}</p>
    <h6><strong>nombre</strong></h6>
    <p>${user.name}</p>
    <h6><strong>direccion</strong></h6>
    <p>${user.address}</p>
    <h6><strong>celular</strong></h6>
    <p>${user.cellPhone}</p>
    <h6><strong>email</strong></h6>
    <p>${user.email}</p>
    <h6><strong>zona</strong></h6>
    <p>${user.zone}</p>
    <h6><strong>cargo</strong></h6>
    <p>${user.type}</p>
    `;
    actualizar(user.id);
    $("#body_m").html(modal);
}

function actualizar(id){
    boton = document.querySelector("#update");
    boton.addEventListener('click',()=>{
        $("#body_m").html("");
        localStorage.setItem("idupdate",id);
        document.location = "update.html"
    });
}
