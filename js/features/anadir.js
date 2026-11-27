import { addTarea } from "../store.js";

export function activarAnadir(render) {
  const form = document.getElementById("task-form");
  const input = document.getElementById("task-input");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const texto = input.value.trim();
    if (texto) {
      addTarea(texto);
      input.value = "";
      render();
    }
  });
  // TODO feature/anadir-tarea
  // 1. Escuchar el evento submit del formulario #task-form.
  // 2. Leer y limpiar (trim) el valor de #task-input.
  // 3. No permitir tareas vacías.
  // 4. Llamar a addTarea(texto).
  // 5. Vaciar el input y llamar a render().
}
