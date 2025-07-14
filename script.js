document.addEventListener("DOMContentLoaded", function () {
  const ramos = document.querySelectorAll(".ramo");
  const descripcion = document.getElementById("descripcion");

  ramos.forEach((ramo) => {
    // Mostrar requisitos en el panel al hacer click
    ramo.addEventListener("click", function () {
      const nombre = this.dataset.nombre;
      const desc = this.dataset.descripcion || "";
      const requisitos = this.dataset.requisitos || "Sin requisitos.";

      descripcion.innerHTML = `
        <strong>${nombre}</strong><br />
        ${desc}<br /><br />
        <em><strong>Requisitos:</strong> ${requisitos}</em>
      `;
    });

    // Doble click para marcar como aprobado
    ramo.addEventListener("dblclick", function () {
      if (this.classList.contains("aprobado")) {
        this.classList.remove("aprobado");
      } else {
        this.classList.add("aprobado");
      }

      actualizarDisponibilidad();
    });
  });

  function actualizarDisponibilidad() {
    const ramos = document.querySelectorAll(".ramo");
    const aprobados = Array.from(ramos)
      .filter((r) => r.classList.contains("aprobado"))
      .map((r) => r.dataset.id);

    ramos.forEach((ramo) => {
      const requisitos = ramo.dataset.requisitos;
      if (!requisitos || requisitos === "Sin requisito") {
        ramo.classList.remove("no-disponible");
        ramo.classList.add("disponible");
        return;
      }

      const requisitosArray = requisitos.split(",").map((r) => r.trim());
      const cumple = requisitosArray.every((req) => aprobados.includes(req));

      if (cumple) {
        ramo.classList.remove("no-disponible");
        ramo.classList.add("disponible");
      } else {
        ramo.classList.remove("disponible");
        ramo.classList.add("no-disponible");
      }
    });
  }
});
