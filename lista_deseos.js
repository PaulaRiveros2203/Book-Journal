//configuracion api o local 
const API_URL = 'http://api.com/libros-deseados'; 
const LOCAL_STORAGE_KEY = 'mis_libros_deseados';

//navegacion en la pagina
function irlectura_actual() { window.location.href = "lectura_actual.html"; }
function irlibros_leidos() { window.location.href = "libros_leidos.html"; }
function irlista_deseos() { window.location.href = "lista_deseos.html"; }
function irperfil() { window.location.href = "perfil.html"; }
function irlogin() { window.location.href = "login.html"; }

//inicio en la pagina
document.addEventListener('DOMContentLoaded', function() {
    cargarDeseos();
});

//cargar datos desde la api
async function cargarDeseos() {
    const contenedor = document.getElementById('lista-deseos-container');
    contenedor.innerHTML = '';

    let listaLibros = [];

    try {
        const respuesta = await fetch(API_URL);
        if (respuesta.ok) {
            listaLibros = await respuesta.json();
            console.log("Datos cargados desde la API");
        } else {
            throw new Error();
        }
    } catch (error) {
        console.warn("API no disponible, cargando desde LocalStorage...");
        const datosRaw = localStorage.getItem(LOCAL_STORAGE_KEY);
        listaLibros = datosRaw ? JSON.parse(datosRaw) : [];
    }

    //logica de lista vacia antes de introducir libros
    if (listaLibros.length === 0) {
        contenedor.innerHTML = '<p style="text-align:center; font-family:\'Dancing Script\', cursive; font-size: 1.5rem; color: #555;">Aún no tienes libros en tu lista de deseos.</p>';
        return;
    }

    listaLibros.forEach(libro => renderizarTarjeta(libro));
}

//tarjeta para cada libro
function renderizarTarjeta(libro) {
    const contenedor = document.getElementById('lista-deseos-container');
    const tarjeta = document.createElement('div');
    tarjeta.className = 'libro-card';
    tarjeta.style.cssText = `
        display: flex; 
        justify-content: space-between; 
        align-items: center; 
        padding: 15px; 
        margin-bottom: 10px; 
        background-color: #fff; 
        border-radius: 8px; 
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    `;

    tarjeta.innerHTML = `
        <div>
            <h2 class="libro-titulo" style="margin:0;">${libro.titulo}</h2>
            <small style="color: #888;">Agregado recientemente</small>
        </div>
        <div class="checkbox-container">
            <input type="checkbox" 
                   style="width: 25px; height: 25px; cursor: pointer;" 
                   onclick="eliminarDeseo(${libro.id}, this.closest('.libro-card'))">
        </div>
    `;
    contenedor.appendChild(tarjeta);
}

//inicio guardar localmente o con api
async function addWish() {
    const input = document.getElementById('w-input');
    const titulo = input.value.trim();

    if (titulo === "") return;

    const nuevoLibro = {
        id: Date.now(),
        titulo: titulo
    };

    //guardar localmente
    const datosRaw = localStorage.getItem(LOCAL_STORAGE_KEY);
    const listaLocal = datosRaw ? JSON.parse(datosRaw) : [];
    listaLocal.push(nuevoLibro);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(listaLocal));

    //guardar en la api
    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevoLibro)
        });
    } catch (e) {
        console.warn("No se pudo sincronizar con el servidor, guardado solo localmente.");
    }

    // actualizar la interfaz
    renderizarTarjeta(nuevoLibro);
    input.value = "";
    
    //al guardar el primer libro quita el mensaje previo
    if (listaLocal.length === 1) cargarDeseos();
}

//borrar en la memoria local y en la api
async function eliminarDeseo(id, elementoHtml) {
    if (!confirm("¿Ya conseguiste este libro? Se eliminará de tu lista de deseos.")) {
        if (event && event.target) event.target.checked = false;
        return;
    }

    const datosRaw = localStorage.getItem(LOCAL_STORAGE_KEY);
    let listaLocal = datosRaw ? JSON.parse(datosRaw) : [];
    listaLocal = listaLocal.filter(libro => libro.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(listaLocal));

    try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    } catch (e) {
        console.warn("No se pudo eliminar del servidor.");
    }

    //borrar de pantalla
    elementoHtml.remove();
    if (listaLocal.length === 0) cargarDeseos();
}