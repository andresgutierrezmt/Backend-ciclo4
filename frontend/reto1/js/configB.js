window.addEventListener('load',()=>{
    if(localStorage.getItem('name')){
        bienvenida();
    }else{
        document.location = "login.html";
    }
});

function bienvenida(){
    let encabezado = document.querySelector("#nombre");
    let mensaje_jumbo = document.querySelector("#mensaje_jumbo");
    encabezado.innerHTML = localStorage.getItem("name");
    mensaje(mensaje_jumbo);
    contentadd();
}

function mensaje(ms){
    if(localStorage.getItem('type') == ADMIN){
        ms.innerHTML = "bienvenido Administrador, recuerde que puede agregar nuevos miembros desde la pestaña (registrar miembro)"
    }else if(localStorage.getItem('type') == ASSESOR){
        ms.innerHTML = "bienvenido a deportive, eres Asesor:)"
    }
}
