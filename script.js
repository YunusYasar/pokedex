let currentCount = 1;
const limit = 20;
const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

let colorPalette = {
  black: 'rgba(0, 0, 0, 0.6)',
  blue: 'rgba(0, 0, 255, 0.6)',
  brown: 'rgba(165, 42, 42, 0.6)',
  gray: 'rgba(128, 128, 128, 0.6)',
  green: 'rgba(0, 128, 0, 0.6)',
  pink: 'rgba(255, 192, 203, 0.6)',
  purple: 'rgba(128, 0, 128, 0.6)',
  red: 'rgba(255, 0, 0, 0.6)',
  white: 'rgba(210, 210, 210, 0.6)',
  yellow: 'rgba(229, 229, 36, 0.6)',
};
let currentPokemonIndex = 0;

let currentPokemon;
let loadedPokemon = null; // Variable für das aktuell geladene Pokemon

function init() {
  loadPokemon(currentCount);
}

async function getPokemon(pokemonIdOrName) {
  let url = `${apiUrl}${pokemonIdOrName}`;
  let response = await fetch(url);
  if (response.ok) {
    let pokemon = await response.json();
    if (pokemon.species && pokemon.species.url) {
      // Überprüfe, ob die Farbinformation in der API-Antwort vorhanden ist
      let colorResponse = await fetch(pokemon.species.url);
      if (colorResponse.ok) {
        let colorData = await colorResponse.json();
        pokemon.color = colorData.color.name;
      }
    }
    return pokemon;
  }
  return null;
}

async function loadPokemon(start) {
  let tempPokemonArray = []; // Temporäres Array zum Speichern der neu geladenen Pokémon
  for (let i = start; i < start + 20; i++) {
    let pokemon = await getPokemon(i);
    if (pokemon) {
      tempPokemonArray.push(pokemon); // Füge das Pokémon zum temporären Array hinzu
      renderPokemonCards(pokemon, i);
      if (i === start) {
        renderPokemonModalCards(pokemon, i); // Nur die erste Karte rendert die Pokemon-Informationen im Modal
      }
    }
  }
  currentCount += 20;
  // Aktualisieren Sie das Array der geladenen Pokémon
  loadedPokemon = loadedPokemon ? loadedPokemon.concat(tempPokemonArray) : tempPokemonArray;
}

function renderPokemonCards(pokemon, count) {
  let types = pokemon.types.map(typeInfo => `<div class="pokemon-type">${capitalizeFirstLetter(typeInfo.type.name)}</div>`).join('');
  let color = colorPalette[pokemon.color];
  let pokemonName = capitalizeFirstLetter(pokemon.name);
  let pokemonId = pokemon.id;
  document.getElementById('pokemonCardList').innerHTML += pokemonCardsHtml(color, pokemonId, pokemonName, count, types, pokemon);
}

function renderPokemonModalCards(pokemon, count) {
  let types = pokemon.types.map(typeInfo => `<div class="pokemon-type">${capitalizeFirstLetter(typeInfo.type.name)}</div>`).join('');
  let color = colorPalette[pokemon.color];
  let pokemonName = capitalizeFirstLetter(pokemon.name);
  let pokemonId = pokemon.id;
  let height = pokemon.height;
  let weight = pokemon.weight;
  let ability = pokemon['abilities'][0] ? capitalizeFirstLetter(pokemon['abilities'][0]['ability']['name']) : 'N/A';
  let ability1 = pokemon['abilities'][1] ? capitalizeFirstLetter(pokemon['abilities'][1]['ability']['name']) : 'N/A';
  let infoContainerTop = infoContainerTopHtml(pokemonName, count, types, pokemonId);
  let infoContainer = infoContainerHtml(pokemon, pokemonName, height, weight, ability, ability1);
  let modalCardList = `
    ${infoContainerTop}
    ${infoContainer}
  `;
  document.getElementById('pokemonModalCardList').innerHTML = modalCardList;
  document.getElementById('pokemonModalCardList').style.backgroundColor = `${color}`;
  renderPokemonStats(pokemon);
  document.getElementById('prev').addEventListener('click', () => changePokemon(-1, pokemonId));
  document.getElementById('next').addEventListener('click', () => changePokemon(1, pokemonId));
}

// Funktion zum Laden des vorherigen oder nächsten Pokemons
function changePokemon(offset, currentPokemonId) {
  const newIndex = getLoadedPokemonByIndex(currentPokemonId) + offset;

  if (newIndex >= 0 && newIndex < loadedPokemon.length) {
    currentPokemon = loadedPokemon[newIndex];
    renderPokemonModalCards(currentPokemon);
  }
}

function getLoadedPokemonByIndex(pokemonId) {
  return loadedPokemon.findIndex(pokemon => pokemon.id === pokemonId);
}

function openModal(start) {
  loadPokemon(start);
  var myModal = new bootstrap.Modal(document.getElementById('pokemonModal'));
  myModal.show();

  // Übergebe die Pokemon-ID, wenn du den Modal öffnest
  changePokemon(0, start);
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

async function searchPokemon() {
  // Get the search input element
  let searchInput = document.getElementById('search');
  let userInput = searchInput.value.trim(); // Get the user input and trim any extra spaces
  let loadMoreButton = document.getElementById('loadMorePokemon'); // Get the load more button element
  if (userInput) {
    // Make sure the user has entered something
    let pokemonName = userInput.toLowerCase(); // Convert the user input to lowercase (to make the search case-insensitive)
    let pokemon = await getPokemon(pokemonName); // Get the pokemon

    if (pokemon) {
      // Check if the request was successful
      document.getElementById('pokemonCardList').innerHTML = ''; // Clear previous cards
      renderPokemonCards(pokemon, pokemon.id); // Generate the Pokemon card
      if (loadMoreButton) loadMoreButton.style.display = 'none'; // Hide the load more button

      searchInput.value = ''; // Clear the search input
    } else {
      alert(`Pokémon ${pokemonName} wurde nicht gefunden.`);
    }
  } else {
    alert('Bitte geben Sie einen Pokémon-Namen ein!');
    if (loadMoreButton) loadMoreButton.style.display = 'block'; // Show the load more button if the search was not successful
  }
}
