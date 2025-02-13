// Función para incluir el contenido de archivos HTML de forma dinámica
function includeHTML() {
  const elements = document.querySelectorAll('[data-include-html]');
  
  elements.forEach(elmnt => {
    const file = elmnt.getAttribute("data-include-html");
    if (file) {
      fetch(file)
        .then(response => {
          if (!response.ok) throw new Error('No se pudo cargar el archivo: ' + file);
          return response.text();
        })
        .then(data => {
          elmnt.innerHTML = data;
          elmnt.removeAttribute("data-include-html");
        })
        .catch(error => {
          console.error(error);
          elmnt.innerHTML = "Error al cargar el contenido.";
        });
    }
  });
}


// Esperamos a que el DOM se cargue completamente
document.addEventListener("DOMContentLoaded", includeHTML);
