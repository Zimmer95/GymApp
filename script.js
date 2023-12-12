const $tiempo=document.querySelector('.tiempo'),
$fecha= document.querySelector('.fecha'),
lista = document.querySelector('#lista'),
input = document.querySelector('#agregar-ejercicio'),
botonEnter = document.querySelector('#botonEnter'),
check = "fa-check-circle",
uncheck = "fa-circle",
lineThrough = "line-through";

let id
let LIST


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

/*cronometro*/


    let tiempoRef = Date.now()
    let iniciarCronometro = false
    let acumulado = 0

    setInterval(()=> {
        let cronometro = document.getElementById("cronometro")
        if(iniciarCronometro){   
            acumulado = Date.now - tiempoRef
        }
        cronometro.innerHTML = acumulado

    }, 1000/60);  
    
    function formatearMS(tiempo_ms){
        let MS = tiempo_ms % 1000
        let S = Math.floor(((tiempo_ms-MS) / 1000) % 60)
        let M = Math.floor((S/60) % 60)
        let H = Math.floor((M/60))

        Number.prototype.ceros = function(n){
            return (this+"").padStart(n,0)
        }

        return H.ceros(2)+":"+ M.ceros(2)+":"+H.ceros(2)

    }



/**agregar tareas */

function agregarTarea(tarea, id, realizado, eliminado) {

    if(eliminado){return}
    let hora=new Date(),
    horario= hora.toLocaleTimeString(),
    dia= hora.getDate(),
    mes= hora.getMonth()+1,
    anio= hora.getFullYear(),
    diaSemana=hora.getDay();;

    let fecha = `${dia}-${mes}-${anio}`

    const REALIZADO = realizado ? check : uncheck
    const LINE = realizado ? lineThrough : ""

    const elemento =`<li id= "elemento" >
                    <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
                    <p class="text ${LINE}">${tarea} </p>
                    <p class="text"> ${horario} </p>
                    <p class="text">${fecha} </p>
                    <i class="fas fa-trash de alinearAlFinal" data="eliminado" id="${id}"></i>
                    </li>`
    lista.insertAdjacentHTML("beforeend", elemento)
}

function tareaRealizada(element){
    element.classList.toggle(check)
    element.classList.toggle(uncheck)
    element.parentNode.querySelector(".text").classList.toggle(lineThrough)
    LIST[element.id].realizado = LIST[element.id].realizado ? false : true
}

function tareaEliminada(element){
    element.parentNode.parentNode.removeChild(element.parentNode)
    LIST[element.id].eliminado = true
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
        localStorage.setItem('rutinas', JSON.stringify(LIST))
        input.value=''
        id++
    }
})

document.addEventListener("keyup", function(event){
    if(event.key=="Enter"){
        const tarea= input.value
    if(tarea){
        agregarTarea(tarea, id, false, false)
        LIST.push({
            nombre:tarea,
            id:id,
            realizado:false,
            eliminado:false
        })
    localStorage.setItem('rutinas', JSON.stringify(LIST))
    input.value=''
    id++
    }
    }
})

lista.addEventListener('click', function(event){
    const element = event.target
    const elementData = element.attributes.data.value

    if(elementData === "realizado"){
        tareaRealizada(element)
        localStorage.setItem('rutinas', JSON.stringify(LIST))
    }else if (elementData === "eliminado"){
        tareaEliminada(element)
        localStorage.setItem('rutinas', JSON.stringify(LIST))
    }
})


setInterval(() =>{
    relojDigital()
},1000);

//obener datos del local storage

let data = localStorage.getItem('rutinas')
if(data){
    LIST=JSON.parse(data)
    id = LIST.length
    cargarLista(LIST)
}else{
    LIST = []
    id=0
}

function cargarLista(DATA){
    DATA.forEach(function(i){
        agregarTarea(i.nombre,i.id,i.realizado,i.eliminado)
    })
}