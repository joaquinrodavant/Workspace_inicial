//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

});

//funcion que se ejecuta luego de luego de clickear el boton Ingrear
document.getElementById("submit").addEventListener("click", function () {

    // captura los datos de los input correo, contraseña
    var corr = document.getElementById("inputEmail").value;
    var contra = document.getElementById("inputPassword").value;

    // guarda los datos en session storage
    sessionStorage.setItem("Dirección correo electronico", corr);
    sessionStorage.setItem("Contraseña", contra);
});

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
}

onSignIn();