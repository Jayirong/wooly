// año automático 
window.addEventListener("load", () => {
    const currentDate = new Date();
    document.getElementById("currentYear").innerText = currentDate.getFullYear();
});

// Arreglo global
// var arregloDatos = Array();

// function guardar() {
//     let nombre = document.getElementById("NombreUser").value;
//     let apellido = document.getElementById("ApellidoUser").value;
// }