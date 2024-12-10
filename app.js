import {fetchAllPokemon} from "./src/services/pokemonApi.js";
import {getFavorites, saveToLocalStorage, getAllPokemon} from "./src/helper/storageWorker.js";
import {createCardList} from "./src/component/cardList.js";
import {createFavoriteList} from "./src/helper/createFavoriteList.js";
import {search} from "./src/helper/search.js";

let searchInput;
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
            if (containerId === "header") {
                searchInput = document.getElementById("search");
                if (searchInput) {
                    setupSearchListener();
                }
            }

        })
        .catch(error => console.error(error));
}

function setupSearchListener() {
    searchInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            const query = searchInput.value.trim();
            if (query) {
                const searchResult = search(query);
                if (searchResult) {
                    createCardList([searchResult]);
                } else {
                    console.warn("No results found for query:", query);
                }
                searchInput.value = '';
            }
        }
    });
}

async function initializePage() {
    const pageType = document.body.dataset.page;
    if (!localStorage.getItem("pokemonList")) {
        const pokemonList = await fetchAllPokemon();

        if (!Array.isArray(pokemonList) || pokemonList.length === 0) {
            console.error("No Pokemon data to save!");
            return;
        }

        saveToLocalStorage(pokemonList);
    }

        if (pageType === "home") {
            createCardList(getAllPokemon());
        } else if (pageType === "favorite") {
            createFavoriteList(getFavorites());
        } else {
            console.error("Unknown page type");
        }

}

document.addEventListener("DOMContentLoaded", () => {
    loadHTML("header", "/header.html");
    loadHTML("footer", "/footer.html");
    initializePage();
});
