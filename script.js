const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");
const searchBtn = document.getElementById("search-button");
const clearBtn = document.getElementById("clear-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");
const pokemonType = document.getElementById("types");
const pokemonImg = document.getElementById("poke-img");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const type = document.getElementById("types");

//main function for getting the pokemon info
const getPokemon = async () => {
  try {
    const pokeName = searchInput.value.toLowerCase();
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);
    const data = await res.json();
    const typeClr = typeColor(data.types[0].type.name);

    //allowing the pokemon info to show on the screen
    pokemonName.innerText = data.name.toUpperCase();
    pokemonId.innerText = `#${data.id}`;
    pokemonWeight.innerText =`Weight: ${data.weight}`;
    pokemonHeight.innerText = `Height: ${data.height}`;
    pokemonType.innerText = data.types[0].type.name;
    pokemonImg.innerHTML = `
    <img src="${data.sprites["front_default"]}" alt="Image of ${pokeName}" id="sprite" />
    `;
    type.style["background-color"] = typeClr;
    searchResults.style["border-color"] = typeClr;
    searchResults.style.visibility = "visible";

    //showing the pokemon stats in the table
    hp.innerText = data.stats[0]["base_stat"];
    attack.innerText = data.stats[1]["base_stat"];
    defense.innerText = data.stats[2]["base_stat"];
    specialAttack.innerText = data.stats[3]["base_stat"];
    specialDefense.innerText = data.stats[4]["base_stat"];
    speed.innerText = data.stats[5]["base_stat"];
  } catch (err) {
    alert("Pokemon cannot be found");
    reset();
  }
};

//function for getting the color based on the pokemon type
const typeColor = (type) =>{
  switch (type) {
    case "normal":
      return "rgb(181, 186, 182)";
    case "fire":
      return "rgb(245, 69, 69)";
    case "fighting":
      return "rgb(245, 154, 69)";
    case "water":
      return "rgb(114, 140, 247)";
    case "flying":
      return "rgb(157, 218, 250)";
    case "grass":
      return "rgb(48, 186, 62)";
    case "poison":
      return "rgb(159, 75, 214)";
    case "electric":
      return "rgb(245, 242, 88)";
    case "ground":
      return "rgb(156, 115, 40)";
    case "psychic":
      return "rgb(219, 59, 201)";
    case "rock":
      return "rgb(196, 184, 159)";
    case "ice":
      return "rgb(68, 239, 242)";
    case "bug":
      return "rgb(118, 232, 128)";
    case "dragon":
      return "rgb(66, 99, 235)";
    case "ghost":
      return "rgb(111, 53, 196)";
    case "dark":
      return "rgb(130, 112, 156)";
    case "steel":
      return "rgb(62, 134, 150)";
    case "fairy":
      return "rgb(240, 110, 245)";
    case "stellar":
      return "rgb(105, 157, 255)";
  }
};

//reseting the pokemon info
const reset = () => {
  pokemonName.innerText = "";
  pokemonId.innerText = "";
  pokemonWeight.innerText = "";
  pokemonHeight.innerText = "";
  pokemonType.innerText = "";
  pokemonImg.innerHTML = "";

  type.style["background-color"] = "black";
  searchResults.style["border-color"] = "black";
  searchResults.style.visibility = "hidden";

  hp.innerText = "";
  attack.innerText = "";
  defense.innerText = "";
  specialAttack.innerText = "";
  specialDefense.innerText = "";
  speed.innerText = "";

  searchInput.value = "";
}

searchBtn.addEventListener("click", getPokemon);
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter"){
    getPokemon();
  }
})
clearBtn.addEventListener("click", reset);

