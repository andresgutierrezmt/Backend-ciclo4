header = `
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark d-flex justify-content-around" id="menu">
        <!-- Brand/logo -->
            <a class="navbar-brand" href="bienvenido.html">
                <img src="img/logo_header.png" alt="logo" style="width:160px;">
            </a>
        <!-- Links -->
        <ul class="navbar-nav">      
            <li class="nav-item">
                <a class="nav-link" href="#">Elementos</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">gimnasio</a>
            </li>
            <div class="w-50 d-flex" id="crear"></div>
        </ul>
        <li class="navbar-nav nav-item dropdown">
            <a class="nav-link dropdown-toggle text-secondary" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <span id="UserMenu"></span>
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <li><a class="dropdown-item" id="perfilS" href="#">Perfil</a></li>
                <li><a class="dropdown-item" id="cerrarS" href="#">Cerrar Sesion</a></li>
            </ul>
        </li>
    </nav>
`

document.querySelector("#menu_container").innerHTML = header;
