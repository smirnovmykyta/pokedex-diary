import { pokeApiUrl, artworkUrl } from "./config.js";
import { typeSymbols } from "./typeSymbols.js";

export async function fetchAllPokemon()
{
    try
    {
        // console.log(`Fetching Pokemon list from API: ${pokeApiUrl}`);
        const response = await fetch(pokeApiUrl);
        if (!response.ok)
        {
            throw new Error(`Failed to fetch Pokemon list. Status:/n${response.status}/n${response.statusText}`);
        }
        const pokemonList = (await response.json()).results;
        //* Für jedes Pokemon die Details abrufen
        const promises = pokemonList.map(async (pokemon) =>
        {
            // console.log(`Fetching details for Pokemon: ${pokemon?.name}\nURL: ${pokemon?.url}`);
            const detailsResponse = await fetch(pokemon?.url);
            if (!detailsResponse.ok)
            {
                throw new Error(`Failed to fetch details for Pokemon "${pokemon?.name}".\nURL: ${pokemon?.url}\nStatus: ${detailsResponse.status} ${detailsResponse.statusText}`);
            }
            const data = await detailsResponse.json();

            const typesWithSymbols = data?.types?.map((type) => ({ name: type.type.name, symbol: typeSymbols[type.type.name] || null }));

            const abilitiesWithDescriptions = await Promise.all(data?.abilities?.map(async (ability) =>
            {
                const abilityResponse = await fetch(ability.ability.url);
                if (!abilityResponse.ok)
                {
                    console.warn(`Failed to fetch ability details for "${ability.ability.name}".`);
                    return { name: ability.ability.name, description: null };
                }
                const abilityData = await abilityResponse.json();
                const description = abilityData.effect_entries.find((entry) => entry.language.name === "en")?.effect;
                return { name: ability.ability.name, description: description || "No description available" };
            }));
            //* Benötigte Daten aus dem Objekt beziehen (id, name, abilities, types, picture)
            return { //? Bei Verwendung Deutscher Typen Inhalt der Variablen anpassen z.B. "name: germanName"
                id: data.id,
                name: data.name,
                abilities: abilitiesWithDescriptions,
                types: typesWithSymbols,
                sprite: `${artworkUrl}${data.id}.png`, //? Das in der Gruppe abgesprochene Bild 👍
                favorite: false, //* Standardwert für Favoriten || IdeaByAndre 😎
            };
        });
        //* Alle promises von pokemonList.map müssen aufgelöst werden, für jeden fetch Aufruf
        const pokemonDetails = await Promise.all(promises);
        // console.log(pokemonDetails);
        return pokemonDetails;
    }
    catch (error)
    {
        console.error("An error occurred while fetching Pokemon data:",
            error.message,
            {
                source: pokeApiUrl,
            });
        throw error;
    }

}
