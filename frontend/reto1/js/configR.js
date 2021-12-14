
if(localStorage.getItem("type") != ADMIN){
    document.location = "bienvenido.html";
}

window.addEventListener('load',()=>{
    config();
});


function config(){
    
    boton = document.querySelector("#boton");
    boton.addEventListener('click',()=>{
        let newUser = {
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
        Swal.fire({
            title: 'Registro',
            text: "usuario registrado correctamente",
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'aceptar'
            }).then((result) => {
            if (result.isConfirmed) {
                document.location = "miembros.html"
            }
            });
    } catch (error) {
        console.log(error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se registro el usuario',
            footer: '<p>Ocurrio un error inesperado del servidor :(</p>'
        })
    }
}