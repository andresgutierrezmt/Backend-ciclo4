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
                email: document.querySelector("#email").value.trim().toLowerCase(),
                password : document.querySelector("#pwd").value.trim().toLowerCase()
            }
            Autenticar(usuario);
        }else{
            console.log("error")
        }
    });
}

async function Autenticar(usuario){
    try {
        const response = await fetch("http://144.22.58.188:8080/api/user/"+usuario.email+"/"+usuario.password);
        const res = await response.json();
        if(res.name == "NO DEFINIDO"){
            alert("Usuario no registrado, registrese para poder ingresar al sistema")
        }else{
            localStorage.setItem("name",res.name);
            document.location = "bienvenido.html"
        }
    } catch (error) {
        console.log(error);
        alert("Ha ocurrido un problema con el servidor :(");
    }
}