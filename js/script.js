//BD de Proyectos

const proyectosData = {
    proyectos:[
        {
            id: 1,
            titulo: "Visualizador de datos criminales en Argentina",
            preview: "Proyecto de visualizacion de datos hecha con HTML/CSS y Javascript utilizando las librerías Leaflet y Chart.js ",
            icono: "📈",
            imagenes: [
              "",
              ""
            ],

            links: "<button> Ver repo </button>"

        }
    ],

    herramientas: [
        {
            id: 3, 
            titulo: "Frontend", 
            preview: "HTML, CSS, JS",
            detalles: "sigo pensando en eso"
        },
        
        { 
            id: 4, 
            titulo: "Herramientas", 
            preview: "Git, Figma, VS Code", 
            detalles: "Mi día a día se basa en un flujo de trabajo ágil con Git." 
        },

    ],
    contacto: [
    { 
      id: 5, 
      titulo: "LinkedIn", 
      preview: "Mi perfil profesional", 
      detalles: "<a href='#'>Ir a mi LinkedIn</a>" 
    }
    ]

    
};

function mostrarLista(categoria){
    const colCentral = document.getElementById('col-mid-content');
    const items =proyectosData[categoria];

    // Limpiamos la columna derecha porque cambiamos de categoría
  document.getElementById('col-right-content').innerHTML = '<p style="color: gray; text-align: center; margin-top: 50px;">Selecciona un ítem.</p>';

  let html = `<ul class="menu-list">`;
  items.forEach((item, index) => {
    html += `<li class="menu-item" onclick="mostrarDetalle('${categoria}', ${index})">${item.icono} ${item.titulo}</li>`;
  });
  html += `</ul>`;

  colCentral.innerHTML = html;

}

let imagenesActuales = [];
let indiceImagen = 0;


//Función que muestra el preview de la columna derecha

function mostrarDetalle(categoria, index) {
  const colDerecha = document.getElementById('col-right-content');
  const item = proyectosData[categoria][index];

  //html de la galería
  let htmlGaleria = '';

  if (item.imagenes && item.imagenes.length > 0){
    //guarda las imagenes del proy actul y reseteamos el indice a 0
    imagenesActuales = item.imagenes;
    indiceImagen = 0;

    htmlGaleria = `
      <div style="margin-top: 15px;">
        <p style="margin-bottom: 2px;"><strong>Capturas:</strong></p>
        
        <!-- Pantalla de la imagen -->
        <div style="border: 2px inset #fff; background: #000; padding: 2px; height: 130px; display: flex; align-items: center; justify-content: center;">
          <img id="img-galeria" src="${imagenesActuales[0]}" style="max-width: 100%; max-height: 100%;">
        </div>
        
        <!-- Controles -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 5px;">
          <button onclick="cambiarImagen(-1)" style="min-width: 30px;">◀</button>
          <span id="contador-galeria" style="font-size: 11px;">1 / ${imagenesActuales.length}</span>
          <button onclick="cambiarImagen(1)" style="min-width: 30px;">▶</button>
        </div>
      </div>
    `;
  }

  // Construimos el HTML de la columna derecha
  const html = `
    <h4 style="margin-top: 0; border-bottom: 1px solid gray; padding-bottom: 4px;">
      ${item.icono ? item.icono + ' ' : ''}${item.titulo}
    </h4>
    <p style="font-size: 11px;">${item.preview}</p>
    
    ${htmlGaleria}
    
    <div style="margin-top: 15px; border-top: 1px solid gray; padding-top: 5px;">
      ${item.links}
    </div>
  `;

  // Inyectamos el HTML
  colDerecha.innerHTML = html;
}




//FUINCIONAMIENTO DE VENTANAS

function openWindow(id) {
      const windowEl = document.getElementById(id);
      const tastkbarBtn = document.getElementById(id + '-btn');

      windowEl.style.display = 'block';
      tastkbarBtn.style.display = 'block';
      
      document.getElementById('start-menu').style.display = 'none' //cierra el menu de la barra de tareas si estaba abierto
    }

function closeWindow(id) {

  const windowEl = document.getElementById(id);
  const tastkbarBtn = document.getElementById(id + '-btn');

  windowEl.style.display = 'none';
  tastkbarBtn.style.display = 'none';

}

function toggleWindow(id) {
  //para minimizar y restaurar desde la barra de tareas
  const windowEl = document.getElementById(id);

  if(windowEl.style.display === 'none' || windowEl.style.display === ''){
    windowEl.style.display = 'block';

  } else {
    windowEl.style.display = 'none';
  }
}


// Menú de inico

const startBtn = document.getElementById('start-btn');
const startMenu = document.getElementById('start-menu');

//Abrir y cerrar menu de inicio
startBtn.addEventListener('click', (e) => {
  e.stopPropagation();                  // evita que el click se 'progague' al documento
  startMenu.style.display = startMenu.style.display === 'block' ? 'none':'block';      //ok, esto nosé que hace, algun tipo de condicional?

});

//Cerrar menu si se hace click en algún otro lado de la pantalla
document.addEventListener('click', (e) => {
  if (startMenu.style.display === 'block' && !startMenu.contains(e.target)){
    startMenu.style.display = 'none';
  }
  });





//Funcion para minimizar
function minimizeWindow(id){
  document.getElementById(id).style.display = 'none';
}

//Funcion para arrastrar ventanas:

function makeDraggable(windowElement){
  let pos1 = 0, pos2 = 0, mouseX = 0, mouseY = 0;
  const titlebar = windowElement.querySelector(".title-bar");

  if (titlebar) {
    //Si la ventana tiene barra de t´tulo, se puede arrastrar:
    titlebar.onmousedown = dragMouseDown;
    titlebar.style.cursor= 'move';
  }

  function dragMouseDown(e){
    e.preventDefault();
    //guardar la pos del cursor
    mouseX = e.clientX;
    mouseY = e.clientY;
        
    // Asignar los eventos de movimiento y soltar al documento entero
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e.preventDefault();
    //Calcular cuánto se movió el mouse
    pos1 = mouseX - e.clientX;
    pos2 = mouseY - e.clientY;
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Aplicar la nueva posición a la ventana
    windowElement.style.top = (windowElement.offsetTop - pos2) + "px";
    windowElement.style.left = (windowElement.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    //Limpiar los eventos al soltar el clic
    document.onmouseup = null;
    document.onmousemove = null;
  }

}


// que el portfolio se pueda arrastrar




//config del reloj de la barra de tareas:

function updateClock() {
  const clockElement = document.getElementById('taskbar-clock');
  const now = new Date();
  
  let hours = now.getHours();
  let minutes = now.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  
  //convertir al formato de 12 horas
  hours = hours % 12;
  hours = hours ? hours : 12; // Si es 0, mostrar 12
  
  // cero a la izquierda si los minutos son menores a 10
  minutes = minutes < 10 ? '0' + minutes : minutes;
  
  // Construir la cadena de texto y aplicarla
  clockElement.innerText = `${hours}:${minutes} ${ampm}`;
}

updateClock();
setInterval(updateClock, 1000);



function cambiarImagen(direccion) {

  if (imagenesActuales.length === 0) return;

  indiceImagen += direccion;

  // Lógica del bucle
  if (indiceImagen < 0) {
    indiceImagen = imagenesActuales.length - 1; // Si retrocede desde el 0, va a la última
  } else if (indiceImagen >= imagenesActuales.length) {
    indiceImagen = 0; // Si avanza desde la última, vuelve a la 0
  }

  // Actualizamos el src de la etiqueta <img> y el texto del contador
  document.getElementById('img-galeria').src = imagenesActuales[indiceImagen];
  document.getElementById('contador-galeria').innerText = (indiceImagen + 1) + ' / ' + imagenesActuales.length;

}

const portfolio = document.getElementById("window-portfolio");
makeDraggable(portfolio);

makeDraggable(document.getElementById("window-minesweeper"));