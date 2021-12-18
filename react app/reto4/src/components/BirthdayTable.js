/* Modulos React */
import React from 'react';
import Swal from 'sweetalert2'
import { useEffect, useState } from 'react';
/* configuraciones */
import { url } from '../config/config';
import Datos from './Datos';
import Actualizar from './Actualizar'

const BirthdayTable = () => {
    const[noElement, setNoElement] = useState(false)

    const [PUserBir, setPUserBir] = useState(0);
    const [userBir, setUserBir] = useState({});
    const [filtro, setFiltro] = useState("ALL");

    const [monthf, setMonthf] = useState( "" );

    const [month, setMonth] = useState( "" );


    const conexion = async (direccion) => {
        try {
            console.log(`direccion`,direccion);
            const response = await fetch(direccion);
            const ordenes = await response.json();
            setUserBir(ordenes);
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
        filtro === "ALL" && conexion("http://" + url + "/api/user/all");
        filtro == "FECHA" && conexion(`http://${url}/api/user/birthday/${month}`);
    }, [filtro,month])

    const filtradorF = () => {
        setMonth( monthf );
        console.log(`La month es ${month}`);
        setFiltro( "FECHA" )
    }

    const fechaS = ({target}) =>{
        const { value } = target
        setMonthf ( value );
    }

    return (

        <>
            <div className="container d-flex justify-content-between">
                <button className="btn btn-success" onClick={() => { setFiltro("ALL") }}>ALL</button>
                <div>
                    <div className="d-flex w-100">
                        <select className="form-select mx-1" aria-label=".form-select-sm example " onChange={fechaS}>
                            <option defaultValue>selecione mes</option>
                            <option value="01">Enero</option>
                            <option value="02">Febrero</option>
                            <option value="03">Marzo</option>
                            <option value="04">Abril</option>
                            <option value="05">Mayo</option>
                            <option value="06">Junio</option>
                            <option value="07">Julio</option>
                            <option value="08">Agosto</option>
                            <option value="09">Septiembre</option>
                            <option value="10">Octubre</option>
                            <option value="11">Noviembre</option>
                            <option value="12">Diciembre</option>
                        </select>
                        <button className="btn btn-outline-primary" onClick={filtradorF}>buscar</button>
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
                        <th>nombre</th>
                        <th>correo</th>
                        <th>fecha cumpleaños</th>
                        <th>mes del cumpleaños</th>
                        <th colSpan="2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {userBir && userBir.length > 0 && userBir.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.birthtDay}</td>
                            <td>{user.monthBirthtDay}</td>
                            <td><button className="btn btn-info" data-bs-toggle="modal" data-bs-target="#infoModal" onClick={()=>{setPUserBir( user )}}>Detalles</button></td>
                            <td><button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#updateModal" onClick={()=>{setPUserBir( user )}} >actualizar</button></td>
                        </tr>
                    ))}
                </tbody>
            </table> }
            <div className="modal fade" id="infoModal" tabIndex="-1" aria-labelledby="infoModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Detalles del usuario</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <Datos  user={PUserBir}/>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="updateModal" tabIndex="-1" aria-labelledby="updateModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Usuario</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <Actualizar user={PUserBir}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BirthdayTable;