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
    cardFront.appendChild(cardName);
    /* back */
    const cardBack = document.createElement("div");
    cardBack.classList.add("card__back");
    const cardBackUnicorn = document.createElement("img");
    cardBackUnicorn.setAttribute("src", "./assets/uniuni.png");
    cardBackUnicorn.classList.add("card__unicorn");
    cardBack.appendChild(cardBackUnicorn);

    cardDiv.appendChild(cardFront);
    cardDiv.appendChild(cardBack);
    cardContainer.appendChild(cardDiv);
    cardsWrapper.appendChild(cardContainer);

    return cardContainer;
};

const play = (num) => {
    const startMenu = document.querySelector(".start-menu");
    const gameMenu = document.querySelector(".game-menu");
    const cardsWrapper = document.querySelector(".cards-wrapper");
    const timer = document.querySelector(".timer");
    const winnerMenu = document.querySelector(".winner");
    const winnerTime = document.querySelector(".time");
    const playAgain = document.querySelector(".play-again");
    const returnToMenu = document.querySelector(".return-menu");

    cardsWrapper.innerHTML = "";
    timer.innerText = "0 s";

    startMenu.style.display = "none";
    winnerMenu.style.display = "none";
    gameMenu.style.display = "block";
    cardsWrapper.style.display = "flex";
    //const num = 14; /* number of cards */

    let seconds = 0;
    let playing = setInterval(() => {
        ++seconds;
        timer.innerText = seconds + " s";

        if (seconds == 240) { /* if the user didn't complete the game in 4 minutes, go back to the menu */
            clearInterval(playing);
            startMenu.style.display = "block";
            winnerMenu.style.display = "none";
            gameMenu.style.display = "none";
            cardsWrapper.style.display = "none";
        }
    }, 1000);

    let matched = 0;

    let cardsSelected = 0; /* check how many cards are selected */
    let deselect; /* deselect is the function will run when the two selected cards don't match */
    let deselectRunning = false;

    const cardsArr = chooseCards(
        chooseFlags(num)
    ); /* get the array of cards we will be playing this game with */

    
    /* now let's create the elements for each card!! */
    cardsArr.forEach((card) => {
        const cardDiv = createCard(card);
        cardDiv.addEventListener("click", () => {
            /* if deselectRunning is true, we have already selected two different cards
                     We need to wait for 'deselect' function to run before selecting a new card */
            if (!deselectRunning) {
                clearTimeout(deselect);
                ++cardsSelected;
                cardDiv.classList.add("selected");

                if (cardsSelected == 2) {
                    const selected = document.querySelectorAll(".selected");

                    if (
                        selected[0].getAttribute("name") == selected[1].getAttribute("name")
                    ) {
                        ++matched;
                        selected[0].classList.add("matched");
                        selected[1].classList.add("matched");
                    }

                    /* 'deselect' removes the selected class from the cards */
                    deselectRunning = true;
                    deselect = setTimeout(() => {
                        selected[0].classList.remove("selected");
                        selected[1].classList.remove("selected");
                        deselectRunning = false;

                        /* if the number of cards that matched are the same as the number of cards,
                                       you won the game!! */
                        if (matched == num / 2) {
                            
                            clearInterval(playing);
                            winnerTime.innerText = seconds + " s";
                            winnerMenu.style.display = "block";

                            playAgain.addEventListener("click", () => play(num));
                            returnToMenu.addEventListener("click", () => {
                                startMenu.style.display = "block";
                                winnerMenu.style.display = "none";
                                gameMenu.style.display = "none";
                                cardsWrapper.style.display = "none";
                            });
                        }
                    }, 1000);

                    cardsSelected = 0;
                }
            }
        });
    });

    const exitBtn = document.querySelector('.exit__btn');
    exitBtn.addEventListener("click", () => {
        clearInterval(playing);
        startMenu.style.display = "block";
        winnerMenu.style.display = "none";
        gameMenu.style.display = "none";
        cardsWrapper.style.display = "none";
    });
}
