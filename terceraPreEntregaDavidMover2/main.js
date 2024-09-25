
const tareaForm = document.getElementById('tarea-form');
const tareaInput = document.getElementById('nueva-tarea');
const tareaLista = document.getElementById('tarea-lista');


document.addEventListener('DOMContentLoaded', cargarTareasDeLocalStorage);


tareaForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const tareaText = tareaInput.value;
    if (tareaText.trim() === '') return;

    agregarTareaAlDOM(tareaText);
    guardarTareaEnLocalStorage(tareaText);

    tareaInput.value = '';
});


tareaLista.addEventListener('click', function(e) {
    if (e.target.classList.contains('borrar-tarea')) {
        
        const tareaItem = e.target.parentElement;
        borrarTareaDeLocalStorage(tareaItem.firstChild.textContent);
        tareaItem.remove();
    } else {
        
        e.target.classList.toggle('completada');
        actualizarEstadoDeTareaEnLocalStorage(e.target.firstChild.textContent);
    }
});


function agregarTareaAlDOM(tareaText, completada = false) {
    const li = document.createElement('li');
    li.textContent = tareaText;

    if (completada) {
        li.classList.add('completada');
    }

    const borrarBtn = document.createElement('button');
    borrarBtn.textContent = 'X';
    borrarBtn.classList.add('borrar-tarea');
    li.appendChild(borrarBtn);
    
    tareaLista.appendChild(li);
}


function guardarTareaEnLocalStorage(tareaText) {
    let tareas = obtenerTareasDeLocalStorage();
    tareas.push({ text: tareaText, completada: false });
    localStorage.setItem('tareas', JSON.stringify(tareas));
}


function cargarTareasDeLocalStorage() {
    const tareas = obtenerTareasDeLocalStorage();
    tareas.forEach(tarea => agregarTareaAlDOM(tarea.text, tarea.completada));
}


function obtenerTareasDeLocalStorage() {
    let tareas = localStorage.getItem('tareas');
    return tareas ? JSON.parse(tareas) : [];
}


function borrarTareaDeLocalStorage(tareaText) {
    let tareas = obtenerTareasDeLocalStorage();
    tareas = tareas.filter(tarea => tarea.text !== tareaText.trim());
    localStorage.setItem('tareas', JSON.stringify(tareas));
}


function actualizarEstadoDeTareaEnLocalStorage(tareaText) {
    let tareas = obtenerTareasDeLocalStorage();
    tareas = tareas.map(tarea => {
        if (tarea.text === tareaText.trim()) {
            tarea.completada = !tarea.completada;
        }
        return tarea;
    });
    localStorage.setItem('tareas', JSON.stringify(tareas));
}
