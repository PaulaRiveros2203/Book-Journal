//funcionamiento api y local 
const API_URL_LOGIN = 'http://api.com/login';
const STORAGE_KEY = 'usuarioLogueado';

//navegar dentro de la pagina
function irARegistro() { 
    window.location.href = "registro.html"; 
}
function irHome() { 
    window.location.href = "lectura_actual.html"; 
}

//logica inicio sesion, captura de datos
async function login() {
    const usuarioIngresado = document.getElementById('user').value;
    const passIngresada = document.getElementById('pass').value;

    //validación básica de campos vacíos
    if (usuarioIngresado === "" || passIngresada === "") {
        alert("Por favor, completa todos los campos.");
        return;
    }

    const loginData = {
        username: usuarioIngresado,
        password: passIngresada
    };

    try {
        console.log("Intentando conexión con la API...");
        
        //login con api
        const respuesta = await fetch(API_URL_LOGIN, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(loginData)
        });

        if (respuesta.ok) {
            const data = await respuesta.json();
            
            //si la sesion se inicia correctamente con api 
            if (data.user) {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(data.user));
            }
            console.log("Login por API exitoso");
            irHome();
            return; 
        } else {
            alert("Credenciales incorrectas, intentelo nuevamente.");
            return;
        }

    } catch (error) {
        //login sin api
        console.warn("API no detectada. Iniciando validación local...");
        
        const datosGuardados = localStorage.getItem(STORAGE_KEY);

        if (datosGuardados) {
            const usuarioLocal = JSON.parse(datosGuardados);

            //validacion del correo guardado en el registro local
            if (usuarioIngresado === usuarioLocal.email || usuarioIngresado === usuarioLocal.username || usuarioIngresado === usuarioLocal.nombre) {
                console.log("Login local exitoso para:", usuarioLocal.nombre || usuarioLocal.username);
                alert(`Modo Local: ¡Bienvenido de nuevo, ${usuarioLocal.nombre || 'Usuario'}!`);
                irHome();
            } else {
                alert("El usuario ingresado no coincide con los registros de este navegador.");
            }
        } else {
            alert("No hay conexión con el servidor y tampoco se encontró una cuenta registrada localmente.");
        }
    }
}