/* flags list for the game */
const prideFlags = [
    {
        name: "45XY/46XY",
        img: "45X-46XY-mosaicism.png"
    },
    {
        name: "Achillean",
        img: "achillean.jpg"
    },
    {
        name: "Agender",
        img: "agender.png"
    },
    {
        name: "Ambisexual",
        img: "ambi.png"
    },
    {
        name: "Androgyne",
        img: "androgynesexual.png"
    },
    {
        name: "Aromantic",
        img: "aromantic.jpg"
    },
    {
        name: "Asexual",
        img: "asexual.jpg"
    },
    {
        name: "Bi Gay",
        img: "bi-gay.png"
    },
    {
        name: "Bi Lesbian",
        img: "bi-lesbian.png"
    },
    {
        name: "Bi-pan",
        img: "bi-pan.png"
    },
    {
        name: "Bisexual",
        img: "bisexual.jpg"
    },
    {
        name: "Black Bisexual",
        img: "black-bisexual.png"
    },
    {
        name: "Black Gay",
        img: "black-gay.png"
    },
    {
        name: "Black Lesbian",
        img: "black-lesbian.png"
    },
    {
        name: "Black Pansexual",
        img: "black-pansexual.png"
    },
    {
        name: "Black Polysexual",
        img: "black-polysexual.png"
    },
    {
        name: "Black Transgender",
        img: "black-transgender.png"
    },
    {
        name: "Boi",
        img: "boi.png"
    },
    {
        name: "Demiromantic",
        img: "demiromantic.jpg"
    },
    {
        name: "Demisexual",
        img: "demisexual.jpg"
    },
    {
        name: "Fingender",
        img: "fingender.png"
    },
    {
        name: "Gay",
        img: "gay.png"
    },
    {
        name: "Gay Man",
        img: "gay-man.png"
    },
    {
        name: "Genderfae",
        img: "genderfae.png"
    },
    {
        name: "Genderfaun",
        img: "genderfaun.png"
    },
    {
        name: "Gender Non-Conforming",
        img: "gender-nonconforming.png"
    },
    {
        name: "Gender Questioning",
        img: "gender-questioning.png"
    },
    {
        name: "Gray Asexual",
        img: "gray-asexual.jpg"
    },
    {
        name: "Klinefelter",
        img: "klinefelter.png"
    },
    {
        name: "Lesbian",
        img: "lesbian.png"
    },
    {
        name: "Midgender",
        img: "midgender.png"
    },
    {
        name: "Mingender",
        img: "mingender.png"
    },
    {
        name: "Ningender",
        img: "ningender.png"
    },
    {
        name: "Nonamory",
        img: "nonamory.png"
    },
    {
        name: "Omnique",
        img: "omnique.png"
    },
    {
        name: "Panamory",
        img: "panamory.png"
    },
    {
        name: "Pansexual",
        img: "pansexual.png"
    },
    {
        name: "Polyamory",
        img: "polyamory.png"
    },
    {
        name: "Polysexual",
        img: "polysexual.png"
    },
    {
        name: "Qirl",
        img: "qirl.png"
    },
    {
        name: "Queer",
        img: "queer.png"
    },
    {
        name: "Queer POC",
        img: "queer-poc.png"
    },
    {
        name: "Sapphic",
        img: "sapphic.png"
    },
    {
        name: "Triple X",
        img: "triple-x.png"
    },
    {
        name: "Two Spirits",
        img: "two-spirits.png"
    },
    {
        name: "XXYY",
        img: "xxyy.png"
    },
    {
        name: "XYY",
        img: "xyy.png"
    },
    {
        name: "Intersex",
        img: "intersex.png"
    }
];

/* methods */
const chooseFlags = (numCards) => {
    const numFlags = numCards / 2;
    const flagList = [...prideFlags];
    const chosenFlags = [];

    for (let i = 0; i < numFlags; i++) {
        const randomIndex = Math.floor(Math.random() * flagList.length);
        const chosenFlag = flagList.splice(randomIndex, 1)[0];
        chosenFlags.push(chosenFlag);
    }

    return chosenFlags;
};

const chooseCards = (flags) => {
    const flagsArr = [...flags, ...flags];
    const numCards = flagsArr.length;
    const chosenCards = [];

    while (chosenCards.length < numCards) {
        const randomIndex = Math.floor(Math.random() * flagsArr.length);
        const chosenFlag = flagsArr.splice(randomIndex, 1)[0];
        chosenCards.push(chosenFlag);
    }

    return chosenCards;
};

const createCard = (card) => {
    const cardsWrapper = document.querySelector(".cards-wrapper");
    /* card container */
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card__container");
    cardContainer.setAttribute("name", card.name);
    /* card */
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    /* front */
    const cardFront = document.createElement("div"); 
    cardFront.classList.add("card__front");
    const cardImg = document.createElement("img"); // img
    cardImg.setAttribute("src", `./assets/flags/${card.img}`);
    cardImg.classList.add("card__img");
    const cardName = document.createElement("p"); // name
    cardName.innerText = card.name;
    cardName.classList.add("card__name");
    cardFront.appendChild(cardImg);
    cardFront.appendChild(cardName)
    /* back */
    const cardBack = document.createElement("div");
    cardBack.classList.add("card__back");
    const cardBackUnicorn = document.createElement("img");
    cardBackUnicorn.setAttribute("src", './assets/uniuni.png');
    cardBackUnicorn.classList.add("card__unicorn");
    cardBack.appendChild(cardBackUnicorn)

    cardDiv.appendChild(cardFront);
    cardDiv.appendChild(cardBack);
    cardContainer.appendChild(cardDiv);
    cardsWrapper.appendChild(cardContainer);

    return cardContainer;
};

document.addEventListener("DOMContentLoaded", function (event) {

    const num = 14; /* number of cards */

    let cardsSelected = 0; /* check how many cards are selected */
    let deselect; /* deselect is the function will run when the two selected cards don't match */
    let deselectRunning = false;

    const cardsArr = chooseCards(chooseFlags(num)); /* get the array of cards we will be playing this game with */

    /* now let's create the elements for each card!! */
    cardsArr.forEach((card) => {
        const cardDiv = createCard(card);
        cardDiv.addEventListener("click", () => {
            /* if deselectRunning is true, we have already selected two different cards
               We need to wait for 'deselect' function to run before selecting a new card */
            if (!deselectRunning) {
                console.log('yes')
                clearTimeout(deselect);
                ++cardsSelected;
                cardDiv.classList.add("selected");

                if (cardsSelected == 2) {
                    const selected = document.querySelectorAll(".selected");

                    if (
                        selected[0].getAttribute("name") == selected[1].getAttribute("name")
                    ) {
                        selected[0].classList.add("matched");
                        selected[1].classList.add("matched");
                    } 
                    
                    deselectRunning = true;
                    deselect = setTimeout(() => {
                        selected[0].classList.remove("selected");
                        selected[1].classList.remove("selected");
                        deselectRunning = false;
                    }, 1000);
                    

                    cardsSelected = 0;
                }
            }
        });
    });
});