import React from 'react'


const MostrarProducto = ({ producto }) => {
    return (
        <>
            <h5><strong>Referencia</strong></h5>
            <p>{producto.reference}</p>
            <h5><strong>Fabricante</strong></h5>
            <p>{producto.brand}</p>
            <h5><strong>estado</strong></h5>
            <p>{producto.availability === true ? "Disponible" : "No disponible"}</p>
            <h5><strong>objetivo</strong></h5>
            <p>{producto.objetivo}</p>
            <h5><strong>cantidad</strong></h5>
            <p>{producto.quantity}</p>
            <h5><strong>Descripcion</strong></h5>
            <p>{producto.description}</p>
            <div className="container">
                <img className="mx-auto" src={producto.photography} / >
            </div>
        </>
    );
}

export default MostrarProducto;