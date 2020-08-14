function redireccionar() {
    // Variables que obtienen lo guardado en lo sessionStorage
    var correo = sessionStorage.getItem("Dirección correo electronico");
    var contraseña = sessionStorage.getItem("Contraseña");
    var google = sessionStorage.getItem("Perfil");
    // Si no hay datos guardados en las variables redirecciona a login
    if (correo == null && contraseña == null && google == null) {
        window.location.replace("login.html");
    }
}
redireccionar();
