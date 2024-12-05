import { fetchAllPokemon } from "./src/services/pokemonApi.js";
import { saveToLocalStorage } from "./src/helper/storageWorker.js";
import { createCardList } from "./src/component/cardList.js";
import { getAllPokemon } from "./src/helper/storageWorker.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded");

  async function initLoad() {
    const pokemonList = await fetchAllPokemon();
    // console.log("Fetched Pokemon List:", pokemonList);

    if (!Array.isArray(pokemonList) || pokemonList.length === 0) {
      console.error("No Pokemon data to save!");
      return;
    }

    saveToLocalStorage(pokemonList);
    // console.log("PokemonList stored in LocalStorage:");
  }
  
  initLoad();

  createCardList(getAllPokemon());
});
