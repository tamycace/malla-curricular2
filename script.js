function mostrarInfo(elemento) {
  const nombre = elemento.getAttribute('data-nombre');
  const descripcion = elemento.getAttribute('data-descripcion');
  const divDescripcion = document.getElementById("descripcion");
  divDescripcion.innerHTML = `
    <h2>${nombre}</h2>
    <p>${descripcion}</p>
    <p><em>Doble clic para marcar como aprobado.</em></p>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  const ramos = document.querySelectorAll('.ramo');

  // Restaurar estado aprobado desde almacenamiento local
  ramos.forEach(ramo => {
    const id = ramo.dataset.id;
    if (localStorage.getItem(id) === 'aprobado') {
      ramo.classList.add('aprobado');
    }
  });

  // Agregar eventos de doble clic
  ramos.forEach(ramo => {
    ramo.addEventListener('dblclick', () => {
      const id = ramo.dataset.id;
      const aprobado = ramo.classList.contains('aprobado');
      ramo.classList.toggle('aprobado');
      localStorage.setItem(id, aprobado ? 'pendiente' : 'aprobado');
      actualizarDisponibilidad();
    });
  });

  actualizarDisponibilidad();
});

function actualizarDisponibilidad() {
  const ramos = document.querySelectorAll('.ramo');

  ramos.forEach(ramo => {
    if (ramo.classList.contains('aprobado')) return;

    const requisitosTexto = ramo.getAttribute('data-requisitos');
    const requisitos = requisitosTexto ? requisitosTexto.split(',').map(r => r.trim()) : [];

    const disponibles = requisitos.length === 0 || requisitos.every(id => {
      const prereq = document.querySelector(`.ramo[data-id="${id}"]`);
      return prereq && prereq.classList.contains('aprobado');
    });

    ramo.classList.remove('disponible', 'no-disponible');
    ramo.classList.add(disponibles ? 'disponible' : 'no-disponible');
  });
}
