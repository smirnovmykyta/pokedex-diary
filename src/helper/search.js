import {getAllPokemon} from "./storageWorker.js";

const allPokemon = getAllPokemon();

export function searchPokemonById(id) {
    return allPokemon.find((elem) => elem.id === +id);
}

export function searchPokemonByName(name) {
    return allPokemon.find((elem) => elem.name.toLowerCase() === name.toLowerCase());
}

export function search(query) {
    if (!isNaN(query) && query.trim() !== "") {
        return searchPokemonById(query)
    } else if ((/[a-zA-Z]+/.test(query))) {
        return searchPokemonByName(query)
    }
    return false;
}
