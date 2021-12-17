import React from 'react'
import { Perfiles } from "../../config/config"
import Jumbotron from '../jumbotron';

const JumbotronM = () => {

    const { ADMIN, ASSESOR, COORDINADOR } = Perfiles;
    const {name} = JSON.parse(localStorage.getItem("user")); 
    const Titulo = "Bienvenid@ " + name; 

    if (localStorage.getItem("id") == ADMIN) {
        return <Jumbotron titulo={Titulo} parrafo="Tu cuenta es administrador puedes ver tu prfil dando click en tu nombre y luego mi perfil" />
    } if (localStorage.getItem("id") == ASSESOR) {
        return <Jumbotron titulo={Titulo} parrafo="Tu cuenta es asesor puedes ver tu prfil dando click en tu nombre y luego mi perfil" />
    } if (localStorage.getItem("id") == COORDINADOR) {
        return <Jumbotron titulo={Titulo} parrafo="Tu cuenta es coordinador puedes ver tu prfil dando click en tu nombre y luego mi perfil" />
    }
}

export default JumbotronM
