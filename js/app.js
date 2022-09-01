// Variables

const carrito = document.querySelector('#carrito'); 
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos')
let articulosCarrito = []; 

cargarEventListeners();

function cargarEventListeners() {

    // Cuando clickeo el botón "AGREGAR AL CARRITO"
    listaCursos.addEventListener('click', agregarCurso);

}

// Funciones

function agregarCurso(e) {

    e.preventDefault()

    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }

}

// Tomar la información del curso que clickeamos
function leerDatosCurso (curso) {

    // Creo un objeto con el contenido del curso seleccionado
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'), // Obtengo el atributo data-id del elemento a que está dentro del elemento curso (.card)
        cantidad: 1
    }

    // Agrega elementos al arreglo de carrito.
    articulosCarrito = [...articulosCarrito, infoCurso];
    console.log(articulosCarrito);
    
    carritoHTML();

}

// Muestra el carrito de compras en el HTML

function carritoHTML () {

    // Limpio el HTML previo
    limpiarHTML()
    
    // Itera sobre el array articulosCarrito y crea el HTML para seguidamente insertarlo.
    articulosCarrito.forEach( elemento => {
        
        // Limpiar el HTML

        const row = document.createElement('TR');
        row.innerHTML = `
            <td>
                ${elemento.titulo}
            </td>
        `
        // Agrego el HTML creado en el tbody
        contenedorCarrito.appendChild(row);
    })
}

// Elimina los cursos del tbody para que no se repliquen con el spread operator

function limpiarHTML () {
    // "Forma lenta" para limpiar el HTML.
    // contenedorCarrito.innerHTML = ''
    // "Forma rápida" para limpiar el HTML.
    while (contenedorCarrito.firstChild) { // Revisa si el tbody tiene un elemento hijo
        contenedorCarrito.removeChild(contenedorCarrito.firstChild); // Si lo tiene, lo remueve.
    }
}