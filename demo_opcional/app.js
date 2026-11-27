const KEY = 'devops-demo-tareas';
let tareas = JSON.parse(localStorage.getItem(KEY) || '[]');
const lista = document.querySelector('#list');
const formulario = document.querySelector('#task-form');
function guardar() { localStorage.setItem(KEY, JSON.stringify(tareas)); }
function dibujar() {
  lista.replaceChildren();
  tareas.forEach((tarea, i) => {
    const li = document.createElement('li');
    const check = document.createElement('input'); check.type = 'checkbox'; check.checked = tarea.hecha;
    check.addEventListener('change', () => { tareas[i].hecha = check.checked; guardar(); dibujar(); });
    const span = document.createElement('span'); span.textContent = tarea.texto;
    if (tarea.hecha) span.className = 'done';
    const borrar = document.createElement('button'); borrar.textContent = 'Eliminar';
    borrar.addEventListener('click', () => { tareas.splice(i, 1); guardar(); dibujar(); });
    li.append(check, span, borrar); lista.append(li);
  });
}
formulario.addEventListener('submit', (ev) => {
  ev.preventDefault();
  const campo = document.querySelector('#task');
  const texto = campo.value.trim();
  if (!texto) return;
  tareas.push({ texto, hecha: false });
  guardar(); dibujar(); formulario.reset(); campo.focus();
});
dibujar();
