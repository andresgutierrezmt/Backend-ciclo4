import React from 'react';
import Header from './components/header';
import Jumbotron from './components/jumbotron';
import ProductosS from './components/ProductosS';

const Catalogo = ()=>{
    return(
        <>
            <Header/>
            <Jumbotron titulo="Catalogo" parrafo=""/>
            <div className=" container mt-5 d-flex">
                <ProductosS/>   
            </div>
        </>
    );
}


export default Catalogo;