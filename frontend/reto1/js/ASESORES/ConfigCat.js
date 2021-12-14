try {
    let usuario = JSON.parse(localStorage.getItem("user"))
    if(usuario == null){
        document.location = "login.html"
    }
} catch (error) {
    alert(error)
    document.location = "login.html"
}

window.addEventListener('load',()=>{
    contentadd();
    configInit();
    //acciones();
})

async function configInit(){
    try {
        let response = await fetch("http://" + url + "/api/supplements/all")
        let items = await response.json();
        table(items);
    } catch (error) {
        
    }
}

function table(items){
    for (let i = 0; i < items.length; i++) {
        /* Crear objeto para la carta */
        /* Contenedor principal */
        let tarjeta = document.createElement("DIV");
        /* Imagen */
        let contenedorImagen = document.createElement("DIV")
        let ImagenTarjeta = document.createElement("IMG");
        /* Alugnas especificaciones */
        let List_group = document.createElement("UL");
        let List_grup1 = document.createElement("LI");
        let List_grup2 = document.createElement("LI");
        let List_grup3 = document.createElement("LI");
        let List_grup4 = document.createElement("LI");
        /* Card Footer */
        let Card_Footer = document.createElement("DIV");
        let boton = document.createElement("BUTTON");

        /* Nodos */
        text1 = "Nombre: " + items[i].reference;
        text2 = "Fabricante: " + items[i].brand;
        text3 = "Categoria: " + items[i].category;
        text4 = "Precio: " + items[i].price;

        textC1 = document.createTextNode(text1);
        textC2 = document.createTextNode(text2);
        textC3 = document.createTextNode(text3);
        textC4 = document.createTextNode(text4);

        textB = document.createTextNode("Ver");
        /* Union elementos */
        boton.appendChild(textB);
        Card_Footer.appendChild(boton);

        /* listas */
        List_grup1.appendChild(textC1);
        List_grup2.appendChild(textC2);
        List_grup3.appendChild(textC3);
        List_grup4.appendChild(textC4);

        /* Adjunto de listas */
        List_group.appendChild(List_grup1);
        List_group.appendChild(List_grup2);
        List_group.appendChild(List_grup3);
        List_group.appendChild(List_grup4);

        /* Imagen */
        contenedorImagen.appendChild(ImagenTarjeta);

        /* Union todos los objetos */
        tarjeta.appendChild(contenedorImagen);
        tarjeta.appendChild(List_group);
        tarjeta.appendChild(Card_Footer);

        /*Anexo al body*/
        document.querySelector("#productos_E").appendChild(tarjeta);

        /* Propiedades */

        /* Contenedor */
        tarjeta.classList.add("shadow-sm");
        tarjeta.classList.add("p-3");
        tarjeta.classList.add("mb-5");
        tarjeta.classList.add("bg-body");
        tarjeta.classList.add("rounded")
        tarjeta.classList.add("card");
        tarjeta.setAttribute("style","width: 18rem;");
        /* imagen */
        contenedorImagen.classList.add("w-100");
        contenedorImagen.classList.add("d-flex");
        contenedorImagen.classList.add("justify-content-center");
        ImagenTarjeta.setAttribute("src",items[i].photography);
        ImagenTarjeta.setAttribute("width","150px");
        /* body */
        List_group.classList.add("list-group");
        List_group.classList.add("list-group-flush");
        List_grup1.classList.add("list-group-item");
        List_grup2.classList.add("list-group-item");
        List_grup3.classList.add("list-group-item");
        List_grup4.classList.add("list-group-item");
        /* Footer */
        Card_Footer.classList.add("card-body");
        boton.classList.add("btn");
        boton.classList.add("btn-primary");
        boton.setAttribute("data-bs-toggle","modal");
        boton.setAttribute("data-bs-target","#exampleModal");

        boton.addEventListener('click',()=>{
            /* productoVer(JSON.stringify(btoa(items[i]))) */
            productoVer(JSON.stringify(items[i]));
        });
    }
}

function productoVer(reference){
    /* document.querySelector("#body_p").classList.remove("bg-primary") //agregar una clase add, remove, toggle
    document.querySelector("#body_p").setAttribute("title","Hola como estas")//agregar un atributo
    document.querySelector("#body_p").innerHTML= "Hola como estan"//agregar contenido*/
    console.log(`reference`,reference);
    const item = JSON.parse(reference); /* atob desencripta un JSON de base 64*/
    console.log(item.photography);
    body = `
    <div class="container d-flex justify-content-center">
        <img src="${item.photography}" width="150px">
    </div>
    <h6><strong>Referencia</strong></h2>
    <p>${item.reference}</p>
    <h6><strong>Marca</strong></h2>
    <p>${item.brand}</p>
    <h6><strong>Categoria</strong></h2>
    <p>${item.category}</p>
    <h6><strong>Objetivo</strong></h2>
    <p>${item.objetivo}</p>
    <h6><strong>Disponibilidad</strong></h2>
    <p>${item.availability}</p>
    <h6><strong>Cantidad</strong></h2>
    <p>${item.quantity}</p>
    <h6><strong>Precio</strong></h2>
    <p>${item.price}</p>
    <h6><strong>Descripcion</strong></h2>
    <p>${item.description}</p>
    `;
    document.querySelector("#body_M").innerHTML=body;
}