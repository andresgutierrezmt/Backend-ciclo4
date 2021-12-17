/* modulos */
import React, { useState } from 'react';
import Swal from 'sweetalert2'
/* logo */
import logo from "./img/logo.png"
/* componentes */
import Jumbotron from './components/jumbotron';
/* configuraciones */
import { url } from "./config/config"

const Login = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [user, setValues] = useState({
        email: "",
        pwd: "",
    });

    const validLogin = () => {
        if (localStorage.getItem("id") != null) {
            window.location = "bienvenido";
        }
    }
    validLogin()


    const handleInputChange = (event) => {

        
        const { name, value } = event.target;

        setValues({
            ...user,
            [name]: value,
        });
    }

    const enviarDatos = (event) => {
        event.preventDefault();
        ValidarEmail();
    }

    const ValidarEmail = async () => {
        try {
            setIsLoading(true);
            console.log(`user.email`, user.email);
            const response = await fetch("http://" + url + "/api/user/" + user.email + "/" + user.pwd);
            const promise = await response.json();
            console.log(`promise`, promise);
            localStorage.setItem("user", JSON.stringify(promise));
            localStorage.setItem("id", promise.type)
            localStorage.setItem("nombre", promise.name)
            if (promise.name != null) {
                Swal.fire({
                    position: 'center ',
                    icon: 'success',
                    title: 'Bienvenido',
                    showConfirmButton: false,
                    timer: 1500
                })
                setTimeout(() => {
                    setIsLoading(false);
                    window.location = "bienvenido"
                }, 2000)
            } else {
                setIsLoading(false);
                Swal.fire({
                    position: 'center ',
                    icon: 'error',
                    title: 'El usuario no existe',
                    showConfirmButton: false,
                    timer: 1000
                })
                
            }
        } catch (error) {
            setIsLoading(false);
            console.log(`error`, error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: 'Error al conectar con el servidor'
            })
        }
    }

    return (
        <>
            <div className="container mt-3 d-flex justify-content-center" id="logo">
                <img src={logo} alt="Logo" className="w-25" />
            </div>
            <Jumbotron titulo="Iniciar sesion" parrafo="Bienvenido" />
            {isLoading ?
                <div className="container d-flex justify-content-center">
                    <div className="spinner-border" id="spinner"></div>
                </div> : ''
            }

            <div className="container w-50">
                <form onSubmit={enviarDatos}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input name="email" type="email" className="form-control" onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pwd">Password:</label>
                        <input name="pwd" type="password" className="form-control" onChange={handleInputChange} />
                    </div>
                    <button id="boton" type="submit" className="btn btn-primary w-100 mt-3">Submit</button>
                </form>
            </div>
        </>
    )
}

export default Login;