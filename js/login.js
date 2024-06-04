const formularioLogin = document.querySelector('.formulario__login');
const emailInput = document.getElementById('Email');
const contrasenaInput = document.getElementById('contrasena');

const expresiones = {
    Email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-z-A-Z0-9-.]+$/
};

const camposLogin = {
    email: false,
    contrasena: false
};

const validarCampoLogin = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        camposLogin[campo] = true;
    } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
        camposLogin[campo] = false;
    }
};

emailInput.addEventListener('keyup', (e) => {
    validarCampoLogin(expresiones.Email, e.target, 'email');
});

formularioLogin.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = emailInput.value;

    // Obtener usuarios del localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const usuario = usuarios.find((u) => u.correo === email);

    if (usuario) {
        console.log('Inicio de sesión exitoso');
        localStorage.setItem('usuarioLogueado', JSON.stringify(usuario));
        window.location.href = 'index.html';
    } else {
        mostrarError('Credenciales incorrectas');
        limpiarFormulario();
    }
});

//funcion para mostrar un error de ingreso de datos en pantalla
function mostrarError(mensaje) {
    const errorDiv = document.createElement('div');
    errorDiv.classList.add('alert', 'alert-danger');
    errorDiv.textContent = mensaje;

    const formulario = document.querySelector('.formulario__login');
    formulario.appendChild(errorDiv);

    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}

function limpiarFormulario() {
    emailInput.value = '';
    emailInput.classList.remove('is-valid');
    emailInput.classList.remove('is-invalid');
    contrasenaInput.value = '';
    contrasenaInput.classList.remove('is-valid');
    contrasenaInput.classList.remove('is-invalid');
}
