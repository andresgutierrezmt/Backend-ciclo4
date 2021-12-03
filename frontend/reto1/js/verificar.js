function verificar(){
    email = document.querySelector("#email").value;
    password = document.querySelector("#pwd").value;
    if(email != "" && password != ""){
        if(email.includes("@") && (email.includes(".com") || email.includes(".co"))){
            return true;
        }
        else
        alert("falta el @ o .com en la direccion de correo electronico")
        return false;
    }else{
        alert("Rellene todos los campos")
        return false;
    }
    
}

function validarRegistro(newUser){
    if(newUser.nombre != "" && newUser.email != "" && newUser.password != "" && newUser.password_conf != ""){
        if(newUser.password == newUser.password_conf){
            if (newUser.terminos) {
                autenticacion(newUser)
            } else {
                alert("valide los terminos y condiciones")
            }
        }
        else{
            alert("las claves no coinciden");
        }
    }else{
        alert("Campos vacios verifique que esten todos llenos")
    }
}

async function autenticacion(newUser){
    response = await fetch("http://144.22.58.188:8080/api/user/"+newUser.email);
    jsonresponse = await response.json();
    if (jsonresponse) {
        alert("El email ya esta en uso")
    } else {
        let registrar = {
            name: newUser.nombre,
            email: newUser.email,
            password: newUser.password
        }
        registrarUsuario(registrar)
    }
    console.log(jsonresponse)
}