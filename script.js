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

  // Estado inicial desde localStorage
  ramos.forEach(ramo => {
    const id = ramo.dataset.id;
    const estado = localStorage.getItem(id);
    if (estado === 'aprobado') {
      marcarAprobado(ramo);
    }
  });

  // Al hacer doble clic
  ramos.forEach(ramo => {
    ramo.addEventListener('dblclick', () => {
      const id = ramo.dataset.id;
      if (ramo.classList.contains('aprobado')) {
        ramo.classList.remove('aprobado');
        localStorage.setItem(id, 'pendiente');
      } else {
        marcarAprobado(ramo);
        localStorage.setItem(id, 'aprobado');
      }
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
      const requisitos = ramo.dataset.requisitos?.split(',') || [];
      const todosCumplidos = requisitos.every(id => {
        const prereq = document.querySelector(`.ramo[data-id="${id.trim()}"]`);
        return prereq?.classList.contains('aprobado');
      });

      if (todosCumplidos) {
        // Copiar color del primero de sus requisitos aprobados
        const primero = requisitos[0]?.trim();
        const prereq = document.querySelector(`.ramo[data-id="${primero}"]`);
        if (prereq) {
          const clases = Array.from(prereq.classList);
          const colorClase = clases.find(c => c.startsWith('rosado-'));
          if (colorClase) {
            ramo.classList.remove('rosado-5');
            ramo.classList.add(colorClase);
          }
        }
      }
    }
  });
}
