const $tiempo=document.querySelector('.tiempo'),
$fecha= document.querySelector('.fecha'),
lista = document.querySelector('#lista'),
input = document.querySelector('#agregar-ejercicio'),
botonEnter = document.querySelector('#botonEnter'),
check = "fa-check-circle",
uncheck = "fa-circle",
lineThrough = "line-through",
LIST=[];
let id=0;


/*reloj*/

function relojDigital(){
    let f=new Date(),
    dia= f.getDate(),
    mes= f.getMonth()+1,
    anio= f.getFullYear(),
    diaSemana=f.getDay();

    dia= ('0'+dia).slice(-2);
    mes=('0'+mes).slice(-2)

    let timeString= f.toLocaleTimeString();
    $tiempo.innerHTML=timeString;

    let semana=['DOMINGO','LUNES','MARTES','MIERCOLES','JUEVES','VIERNES','SABADO'];
    let showSemana= (semana[diaSemana])
    $fecha.innerHTML = `${showSemana} ${dia}-${mes}-${anio}`
}


/**agregar tareas */

function agregarTarea(tarea, id, realizado, eliminado) {

    if(eliminado){return}
    
    const REALIZADO = realizado ? check : uncheck
    const LINE = realizado ? lineThrough : ""

    const elemento =`<li id= "elemento" >
                    <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
                    <p class="text ${LINE}">${tarea} </p>
                    <i class="fas fa-trash de" data="eliminado" id="${id}"></i>
                    </li>`
    lista.insertAdjacentHTML("beforeend", elemento)
}

function tareaRealizada(element){
    element.classList.toggle(check)
    element.classList.toggle(uncheck)
    element.parentNode.querySelector(".text").classList.toggle(lineThrough)
}

function tareaEliminada(element){
    element.parentNode.parentNode.removeChild(element.parentNode)
}

botonEnter.addEventListener('click', () => {
    const tarea = input.value
    if(tarea){
        agregarTarea(tarea, id, false, false)
        LIST.push({
            nombre:tarea,
            id:id,
            realizado:false,
            eliminado:false
        })
    }
    input.value=''
    id++
    console.log(LIST)
})

document.addEventListener("keyup", function(event){
    if(event.key=="Enter"){
        const tarea= input.value
    if(tarea){
        agregarTarea(tarea, id, false, false)
    }
    input.value=''
    id++
    }
})

lista.addEventListener('click', function(event){
    const element = event.target
    const elementData = element.attributes.data.value

    if(elementData === "realizado"){
        tareaRealizada(element)
    }else if (elementData === "eliminado"){
        tareaEliminada(element)
    }
})


setInterval(() =>{
    relojDigital()
},1000);

