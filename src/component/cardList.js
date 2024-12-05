import { createCard } from "./card.js";

export const createCardList = (pokemons) => {
  const card_list = document.getElementById("card-list");
  let isShow = false;
  pokemons.forEach((pokemon) => {
    card_list.appendChild(createCard(pokemon));
    if (isShow === false) {
      isShow = true;
      // console.log(pokemon);
    }
  });
};
