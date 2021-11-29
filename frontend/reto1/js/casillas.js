
function casillas(){
    if(document.querySelector("#email").value == ""){
        alert("Email vacio, debe llenarlo")
        return false;
    }else if(document.querySelector("#pwd").value == ""){
        alert("password vacio, debe llenarlo")
        return false;
    }else{
        return true;
    }
}