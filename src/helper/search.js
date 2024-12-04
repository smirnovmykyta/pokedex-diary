// import {testArray} from "../Mocks/mock.js";

// const allPokemon = testArray;

export function searchPokemonById(id, allPokemon) {
    return allPokemon.find((elem) => elem.id === id);
}

export function searchPokemonByName(name, allPokemon) {
    return allPokemon.find((elem) => elem.name.toLowerCase() === name.toLowerCase());
}
