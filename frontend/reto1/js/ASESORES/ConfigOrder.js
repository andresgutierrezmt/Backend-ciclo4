try {
    if (JSON.parse(localStorage.getItem("user")).type != ASSESOR) {
        document.location = "login.html";
    }
} catch (error) {
    console.log(`error`,error);
    document.location = "login.html"
}

window.addEventListener('load', () => {
    document.querySelector("#contenedor2").style.display = 'none'
    contentadd();
    table();
    configurarO();
});

async function table() {
    try {
        response = await fetch("http://" + url + "/api/order/all")
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
    let tabla = `   <table class="table">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Dia de Registro</th>
                        <th>Asesor</th>
                        <th>Zona</th>
                        <th>estado</th>
                        <th colspan="2">Acciones</th>
                    </tr>
                </thead>
                <tbody>`;
    for (let i = 0; i < items.length; i++) {
        const strobj = JSON.stringify(items[i]);
        if (items[i].salesMan.zone == JSON.parse(localStorage.getItem("user")).zone) {
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
                `;
    
                tabla += `
                    <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#informacion" onclick="informacionConfig('${btoa(strobj)}')">Productos</button></td>
                    <td><button class="btn btn-danger" disabled>Eliminar</button></td>
                </tr>
                `;
            } else if (items[i].status == 'Pendiente') {
                tabla += `    
                    <td class= "text-warning">${items[i].status}</td>`;
                    tabla += `
                    td>${items[i].status}</td>
                `
    
                tabla += `
                    <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#informacion" onclick="informacionConfig('${btoa(strobj)}');">Productos</button></td>
                    <td><button class="btn btn-danger" onclick="Eliminar('${btoa(strobj)}');">Eliminar</button></td>
                </tr>
                `;
            } else {
                tabla += `    
                    <td class= "text-danger">${items[i].status}</td>`
                tabla += `
                    td>${items[i].status}</td>
                `;
    
                tabla += `
                    <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#informacion" onclick="informacionConfig('${btoa(strobj)}')">Productos</button></td>
                    <td><button class="btn btn-danger" disabled>Eliminar</button></td>
                </tr>
                `;
            }
        }
    }
    tabla += `
        </tbody>
    </table>    
    `

    document.querySelector("#tabla-container").innerHTML = tabla;

}

async function Eliminar(ordenL) {
    const orden = JSON.parse(atob(ordenL));
    let ordenActualizar = { ...orden };

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
                console.log(`PrdcutoActualizado`,Producto);
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
            footer: '<p>no se ha podido eleiminar la orden algun proucto no se actualizo como debio ser :(</p>'
            })
        }
    }

    try {
        response = await fetch("http://" + url + "/api/order/" + orden.id, {
            method: 'DELETE',
            headers: {
                'content-Type': 'application/json'
            },
        })
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Orden eliminada',
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
            footer: '<p>no se ha podido eliminar el elemento :(</p>'
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
            <div class = "container border rounded d-flex justify-content-between mb-3 shadow-sm p-3 mb-5 bg-body rounded">
                <img src="${items.products[product].photography}" width="60px">
                    <p>${items.products[product].brand + " " + items.products[product].category + " " + "(" + items.products[product].reference+ ")"}</p>
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


function configurarO() {
    traerProductos();

}

async function traerProductos() {
    try {
        response = await fetch("http://" + url + "/api/supplements/all")
        items = await response.json();
        asignar(items);
    } catch (error) {
        console.log(`error`, error);
    }
}

function asignar(items) {
    console.log(`items`, items);
    let options = `<option value="0" selected>selecione un producto</option>`;
    let img = ``;
    for (let i = 0; i < items.length; i++) {
        const strobj = JSON.stringify(items[i]);
        if (items[i].availability) {
            options += `
            <option id="option" onclick="muestra('${btoa(strobj)}');" value="${btoa(strobj)}">${items[i].brand + " " + items[i].category + " " + "(" + items[i].reference + ")"}</option>
            `;
        }
    }
    document.querySelector("#referencia-container").innerHTML = options;

    let itemValido = false;

    /* Accion boton agregar item */
    submit = document.querySelector("#boton")
    submit.addEventListener('click', () => {
        opcion = document.querySelector("#referencia-container").value;
        if (opcion != 0) {
            itemValido = true;
            validaciones(opcion);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Debes elegir un elemento',
                footer: '<p>No has selecionado nada</p>'
            })
        }

    });

    /* Accion boton agregar orden*/
    accept = document.querySelector("#boton2")
    accept.addEventListener('click', () => {
        if (itemValido) {
            itemValido = false;
            validarOrden()
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No has cargado ningun elemento',
                footer: '<p>debes cargar asi sea un elemento para la orden</p>'
            })
        }

    });
}

function muestra(item) {
    const items = JSON.parse(atob(item));
    document.querySelector("#cantidad").value = items.quantity;
    document.querySelector("#contenedor2").style.display = 'block';
    img = `
    <img id="img" src="${items.photography}" class="w-100 mx-auto hover-shadow"></img>
    `;
    document.querySelector("#img-container").innerHTML = img;
}

function validaciones(product) {
    const items = JSON.parse(atob(product));
    let cantidad = document.querySelector("#cantidad").value

    if (cantidad <= items.quantity) {
        añadir(items, cantidad);
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Se supero la cantidad existente del producto',
            footer: '<p>Recuerda que la cantidad maxima que hay se genera automaticamente en el campo de cantidad</p>'
        })
    }
}

function añadir(items, cantidad) {
    /* Generar informacion */
    let contenedor = document.createElement("DIV");
    let contenedor_img = document.createElement("DIV");
    let img = document.createElement("IMG");
    let cerrar = document.createElement("BUTTON");
    let text_p = document.createElement("P");
    let text_node = document.createTextNode(items.brand + " " + items.category + " " + "(" + items.reference + ") x " + cantidad)

    text_p.appendChild(text_node);
    contenedor_img.appendChild(img);
    contenedor.appendChild(contenedor_img);
    contenedor.appendChild(text_p);
    contenedor.appendChild(cerrar);

    document.querySelector("#contenedor-ordenes").appendChild(contenedor)

    /* Ajustes del contenedor */
    contenedor.classList.add("order-element");
    contenedor.classList.add("alert");
    contenedor.classList.add("alert-light");
    contenedor.classList.add("alert-dismissible");
    contenedor.classList.add("border")
    contenedor.classList.add("mb-1");
    contenedor.classList.add("d-flex");
    contenedor.classList.add("justify-content-between");
    contenedor.setAttribute("value", items.reference + " " + cantidad);

    /* Ajustes del boton */
    cerrar.classList.add("btn-close");
    cerrar.setAttribute('data-bs-dismiss', 'alert');

    img.setAttribute("src", items.photography);
    img.setAttribute("width", "20px");
}

function validarOrden() {
    let flag = 0;
    let contador = 0
    let elementos = [];
    let productos = [];
    let objeto = {};
    elementos = [];
    let objetos_selecionados = document.getElementsByClassName("order-element")
    for (let i = 0; i < objetos_selecionados.length; i++) {
        elementos = objetos_selecionados[i].getAttribute("value").split(" ");
        objeto = {
            referencia: elementos[0],
            cantidad: elementos[1]
        }
        productos.push(objeto);
    }

    for (let i = 0; i < productos.length; i++) {
        let referencia_Anlizar = productos[i].referencia;
        for (let j = 0; j < productos.length; j++) {
            let referencia_obtenida = productos[j].referencia;
            if (referencia_obtenida == referencia_Anlizar) {
                contador += 1;
                if (contador == 2) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Productos repetidos en la lista',
                        footer: '<p>Hay algun producto repetido, elimina algun repetido para continuar</p>'
                    })
                    flag = 1;
                    break;
                }
            }
        }
        referencia_Anlizar = "";
        contador = 0;
    }
    if (flag == 0) {
        console.log(`productos`, productos);
        generarOrden(productos);
    }
}

async function generarOrden(productos) {
    let productsArray = [];
    let productsa = {};
    let cantidades = {};

    for (let i = 0; i < productos.length; i++) {
        cantidades[productos[i].referencia] = productos[i].cantidad
        /* Object.defineProperty(cantidades,productos[i].referencia,{value:productos[i].cantidad, writable:false}) */
    }

    for (let i = 0; i < productos.length; i++) {
        try {
            let response = await fetch("http://" + url + "/api/supplements/" + productos[i].referencia);
            let producto = await response.json();
            //let ArrayP = { ...producto }
            let ArrayP = producto
            let identificador = producto.reference
            productsArray.push(ArrayP)
            /* Object.defineProperty(productsa,identificador,{value:producto, writable:false}) */
            productsa[identificador] = producto;
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al obtener datos de la tabla',
                footer: '<p>hubo un error en el servidor</p>'
            })
            console.log(error);
        }
    }

    for (let i = 0; i < productos.length; i++) {
        for (let j = 0; j < productsArray.length; j++) {
            if (productos[i].referencia == productsArray[j].reference) {
                productsArray[j].quantity = productsArray[j].quantity - productos[i].cantidad;
                if (productsArray[j].quantity == 0) {
                    productsArray[j].availability = false;
                }
            }
        }
    }

    /* Object.defineProperty(Orden,"products",{value:productsa, writable:true})
    Object.defineProperty(Orden,"quantities",{value:cantidades, writable:true}) */

    console.log(`productsa`, productsa);
    console.log(`cantidades`, cantidades);

    let Orden = {
        registerDay: document.querySelector("#dateAssigment").value,
        status: "Pendiente",
        salesMan: JSON.parse(localStorage.getItem("user")),
        products: productsa,
        quantities: cantidades,
    }

    try {
        for (let i = 0; i < productsArray.length; i++) {
            console.log(`analizar ->`, JSON.stringify(productsArray[i]));
            response = await fetch("http://" + url + "/api/supplements/update", {
                method: 'PUT',
                headers: {
                    'content-Type': 'application/json'
                },
                body: JSON.stringify(productsArray[i]),
            })
        }

        response = await fetch("http://" + url + "/api/order/new", {
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(Orden),
        })

        Swal.fire({
            title: 'Orden Exitosa',
            text: "La orden se genero exitosamente",
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'aceptar'
        }).then((result) => {
            if (result.isConfirmed) {
                document.location = "ordenes.html"
            }
        });


    } catch (error) {
        console.log(error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error con el servidor',
            footer: '<p>Error temporal del servidor, no se genero la orden :(</p>'
        })
    }

}