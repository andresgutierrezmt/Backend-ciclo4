import React from 'react';
import Datos from './components/Datos';
import { useEffect, useState } from 'react';
import Jumbotron from './components/jumbotron';
import Header from "./components/header";


const Perfil = ()=>{
    if(localStorage.getItem("id") == null){
        window.location = "login";
    }

    const [userP,setUserP] = useState( {} )

    useEffect(()=>{
        setUserP(JSON.parse(localStorage.getItem("user")));
    },[])
    
    console.log(`userP antes de enviar`,userP);

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