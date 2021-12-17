/* React Modules */
import React from 'react';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
/* CSS */
import '../css/catalogo.css';
/* configuracions */
import { url } from '../config/config'
import MostrarProducto from './subcomponents/MostrarProducto';
/* Componentes */

const ProductosS = () => {

    const [productsArray, setProductsArray] = useState([]);
    const [productoM, setProductoM] = useState({})

    const traerProductos = async () => {
        try {
            const response = await fetch("http://" + url + "/api/supplements/all")
            const items = await response.json();
            setProductsArray(Object.values(items));
        } catch (error) {
            console.log(`error`, error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error',
                footer: 'No se encontraron datos del servidor :('
            })
            console.log(`error`, error);
        }
    }

    useEffect(() => {
        traerProductos();
    }, [])

    return (
        <>
            {
                productsArray && productsArray.length > 0 && productsArray.map((producto) => (
                    <div className="shadow-sm p-3 mb-5 mx-2 bg-body rounded card cardProduct">
                        <div className="w-100 d-flex justify-content-center">
                            <img src={producto.photography} width="150px" />
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Nombre: {producto.reference}</li>
                            <li className="list-group-item">Fabricante: {producto.brand}</li>
                            <li className="list-group-item">Categoria: {producto.category}</li>
                            <li className="list-group-item">Precio: {producto.price}</li></ul>
                        <div className="card-body">
                            <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#infoModal" onClick={()=>{setProductoM( producto )}}>Ver</button>
                        </div>
                    </div>
                ))}
                <div className="modal fade" id="infoModal" tabIndex="-1" aria-labelledby="infoModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Detalles del producto</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <MostrarProducto producto={productoM}/>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductosS;