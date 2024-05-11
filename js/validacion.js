document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("formulario");
    const inputs = document.querySelectorAll("#formulario input");

    const expresiones = {
      nombre: /^[a-zA-ZÀ-ÿ\s]{1,15}$/, // Letras y espacios, pueden llevar acentos.
      apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
      correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      telefono: /^\d{6,9}$/ , // 6 a 9 numeros.
      plazo: /^\d+$/
    };

    const campos = {
      nombre: false,
      apellido: false,
      correo: false,
      telefono: false,
      plazo: false,
      condicion: false
    };

    const validarFormulario = (e) => {
      switch (e.target.name) {
        case "nombre":
          validarCampo(expresiones.nombre, e.target, "nombre");
          break;
        case "apellido":
          validarCampo(expresiones.apellido, e.target, "apellido");
          break;
        case "correo":
          validarCampo(expresiones.correo, e.target, "correo");
          break;
        case "telefono":
          validarCampo(expresiones.telefono, e.target, "telefono");
          break;
        case "plazo":
          validarCampo(expresiones.plazo, e.target, "plazo");
          break;
        case "condicion":
            validarCondicion(e.target);
            break;
      }
    };

    const validarCondicion = (checkbox) => {
      if (checkbox.checked) {
          document
              .getElementById(`grupo__condicion`)
              .classList.remove("formulario__grupo-incorrecto");
          document
              .getElementById(`grupo__condicion`)
              .classList.add("formulario__grupo-correcto");
          campos["condicion"] = true;
      } else {
          document
              .getElementById(`grupo__condicion`)
              .classList.add("formulario__grupo-incorrecto");
          document
              .getElementById(`grupo__condicion`)
              .classList.remove("formulario__grupo-correcto");
          campos["condicion"] = false;
      }
  };

    const validarCampo = (expresion, input, campo) => {
      if (expresion.test(input.value)) {
        document
          .getElementById(`grupo__${campo}`)
          .classList.remove("formulario__grupo-incorrecto");
        document
          .getElementById(`grupo__${campo}`)
          .classList.add("formulario__grupo-correcto");
        document
          .querySelector(`#grupo__${campo} i`)
          .classList.add("fa-check-circle");
        document
          .querySelector(`#grupo__${campo} i`)
          .classList.remove("fa-times-circle");
        document
          .querySelector(`#grupo__${campo} .formulario__input-error`)
          .classList.remove("formulario__input-error-activo");
        campos[campo] = true;
      } else {
        document
          .getElementById(`grupo__${campo}`)
          .classList.add("formulario__grupo-incorrecto");
        document
          .getElementById(`grupo__${campo}`)
          .classList.remove("formulario__grupo-correcto");
        document
          .querySelector(`#grupo__${campo} i`)
          .classList.add("fa-times-circle");
        document
          .querySelector(`#grupo__${campo} i`)
          .classList.remove("fa-check-circle");
        document
          .querySelector(`#grupo__${campo} .formulario__input-error`)
          .classList.add("formulario__input-error-activo");
        campos[campo] = false;
      }
    };

    inputs.forEach((input) => {
      input.addEventListener("keyup", validarFormulario);
      input.addEventListener("blur", validarFormulario);
    });

    formulario.addEventListener("submit", (e) => {
      e.preventDefault();

      if (
        campos.nombre &&
        campos.apellido &&
        campos.correo &&
        campos.telefono &&
        campos.condicion
      ) {
        formulario.reset();

        document
          .getElementById("formulario__mensaje-exito")
          .classList.add("formulario__mensaje-exito-activo");
        setTimeout(() => {
          document
            .getElementById("formulario__mensaje-exito")
            .classList.remove("formulario__mensaje-exito-activo");
        }, 5000);

        document
          .querySelectorAll(".formulario__grupo-correcto")
          .forEach((icono) => {
            icono.classList.remove("formulario__grupo-correcto");
          });
      } else {
        document
          .getElementById("formulario__mensaje")
          .classList.add("formulario__mensaje-activo");
        setTimeout(() => {
          document
            .getElementById("formulario__mensaje")
            .classList.remove("formulario__mensaje-activo");
        }, 5000);
      }
    });
  });