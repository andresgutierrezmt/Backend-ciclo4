import Swal from 'sweetalert2'
import React from 'react';
import { useEffect, useState } from 'react';
/* configuracion */
import { url } from "../../config/config"
/* componentes */
import MostrarOrden from './MostrarOrden';

const OrderTable = () => {

    const[noElement, setNoElement] = useState(false)

    const [POrder, setPOrder] = useState(0);
    const [orders, setOrders] = useState({});
    const [filtro, setFiltro] = useState("ALL");

    const[idf, setIdf] = useState(0)
    const [fechaf, setFechaf] = useState( "" );
    const [statusf, setStatusf] = useState( "" );

    const [fecha, setFecha] = useState( "" );
    const [status, setStatus] = useState( "" );
    const [id, setId] = useState( 0 );

    const conexion = async (direccion) => {
        try {
            console.log(`direccion`,direccion);
            const response = await fetch(direccion);
            const ordenes = await response.json();
            setOrders(ordenes);
            ordenes == "" ? setNoElement( true ) : setNoElement( false );
            console.log("R", ordenes);
        } catch (error) {
            console.log(`error`, error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error',
                footer: 'Dejo algun campo vacio'
            })
        }
    }

    useEffect(() => {
        /* conexion(); */
        filtro === "ALL" && conexion("http://" + url + "/api/order/all");
        filtro == "FECHA" && conexion(`http://${url}/api/order/date/${fecha}/${id}`);
        filtro == "ESTADO" && conexion(`http://${url}/api/order/state/${status}/${id}`);
        filtro == "ID" && conexion(`http://${url}/api/order/salesman/${id}`);
    }, [filtro,id,fecha,status])

    const filtradorF = () => {
        setId( idf );
        setFecha( fechaf );
        console.log(`La fecha es ${fecha} y el id es ${id}`);
        setFiltro( "FECHA" )
    }

    const filtradorE = () => {
        setId( idf );
        setStatus (statusf);
        console.log(`El estado es ${status} y el id es ${id}`);
        setFiltro( "ESTADO" )
    }

    const filtradorI = () => {
        setId( idf );
        console.log(`El id es ${id}`);
        setFiltro( "ID" )
    }

    const fechaS = ({target}) =>{
        const { value } = target
        setFechaf ( value );
    }

    const idS = ({target}) =>{
        const { value } = target
        setIdf( value );
    }

    const estadoS = ({target}) =>{
        const { value } = target
        setStatusf( value );
    }

    return (

        <>
            <div className="container d-flex justify-content-between">
                <button className="btn btn-success" onClick={() => { setFiltro("ALL") }}>ALL</button>
                <div>
                    <div className="d-flex w-100">
                        <input className="form-control" name="id" type="number" placeholder='ingrese id asesor' onChange={idS} />
                        <select className="form-select form-select-sm w-25 mx-1" aria-label=".form-select-sm example " onChange={estadoS}>
                            <option defaultValue>estado</option>
                            <option value="Aprobado">Aprobado</option>
                            <option value="Pendiente">Pendiente</option>
                            <option value="Denegado">Denegado</option>
                        </select>
                        <input name="fecha" className="form-control mx-1" type="date" onChange={fechaS} />
                        <button className="btn btn-outline-primary" onClick={filtradorF}>fecha</button>
                        <button className="btn btn-outline-secondary mx-1" onClick={filtradorE}>estado</button>
                        <button className="btn btn-outline-success mx-1" onClick={filtradorI}>id</button>
                    </div>
                </div>
            </div>
            { noElement ? 
                <div className="container text-center mt-3 border w-100 text-secondary shadow-sm p-3 mb-5 bg-body rounded">
                    <h1>No hay datos que mostrar</h1>
                </div>
                
                : 
                
                <table className="table table-responsive text-center table-hover shadow-sm p-3 mb-5 bg-body rounded mt-3">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Dia de Registro</th>
                        <th>Asesor</th>
                        <th>Zona</th>
                        <th>estado</th>
                        <th colSpan="2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {orders && orders.length > 0 && orders.map(order => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.registerDay}</td>
                            <td>{order.salesMan.name}</td>
                            <td>{order.salesMan.zone}</td>
                            <td>{order.status}</td>
                            <td><button className="btn btn-info" onClick={() => setPOrder(order)} data-bs-toggle="modal" data-bs-target="#infoModal" >Detalles</button></td>
                            <td><button className="btn btn-danger" >Eliminar</button></td>
                        </tr>
                    ))}
                </tbody>
            </table> }
            <div className="modal fade" id="infoModal" tabIndex="-1" aria-labelledby="infoModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Detaller del pedido</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            < MostrarOrden order={POrder} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default OrderTable;