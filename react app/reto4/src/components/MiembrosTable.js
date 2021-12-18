/* Modulos React */
import React from 'react';
import { useEffect, useState } from 'react';
/* configuraciones */
import { url } from '../config/config';
import Datos from './Datos';
import Actualizar from './Actualizar'

const MiembrosTable = () => {

    const [users, setUsers] = useState({})
    const [userE, setUser] = useState({})

    const conexion = async () => {
        const response = await fetch("http://" + url + "/api/user/all");
        const userItems = await response.json();
        setUsers(userItems)
    }

    useEffect(() => {
        conexion();
    }, [])

    return (
        <>
            <table className="table table-responsive text-center table-hover shadow-sm p-3 mb-5 bg-body rounded mt-3">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>nombre</th>
                        <th>correo</th>
                        <th>identificacion</th>
                        <th>cuenta</th>
                        <th colSpan="3">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.length > 0 && users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.identification}</td>
                            <td>{user.type}</td>
                            <td><button className="btn btn-info" data-bs-toggle="modal" data-bs-target="#infoModal" onClick={()=>{setUser( user )}}>Detalles</button></td>
                            <td><button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#updateModal" onClick={()=>{setUser( user )}} >actualizar</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="modal fade" id="infoModal" tabIndex="-1" aria-labelledby="infoModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Usuario</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            < Datos user={userE} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
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
                            <Actualizar user={userE}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MiembrosTable