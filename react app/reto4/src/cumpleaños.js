import React from 'react';
import BirthdayTable from './components/BirthdayTable';
import Header from './components/header';
import Jumbotron from './components/jumbotron';

const Birthday = ()=>{
    return(
        <>
            <Header/>
            <Jumbotron titulo="Cumpleaños de los miembros" parrafo="puedes filtrar por mes o verlos todos"/>
            <div className="container">
                <BirthdayTable/>
            </div>
        </>
    );
}

export default Birthday;