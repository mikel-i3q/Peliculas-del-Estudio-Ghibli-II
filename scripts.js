const contenedor = document.getElementById("contenedor");
const buscador = document.getElementById("buscador");

// variable global para almacerar todo y no hacer peticiones a la API
let listaPeliculas = [];

// para que las películas se carguen al abrir la página sin necesidad del buscador
document.addEventListener("DOMContentLoaded", () => {
    cargarPeliculasAPI();
});

// evento para filtrar las películas cuando escribimos en el input
buscador.addEventListener("input", (evento) => {
    const textoBusqueda = evento.target.value.toLowerCase();
    
    // filtrar los resultados usando el filtro
    const resultadosFiltrados = listaPeliculas.filter(pelicula => {
        return pelicula.title.toLowerCase().includes(textoBusqueda);
    });

    // mostrar los resultados
    mostrarPeliculas(resultadosFiltrados);
});

// función para obtener los datos de la API
async function cargarPeliculasAPI() {
    try {
        const respuesta = await fetch("https://ghibliapi.vercel.app/films");
        
        // conversión y uso del JSON
        const datos = await respuesta.json();
        
        // guardamos los datos para luego buscarlos
        listaPeliculas = datos;
        
        // al principio mostramos todas las películas
        mostrarPeliculas(listaPeliculas);

    } catch (error) {
        console.error("Error al conectar con la API:", error);
        contenedor.innerHTML = `<p>Error al cargar las películas. Revisa tu conexión.</p>`;
    }
}

// función encargada de pintar el HTML
function mostrarPeliculas(peliculasAMostrar) {
    // vaciar el contenedor al principio
    contenedor.innerHTML = "";

    // si la búsqueda no encuentra nada, mostramos un aviso
    if (peliculasAMostrar.length === 0) {
        contenedor.innerHTML = `<p>No se ha encontrado ninguna película con ese título.</p>`;
        return;
    }

    // recorrido de datos y creación dinámica del HTML
    peliculasAMostrar.forEach(pelicula => {
        const divCard = document.createElement("div");
        divCard.classList.add("card");

        // usamos las propiedades exactas de la API
        divCard.innerHTML = `
            <img src="${pelicula.image}" alt="${pelicula.title}">
            <h3>${pelicula.title}</h3>
            <p><strong>Director:</strong> ${pelicula.director}</p>
            <p><strong>Año:</strong> ${pelicula.release_date}</p>
            <p class="puntuacion"> ${pelicula.rt_score} / 100</p>
        `;

        contenedor.appendChild(divCard);
    });
}