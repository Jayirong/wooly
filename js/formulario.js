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

    console.log('sas');

    if(campos.nombre && campos.apellido && campos.correo && campos.contrasenna){
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
    } else {
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo')
    }

});