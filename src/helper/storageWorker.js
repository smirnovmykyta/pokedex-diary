const storageKey = "pokemonList";

//* Speichert die PokemonListe im Local Storage
export function saveToLocalStorage(pokemonList)
{
    if (!pokemonList || typeof pokemonList !== "object")
    {
        console.error("Invalid data passed to saveToLocalStorage:", pokemonList);
        return;
    }
    localStorage.setItem(storageKey, JSON.stringify(pokemonList));
}

//* Ruft die PokemonListe aus dem Local Storage ab
export function getAllPokemon()
{
    const data = JSON.parse(localStorage.getItem(storageKey)) || [];
    return data;
}

//* Ruft nur die Favoriten ab
export function getFavorites()
{
    const allPokemon = getAllPokemon();
    return allPokemon.filter((pokemon) => pokemon.favorite);
}

//* Setzt den FavoritenStatus eines Pokemon auf true oder false
export function setAndRemoveAsFavorite(pokemonId)
{
    const allPokemon = getAllPokemon();
    const updatedPokemon = allPokemon.map(pokemon => pokemon.id === pokemonId ? pokemon.favorite === true ? { ...pokemon, favorite: false } : { ...pokemon, favorite: true } : pokemon);
    saveToLocalStorage(updatedPokemon);
}

//? ____________________________________________________________________________
//? Fügt zusätzliche PokemonDaten hinzu oder aktualisiert bestehende (OPTIONAL)
// export function updatePokemon(pokemonId, updates)
// {
//     const allPokemon = getAllPokemon();
//     const updatedPokemon = allPokemon.map((pokemon) =>
//         pokemon.id === pokemonId ? { ...pokemon, ...updates } : pokemon
//     );
//     saveToLocalStorage(updatedPokemon);
// }
