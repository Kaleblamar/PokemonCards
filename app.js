const colours = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

const pokeContainer = document.querySelector(`.container`);

const numbOfPokemon = 800;
function createPokeCard(pokemon) {
  const pokeCard = document.createElement(`section`);
  pokeCard.classList.add(`card-container`);
  pokeContainer.append(pokeCard);

  const abilities = pokemon.data.abilities;
  for (a of abilities) {
    // console.log(a);
    // console.log(a.ability.name);
  }

  pokeCard.innerHTML = `  
        <div class="card">
          <div class="card-front pokemon">
          <h4 class="type">${pokemon.data.types[0].type.name}</h4>
            <div class="imgContainer">
              <img
                src="${pokemon.data.sprites.other.dream_world.front_default}"
                alt="${pokemon.data.name}" loading = "lazy"
              />
              </div>
               <h1 class="name">${pokemon.data.name.toUpperCase()}</h1>
              
           

          </div>
          <div class="card-back pokemon">
            
             <div class="ability">
            <h4> Abilities:  </h4>
            <ul><li>${pokemon.data.abilities[0].ability.name}</li>
            <li class = "ability2">${a.ability.name}</li>
                    
            </ul>
                    
            </div>
            <div class="stats">
            <h4>Stats</h4>

<div class="stat">
    <p> ${pokemon.data.stats[0].stat.name}: ${
    pokemon.data.stats[0].base_stat
  } </p>
   <div class="bar">
        <div class="progress"></div>
    </div>
</div>

<div class="stat">
    <p> ${pokemon.data.stats[1].stat.name}: ${
    pokemon.data.stats[1].base_stat
  } </p>
   <div class="bar">
        <div class="progress"></div>
    </div>
</div>

<div class="stat">
    <p> ${pokemon.data.stats[2].stat.name}: ${
    pokemon.data.stats[2].base_stat
  } </p>
   <div class="bar">
        <div class="progress"></div>
    </div>
</div>


<div class="stat">
    <p> ${pokemon.data.stats[3].stat.name}: ${
    pokemon.data.stats[3].base_stat
  } </p>
   <div class="bar">
        <div class="progress"></div>
    </div>
</div>


<div class="stat">
    <p> ${pokemon.data.stats[4].stat.name}: ${
    pokemon.data.stats[4].base_stat
  } </p>
   <div class="bar">
        <div class="progress"></div>
    </div>
</div>


<div class="stat">
    <p> ${pokemon.data.stats[5].stat.name}: ${
    pokemon.data.stats[5].base_stat
  } </p>
   <div class="bar">
        <div class="progress"></div>
    </div>
</div>
  </div>
         

          </div>
        </div>
      
        `;

  if (pokemon.data.sprites.other.dream_world.front_default === null) {
    const imgContainer = pokeCard.querySelector(`.imgContainer`);
    imgContainer.innerHTML = ` <img
                src="${pokemon.data.sprites.other.home.front_shiny}"
                alt="${pokemon.data.name}" loading = "lazy"
              />`;
  } else if (pokemon.data.sprites.other.home.front_shiny === null) {
    imgContainer.innerHTML = ` <img
                src="${pokemon.data.sprites.other.home.front_default}"
                alt="${pokemon.data.name}" loading = "lazy"
              />`;
  } else if (pokemon.data.sprites.other.home.front_default === null) {
    imgContainer.innerHTML = ` <img
                src="${
                  pokemon.data.sprites.other[`official-artwork`].front_default
                }"
                alt="${pokemon.data.name}" loading = "lazy"
              />`;
  }

  if (a.ability.name === pokemon.data.abilities[0].ability.name) {
    const ability2 = pokeCard.querySelector(`.ability2`);
    ability2.innerText = ``;
  }

  const getStats = pokemon.data.stats;
  const mappedStats = getStats.map((stat) => {
    return { baseStat: stat.base_stat, name: stat.stat.name };
  });

  mappedStats.forEach((stat, index) => {
    const bar = pokeCard.querySelectorAll(".progress")[index];
    const maxStat = 255;
    const percentage = function convert() {
      return parseInt((stat.baseStat / maxStat) * 100);
    };
    bar.style.width = percentage() + `%`;
  });

  const type = document.querySelectorAll(`.type`);

  type.forEach((type) => color(type));

  function color(e) {
    if (e.textContent === `grass`) {
      e.style.color = colours.grass;
    } else if (e.textContent === `fire`) {
      e.style.color = colours.fire;
    } else if (e.textContent === `water`) {
      e.style.color = colours.water;
    } else if (e.textContent === `normal`) {
      e.style.color = colours.normal;
    } else if (e.textContent === `ground`) {
      e.style.color = colours.ground;
    } else if (e.textContent === `bug`) {
      e.style.color = colours.bug;
    } else if (e.textContent === `electric`) {
      e.style.color = colours.electric;
    } else if (e.textContent === `poison`) {
      e.style.color = colours.poison;
    } else if (e.textContent === `fighting`) {
      e.style.color = colours.fighting;
    } else if (e.textContent === `fairy`) {
      e.style.color = colours.fairy;
    } else if (e.textContent === `psychic`) {
      e.style.color = colours.psychic;
    } else if (e.textContent === `rock`) {
      e.style.color = colours.rock;
    } else if (e.textContent === `ice`) {
      e.style.color = colours.ice;
    } else if (e.textContent === `ghost`) {
      e.style.color = colours.ghost;
    } else if (e.textContent === `dragon`) {
      e.style.color = colours.dragon;
    } else if (e.textContent === `dark`) {
      e.style.color = colours.dark;
    } else if (e.textContent === `flying`) {
      e.style.color = colours.flying;
    } else if (e.textContent === `steel`) {
      e.style.color = colours.steel;
    }
  }
}
async function getPokemonData(id) {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const pokemonData = await axios.get(url);
  console.log(pokemonData);
  console.log(pokemonData.data.sprites.front_shiny);
  console.log(pokemonData.data.sprites.front_shiny);
  console.log(pokemonData.data.name);

  createPokeCard(pokemonData);
}
async function getPokemon(i) {
  for (i = 1; i < numbOfPokemon; i++) {
    await getPokemonData(i);
  }

  document.addEventListener(`DOMContentLoaded`, flipCard);
  const card = document.querySelectorAll(".card");
  card.forEach((card) => card.addEventListener("click", flipCard));
  function flipCard() {
    this.classList.toggle("flip");
  }
}

getPokemon();
