import React from 'react';
import Header from './components/header';
import { useEffect, useState } from 'react';
import Jumbotron from './components/jumbotron';
import NuevoMiembro from './components/miembroNuevo';
import MiembrosTable from './components/MiembrosTable';

const Miembros = ()=>{

    const [ sendData,setSendData ] = useState( "" );

    const saveData = () =>{
        setSendData( true );
    }
    
    return(
        <>
            <Header/>
            <Jumbotron titulo="Miembros" parrafo="Aca se encuentran los miembros de la empresa"/>
            <div className="container">
            <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#RegistroModal">Nuevo miembro</button>
                <MiembrosTable/>
            </div>
            <div className="modal fade " id="RegistroModal" tabIndex="-1" aria-labelledby="RegistroModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Registrar un nuevo miembro</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <NuevoMiembro sendData = {sendData}/>
                        </div>
                        <div className="modal-footer"></div>
                    </div>
                </div>
            </div>        
        </>
    );
}


export default Miembros