// function createCardList
const createCardList = () => {
  let pokemons = [
    {
      id: 1,
      name: "bulbasaur",
      abilities: ["overgrow", "chlorophyll"],
      types: ["grass", "poison"],
      sprite:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
      favorite: false,
    },
    {
      id: 2,
      name: "ivysaur",
      abilities: ["overgrow", "chlorophyll"],
      types: ["grass", "poison"],
      sprite:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png",
      favorite: false,
    },
    {
      id: 3,
      name: "venusaur",
      abilities: ["overgrow", "chlorophyll"],
      types: ["grass", "poison"],
      sprite:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png",
      favorite: false,
    },
    {
      id: 4,
      name: "charmander",
      abilities: ["blaze", "solar-power"],
      types: ["fire"],
      sprite:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
      favorite: false,
    },
    {
      id: 5,
      name: "charmeleon",
      abilities: ["blaze", "solar-power"],
      types: ["fire"],
      sprite:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png",
      favorite: false,
    },
    {
      id: 6,
      name: "charizard",
      abilities: ["blaze", "solar-power"],
      types: ["fire", "flying"],
      sprite:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
      favorite: false,
    },
    {
      id: 7,
      name: "squirtle",
      abilities: ["torrent", "rain-dish"],
      types: ["water"],
      sprite:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
      favorite: false,
    },
    {
      id: 8,
      name: "wartortle",
      abilities: ["torrent", "rain-dish"],
      types: ["water"],
      sprite:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/8.png",
      favorite: false,
    },
    {
      id: 9,
      name: "blastoise",
      abilities: ["torrent", "rain-dish"],
      types: ["water"],
      sprite:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png",
      favorite: false,
    },
    {
      id: 10,
      name: "caterpie",
      abilities: ["shield-dust", "run-away"],
      types: ["bug"],
      sprite:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10.png",
      favorite: false,
    },
  ];

  let card_list = document.getElementById("card-list");

  pokemons.forEach((pokemon) => {
    card_list.appendChild(createCard(pokemon));
  });
};
