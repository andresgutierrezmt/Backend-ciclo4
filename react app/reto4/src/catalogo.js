import React from 'react';
import Header from './components/header';
import Jumbotron from './components/jumbotron';
import ProductosS from './components/ProductosS';

const Catalogo = ()=>{
    return(
        <>
            <Header/>
            <Jumbotron titulo="Catalogo" parrafo=""/>
            <div className="alert alert-info alert-dismissible fade show container w-50" role="alert">
                <strong>Filtrado!</strong> Puedes filtrar por descripcion o por precio los productos nada mas clickea el boton por el cual quieres filtrar
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            <div className="container w-100">
                <ProductosS/>
            </div>
        </>
    );
}


export default Catalogo;