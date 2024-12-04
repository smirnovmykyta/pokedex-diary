import { pokeApiUrl, artworkUrl } from "./config.js";

export async function fetchAllPokemon()
{
    try
    {
        // console.log(`Fetching Pokemon list from API: ${pokeApiUrl}`);

        //? Optional || zum zeigen/testen t!m3r 😎 --> (wird später entfernt)
        // const startTime = new Date();

        const response = await fetch(pokeApiUrl);
        if (!response.ok)
        {
            throw new Error(`Failed to fetch Pokemon list. Status:/n${response.status}/n${response.statusText}`);
        }
        const pokemonList = (await response.json()).results;

        //* Für jedes Pokemon die Details abrufen
        const promises = pokemonList.map(async (pokemon) =>
        {
            console.log(`Fetching details for Pokemon: ${pokemon?.name}\nURL: ${pokemon?.url}`);

            // const pokemonStartTime = new Date();

            const detailsResponse = await fetch(pokemon?.url);
            if (!detailsResponse.ok)
            {
                throw new Error(`Failed to fetch details for Pokemon "${pokemon?.name}".\nURL: ${pokemon?.url}\nStatus: ${detailsResponse.status} ${detailsResponse.statusText}`);
            }
            const data = await detailsResponse.json();

            //? Optional || Endzeit für den Pokemon Aufruf --> (wird später entfernt)
            // const pokemonEndTime = new Date();
            // console.log(`Time taken to fetch details for ${pokemon?.name}: ${(pokemonEndTime - pokemonStartTime) / 1000}s`);

            //! Lösbar eventuell mit Fetch und Promise || Tests durchFühren und FehlerAnalyse via console.logs 🤓😻
            //TODO: ErweiterungsMöglichkeiten aus der API die Deutschen Namen der Pokemon zu erhalten 😢😭
            //TODO: ErweiterungsMöglichkeit Deutsche Typen abzurufen 😢😭
            //TODO: ErweiterungsMöglichkeit Deutsche Fähigkeiten abzurufen 😢😭

            //* Benötigte Daten aus dem Objekt beziehen (id, name, abilities, types, picture)
            return { //? Bei Verwendung Deutscher Typen Inhalt der Variablen anpassen z.B. "name: germanName"
                id: data.id,
                name: data.name,
                abilities: data?.abilities?.map((ability) => ability?.ability?.name),
                types: data?.types?.map((type) => type?.type?.name),
                sprite: `${artworkUrl}${data.id}.png`, //? Das in der Gruppe abgesprochene Bild 👍
                favorite: false, //* Standardwert für Favoriten || IdeaByAndre 😎
            };

        });

        //* Alle promises von pokemonList.map müssen aufgelöst werden, für jeden fetch Aufruf
        const pokemonDetails = await Promise.all(promises);
        // console.log(pokemonDetails);

        //? Optional || Endzeit für die gesamte Operation --> (wird später entfernt)
        // const endTime = new Date();
        // console.log(`Total time to fetch all Pokemon: ${(endTime - startTime) / 1000}s`);

        return pokemonDetails;
    }
    catch (error)
    {
        console.error("An error occurred while fetching Pokemon data:",
            error.message,
            {
                source: pokeApiUrl,
                // timestamp: new Date().toISOString(),
            });
        throw error;
    }

}

//! des häs aktual kene verwendung mähr, do de tests berräts objeschlosse sin
// fetchFirst151Pokemon();

//! Nützliche Information von Andre
//* @Update --> Wurde nachträglich durch TestsDurchläufe, erfolgreich implementiert
//? Es wäre ganz gut, wenn ich mit setter und getter ein true oder false setze, 
//? damit z.B. ein Pokemon by ID z.B. selected werden kann und dann den zusätzlichen wert :true bekommen kann,
//? damit man es in favoriten anzeigen kann
//? und halt auch den wert in dem lokal storage wieder auf false setzen kann

//Todo: Bilder/Grafiken von den ganzen Typen besorgen, z.B. Grass, Feuer, Elektro, Psycho
//Todo: Die API nach den geheimen Bildern durchforsten 😎
//Todo: Finde den geheimen PokemonBall der sich so cool animiert 😎