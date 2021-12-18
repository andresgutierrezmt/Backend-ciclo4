import '../../css/cards.css'
import React from 'react'


const MostrarProducto = ({ producto }) => {
    return (
        <>
        <div class="row">
            <div class="col border rounded mx-1">
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
                <h5><strong>Precio</strong></h5>
                <p>{producto.price}</p>
                <h5><strong>Descripcion</strong></h5>
                <p>{producto.description}</p>
            </div>
            <div class="col border rounded mx-1">
                <div className="container photo">
                    <img className="m-auto" src={producto.photography} width="600px" / >
                </div>
            </div>
        </div>
        </>
    );
}

export default MostrarProducto;