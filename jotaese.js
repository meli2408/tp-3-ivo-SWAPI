const container = document.getElementById('personajesContainer');
const buscador = document.getElementById('buscador');
const filtroEspecie = document.getElementById('filtroEspecie');
const filtroPlaneta = document.getElementById('filtroPlaneta');
const filtroPeliculas = document.getElementById('filtroPeliculas');

let personajes = [];

function mostrarPersonajes(lista) {

  container.innerHTML = lista.map(persona => `
    <article class="tarjeta">
      <h2 class="name"><span class="cat">${persona.name}</span></h2>
      <p class="gender">Gender: ${persona.gender}</p>
      <p class="species">Species:${persona.speciesNombre}</p>
      <p class="homeworld">Homeworld:${persona.homeworldNombre}</p>
      <ul>Aparece en:
        ${persona.filmsNombres.map(film => `<li>${film}</li>`).join('')}
      </ul>
    </article>
  `).join('');
}

function filtrar() {
  const texto = buscador.value.toLowerCase();
  const especie = filtroEspecie.value;
  const planeta = filtroPlaneta.value;
  const pelicula = filtroPeliculas.value;

  const filtrados = personajes.filter(p => {
    const coincideTexto = p.name.toLowerCase().includes(texto);
    const coincideEspecie = !especie || p.species.includes(especie);
    const coincidePlaneta = !planeta || p.homeworld === planeta;
    const coincidePelicula = !pelicula || p.films.includes(pelicula);
    return coincideTexto && coincideEspecie && coincidePlaneta && coincidePelicula;
  });

  mostrarPersonajes(filtrados);
}

function llenarSelect(select, items, campo) {
  items.forEach(item => {
    const option = document.createElement('option');
    option.value = item.url;
    option.textContent = item[campo];
    select.appendChild(option);
  });
}

buscador.addEventListener('input', filtrar);
filtroEspecie.addEventListener('change', filtrar);
filtroPlaneta.addEventListener('change', filtrar);
filtroPeliculas.addEventListener('change', filtrar);

async function cargarDatos() {
  try {
    const base = "https://swapi.info/api";
    const [gente, planetas, especies, peliculas] = await Promise.all([
      fetch(`${base}/people`).then(r => r.json()),
      fetch(`${base}/planets`).then(r => r.json()),
      fetch(`${base}/species`).then(r => r.json()),
      fetch(`${base}/films`).then(r => r.json())
    ]);

    const nombrePlaneta = Object.fromEntries(planetas.map(p => [p.url, p.name]));
    const nombreEspecie = Object.fromEntries(especies.map(e => [e.url, e.name]));
    const nombrePelicula = Object.fromEntries(peliculas.map(f => [f.url, f.title]));
    const urlHumano = especies.find(e => e.name === "Human")?.url;

personajes = gente.map(p => {
  const especiesUrls = p.species.length ? p.species : [urlHumano];

  return {
    ...p,
    species: especiesUrls,
    homeworldNombre: nombrePlaneta[p.homeworld] || "Desconocido",
    speciesNombre: especiesUrls.map(s => nombreEspecie[s]).join(", "),
    filmsNombres: p.films.map(f => nombrePelicula[f])
  };
});

    llenarSelect(filtroEspecie, especies.sort((a, b) => a.name.localeCompare(b.name)), 'name');
    llenarSelect(filtroPlaneta, planetas.sort((a, b) => a.name.localeCompare(b.name)), 'name');
    llenarSelect(filtroPeliculas, peliculas.sort((a, b) => a.episode_id - b.episode_id), 'title');

    mostrarPersonajes(personajes);
  } catch (error) {
    console.error('Error al cargar los datos:', error);
  }
}

cargarDatos();
