// Lista de servicios simulados
const servicios = [
    "Diseño de logos",
    "Desarrollo web",
    "Marketing digital",
    "Fotografía profesional",
    "Redacción de contenido",
    "Edición de videos",
    "Programación en Python",
    "Consultoría financiera"
];

// Función para filtrar y mostrar resultados
function buscarServicios() {
    let input = document.getElementById("buscador").value.toLowerCase();
    let listaResultados = document.getElementById("resultados");

    // Limpiar resultados anteriores
    listaResultados.innerHTML = "";

    // Filtrar servicios
    let resultados = servicios.filter(servicio => servicio.toLowerCase().includes(input));

    // Mostrar resultados
    if (resultados.length > 0) {
        resultados.forEach(servicio => {
            let li = document.createElement("li");
            li.textContent = servicio;
            listaResultados.appendChild(li);
        });
    } else {
        listaResultados.innerHTML = "<li>No se encontraron resultados</li>";
    }
}

// Evento para ejecutar la búsqueda al escribir
document.getElementById("buscador").addEventListener("input", buscarServicios);
