//funcionamiento api y local 
const API_URL_REGISTRO = 'http://tu-api.com/registro'; 
const STORAGE_KEY = 'usuarioLogueado';

//navegar dentro de la pagina
function irlogin() { 
    window.location.href = "login.html"; 
}
function irHome() { 
    window.location.href = "lectura_actual.html"; 
}

//logica registro, captura de datos en api y local
async function registrar() {
    // Captura de datos del formulario
    const datosUsuario = {
        nombre: document.getElementById('nombreCompleto').value,
        email: document.getElementById('correo').value,
        password: document.getElementById('passwordRegistro').value,
        confirmPassword: document.getElementById('passwordConfirmar').value,
        nacimiento: document.getElementById('fechaNacimiento').value,
        promedio: document.getElementById('promedioLectura').value,
        genero: document.getElementById('generoFavorito').value,
        fechaRegistro: new Date().toLocaleDateString() 
    };

    //validación 
    if (!datosUsuario.nombre || !datosUsuario.email) {
        alert("El nombre y el correo son obligatorios para el registro.");
        return;
    }

    //la contraseña debe coincidir
    if (datosUsuario.password !== datosUsuario.confirmPassword) {
        alert("Las contraseñas no coinciden. Por favor, verifica e intenta de nuevo.");
        return;
    }

    //guardar localmente sin api
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(datosUsuario));
        console.log("Datos guardados localmente con éxito.");
    } catch (error) {
        console.error("Error al guardar localmente:", error);
    }

    //enviar a la api si falla se queda en local
    try {
        console.log("Sincronizando registro con el servidor...");
        const respuesta = await fetch(API_URL_REGISTRO, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(datosUsuario)
        });

        if (respuesta.ok) {
            alert("¡Perfecto! Tu cuenta ha sido creada y sincronizada.");
            irHome();
            return; 
        } else {
            const errorData = await respuesta.json();
            console.warn("La API rechazó el registro:", errorData.message);
            //si la api falla pero los datos son correctos, contunuacomo local
        }

    } catch (error) {
        //si la api no esta disponible, se queda en local
        console.warn("API no disponible. Operando en modo local");
        alert("¡Registro exitoso!. Ya puedes iniciar tu book journal local.");
        irHome();
    }
}