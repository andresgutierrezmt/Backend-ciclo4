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
        validarRegistro(newUser)
    });
});

async function registrarUsuario(registrar){
    try {
        response = await fetch("http://144.22.58.188:8080/api/user/new",{
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(registrar)
        });
        document.location = "login.html"
        alert("registro satisfactorio");
    } catch (error) {
        console.log(error);
        alert("Ha ocurrido un error en el servidor :(")
    }
}