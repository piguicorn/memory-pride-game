/* flags list for the game */
const prideFlags = [
    "gay",
    "lesbian",
    "asexual",
    "pansexual",
    "transgender",
    "bisexual",
    "genderfluid",
    "agender",
    "aroace",
    "demiboy",
    "demigirl",
    "demisexual",
    "genderqueer",
    "polyamory",
    "aromantic",
    "intersexual",
    "polysexual",
    "demiromantic",
    "gray-asexual",
    "panromantic",
    "non-binary",
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
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.setAttribute("name", card);
    const cardFront = document.createElement("div");
    const cardContent = document.createTextNode(card);
    cardDiv.appendChild(cardContent);
    cardsWrapper.appendChild(cardDiv);

    return cardDiv;
};

document.addEventListener("DOMContentLoaded", function (event) {

    const num = 18; /* number of cards */

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
            if (!deselectRunning && !cardDiv.classList.contains("selected")) {
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
                        selected[0].classList.remove("selected");
                        selected[1].classList.remove("selected");
                    } else {
                        deselectRunning = true;
                        deselect = setTimeout(() => {
                            selected[0].classList.remove("selected");
                            selected[1].classList.remove("selected");
                            deselectRunning = false;
                        }, 1000);
                    }

                    cardsSelected = 0;
                }
            }
        });
    });
});