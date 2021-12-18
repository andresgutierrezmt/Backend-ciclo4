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
    const [filtro, setFiltro] = useState("ALL");

    const[preciof, setPreciof] = useState(0)
    const [descripcionf, setDescripcionf] = useState( "" );

    const [descripcion, setDescripcion] = useState( "" );
    const [precio, setPrecio] = useState( 0 );

    const traerProductos = async (direccion) => {
        try {
            const response = await fetch(direccion)
            const items = await response.json();
            setProductsArray(Object.values(items));
        } catch (error) {
            console.log(`error`, error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error',
                footer: 'No se encontraron datos del servidor :( o algun campo esta vacio'
            })
            console.log(`error`, error);
        }
    }

    useEffect(() => {
        /* conexion(); */
        filtro === "ALL" && traerProductos("http://" + url + "/api/supplements/all");
        filtro == "DESCRIPCION" && traerProductos(`http://${url}/api/supplements/description/${descripcion}`);
        filtro == "PRECIO" && traerProductos(`http://${url}/api/supplements/price/${precio}`);
    }, [filtro,precio,descripcion])

    const filtradorD = () => {
        setPrecio( preciof );
        setDescripcion (descripcionf);
        console.log(`El estado es ${descripcion} y el precio es ${precio}`);
        setFiltro( "DESCRIPCION" )
    }

    const filtradorP = () => {
        setPrecio( preciof );
        console.log(`El precio es ${precio}`);
        setFiltro( "PRECIO" )
    }

    const precioS = ({target}) =>{
        const { value } = target
        setPreciof( value );
    }

    const descripcionS = ({target}) =>{
        const { value } = target
        setDescripcionf( value );
    }

    return (
        <>
            <div className="container d-flex justify-content-between mt-5">
                <button className="btn btn-success" onClick={()=>setFiltro( "ALL" )}>ALL</button>
                <div>
                    <div className="d-flex w-100">
                        <input className="form-control" name="descripcion" type="text" placeholder='palabra clave' onChange={descripcionS} />
                        <input name="precio" className="form-control mx-1" type="number" onChange="" placeholder='precio' onChange={precioS}/>
                        <button className="btn btn-outline-primary" onClick={filtradorD}>descripcion</button>
                        <button className="btn btn-outline-secondary mx-1" onClick={filtradorP}>precio</button>
                    </div>
                </div>
            </div>
            <div className=" container m-5 d-flex flex-wrap">
            {
                
                productsArray && productsArray.length > 0 && productsArray.map((producto) => (
                    <div key={producto.reference} className="shadow-sm p-3 mb-5 mx-2 bg-body rounded card cardProduct">
                        <div className="w-100 d-flex justify-content-center">
                            <img src={producto.photography} width="250px" />
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Nombre: {producto.reference}</li>
                            <li className="list-group-item">Fabricante: {producto.brand}</li>
                            <li className="list-group-item">Categoria: {producto.category}</li>
                            <li className="list-group-item">Precio: {producto.price}</li>
                        </ul>
                        <div className="card-body">
                            <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#infoModal" onClick={()=>{setProductoM( producto )}}>Ver</button>
                        </div>
                    </div>
                ))}
                </div>
                <div className="modal fade " id="infoModal" tabIndex="-1" aria-labelledby="infoModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductosS;