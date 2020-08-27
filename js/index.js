

function redireccionar() {
    // Variables que obtienen lo guardado en lo localStorage
    var correo = localStorage.getItem("Dirección correo electronico");
    var contraseña = localStorage.getItem("Contraseña");
    // Si no hay datos guardados en las variables redirecciona a login
    if (correo == null && contraseña == null) {
        window.location.replace("login.html");
    }
}
redireccionar();


