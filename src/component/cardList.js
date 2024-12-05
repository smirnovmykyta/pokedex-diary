import { createCard } from "./card.js";

export const createCardList = (pokemons) => {
  const card_list = document.getElementById("card-list");
  card_list.innerHTML = "";
  let isShow = false;
  pokemons.forEach((pokemon) => {
    card_list.appendChild(createCard(pokemon));
    if (isShow === false) {
      isShow = true;
    }
  });
};
