'use strict'
window.addEventListener('load',()=>{
    if (localStorage.getItem('name')) {
        document.location="bienvenido.html"
    } else {
        configlogin();
    }
});

function configlogin(){
    let boton = document.querySelector("#boton");
    boton.addEventListener('click',()=>{
        if(verificar()){
            let usuario = {
                email: document.querySelector("#email").value.trim(),
                password : document.querySelector("#pwd").value.trim()
            }
            Autenticar(usuario);
        }else{
            console.log("error")
        }
    });
}

async function Autenticar(usuario){
    try {
        const response = await fetch("http://"+ url +"/api/user/"+usuario.email+"/"+usuario.password);
        const res = await response.json();
        if(res.name == null){
            alert("Usuario no registrado, solicite al administrador un correo valido y contraseña para ingresar o ingrese como administrador para agregar una cuenta")
        }else{
            localStorage.setItem("name",res.name);
            localStorage.setItem("type", res.type);
            document.location = "bienvenido.html"
        }
    } catch (error) {
        console.log(error);
        alert("Ha ocurrido un problema con el servidor :(");
    }
}