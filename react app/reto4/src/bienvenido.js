/* Importar configuraciones */
import { Perfiles } from "./config/config";

/* Importar componentes */
import TextoPrueba from './components/TextoPrueba';
import JumbotronM from './components/subcomponents/JumbotronM';
import React from 'react'
import Header from "./components/header";

const Bienvenido = () => {
    const validLogin = () => {
        if (localStorage.getItem("id") == null) {
            localStorage.clear();
            window.location = "/";
        }
    }
    validLogin()
    return (
        <>
            <Header />
            <JumbotronM />
            <div className="container">
                <div className="ratio ratio-16x9">
                    <iframe src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0" title="YouTube video" allowFullScreen></iframe>
                </div>
            </div>
        </>)
}

export default Bienvenido;