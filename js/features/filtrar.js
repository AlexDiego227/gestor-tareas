import { setFiltro } from "../store.js";

export function activarFiltro(render) {
  // TODO feature/filtrar-tareas
  // 1. Escuchar el evento change del select #filter.
  // 2. Guardar su valor con setFiltro(...).
  // 3. Llamar a render().
  document.getElementById('filter').addEventListener('change', () => {
    setFiltro(document.getElementById('filter').value);
    render();
  });
}
