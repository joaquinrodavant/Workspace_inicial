// funcion que obtiene los datos de los input y los muestra en la lista con los datos personales
function datos() {
    let name = document.getElementById("nombre");
    let lastName = document.getElementById("apellido");
    let age = document.getElementById("edad");
    let email = document.getElementById("email");
    let phone = document.getElementById("telefono");
    let img = document.getElementById("imagen");
    let imagen = document.getElementById("hijo");
    //objeto donde se guardan los datos
    let datos = {
    nombre: name.value,
    apellido: lastName.value,
    edad: age.value,
    Email: email.value,
    telefono: phone.value,
    imagen: img.value,
    }
    // se guarda el objeto en un json para poder guardarlo en Localstorage
    var myJson = JSON.stringify(datos);
    localStorage.setItem("datosPerfil", myJson);
    let localSave = JSON.parse(localStorage.getItem("datosPerfil"));
    
    nameHTML = document.getElementById("name");
    lastnameHTML = document.getElementById("lastname");
    ageHTML = document.getElementById("age");
    mailHTML = document.getElementById("mail");
    phoneHTML = document.getElementById("phone");
    photoHTML = document.getElementById("perfilFoto");
    
    nameHTML.innerHTML = localSave.nombre;
    lastnameHTML.innerHTML = localSave.apellido;
    ageHTML.innerHTML = localSave.edad + " años";
    mailHTML.innerHTML = localSave.Email;
    phoneHTML.innerHTML = localSave.telefono;
    imagen.srl = localSave.imagen;
}
document.getElementById("guardar").addEventListener("click", function (e) {
datos();
});


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    let localSave = JSON.parse(localStorage.getItem("datosPerfil"));
    
    document.getElementById("name").innerHTML = localSave.nombre;
    document.getElementById("lastname").innerHTML = localSave.apellido;
    document.getElementById("age").innerHTML = localSave.edad + " años";
    document.getElementById("mail").innerHTML = localSave.Email;
    document.getElementById("phone").innerHTML = localSave.telefono;
    document.getElementById("hijo").src = localSave.imagen;
});

