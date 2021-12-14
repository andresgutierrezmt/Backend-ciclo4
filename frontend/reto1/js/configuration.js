'use strict'
window.addEventListener('load',()=>{
    document.querySelector("#spinner").style.display = 'none';
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
        document.querySelector("#spinner").style.display = 'block';
        const response = await fetch("http://"+ url +"/api/user/"+usuario.email+"/"+usuario.password);
        const res = await response.json();
        if(res.name == null){
            document.querySelector("#spinner").style.display = 'none';
            alert("Usuario no registrado, solicite al administrador un correo valido y contraseña para ingresar o ingrese como administrador para agregar una cuenta")
        }else{
            document.querySelector("#spinner").style.display = 'none';
            localStorage.setItem("user",JSON.stringify(res));
            localStorage.setItem("name",res.name);
            localStorage.setItem("type", res.type);
            document.location = "bienvenido.html"
        }
    } catch (error) {
        document.querySelector("#spinner").style.display = 'none';
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Ha ocurrido un error en el proceso de validacion",
            footer: '<p> error temporal del servidor :( </p>'
        })
        console.log(error);
    }
}