import React from 'react'

const CrearA = () => {
    return (
        <>
            <li className="nav-item">
                <a className="nav-link" href="ordenes">Ordenes</a>
            </li>
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-secondary" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Miembros
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <li><a className="dropdown-item" href="registro.html">Registrar miembro</a></li>
                    <li><a className="dropdown-item" href="miembros">Miembros</a></li>
                </ul>
            </li>
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-secondary" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Catalogo
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <li><a className="dropdown-item" href="registroP.html">Nuevo producto</a></li>
                    <li><a className="dropdown-item" href="productos.html">productos</a></li>
                    <li><a className="dropdown-item" href="catalogo.html">catalogo</a></li>
                </ul>
            </li>
        </>
    )
}

export default CrearA;