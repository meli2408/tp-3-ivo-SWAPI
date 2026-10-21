fetch("https://swapi.info/api/people")
  .then((res) => res.json())
  .then((json) => console.log(json))
  .catch((error) => console.error(error))

const buscador = document.getElementById ("buscador")
function buscar() { 
  const texto = buscador.value.toLowerCase()
}
 buscador.addEventListener("input", buscar)


const URL_PLANETAS = "https://swapi.info/api/planets";
const URL_PELICULAS = "https://swapi.info/api/films";
const URL_ESPECIES = "https://swapi.info/api/species";

function rellenarDesplegable(datos, idSelect, propiedadTexto) {
  const selectElement = document.getElementById(idSelect);
  if (!selectElement) return;

  const fragment = document.createDocumentFragment();

  datos.forEach(elemento => {
    const option = document.createElement('option');
    option.value = elemento.url; 
    option.textContent = elemento[propiedadTexto]; 
    fragment.appendChild(option);
  });

  selectElement.appendChild(fragment);
}

async function inicializarFiltros() {
  try {
    const [resPlanetas, resPeliculas, resEspecies] = await Promise.all([
      fetch(URL_PLANETAS),
      fetch(URL_PELICULAS),
      fetch(URL_ESPECIES)
    ]);

    const planetas = await resPlanetas.json();
    const peliculas = await resPeliculas.json();
    const especies = await resEspecies.json();

    rellenarDesplegable(planetas, 'select-planetas', 'name');  
    rellenarDesplegable(peliculas, 'select-peliculas', 'title'); 
    rellenarDesplegable(especies, 'select-especies', 'name');    

  } 
}

// Ejecutamos la carga al iniciar la página
inicializarFiltros();


/*
const selectEspecie = document.getElementById('filtroEspecie');
const selectPlaneta = document.getElementById('filtroPlaneta');
const selectPeliculas = document.getElementById('filtroPeliculas');

const URL_USUARIOS = 'https://typicode.com';
const URL_PRODUCTOS = 'https://fakestoreapi.com';

 datos.forEach(elemento => {
    const option = document.createElement('option');
    option.value = elemento[propiedadValue];
    option.textContent = elemento[propiedadText];
    fragment.appendChild(option);
  });

//

async function cargarOpciones() {
  const url = 'https://swapi.info/api/planets'; 

  try {
    const respuesta = await fetch(url);
    if (!respuesta.ok) {
      throw new Error(`Error en la petición: ${respuesta.status}`);
    }

    const datos = await respuesta.json();

    datos.forEach(elemento => {
      const option = document.createElement('option');
      option.value = elemento.id;      
      option.textContent = elemento.nombre; 
      selectFiltro.appendChild(option);
    });

  } 
}

// Ejecutamos la función
cargarOpciones();

*/

