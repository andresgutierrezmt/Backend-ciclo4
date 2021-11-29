window.addEventListener('load',() =>{

    if(localStorage.getItem("name")){
        nombre = document.querySelector("#nombre")
        nombre.innerHTML=localStorage.getItem("name")
    }

    cerrarS = document.querySelector("#cerrarS")
    cerrarS.addEventListener('click',()=>{
        localStorage.clear()
        document.location="login.html"
    });
})

