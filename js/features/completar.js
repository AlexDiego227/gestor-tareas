import { toggleTarea } from "../store.js";

export function activarCompletar(render) {
  // 1. Escuchar clics en #task-list usando delegación de eventos.
const taskList = document.querySelector("#task-list");
  if (!taskList) return;

  taskList.addEventListener("click", (event) => {
    // 2. Comprobar que el botón tenga data-action="complete".
    const button = event.target.closest('[data-action="complete"]');
    if (!button) return;

    // 3. Obtener el id numérico del <li data-id="...">.
    const li = button.closest("li[data-id]");
    if (!li) return;

    const id = Number(li.dataset.id);

    // 4. Llamar a toggleTarea(id) y después a render().
    toggleTarea(id);
    render();
  });
}
