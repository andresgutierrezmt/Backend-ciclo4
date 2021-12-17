import React from 'react'
import logo from "../img/logo_header.png";
import Crear from './subcomponents/Crear';
import Swal from 'sweetalert2'

const Header = () => {
    const userName = localStorage.getItem("nombre");

    const cerrarS = () =>{
        localStorage.clear();
        Swal.fire({
            position: 'center ',
            icon: 'success',
            title: 'vuelva pronto',
            showConfirmButton: false,
            timer: 1500
        })
        setTimeout(()=>{
            window.location = "/"
        },2000)
    }

    const perfil = () =>{
        window.location = "perfil"
    }

    return (
        <header>
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark d-flex justify-content-around" id="menu">
                <a className="navbar-brand" href="bienvenido">
                    <img src={logo} alt="logo" className="w-75"/>
                </a>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="#">Elementos</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">gimnasio</a>
                    </li>
                    <Crear/>
                </ul>
                <li className="navbar-nav nav-item dropdown">
                    <a className="nav-link dropdown-toggle text-secondary" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {userName}
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <li><a className="dropdown-item" id="perfilS" onClick={perfil}>Perfil</a></li>
                        <li><a className="dropdown-item" id="cerrarS" onClick={cerrarS}>Cerrar Sesion</a></li>
                    </ul>
                </li>
            </nav>
        </header>
    )
}


export default Header;