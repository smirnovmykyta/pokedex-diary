const storageKey = "pokemonList";

//* Speichert die PokemonListe im Local Storage
export function saveToLocalStorage(pokemonList)
{
    if (!pokemonList || typeof pokemonList !== "object")
    {
        console.error("Invalid data passed to saveToLocalStorage:", pokemonList);
        return;
    }
    console.log("Saving to Local Storage:", pokemonList);
    localStorage.setItem(storageKey, JSON.stringify(pokemonList));
}

//* Ruft die PokemonListe aus dem Local Storage ab
export function getAllPokemon()
{
    const data = JSON.parse(localStorage.getItem(storageKey)) || [];
    console.log("Retrieved from Local Storage:", data);
    return data;
}

//* Ruft nur die Favoriten ab
export function getFavorites()
{
    const allPokemon = getAllPokemon();
    return allPokemon.filter((pokemon) => pokemon.favorite);
}

//* Setzt den FavoritenStatus eines Pokémon
export function setFavorite(pokemonId, isFavorite)
{
    console.log(`Setting favorite for ID: ${pokemonId} to ${isFavorite}`);
    const allPokemon = getAllPokemon();
    const updatedPokemon = allPokemon.map((pokemon) =>
        pokemon.id === pokemonId ? { ...pokemon, favorite: isFavorite } : pokemon
    );
    console.log("Updated Pokemon List:", updatedPokemon);
    saveToLocalStorage(updatedPokemon);
}

//* Setzt den Status eines Favorisierten Pokemons wieder auf false (damit es nicht mehr unter Favoriten aufgelistet wird)
export function removeFavorite(pokemonId)
{
    console.log(`Removing favorite for ID: ${pokemonId}`);
    const allPokemon = getAllPokemon();
    const updatedPokemon = allPokemon.map((pokemon) =>
        pokemon.id === pokemonId ? { ...pokemon, favorite: false } : pokemon
    );
    console.log("Updated Pokemon List after removing favorite:", updatedPokemon);
    saveToLocalStorage(updatedPokemon);
}

//? ____________________________________________________________________________
//? Fügt zusätzliche PokemonDaten hinzu oder aktualisiert bestehende (OPTIONAL)
export function updatePokemon(pokemonId, updates)
{
    const allPokemon = getAllPokemon();
    const updatedPokemon = allPokemon.map((pokemon) =>
        pokemon.id === pokemonId ? { ...pokemon, ...updates } : pokemon
    );
    saveToLocalStorage(updatedPokemon);
}