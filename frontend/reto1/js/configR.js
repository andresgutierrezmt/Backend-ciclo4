
if(localStorage.getItem("type") != "ADMIN"){
    document.location = "bienvenido.html";
}

window.addEventListener('load',()=>{
    config();
});


function config(){
    
    boton = document.querySelector("#boton");
    boton.addEventListener('click',()=>{
        let newUser = {
            id: document.querySelector("#idr").value,
            identificacion: document.querySelector("#identificacion").value,
            nombre: document.querySelector("#nombre").value,
            email: document.querySelector("#email").value,
            password: document.querySelector("#pwd").value,
            password_conf: document.querySelector("#pwd-confirm").value,
            direccion: document.querySelector("#direccion").value,
            celular: document.querySelector("#celular").value,
            zona: document.querySelector("#zona").value,
            tipo_de_cuenta: document.querySelector("#tipo_de_cuenta").value,
            terminos: document.querySelector("#terminos").checked
        }
        validarRegistro(newUser)
    });
}

async function registrarUsuario(registrar){
    try {
        response = await fetch("http://" + url +"/api/user/new",{
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(registrar)
        });
        document.location = "bienvenido.html"
        alert("registro de miembro nuevo satisfactorio");
    } catch (error) {
        console.log(error);
        alert("Ha ocurrido un error en el servidor :(")
    }
}