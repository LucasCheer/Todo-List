//VARIABLES

const textoTarea = document.getElementById("texto-tarea");
const listaTareas = document.getElementById("lista-de-tareas");
const agregarTareaBtn = document.getElementById("agregar-tarea");

const tareas = []

//FUNCIONES

function crearLista(){
    listaTareas.innerHTML = "";
    tareas.forEach((tarea) => {
        listaTareas.innerHTML += 
        `
        <li>
            <p class="text-content">${tarea.contenido}</p>
            <div class="item">
                <input class="checkbox" type="checkbox">
                <button class="btn-edit">Editar</button>
                <button class="btn-delete">Eliminar</button>
            </div>
        </li>
        `
    })
    eliminarTareas();
    editarTareas();
    marcarTareas();
}

const eliminarTareas = () => {
    const buttons = document.querySelectorAll(".btn-delete");
    buttons.forEach( (btn,i) => {
        btn.addEventListener('click', () => {
            tareas.splice(i,1);
            crearLista();
        })
    })
}

const editarTareas = () =>{
    const buttonsEdit = document.querySelectorAll(".btn-edit");
    buttonsEdit.forEach((btn,i) => {
        btn.addEventListener('click' , () => {
            const tareaEditada = prompt("Edite el mensaje");
            if(tareaEditada.length > 3){
                tareas[i].contenido = tareaEditada;
                crearLista();
            }
            else{
                alert("La tarea debe ser de almenos 4 caractéres, Intente de nuevo.")
            }
        })
    })
}

const marcarTareas = () => {
    const checks = document.querySelectorAll('.checkbox');
    const listItems = document.querySelectorAll('li');
    const textContent = document.querySelectorAll('.text-content');

    checks.forEach((check,index) => {
        check.addEventListener('click', () => {
            if(check.checked){
                listItems[index].classList.add('marcado');
                textContent[index].classList.add('tachado');
            }
            else{
                listItems[index].classList.remove('marcado');
                textContent[index].classList.remove('tachado');
            }
        })
    })
}

//EVENTOS

textoTarea.addEventListener("keyup", (event) => {
    if(event.key === "Enter") agregarTareaBtn.click();
})

agregarTareaBtn.addEventListener("click", ()=>{
    const valor = textoTarea.value;
    if(valor.length > 3){
        tareas.push({
            id: tareas.length,
            contenido: valor,
            completada: false
        })
        textoTarea.value = "";
        crearLista();
    }
});

