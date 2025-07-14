function mostrarInfo(elemento) {
  const nombre = elemento.getAttribute('data-nombre');
  const descripcion = elemento.getAttribute('data-descripcion');
  const estado = elemento.getAttribute('data-estado');

  const divDescripcion = document.getElementById("descripcion");
  divDescripcion.innerHTML = `
    <h2>${nombre}</h2>
    <p>${descripcion}</p>
    <p><strong>Estado:</strong> ${estado.toUpperCase()}</p>
  `;
}
