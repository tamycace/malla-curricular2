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

  // Restaurar estados guardados
  ramos.forEach(ramo => {
    const id = ramo.dataset.id;
    if (localStorage.getItem(id) === 'aprobado') {
      ramo.classList.add('aprobado');
    }
  });

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

    const requisitos = (ramo.dataset.requisitos || "").split(",").map(r => r.trim()).filter(Boolean);
    const disponibles = requisitos.length === 0 || requisitos.every(id => {
      const req = document.querySelector(`.ramo[data-id="${id}"]`);
      return req && req.classList.contains('aprobado');
    });

    ramo.classList.remove('disponible', 'no-disponible');

    if (disponibles) {
      ramo.classList.add('disponible');
    } else {
      ramo.classList.add('no-disponible');
    }
  });
}
