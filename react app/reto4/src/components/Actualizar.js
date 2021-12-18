import React from 'react'
import Swal from 'sweetalert2'
import { useEffect, useState } from 'react';
import '../css/registro.css'

const Actualizar = ({ user }) => {

    const [userE, setUserE] = useState({
        id: 0,
        email: null,
        password: null,
        name: null,
        address: null,
        cellPhone: null,
        birthday: null,
        birthdayMonth: null,
        zone: null,
        type: null,
    });

    useEffect(() => {
        setUserE({ ...userE, id: user.id });
    }, [user])


    const Handler = ({ target }) => {
        const handler = {
            ...user,
            [target.name]: target.value
        };
        user = { ...handler };
    }

    const updateChanges = async (event) => {
        event.preventDefault();
        try {
            console.log(`user`, user);
            debugger
            const opt = {
                method: 'PUT',
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json"
                }
            }
            const url = `http://localhost:8080/api/user/update`;
            let response = await fetch(url, opt);
            response = await response.json();
            Swal.fire({
                position: 'center ',
                icon: 'success',
                title: 'Usuario actyualizado',
                showConfirmButton: false,
                timer: 1500
            })
            setTimeout(() => {
                window.location = "miembros"
            }, 2000)

        } catch (error) {
            console.log(`error`, error);
            Swal.fire({
                position: 'center ',
                icon: 'error',
                title: 'Usuario no actualizado',
                showConfirmButton: false,
                timer: 1500
            })
            setTimeout(() => {
                window.location = "miembros"
            }, 2000)
        }

    }

    return (
        <>
            <form className=" row was-validated" onSubmit={updateChanges}>
                <div className="col border rounded mx-1 p-3">
                    <div className="container text-center ">
                        <h4>Datos personales</h4>
                        <input className="form-control entrada" name="name" type="text" placeholder='Nombre' onChange={Handler} required defaultValue={user.name} />
                        <input type="text" className="form-control entrada" placeholder="ingrese su direccion de residencia" name="address" onChange={Handler} defaultValue={user.address} required />
                        <input type="text" className="form-control entrada" placeholder="ingrese celular" name="cellPhone" onChange={Handler} required defaultValue={user.cellPhone} />
                        <label>fecha de cumpleaños</label>
                        <input type="date" className="form-control entrada" placeholder="ingrese fecha de cumpleanios" name="birthtDay" onChange={Handler} defaultValue={user.birthtDay} required />
                        <input type="text" className="form-control entrada" placeholder="ingrese mes de cumpleanios" name="monthBirthtDay" onChange={Handler} defaultValue={user.monthBirthtDay} required />
                    </div>
                </div>
                <div className="col border rounded mx-1 p-3">
                    <div className="container text-center">
                        <div className="container text-center">
                            <h4>Datos del cargo</h4>
                        </div>
                        <input className="form-control entrada" name="identification" type="text" placeholder='Identificacion' onChange={Handler} required defaultValue={user.identification} />
                        <input type="text" className="form-control entrada" placeholder="ingrese zona de trabajo" name="zone" onChange={Handler} required defaultValue={user.zone} />
                        <select name="type" className="form-control entrada" onChange={Handler} >
                            <option defaultValue={user.type} defaultValue>{user.type}</option>
                            <option defaultValue="COORD">Coordinador</option>
                            <option defaultValue="ASER">assesor</option>
                        </select>
                        <p>Datos de ingreso</p>
                        <input type="text" className="form-control entrada" placeholder="Correo electronico" name="email" onChange={Handler} required defaultValue={user.email} />
                        <input type="password" className="form-control entrada" placeholder="Contraseña nueva" name="password" onChange={Handler} required />
                    </div>
                </div>
                <div className="container d-flex justify-content-center mt-3">
                    <button type="button" className="btn btn-secondary mx-2" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-primary mx-2">actualizar</button>
                </div>
            </form>

        </>
    );
}

export default Actualizar