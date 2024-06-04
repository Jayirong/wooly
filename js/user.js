document.addEventListener('DOMContentLoaded', () => {
    const usuarioGuardado = JSON.parse(localStorage.getItem('usuarioLogueado'));
    const contenedorUsuario = document.getElementById('datos-usuario');

    if (usuarioGuardado) {
        // Mostrar los datos del usuario
        contenedorUsuario.innerHTML = `
            <p>Nombre: ${usuarioGuardado.nombre}</p>
            <p>Correo electrónico: ${usuarioGuardado.correo}</p>
            <!-- Puedes mostrar más detalles del usuario si lo deseas -->
        `;

        // Agregar el controlador de eventos para el botón de logout
        const btnLogout = document.getElementById('btn-logout');
        btnLogout.addEventListener('click', () => {
            // Eliminar la información del usuario del localStorage
            localStorage.removeItem('usuarioLogueado');
            // Redirigir a la página de inicio de sesión
            window.location.href = 'index.html';
        });
    } else {
        // Si no hay usuario logueado, redirigir a la página de inicio de sesión
        window.location.href = 'index.html';
    }
});
