//configuracion api o local 
const API_URL = 'http://api.com/libros'; 
const STORAGE_KEY = 'historial_libros';

//navegacion en la pagina
function irlectura_actual() { window.location.href = "lectura_actual.html"; }
function irlibros_leidos() { window.location.href = "libros_leidos.html"; }
function irlista_deseos() { window.location.href = "lista_deseos.html"; }
function irperfil() { window.location.href = "perfil.html"; }
function irlogin() { window.location.href = "login.html"; }

//funcionamiento logico de las estrellas para la calificacion del libro
document.addEventListener('DOMContentLoaded', function() {
    const stars = document.querySelectorAll('.star');
    const inputCalificacion = document.getElementById('calificacion');

    stars.forEach(star => {
        star.addEventListener('click', function() {
            const valor = this.getAttribute('data-value');
            if (inputCalificacion) inputCalificacion.value = valor; 
            actualizarEstrellas(valor);
        });
    });

    function actualizarEstrellas(valor) {
        stars.forEach(star => {
            const starValue = parseInt(star.getAttribute('data-value'));
            star.classList.toggle('active', starValue <= valor);
        });
    }
});

//guardado principalmente
async function Guardar_libro() {
    //captura de datos
    const nuevoLibro = {
        id: Date.now(),
        titulo: document.getElementById('titulo').value,
        autor: document.getElementById('autor').value,
        genero: document.getElementById('genero').value,
        resena: document.getElementById('reseña').value,
        inicio: document.getElementById('inicio').value,
        final: document.getElementById('final').value,
        calificacion: document.getElementById('calificacion').value || "0"
    };

    if (nuevoLibro.titulo.trim() === "") {
        alert("Por favor, ingresa al menos el título del libro.");
        return;
    }

    //guardar los datos localmente
    try {
        const datosRaw = localStorage.getItem(STORAGE_KEY);
        const historial = datosRaw ? JSON.parse(datosRaw) : [];
        historial.push(nuevoLibro);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(historial));
        console.log("Guardado en LocalStorage");
    } catch (e) {
        console.error("Error en LocalStorage", e);
    }

    //guardar datos en la api
    try {
        const respuesta = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevoLibro)
        });

        if (respuesta.ok) {
            alert("¡Libro sincronizado con la base de datos con éxito!");
        }
    } catch (error) {
        console.warn("API no disponible todavía. El libro se mantendrá solo en el historial local.");
    }

    //terminar registro de lectura actual
    window.location.href = "libros_leidos.html";
}