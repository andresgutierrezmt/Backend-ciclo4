/* Node modules */
import React from 'react';
import PropTypes from 'prop-types';

const Datos = (userP) => {
    
    const { user } = userP;

    return (
        <>
            <h5><strong>Nombre</strong></h5>
            <p id="nombre">{user.id}</p>
            <h5><strong>Nombre</strong></h5>
            <p id="nombre">{user.name}</p>
            <h5><strong>Identificacion</strong></h5>
            <p id="identificacion">{user.identification}</p>
            <h5><strong>Tipo de cuenta</strong></h5>
            <p id="tipo">{user.type}</p>
            <h5><strong>Cumpleaños</strong></h5>
            <p id="cumpleanos">{user.birthtDay}</p>
            <h5><strong>Direccion</strong></h5>
            <p id="direccion">{user.address}</p>
            <h5><strong>Celular</strong></h5>
            <p id="celular">{user.cellPhone }</p>
            <h5><strong>Email</strong></h5>
            <p id="email">{user.email}</p>
            <h5><strong>Zona</strong></h5>
            <p id="zona">{user.zone}</p>
        </>
    );
}

Datos.propTypes = {
    user: PropTypes.object.isRequired,
}

export default Datos;