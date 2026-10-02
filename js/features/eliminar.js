import { deleteTarea } from "../store.js";

export function activarEliminar(render) {
  const lista = document.querySelector("#task-list");

  lista.addEventListener("click", event => {
    if (!(event.target instanceof Element)) return;

    const boton = event.target.closest('button[data-action="delete"]');
    if (!boton || !lista.contains(boton)) return;

    const tarea = boton.closest("li[data-id]");
    const id = Number(tarea?.dataset.id);
    if (!Number.isInteger(id)) return;

    deleteTarea(id);
    render();
  });
}
