window.addEventListener('load',() =>{
    configurar();
})

function configurar(){
    boton = document.querySelector("#boton")
    boton.addEventListener('click',()=>{
        validar();
    });

    $("#mensaje-logging").hide();
    $("#email").val("");
    $("pswd").val("");  

    if (localStorage.getItem("name")) {
        document.location="bienvenido.html"
    }
}

function validar(){
    let user = {
        name: "Andres",
        email : document.querySelector("#email").value,
        password : document.querySelector("#pwd").value
    }

    if( casillas()){
        if(user.email =="caballo1902@gmail.com" && user.password == "123456") {
            localStorage.setItem("name",user.name)
            /*  var win = window.open(url, '_blank'); */
            document.location = 'bienvenido.html'
        }
        else{
            let mensaje = ` <div class="alert alert-danger" id="notify">
            <strong>Alert: </strong>usuario y/o contraseña incorrecto</div>`
            $("#mensaje-logging").html(mensaje);
            $("#mensaje-logging").show();            
        } 
    }
}



