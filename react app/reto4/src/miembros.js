import React from 'react';
import Header from './components/header';
import Jumbotron from './components/jumbotron';
import MiembrosTable from './components/MiembrosTable';

const miembros = ()=>{
    return(
        <>
            <Header/>
            <Jumbotron titulo="Miembros" parrafo="Aca se encuentran los miembros de la empresa"/>
            <div className="container">
                <MiembrosTable/>
            </div>        
        </>
    );
}


export default miembros