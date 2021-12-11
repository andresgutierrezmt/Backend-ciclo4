if(localStorage.getItem('productoA') == null || localStorage.getItem("type") != ADMIN){
    document.location = "bienvenido.html";
}

window.addEventListener('load',()=>{
    rellenar();
    obtener_nuevo();
});

function rellenar(){
    const item = JSON.parse(atob(localStorage.getItem("productoA")));
    console.log(`item`,item);
    document.querySelector("#reference").value = item.reference;
    document.querySelector("#brand").value = item.brand;
    document.querySelector("#category").value = item.category;
    document.querySelector("#objetivo").value = item.objetivo;
    document.querySelector("#price").value = item.price;
    document.querySelector("#quantity").value = item.quantity;
    document.querySelector("#availability").value = item.availability;
    document.querySelector("#image").value = item.image;
    document.querySelector("#description").value = item.description;
}

function obtener_nuevo(){
    boton_Act = document.querySelector("#registrar_producto");
    boton_Act.addEventListener('click', ()=>{
        const item_n = {
            reference : document.querySelector("#reference").value,
            brand: document.querySelector("#brand").value,
            category: document.querySelector("#category").value,
            objetivo: document.querySelector("#objetivo").value,
            price : document.querySelector("#price").value,
            quantity: document.querySelector("#quantity").value,
            availability: document.querySelector("#availability").value,
            image: document.querySelector("#image").value,
            description: document.querySelector("#description").value,
        }
    
        verificar_actualizar_p(item_n);
    })
}
