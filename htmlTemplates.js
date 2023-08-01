function pokemonCardsHtml(color, pokemonId, pokemonName, count, types, pokemon) {
  return `
      <div class="pokemon-card" style="background-color: ${color}"  onclick="openModal(${pokemonId})">
        <div>
          <div class="card-head">
            <h2 id="cardPokemonName">${pokemonName}</h2>
            <span id="cardCounter">#${count}</span>
          </div>
          <div class="cardContent">
            <div class="pokemon-types">${types}</div>
          </div>
          <img id="cardPokemonImage" src="${pokemon['sprites']['other']['official-artwork']['front_default']}">
        </div>
      </div>
    `;
}

function infoContainerTopHtml(pokemonName, count, types, pokemonId) {
  return `
      <div id="info-container-top">
        <div class="info-head">
          <h1 id="pokemonName">${pokemonName}</h1>
          <span id="cardCounter">#${pokemonId}</span>
        </div>
        <div class="pokemon-types" id="pokemonTypes">${types}</div>
        <div id="changePokemonButtons">
          <button id="prev" class="carousel-control-prev" type="button" onclick="changePokemon(-1, ${pokemonId})">
            <span class="carousel-control-prev-icon"></span>
          </button>
          <button id="next" class="carousel-control-next" type="button" onclick="changePokemon(1, ${pokemonId})">
            <span class="carousel-control-next-icon"></span>
          </button>
        </div>
      </div>
    `;
}

function infoContainerHtml(pokemon, pokemonName, height, weight, ability, ability1) {
  return `
    <div id="info-container">
    <img id="pokemonImage" src="${pokemon['sprites']['other']['official-artwork']['front_default']}" />
    <div class="accordion" id="accordionExample" >
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
            Pokémon Information
          </button>
        </h2>
        <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
          <div class="accordion-body">
            <p><strong>Name:</strong> <span id="pokemonName1">${pokemonName}</span></p>
            <p><strong>Height:</strong> <span id="pokemonHeight">${height}</span></p>
            <p><strong>Weight:</strong> <span id="pokemonWeight">${weight}</span></p>
            <p><strong>Ability:</strong> <span id="pokemonAbility">${ability}</span> <span id="pokemonAbility1">${ability1}</span></p>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            Pokémon Stats
          </button>
        </h2>
        <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
          <div class="accordion-body accordion-stats">
            <canvas id="pokemonStatsChart" width="300" height="180"></canvas>
          </div>
        </div>
      </div>
    </div>
    </div>
    `;
}
