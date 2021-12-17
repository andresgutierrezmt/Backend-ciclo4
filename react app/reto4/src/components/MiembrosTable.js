/* Modulos React */
import React from 'react';
import { useEffect, useState } from 'react';
/* configuraciones */
import { url } from '../config/config';

const MiembrosTable = () => {

    const [users, setUsers] = useState({})

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
                        <th colSpan="2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.length > 0 && users.map(user => (
                        <tr>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.identification}</td>
                            <td>{user.type}</td>
                            <td><button className="btn btn-info" data-bs-toggle="modal" data-bs-target="#infoModal" >Detalles</button></td>
                            <td><button className="btn btn-danger" >Eliminar</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default MiembrosTable