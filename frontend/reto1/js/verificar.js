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
    if(newUser.nombre != "" || newUser.email != "" || newUser.password != "" || newUser.password_conf != ""){
        if(newUser.password == newUser.password_conf){
            if (newUser.terminos) {
                return true;
            } else {
                alert("valide los terminos y condiciones")
                return false;
            }
        }
        else{
            alert("las claves no coinciden");
            return false;
        }
    }else{
        alert("Campos vacios verifique que esten todos llenos")
        return false;
    }
}