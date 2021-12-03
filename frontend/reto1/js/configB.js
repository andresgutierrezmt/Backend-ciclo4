window.addEventListener('load',()=>{
    config();
    if(localStorage.getItem('name')){
        bienvenida();
        /* document.location = "login.html"; */
    }else{
        document.location = "login.html";
        /* bienvenida(); */
    }
});

function bienvenida(){
    let encabezado = document.querySelector("#nombre");
    encabezado.innerHTML = localStorage.getItem("name");
}

function config(){
    cerrarS = document.querySelector("#cerrarS");
    cerrarS.addEventListener('click', ()=>{
        alert("vuelva pronto")
        localStorage.clear();
        document.location = "login.html"
    })
}