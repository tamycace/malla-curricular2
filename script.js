function mostrarInfo(elemento) {
  const nombre = elemento.getAttribute('data-nombre');
  const descripcion = elemento.getAttribute('data-descripcion');
  const divDescripcion = document.getElementById("descripcion");
  divDescripcion.innerHTML = `<h2>${nombre}</h2><p>${descripcion}</p><p><em>Doble clic para marcar como aprobado.</em></p>`;
}

document.addEventListener('DOMContentLoaded', () => {
  const ramos = document.querySelectorAll('.ramo');

  // Aplicar estado guardado
  ramos.forEach(ramo => {
    const id = ramo.dataset.id;
    if (localStorage.getItem(id) === 'aprobado') {
      marcarAprobado(ramo);
    }
  });

  // Al hacer doble clic
  ramos.forEach(ramo => {
    ramo.addEventListener('dblclick', () => {
      const id = ramo.dataset.id;
      const aprobado = ramo.classList.contains('aprobado');
      ramo.classList.toggle('aprobado');
      localStorage.setItem(id, aprobado ? 'pendiente' : 'aprobado');
      actualizarColoresDependientes();
    });
  });

  actualizarColoresDependientes();
});

function marcarAprobado(ramo) {
  ramo.classList.add('aprobado');
}

function actualizarColoresDependientes() {
  const ramos = document.querySelectorAll('.ramo');

  ramos.forEach(ramo => {
    if (!ramo.classList.contains('aprobado')) {
      const requisitos = (ramo.dataset.requisitos || "").split(",").map(r => r.trim()).filter(Boolean);

      const todosAprobados = requisitos.every(id => {
        const req = document.querySelector(`.ramo[data-id="${id}"]`);
        return req && req.classList.contains('aprobado');
      });

      if (todosAprobados && requisitos.length > 0) {
        const primerReq = document.querySelector(`.ramo[data-id="${requisitos[0]}"]`);
        if (primerReq) {
          const claseColor = Array.from(primerReq.classList).find(c => c.startsWith('rosado-'));
          if (claseColor) {
            // Eliminar clases previas
            ramo.classList.forEach(c => {
              if (c.startsWith('rosado-')) ramo.classList.remove(c);
            });
            // Aplicar nueva
            ramo.classList.add(claseColor);
          }
        }
      }
    }
  });
}
