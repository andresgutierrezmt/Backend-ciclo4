const usuario = JSON.parse(localStorage.getItem("user"));

try {
    if(usuario == null){
        document.location = "login.html"
    }
} catch (error) {
    alert(error)
    document.location = "login.html"
}

window.addEventListener('load', () => {
    contentadd();
    configPe();
})

function configPe(){
    console.log(`usuario`,usuario);
    document.querySelector("#nombre").innerHTML = usuario.name;
    document.querySelector("#identificacion").innerHTML = usuario.identification;
    document.querySelector("#tipo").innerHTML = usuario.type;
    document.querySelector("#cumpleanos").innerHTML = usuario.birthtDay;
    document.querySelector("#direccion").innerHTML = usuario.address;
    document.querySelector("#celular").innerHTML = usuario.cellPhone;
    document.querySelector("#email").innerHTML = usuario.email;
    document.querySelector("#zona").innerHTML = usuario.zone;
}