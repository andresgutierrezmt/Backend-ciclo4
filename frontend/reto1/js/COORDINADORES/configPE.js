const user = JSON.parse(localStorage.getItem("user"))

try {
    if (user.type != COORDINADOR) {
        document.location = "login.html";
    }
} catch (error) {
    console.log(`error`, error);
    document.location = "login.html";
}


window.addEventListener('load', () => {
    contentadd();
    table();
});

async function table() {
    try {
        response = await fetch("http://" + url + "/api/order/zona/" + user.zone)
        items = await response.json();
        generarTabla(items);
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'error al obtener datos',
            footer: '<p>Ocurrio un error en el servidor :( </p>'
        })
    }
}

function generarTabla(items) {
    console.log(items);
    let tabla = `   <table class="table">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Dia de Registro</th>
                        <th>Asesor</th>
                        <th>Zona</th>
                        <th>estado</th>
                        <th colspan="3" class="text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody>`;
    for (let i = 0; i < items.length; i++) {
        const strobj = JSON.stringify(items[i]);
        tabla += `
            <tr>
                <td>${items[i].id}</td>
                <td>${items[i].registerDay}</td>
                <td>${items[i].salesMan.name}</td>
                <td>${items[i].salesMan.zone}</td>
                `
        if (items[i].status == 'Aprobado') {
            tabla += `    
            <td class= "text-success">${items[i].status}</td>`

            tabla += `
            td>${items[i].status}</td>
        `

            tabla += `
            <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#informacion" onclick="informacionConfig('${btoa(strobj)}')">ver orden</button></td>
            <td><button class="btn btn-success" disabled>Aprobar</button></td>
            <td><button class="btn btn-danger" disabled>Denegar</button></td>
            </tr>
        `;
        } else if (items[i].status == 'Pendiente') {
            tabla += `    
                    <td class= "text-warning">${items[i].status}</td>`

            tabla += `
                    td>${items[i].status}</td>
                `

            tabla += `
                    <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#informacion" onclick="informacionConfig('${btoa(strobj)}')">ver orden</button></td>
                    <td><button class="btn btn-success" onclick="Aprobar('${btoa(strobj)}');">Aprobar</button></td>
                    <td><button class="btn btn-danger" onclick="Denegar('${btoa(strobj)}');">Denegar</button></td>
                </tr>
                `;
        } else {
            tabla += `    
                    <td class= "text-danger">${items[i].status}</td>`

            tabla += `
                    td>${items[i].status}</td>
                `

            tabla += `
                    <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#informacion" onclick="informacionConfig('${btoa(strobj)}')">ver orden</button></td>
                    <td><button class="btn btn-success" disabled>Aprobar</button></td>
                    <td><button class="btn btn-danger" disabled>Denegar</button></td>
                </tr>
                `;
        }

    }

    tabla += `
        </tbody>
    </table>    
    `
    document.querySelector("#tabla-container").innerHTML = tabla;
}

async function Aprobar(ordenL) {
    const orden = JSON.parse(atob(ordenL));
    ordenActualizar = { ...orden };
    ordenActualizar.status = "Aprobado";
    try {
        response = await fetch("http://" + url + "/api/order/update", {
            method: 'PUT',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(ordenActualizar),
        })
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Orden Aprobada',
            showConfirmButton: false,
            timer: 1500
        })
        table();
    } catch (error) {
        console.log(`error`, error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error del servidor',
            footer: '<p>no se ha podido aprobar la orden :(</p>'
        })
    }
}

async function Denegar(ordenL){
    const orden = JSON.parse(atob(ordenL));
    let ordenActualizar = { ...orden };
    ordenActualizar.status = "Denegado";

    console.log(`ordenActualizar`,ordenActualizar);

    for (const product in ordenActualizar.products) {
        let cantidadProducto;
        let referencia = ordenActualizar.products[product].reference;
        try {
            let response = await fetch("http://" + url + "/api/supplements/"+referencia)
            let Producto = await response.json();
            let cantidadProducto = Producto.quantity
            for (const referencias in ordenActualizar.quantities) {
                if (Producto.reference == referencias){
                    Producto.quantity = Producto.quantity + ordenActualizar.quantities[referencias];
                    if(Producto.availability == false){
                        Producto.availability = true
                    }
                }
            }

            response = await fetch("http://" + url + "/api/supplements/update", {
            method: 'PUT',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(Producto),
            })

        } catch (error) {
            console.log(`error`, error);
            Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error del servidor',
            footer: '<p>no se ha podido Denegar la orden algun proucto no se actualizo como debio ser :(</p>'
            })
        }
    }
        
    try {
        response = await fetch("http://" + url + "/api/order/update", {
            method: 'PUT',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(ordenActualizar),
        })
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Orden Denegada',
            showConfirmButton: false,
            timer: 1500
        })
        table();
    } catch (error) {
        console.log(`error`, error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error del servidor',
            footer: '<p>no se ha podido Denegar la orden :(</p>'
        })
    } 
}

function informacionConfig(item) {
    const items = JSON.parse(atob(item));
    body = `
    <div class="container text-center">
        <h4><strong>Informacion basica</strong></h4>
    </div>
    <div class="container">
        <p><strong>Fecha</strong></p>
        <p>${items.registerDay}</p>
        <p><strong>id</strong></p>
        <p>${items.id}</p>
        <p><strong>Asesor</strong></p>
        <p>${items.salesMan.name}</p>
        <p><strong>Identificacion</strong></p>
        <p>${items.salesMan.identification}</p>
        <p><strong>Zona</strong></p>
        <p>${items.salesMan.zone}</p>
    </div>
    <div class="container text-center">
        <h4><strong>Productos</strong></h4>
    </div>`;

    console.log(`items.products`,);



    for (const product in items.products) {
        console.log(product.brand)
        for (const reference in items.quantities) {
            if (product == reference) {
                body += `
            <div class = "container border rounded d-flex justify-content-between">
                <img src="${items.products[product].photography}" width="60px">
                    <p>${items.products[product].brand + " " + items.products[product].category + " " + "(" + items.products[product].reference + ")"}</p>
                    <p>${"X " + items.quantities[reference]}</p>
            </div>
            `;
            }
        }
    }

    console.log(`items.status`, items.status);
    body += `    
    <div class="container text-center">
        <h4><strong>estado</strong></h4>
    </div>`

    if (items.status == 'Aprobado') {
        body += `    
        <div class="container bg-success text-center">
            <p>${items.status}</p>
        </div>`
    } else if (items.status == 'Pendiente') {
        body += `    
        <div class="container bg-warning text-center">
            <p>${items.status}</p>
        </div>`
    } else {
        body += `    
        <div class="container bg-danger text-center">
            <p>${items.status}</p>
        </div>`
    }

    document.querySelector("#modal-body-edit").innerHTML = body;
}