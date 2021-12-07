function contentadd(){
    if(localStorage.getItem('type') == "ADMIN"){
        configH();
        configA();
    }else{
        configH();
        configB();
    }
}

function configH(){
    config();
    let menu_usuario = document.querySelector("#UserMenu");
    menu_usuario.innerHTML = localStorage.getItem("name");
}

function config(){
    cerrarS = document.querySelector("#cerrarS");
    cerrarS.addEventListener('click', ()=>{
        localStorage.clear();
        document.location = "login.html"
    })
}

function configA(){
    content = ` <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle text-secondary" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Miembros
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <li><a class="dropdown-item" href="registro.html">Registrar miembro</a></li>
                        <li><a class="dropdown-item" href="miembros.html">Miembros</a></li>
                    </ul>
                </li>`
    $("#crear").html(content);
}

function configB(){
    content = ` <li class="nav-item">
                    <a class="nav-link" href="#">Catalogo</a>
                </li>`
    $("#crear").html(content);
}