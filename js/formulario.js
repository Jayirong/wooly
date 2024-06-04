const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
    NombreUser: /^[a-zA-ZÀ-ÿ]{2,30}$/,
    ApellidoUser: /^[a-zA-ZÀ-ÿ\s]{2,30}$/,
    EmailUser:  /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-z-A-Z0-9-.]+$/,
    ContrasennaUser: /^.{4,15}$/
}


const campos = {
    nombre: false,
    apellido: false,
    correo: false,
    contrasenna: false
}


const validarFormulario = (e) => {
    switch (e.target.name){
        case "NombreUser":
            validarCampo(expresiones.NombreUser, e.target, 'nombre');
        break;
        case "ApellidoUser":
            validarCampo(expresiones.ApellidoUser, e.target, 'apellido');
        break;
        case "EmailUser":
            validarCampo(expresiones.EmailUser, e.target, 'correo');
        break;
        case "ContrasennaUser":
            validarCampo(expresiones.ContrasennaUser, e.target, 'contrasenna');
            validarContrasenna2();
        break;
        case "ContrasennaUser2":
            validarContrasenna2()
        break;
    }
}

const validarCampo = (expresion, input, campo) => {
    if(expresion.test(input.value)){
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-circle-xmark')
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-circle-check')
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo')
        campos[campo] = true;
    } else {
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-circle-xmark')
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-circle-check')
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo')
        campos[campo] = false;
    }
}

const validarContrasenna2 = () => {
    const inputContrasenna1 = document.getElementById('ContrasennaUser');
    const inputContrasenna2 = document.getElementById('ContrasennaUser2');

    if(inputContrasenna1.value !== inputContrasenna2.value){
        document.getElementById(`grupo__contrasenna2`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__contrasenna2`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__contrasenna2 i`).classList.add('fa-circle-xmark')
        document.querySelector(`#grupo__contrasenna2 i`).classList.remove('fa-circle-check')
        document.querySelector(`#grupo__contrasenna2 .formulario__input-error`).classList.add('formulario__input-error-activo')
        campos['contrasenna'] = false;
    } else {
        document.getElementById(`grupo__contrasenna2`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__contrasenna2`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__contrasenna2 i`).classList.remove('fa-circle-xmark')
        document.querySelector(`#grupo__contrasenna2 i`).classList.add('fa-circle-check')
        document.querySelector(`#grupo__contrasenna2 .formulario__input-error`).classList.remove('formulario__input-error-activo')
        campos['contrasenna'] = true;
    }
}



inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    if(campos.nombre && campos.apellido && campos.correo && campos.contrasenna){
        if (correoUnico()){
            guardar();
            formulario.reset();
            campos['nombre'] = false;
            campos['apellido'] = false;
            campos['correo'] = false;
            campos['contrasenna'] = false;        
            document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
            document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');        
            setTimeout(() => {
                document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
            }, 5000)

            document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
                icono.classList.remove('formulario__grupo-correcto');
            });

            // Mostrar alerta de éxito
            alert("Usuario creado correctamente.");

            //redireccionamos al login para que haga efectivo su ingreso
            window.location.href = "login.html";
        }
            
    } else {
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo')
    }

});



//aqui se crea el usuario en localstorage
function guardar() {
    let nombre = document.getElementById("NombreUser").value;
    let apellido = document.getElementById("ApellidoUser").value;
    let correo = document.getElementById("EmailUser").value;
    let contrasenna = document.getElementById("ContrasennaUser").value;

    let nuevoUsuario = {
        nombre: nombre,
        apellido: apellido,
        correo: correo,
        contrasenna: contrasenna,
        rol: "cliente"
    };

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

//verificar duplicidad de correo
function correoUnico() {
    let correo = document.getElementById("EmailUser").value;
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].correo === correo) {
            alert("El correo electrónico ya está registrado.");
            return false;
        }
    }
    return true;
}