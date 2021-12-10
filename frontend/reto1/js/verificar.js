function verificar(){
    email = document.querySelector("#email").value;
    password = document.querySelector("#pwd").value;
    if(email != "" && password != ""){
        if(email.includes("@") && (email.includes(".com") || email.includes(".co"))){
            return true;
        }
        else
        alert("falta el @ o .com en la direccion de correo electronico")
        return false;
    }else{
        alert("Rellene todos los campos")
        return false;
    }
    
}

function validarRegistro(newUser){
    if(newUser.id != "" && newUser.identificacion != "" && newUser.nombre != "" && newUser.email != "" && newUser.password != "" && newUser.password_conf != "" && newUser.direccion != "" && newUser.celular != "" && newUser.zona != "" && newUser.tipo_de_cuenta != ""){
        if(newUser.password == newUser.password_conf){
            if (newUser.terminos) {
                autenticacion(newUser)
            } else {
                alert("valide los terminos y condiciones")
            }
        }
        else{
            alert("las claves no coinciden");
        }
    }else{
        alert("Campos vacios verifique que esten todos llenos")
    }
}

function validarActualizacion(newUser){
    if(newUser.id != "" && newUser.identificacion != "" && newUser.nombre != "" && newUser.email != "" && newUser.password != "" && newUser.password_conf != "" && newUser.direccion != "" && newUser.celular != "" && newUser.zona != "" && newUser.tipo_de_cuenta != ""){
        if(newUser.password == newUser.password_conf){
            actualizar(newUser)
        }
        else{
            alert("las claves no coinciden");
        }
    }else{
        alert("Campos vacios verifique que esten todos llenos")
    }
}

async function autenticacion(newUser){
    response = await fetch("http://"+ url +"/api/user/emailexist/"+newUser.email);
    jsonresponse = await response.json();
    if (jsonresponse) {
        alert("El email ya esta en uso")
    } else {
        let registrar = {
            id: newUser.id,
            identification: newUser.identificacion,
            name: newUser.nombre,
            address: newUser.direccion,
            cellPhone: newUser.celular,
            email: newUser.email,
            password: newUser.password,
            zone: newUser.zona,
            type: newUser.tipo_de_cuenta
        }
        registrarUsuario(registrar)
    }
}

async function actualizar(newUser){
    let actualizar = {
        id: newUser.id,
        identification: newUser.identificacion,
        name: newUser.nombre,
        address: newUser.direccion,
        cellPhone: newUser.celular,
        email: newUser.email,
        password: newUser.password,
        zone: newUser.zona,
        type: newUser.tipo_de_cuenta
    };

    datos = JSON.stringify(actualizar);

    try {
        response = await fetch("http://"+ url +"/api/user/emailexist/"+newUser.email);
        jsonresponse = await response.json();
        if(newUser.email == localStorage.getItem("antiguo_email")){
            enviar(datos);
        } 
        
        else{
            if(jsonresponse){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'email ya existente',
                    footer: '<p>actualice otro email</p>'
                })
            }
            else{
                enviar(datos);
            }
        }
    } 

    catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error servidor',
            footer: '<p>paso alg con el servidor verifica que tenga una conexion</p>'
        })
    }
}

async function enviar(actualizar){
    try {
        response = await fetch("http://"+url+"/api/user/update",{
            method : 'PUT',
            headers:{
                'content-Type': 'application/json'
            },
            body: actualizar
        })
    localStorage.getItem("idupdate",null);
    localStorage.getItem("antiguo_email",null);

    Swal.fire({
        title: 'Actualizacion',
        text: "Los datos se han actualizado correctamente",
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'aceptar'
        }).then((result) => {
        if (result.isConfirmed) {
            document.location = "miembros.html"
        }
        });
    } catch (error) {
        alert("error de conexion servidor :C")
    }
}

function validarP(producto){
    if(producto.referencia != "" && producto.marca != "" && producto.categoria != "" && producto.objetivo != "" && producto.precio != "" && producto.cantidad != "" && producto.descripcion !="" ){
        validarExistencia(producto);
    }

    else{
        alert("Hay algun campo vacio. Rellene todos los campos");
    }
}

async function validarExistencia(producto){
    try {
        response = await fetch("http://" + url +"/api/supplements/productExists/"+producto.referencia);
        responseJSOM = await response.json();
        if(responseJSOM){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El producto ya existe registre otro',
                footer: '<p>cambia el nombre del producto</p>'
            })
        }
        else{
            enviarProducto(producto);
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ocurrio un error al obtener los datos',
            footer: '<p>hubo un error en el servidor (' +error+ ')</p>'
        })
    }
}