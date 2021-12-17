import React from 'react';
import Datos from './components/Datos';
import Jumbotron from './components/jumbotron';
import Header from "./components/header";


const Perfil = ()=>{
    if(localStorage.getItem("id") == null){
        window.location = "login";
    }

    const userP = JSON.parse(localStorage.getItem("user"))

    return(
        <>
            <Header/>
            <Jumbotron titulo="Perfil" parrafo="informacion completa del perfil"/>
            <div className="container border rounded w-50 text-center">
                <Datos user={userP} />
            </div>
        </>
    );
}


export default Perfil;