// import {testArray} from "../Mocks/mock.js";

// const allPokemon = testArray;

export function getFavoritePokemonList(allPokemon) {
    return allPokemon.filter((elem) => elem.favorite === true)
}

