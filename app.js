function loadHTML(containerId, filePath) {
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load ${filePath}: ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById(containerId).innerHTML = data;
        })
        .catch(error => console.error(error));
}

function initializePage() {
    const pageType = document.body.dataset.page;

    if (pageType === "home") {
        createCardList();
    } else if (pageType === "journal") {
        createFavoriteList();
    } else {
        console.error("Unknown page type");
    }
}
document.addEventListener("DOMContentLoaded", () => {
    loadHTML("header", "./src/component/header.html");
    loadHTML("footer", "./src/component/footer.html");
    initializePage();
});

// document.addEventListener("DOMContentLoaded", () => {
//     createCardList();
// });
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
