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

    // Cuando clickeo el botón "X"
    carrito.addEventListener('click', eliminarCurso)

    // Cuando clickeo el botón de "VACIAR CARRITO"
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];
        limpiarHTML();
    })

}


function agregarCurso(e) {

    e.preventDefault()

    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }

}

// Elimino un curso del carrito
function eliminarCurso (e) {
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId );
        carritoHTML();
    }
}

// Registro toda la información del curso clickeado a partir del elemento padre (cursoSeleccionado)
function leerDatosCurso (curso) {

    // Creo un objeto para almacenar en él los valores de un curso.
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'), // Obtengo el atributo data-id del elemento a que está dentro del elemento curso (.card)
        cantidad: 1
    }

    // Revisa si un elemento ya existe en el carrito.
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );
    if (existe) {
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++
                return curso;
            } else {
                return curso;
            }
        });
        articulosCarrito = [...cursos];
    } else {
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    // Agrega elementos al arreglo de carrito.
    carritoHTML();

}

// Función para crear e insertar los cursos como HTML en el menú del carrito.
function carritoHTML () {

    // Limpio el HTML previo
    limpiarHTML()
    
    // Itera sobre el array articulosCarrito y crea el HTML para insertarlo en el menú.
    articulosCarrito.forEach( elemento => {
        const {imagen, titulo, precio, id, cantidad} = elemento; // Aplico destructuring de objetos para ordenar el código
        const row = document.createElement('TR'); // Creo un elemento tipo <tr> por cada iteración, donde van a estar los valores de cada curso a partir del objeto creado antes.
        row.innerHTML = ` 
            <td>
                <img src="${imagen}" width="160">
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> X </a>
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