import { pokeApiUrl, artworkUrl } from "./config.js";

export async function fetchAllPokemon() {
    try {
        const response = await fetch(pokeApiUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch Pokemon list. Status:/n${response.status}/n${response.statusText}`);
        }
        const pokemonList = (await response.json()).results;
        const promises = pokemonList.map(async (pokemon) => {
            const detailsResponse = await fetch(pokemon?.url);
            if (!detailsResponse.ok) {
                throw new Error(`Failed to fetch details for Pokemon "${pokemon?.name}".\nURL: ${pokemon?.url}\nStatus: ${detailsResponse.status} ${detailsResponse.statusText}`);
            }
            const data = await detailsResponse.json();
            return {
                id: data.id,
                name: data.name,
                abilities: data?.abilities?.map((ability) => ability?.ability?.name),
                types: data?.types?.map((type) => type?.type?.name),
                sprite: `${artworkUrl}${data.id}.png`,
                favorite: false
            };
        });
        const pokemonDetails = await Promise.all(promises);
        return pokemonDetails;
    } catch (error) {
        console.error("An error occurred while fetching Pokemon data:",
            error.message, {
            source: pokeApiUrl,
        });
        throw error;
    }

}