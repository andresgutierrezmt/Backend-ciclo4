import React from 'react'
import Swal from 'sweetalert2'
import { useState } from 'react';
import '../css/registro.css'
import { url } from '../config/config'

const NuevoMiembro = () => {

    const [userE,setUserE] = useState( {
        email: "",
        password : "",
        nombre : "",
        direccion : "",
        celular : "",
        birthDay: "",
        monthBirthDay : "",
        zona: "",
        type: "",
    } )


    const nuevoUsuario = async () =>{
        try {
            const response = fetch("http://" + url + "/api/user/new",{
                method: 'POST',
                headers: {
                    'content-Type': 'application/json'
                },
                body: JSON.stringify(userE),
            });
            Swal.fire({
                position: 'center ',
                icon: 'success',
                title: 'Usuario guardado',
                showConfirmButton: false,
                timer: 1500
            })
            
        } catch (error) {
            console.log(`error`,error);
            Swal.fire({
                position: 'center ',
                icon: 'error',
                title: 'Ha ocurrido un error! usuario no guardado',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    const Handler = ({ target }) => {
        const handler = {
            ...userE,
            [target.name] : target.value
        };
        setUserE( handler );
    }

    const objetoRegistrar = (event) =>{
        event.preventDefault();
        console.log(`userE`,userE);
        nuevoUsuario()
    }

    return (
        <>
            <form className=" row was-validated" onSubmit={objetoRegistrar}>
                <div className="col border rounded mx-1 p-3">
                    <div className="container text-center">
                        <h2>Datos de ingreso</h2>
                        <input type="text" className="form-control entrada" placeholder="Correo electronico" name="email" onChange={Handler} required />
                        <input type="password" className="form-control entrada" placeholder="Contraseña" name="password" onChange={Handler} required />
                    </div>
                </div>
                <div className="col border rounded mx-1 p-3">
                    <div className="container text-center ">
                        <h2>Datos personales</h2>
                        <input className="form-control entrada" name="name" type="text" placeholder='Nombre' onChange={Handler} required />
                        <input type="text" className="form-control entrada" placeholder="ingrese su direccion de residencia" name="address" onChange={Handler} required />
                        <input type="text" className="form-control entrada" placeholder="ingrese celular" name="cellPhone" onChange={Handler} required />
                        <label>fecha de cumpleaños</label>
                        <input type="date" className="form-control entrada" placeholder="ingrese fecha de cumpleanios" name="birthDay" onChange={Handler} required />
                        <input type="text" className="form-control entrada" placeholder="ingrese mes de cumpleanios" name="monthBirthDay" onChange={Handler} required />
                    </div>
                </div>
                <div className="col border rounded mx-1 p-3">
                    <div className="container text-center">
                        <h2>Datos del cargo</h2>
                    </div>
                    <input className="form-control entrada" name="identification" type="text" placeholder='Identificacion' onChange={Handler} required />
                    <input type="text" className="form-control entrada" placeholder="ingrese zona de trabajo" name="zone" onChange={Handler} required />
                    <select name="type" className="form-control entrada">
                        <option value="" defaultValue>selecione un tipo de cuenta</option>
                        <option value="COORD">Coordinador</option>
                        <option value="ASER">assesor</option>
                    </select>
                </div>
                <div className="container d-flex justify-content-center mt-3">
                    <button type="button" className="btn btn-secondary mx-2" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-primary mx-2">guardar</button>
                </div>
            </form>

        </>
    );
}

export default NuevoMiembro