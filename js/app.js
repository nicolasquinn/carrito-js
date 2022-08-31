// Variables

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos')

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

    console.log(curso)

    // Creo un objeto con el contenido del curso seleccionado
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'), // Obtengo el atributo data-id del elemento a que está dentro del elemento curso (.card)
        cantidad: 1
    }

    console.log(infoCurso)

}