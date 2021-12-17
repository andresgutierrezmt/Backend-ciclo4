/* Modulos node */
import React from 'react';
import ReactDom from 'react-dom';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
/* Importar boostrap */
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
/* Importar componentes */
import Bienvenido from './bienvenido';
import Login from './login';
import Perfil from './Perfil';
import Ordenes from './ordenesA';
import Miembros from './miembros';

const DeportiveApp = () => {
    /* const {ADMIN, ASSESOR, COORDINADOR} = Perfiles; */
    /*   <Bienvenido/> */
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/bienvenido" element={<Bienvenido/>}/>
                <Route path="/perfil" element={<Perfil/>}/>
                <Route path="/ordenes" element={<Ordenes/>} />
                <Route path="/miembros" element={<Miembros/>} />
            </Routes>
        </Router>
    );
}

const divRoot = document.querySelector("#root");
ReactDom.render(<DeportiveApp />, divRoot)



