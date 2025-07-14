function mostrarInfo(elemento) {
  const nombre = elemento.getAttribute('data-nombre');
  const descripcion = elemento.getAttribute('data-descripcion');

  const divDescripcion = document.getElementById("descripcion");
  divDescripcion.innerHTML = `
    <h2>${nombre}</h2>
    <p>${descripcion}</p>
    <p><strong>Haz clic nuevamente para marcar como aprobado o pendiente.</strong></p>
  `;
}

// NUEVO: guardar estado en localStorage al hacer clic
document.addEventListener('DOMContentLoaded', () => {
  const ramos = document.querySelectorAll('.ramo');

  ramos.forEach(ramo => {
    const id = ramo.textContent;

    // Cargar estado guardado
    if (localStorage.getItem(id) === 'aprobado') {
      ramo.classList.add('aprobado');
    }

    // Al hacer clic, alternar estado
    ramo.addEventListener('dblclick', () => {
      if (ramo.classList.contains('aprobado')) {
        ramo.classList.remove('aprobado');
        localStorage.setItem(id, 'pendiente');
      } else {
        ramo.classList.add('aprobado');
        localStorage.setItem(id, 'aprobado');
      }
    });
  });
});
