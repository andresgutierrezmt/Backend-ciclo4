window.addEventListener('load',()=>{
    boton = document.querySelector("#boton");
    boton.addEventListener('click',()=>{
        let newUser = {
            nombre: document.querySelector("#nombre").value,
            email: document.querySelector("#email").value,
            password: document.querySelector("#pwd").value,
            password_conf: document.querySelector("#pwd-confirm").value,
            terminos: document.querySelector("#terminos").checked
        }
        if(validarRegistro(newUser)){
            let registrar = {
                user_name: newUser.nombre,
                user_email: newUser.email,
                user_password: newUser.password
            }
            registrarUsuario(registrar);
        }else{
            console.log("error");
        }
    });
});

/* async function registrarUsuario(registrar){
    response = await fetch("http://144.22.58.188:8080/api/user/new",{
        headers : {
            Content-Type: "application/json"
        }
    });
} */