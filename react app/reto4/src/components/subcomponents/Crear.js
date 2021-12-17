import React from 'react'
import CrearA from './CrearA';
import CrearB from './CrearB';
import CrearC from './crearC';
import { Perfiles } from "../../config/config";

const Crear = () => {

    const {ADMIN, ASSESOR, COORDINADOR} = Perfiles;

    if (localStorage.getItem("id") == ADMIN) {
        return <CrearA/>
    }else if(localStorage.getItem("id") == ASSESOR){
        return <CrearB/>
    }else if(localStorage.getItem("id") == COORDINADOR){
        return<CrearC/>
    }else{
        console.error("No se ha detectado ningun perfil");
    } 
}

export default Crear;