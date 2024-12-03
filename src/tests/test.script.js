import { fetchAllPokemon } from "../services/pokemonApi.js";
import { saveToLocalStorage, getAllPokemon, setFavorite, getFavorites, removeFavorite } from "../helper/storageWorker.js";

const output = document.getElementById("output");

//? TestFunktion um alle Pokemons zu fetchen
async function testFetchAllPokemon()
{
    console.log("Fetching all Pokemon...");
    const pokemonList = await fetchAllPokemon();
    console.log("Fetched Pokemon List:", pokemonList);

    if (!Array.isArray(pokemonList) || pokemonList.length === 0)
    {
        console.error("No Pokemon data to save!");
        return;
    }

    saveToLocalStorage(pokemonList);
    console.log("Saved Pokemon List to Local Storage!");
    output.textContent = "Fetched and saved all Pokemon!";
}

//? TestFunktion um Glumanda mit der ID "4" als Favorit hinzuzufügen
function testSetFavorite()
{
    console.log("Setting favorite...");
    setFavorite(4, true); //? Setzt Glumanda (ID: 4) als Favorit
    const updatedList = getAllPokemon();
    console.log("Updated Pokemon List:", updatedList);
    output.textContent = "Set charmander (ID: 4) as favorite!";
}

//? TestFunktion um die Favoriten abzurufen
function testGetFavorites()
{
    console.log("Getting favorites...");
    const favorites = getFavorites();
    console.log("Favorites:", favorites);
    output.textContent = JSON.stringify(favorites, null, 2);
}

//? TestFunktion um einen Favoriten zu entfernen
function testRemoveFavorite()
{
    console.log("Removing favorite...");
    removeFavorite(4); //? Entfernt Glumanda (ID: 4) aus den Favoriten
    const updatedList = getAllPokemon();
    console.log("Updated Pokemon List:", updatedList);
    output.textContent = `Removed "charmander" (ID: 4) from favorites!`;
}

//? TestFunktion um den Lokalen Speicher zu löschen
function clearLocalStorage()
{
    console.log("Clearing Local Storage...");
    localStorage.clear();
    output.textContent = "Local Storage cleared!";
}

//* TestBeispiele für meine aktuellen Tests, damit ich es irgendwie in der EntwicklerConsole vom Browser testen kann
document.getElementById("fetch-all").addEventListener("click", testFetchAllPokemon);
document.getElementById("set-favorite").addEventListener("click", testSetFavorite);
document.getElementById("get-favorites").addEventListener("click", testGetFavorites);
document.getElementById("clear-storage").addEventListener("click", clearLocalStorage);

//TODO: Es fehlte noch die Möglichkeit einen Favoriten wieder zu entfernen || @Updated RaTaTa Tam (^_^)
document.getElementById("remove-favorite").addEventListener("click", testRemoveFavorite);

//! _____________________________________________________________________________________

//! Um die Tests im Edge Browser erfolgreich durchzuführen,
//! musste ich folgenden Befehl eingeben, 
//! da es sonst Probleme mit Berechtigungen gibt, gefahr vor Hackern und son Müll 👎👎👎

/*
"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --disable-web-security --user-data-dir="C:/edge-dev"
*/
