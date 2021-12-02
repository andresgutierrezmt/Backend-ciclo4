'use strict'
window.addEventListener('load',()=>{
    let boton = document.querySelector("#boton");
    boton.addEventListener('click',()=>{
        if(verificar()){
            let usuario = {
                email: document.querySelector("#email").value.trim().toLowerCase(),
                password : document.querySelector("#pwd").value.trim().toLowerCase()
            }
            autenticar(usuario);
        }else{
            console.log("error")
        }
    });
});

async function Aunteticar(usuario){
    try {
        const response = await fetch("http://144.22.58.188:8080/api/user/"+usuario.email+"/"+usuario.password);
        const res = await response.json();
        if(res.name == "NO DEFINIDO"){
            alert("Usuario no registrado, registrese para poder ingresar al sistema")
        }else{
            alert("Bienvenido")
        }
    } catch (error) {
        console.log("Ha ocurrido un problema con el servidor :(");
    }
}