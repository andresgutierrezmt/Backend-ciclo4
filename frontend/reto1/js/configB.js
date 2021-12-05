window.addEventListener('load',()=>{
    config();
    if(localStorage.getItem('name')){
        bienvenida();
    }else{
        document.location = "login.html";
    }
});

function bienvenida(){
    let encabezado = document.querySelector("#nombre");
    let menu_usuario = document.querySelector("#UserMenu");
    encabezado.innerHTML = localStorage.getItem("name");
    menu_usuario.innerHTML = localStorage.getItem("name");
}

function config(){
    cerrarS = document.querySelector("#cerrarS");
    cerrarS.addEventListener('click', ()=>{
        localStorage.clear();
        document.location = "login.html"
    })
}