// testArr =   [{},{},{},{}]
// cardBilder\creatCart

const createCard = (pokemon) => {
  // create an html-element
  function createElement(
    typ,
    classString,
    id = -1,
    textContent = "",
    src = ""
  ) {
    const element = document.createElement(typ);
    element.className = classString;

    if (id != -1) {
      element.id = id;
    }

    if (textContent != "") {
      element.textContent = textContent;
    }

    if (textContent === "&hearts;") {
      element.textContent = "♥";
    }

    if (src != "") {
      element.setAttribute("src", pokemon.sprite);
    }

    return element;
  }
  // create card_item
  let card_item = createElement("DIV", "card-item", `poke_${pokemon.id}`);

  // create card_title
  let card_title = createElement("DIV", "card-title");

  // create card_title childs
  let card_title_span_1 = createElement(
    "SPAN",
    "",
    `span_${pokemon.id}_1`,
    pokemon.id
  );

  let card_title_span_2 = createElement(
    "SPAN",
    "",
    `span_${pokemon.id}_2`,
    pokemon.name
  );

  let card_title_span_3 = createElement(
    "SPAN",
    "shine",
    `span_${pokemon.id}_3`
  );

  let card_title_span_4 = createElement(
    "SPAN",
    "",
    `span_${pokemon.id}_4`, //! BUTTON
    "&hearts;"
  );

  // append all card_item childs
  card_title.appendChild(card_title_span_1);
  card_title.appendChild(card_title_span_2);
  card_title.appendChild(card_title_span_3);
  card_title.appendChild(card_title_span_4);

  //create card_image
  let card_image = createElement("DIV", "card-image");

  //create card_image child
  let card_img = createElement("IMG", "", "", "", pokemon.sprite);

  // append card_item child
  card_image.appendChild(card_img);

  //create card_type
  let card_type = createElement("DIV", "card-power", "", "", ""); //!card-power

  //create all card_type childs and append to parent
  pokemon.types.forEach((type) => {
    let card_type_span = createElement("SPAN", "", "", type);
    card_type.appendChild(card_type_span);
  });

  //create card_abitlities
  let card_abitlities = createElement("DIV", "card-text");

  //create all card_abitlities childs and append to parent
  pokemon.abilities.forEach((ability) => {
    let card_abitlities_span = createElement("SPAN", "", "", ability);
    card_abitlities.appendChild(card_abitlities_span);
  });

  // append all card_* to card_item
  card_item.appendChild(card_title);
  card_item.appendChild(card_image);
  card_item.appendChild(card_type);
  card_item.appendChild(card_abitlities);

  return card_item;
};
