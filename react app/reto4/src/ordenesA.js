import React from 'react';
import Header from './components/header';
/* componentes */
import Jumbotron from './components/jumbotron';
import OrderTable from './components/subcomponents/OrderTable';

const Ordenes  = () => {

    const validLogin = () => {
        if (localStorage.getItem("id") == null) {
            window.location = "bienvenido";
        }
    }

    validLogin()

    return(
        <>
            <Header/>
            <Jumbotron titulo="Ordenes de todas las zonas" parrafo="Aca puedes ver todos los pedidos de las zonas, ademas puedes filtrar"/>
            <div className="alert alert-info alert-dismissible fade show container w-50" role="alert">
                <strong>Filtrado!</strong> Puedes filtrar por fecha, por orden o por id nada mas clickea el boton por el cual quieres filtrar
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            <div className="mt-5 container">
                <OrderTable/>
            </div>
        </>
    );
}

export default Ordenes;