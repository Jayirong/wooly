// año automático 
window.addEventListener("load", () => {
    const currentDate = new Date();
    document.getElementById("currentYear").innerText = currentDate.getFullYear();
});


//verificacion de logueo
document.addEventListener('DOMContentLoaded', () => {
    const usuarioGuardado = JSON.parse(localStorage.getItem('usuarioLogueado'));
    if (usuarioGuardado) {
        // Cambiamos el contenido del menú en el encabezado para mostrar "Usuario" en lugar de "Iniciar Sesión"
        const enlaceInicioSesion = document.querySelector('a[href="login.html"]');
        if (enlaceInicioSesion) {
            if (usuarioGuardado.rol === 'administrador') {
                enlaceInicioSesion.textContent = 'Admin';
                enlaceInicioSesion.href = 'useradmin.html'; // Redirige al panel de administrador
            } else if (usuarioGuardado.rol === 'cliente') {
                enlaceInicioSesion.textContent = 'Usuario';
                enlaceInicioSesion.href = 'usercliente.html'; // Redirige al panel de cliente
            }
        }
    }
});
