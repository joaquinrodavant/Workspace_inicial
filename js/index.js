function redireccionar() {
    // Variables que obtienen lo guardado en lo sessionStorage
    var correo = sessionStorage.getItem("Dirección correo electronico");
    var contraseña = sessionStorage.getItem("Contraseña");
    // Si no hay datos guardados en las variables redirecciona a login
    if (correo == null && contraseña == null) {
        window.location.replace("login.html");
    }
}
redireccionar();
