//configuracion con la api y localemtne
const API_URL = 'http://api.com/librosleidos'; 
const STORAGE_KEY = 'historial_libros';

//navegacion en la pagina
function irlectura_actual() { window.location.href = "lectura_actual.html"; }
function irlibros_leidos() { window.location.href = "libros_leidos.html"; }
function irlista_deseos() { window.location.href = "lista_deseos.html"; }
function irperfil() { window.location.href = "perfil.html"; }
function irlogin() { window.location.href = "login.html"; }

//inicio en la pagina
document.addEventListener('DOMContentLoaded', async function() {
    await cargarHistorial();
});

//cargar datos localmente o en la api
async function cargarHistorial() {
    const contenedor = document.getElementById('historial-libros');
    contenedor.innerHTML = ""; // Limpiar

    let librosMostrar = [];

    //traer los datos guardados desde la api o localmente
    try {
        const respuesta = await fetch(API_URL);
        if (respuesta.ok) {
            librosMostrar = await respuesta.json();
        }
    } catch (error) {
        console.log("Cargando desde memoria local...");
        //si no hay api o falla se cargan los datos guardados localmente
        const datosRaw = localStorage.getItem(STORAGE_KEY);
        librosMostrar = datosRaw ? JSON.parse(datosRaw) : [];
    }

    //lista vacia
    if (librosMostrar.length === 0) {
        contenedor.innerHTML = `
            <div class="mensaje-vacio" style="text-align: center; padding: 50px; color: #8d6e63; animation: fadeIn 0.5s ease;">
                <p style="font-family: 'Patrick Hand', cursive; font-size: 1.8rem; margin-bottom: 10px;">
                     Tu historial local está vacío.
                </p>
                <p style="font-size: 1.1rem; font-style: italic;">
                    Guarda tus libros en "Lectura Actual" para que aparezcan en este diario.
                </p>
            </div>`;
        return;
    }

    librosMostrar.forEach(libro => renderizarTarjeta(libro));
}

function renderizarTarjeta(libro) {
    const contenedor = document.getElementById('historial-libros');
    const tarjeta = document.createElement('div');
    tarjeta.className = 'libro-card';
    tarjeta.id = `libro-${libro.id}`;

    //funcionamiento de las estrellas para mostrar la calificacion del libro
    let estrellasHTML = '';
    const calif = parseInt(libro.calificacion) || 0;
    for (let i = 1; i <= 5; i++) {
        estrellasHTML += `
            <span style="color: ${i <= calif ? '#ffd700' : '#ccc'}; font-size: 1.2rem; margin-right: 2px;">
                ★
            </span>`;
    }

    tarjeta.innerHTML = `
        <div class="tarjeta-header" style="display: flex; justify-content: space-between; align-items: start; border-bottom: 1px dashed #ccc; margin-bottom: 10px; padding-bottom: 5px;">
            <h2 style="margin:0; font-family: 'Dancing Script', cursive; color: #5d4037; font-size: 1.8rem;">${libro.titulo}</h2>
            <button onclick="eliminarLibro(${libro.id})" style="background:none; border:none; cursor:pointer; color:#e57373; font-size: 1.2rem;">🗑️</button>
        </div>
        <p><strong>Autor:</strong> ${libro.autor || 'Desconocido'}</p>
        <p><strong>Género:</strong> ${libro.genero || 'N/A'}</p>
        <p style="font-size: 0.85rem; color: #666;"> ${libro.inicio} al ${libro.final}</p>
        <p style="font-style: italic; background: #fffaf0; padding: 10px; border-radius: 8px; border-left: 4px solid #d7ccc8;">
            "${libro.resena || 'Sin reseña.'}"
        </p>
        <div style="margin-top: 10px;">
            <div class="stars-display">${estrellasHTML}</div>
        </div>
    `;
    contenedor.appendChild(tarjeta);
}

//eliminar localmente o en la api
async function eliminarLibro(id) {
    if (!confirm("¿Eliminar este recuerdo de tu historial?")) return;

    //eliminar en la api
    try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    } catch (e) { console.warn("No se pudo eliminar de la base de datos remota."); }

    //eliminar localmente
    let historial = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    historial = historial.filter(l => l.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(historial));

    //refrescar pagina
    const elemento = document.getElementById(`libro-${id}`);
    if (elemento) {
        elemento.style.opacity = '0';
        setTimeout(() => cargarHistorial(), 300);
    }
}