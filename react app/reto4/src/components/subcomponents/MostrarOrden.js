import React from 'react'


const MostrarOrden = ({ order }) => {
    /* console.log(`order.products`,order.products); */
    const user = { ...order.salesMan };
    
    const arrTempi = [];

    if (order != 0) {
        let arrayProducts = Object.values(order.products);
        
        // arrayProducts = arrayProducts.map((product) => {
        //   return { ...product, quantities: quantities[product.reference] };
        // });
        for (const product of arrayProducts) {
            const obj = { ...product };
            console.log(`obj`,obj);
            obj.quantities = order.quantities[product.reference];
            arrTempi.push(obj);
        }
    }
    

    return (
        <>
            <h5><strong>pedido Numero</strong></h5>
            <p>{order.id}</p>
            <h5><strong>Dia de registro</strong></h5>
            <p>{order.registerDay}</p>
            <h5><strong>estado</strong></h5>
            <p>{order.status}</p>
            <h5><strong>Encargado</strong></h5>
            <p>{user.name}</p>
            <h5><strong>id Encargado</strong></h5>
            <p>{user.id}</p>
            <h5><strong>Productos</strong></h5>
            {arrTempi && arrTempi.length > 0 && arrTempi.map((producto)=>(
                <div className="container d-flex justify-content-between border rounded mb-3">
                    <p>{producto.brand + " " + producto.reference + " x " + producto.quantities}</p>
                    <img src={producto.photography} width="100px"/>
                </div>
            )) 
            }

        </>
    );
}

export default MostrarOrden;