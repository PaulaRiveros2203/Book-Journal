//Configuracion api
const API_URL_PERFIL = 'http://api.com/usuario/perfil';
const STORAGE_KEY = 'usuarioLogueado';

//navegacion en la pagina
function irlectura_actual() { window.location.href = "lectura_actual.html"; }
function irlibros_leidos() { window.location.href = "libros_leidos.html"; }
function irlista_deseos() { window.location.href = "lista_deseos.html"; }
function irperfil() { window.location.href = "perfil.html"; }
function irlogin() { window.location.href = "login.html"; }

//datos capturados del registro
document.addEventListener('DOMContentLoaded', async () => {
    const contenedor = document.getElementById('datos-perfil');
    if (!contenedor) return;

    //se intenta obtener datos actualizados de la api
    try {
        console.log("Sincronizando perfil con el servidor...");
        const respuesta = await fetch(API_URL_PERFIL);
        
        if (respuesta.ok) {
            const usuarioAPI = await respuesta.json();
            //actualizacion del almacenamiento local con lo más reciente del servidor
            localStorage.setItem(STORAGE_KEY, JSON.stringify(usuarioAPI));
            renderizarPerfil(usuarioAPI);
            return;
        }
    } catch (error) {
        console.warn("Modo local: No se pudo conectar con la API de perfil.");
    }

    // si la api falla se utiliza el almacenamiento local
    const datosGuardados = localStorage.getItem(STORAGE_KEY);
    if (datosGuardados) {
        const usuario = JSON.parse(datosGuardados);
        renderizarPerfil(usuario);
    } else {
        console.log("No se encontraron datos de usuario en ningún sitio.");
    }
});

//mostrar datos en el perfil
function renderizarPerfil(usuario) {
    const contenedor = document.getElementById('datos-perfil');

    const nombreH2 = contenedor.querySelector('.nombrecompleto');
    if (nombreH2) nombreH2.textContent = `Nombre completo: ${usuario.nombre || 'No definido'}`;

    const correoP = contenedor.querySelector('.correo');
    if (correoP) correoP.innerHTML = `<strong>Correo:</strong> ${usuario.email || 'No definido'}`;

    const fechaSpan = contenedor.querySelector('.fechaNacimiento');
    if (fechaSpan) fechaSpan.innerHTML = `<strong>Fecha de nacimiento:</strong> ${usuario.nacimiento || 'No definida'}`;

    const promedioP = contenedor.querySelector('.promedioLectura');
    if (promedioP) promedioP.innerHTML = `<strong>Promedio de lectura:</strong> ${usuario.promedio || '0'} min`;

    const generoP = contenedor.querySelector('.generoFavorito');
    if (generoP) generoP.innerHTML = `<strong>Género favorito:</strong> ${usuario.genero || 'No definido'}`;
}

//cerrar sesion.
function cerrarSesion() {
    if(confirm("¿Estás seguro de que quieres salir?")) {
        localStorage.removeItem(STORAGE_KEY);
        irlogin();
    }
}