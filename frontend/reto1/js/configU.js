'use strict'

if(localStorage.getItem('idupdate') == null || localStorage.getItem("type") != ADMIN){
    document.location = "bienvenido.html";
}

window.addEventListener('load',()=>{
    let idupdate = (localStorage.getItem('idupdate'));
    obtener(idupdate);
    config();
})

async function obtener(id){
    try { 
        let response = await fetch("http://" + url +"/api/user/get/"+id)
        let responsejson = await response.json();
        console.log(responsejson);
        rellenar(responsejson);
        } catch (error) {
        alert("Error en el servidor :(")
        console.log(error);
    }
}

function rellenar(user){
    localStorage.setItem("antiguo_email",user.email);
    document.querySelector("#idr").value = user.id;
    document.querySelector("#identificacion").value=user.identification;
    document.querySelector("#nombre").value=user.name;
    document.querySelector("#email").value=user.email;
    document.querySelector("#direccion").value=user.address;
    document.querySelector("#celular").value=user.cellPhone;
    document.querySelector("#zona").value=user.zone;
    document.querySelector("#tipo_de_cuenta").value=user.type;
}

function config(){
    let boton1 = document.querySelector("#boton1");
    let boton2 = document.querySelector("#boton2");

    boton1.addEventListener('click',()=>{
        let Upser={
            id: document.querySelector("#idr").value,
            identificacion: document.querySelector("#identificacion").value,
            nombre: document.querySelector("#nombre").value,
            email: document.querySelector("#email").value,
            password : document.querySelector("#pwd").value,
            password_conf: document.querySelector("#pwd-confirm").value,
            direccion: document.querySelector("#direccion").value,
            celular: document.querySelector("#celular").value,
            zona: document.querySelector("#zona").value,
            tipo_de_cuenta: document.querySelector("#tipo_de_cuenta").value
        }
        validarActualizacion(Upser);
    });

    boton2.addEventListener('click',()=>{
        localStorage.getItem("idupdate",null);
        document.location = "miembros.html";
    });
}