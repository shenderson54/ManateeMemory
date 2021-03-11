(function(){
  // Read in level difficulty buttons and create variable to store selection
  const difficulty = document.querySelectorAll(".difficulty");
  let levelSelected = null;
  let numberOfCards = null;

  difficulty.forEach((level) =>
    level.addEventListener("click", (event) => {
      //if level has been picked already, undo previous color
      if (levelSelected) {
        document
          .getElementById(`${levelSelected}`)
          .classList.remove("orangeBackground");
      }
      //Otherwise set background and read in difficulty level
      event.target.classList.add("orangeBackground");
      levelSelected = event.target.id;

      //Call Number of Cards function
      setNumberOfCards();
    })
  );

  // Set # of cards based on levelSelected
  function setNumberOfCards() {
    switch (levelSelected) {
      case "easy":
        numberOfCards = 6;
        break;
      case "medium":
        numberOfCards = 12;
        break;
      case "hard":
        numberOfCards = 18;
        break;
      default:
        numberOfCards = 6;
    }
  }

  //Array of icon names and placeholder for random order array
  const iconArray = [
    "gem",
    "bolt",
    "anchor",
    "fish",
    "crown",
    "dragon",
    "moon",
    "heart",
    "tree",
  ];
  let randomIconArray = [];

  //Create random array of icon names based on numberOfCards
  function randomIcons() {
    //Add doubles of each icon until number of cards is met
    for (let i = 0; i < numberOfCards / 2; i++) {
      randomIconArray.push(iconArray[i]);
      randomIconArray.push(iconArray[i]);
    }

    //Randomly mix up the icons using a shuffle algorithm
    for (let i = 0; i < randomIconArray.length - 1; i++) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = randomIconArray[i];
      randomIconArray[i] = randomIconArray[j];
      randomIconArray[j] = temp;
    }
  }

  //function that starts the timer nested into the startGame function
function startTimer(seconds, container, oncomplete) {
  var startTime,
    timer,
    obj,
    ms = seconds * 1000,
    display = document.getElementById("timer");
  obj = {};
  obj.resume = function () {
    startTime = new Date().getTime();
    timer = setInterval(obj.step, 250); // adjust this number to affect granularity
    // lower numbers are more accurate, but more CPU-expensive
  };
  obj.pause = function () {
    ms = obj.step();
    clearInterval(timer);
  };
  obj.step = function () {
    var now = Math.max(0, ms - (new Date().getTime() - startTime)),
      m = Math.floor(now / 60000),
      s = Math.floor(now / 1000) % 60;
    s = (s < 10 ? "0" : "") + s;
    display.innerHTML = m + ":" + s;
    if (now == 0) {
      clearInterval(timer);
      obj.resume = function () {};
      if (oncomplete) oncomplete();
    }
    return now;
  };
  obj.resume();
  return obj;
}


  //Read in start button and section for cards to be created in
  const startGame = document.getElementById("start");
  const cardGrid = document.querySelector(".card-grid");

  startGame.addEventListener("click", () => {
    //Run random icon function to get new random array
    randomIcons();

    //Start timer
    startTimer(300,0);
    //pause timer
    pause.addEventListener("click", pauseTimer, false);
    //resume timer
    resume.addEventListener("click", resumeTimer, false);

    //Create a div for every card with the icon inside
    for (let i = 0; i < numberOfCards; i++) {
      let card = document.createElement("div");
      let cardInner = document.createElement("div");
      let cardFront = document.createElement("div");
      let cardBack = document.createElement("div");
      let icon = document.createElement("i");

      icon.classList.add("fas");
      icon.classList.add(`fa-${randomIconArray[i]}`);
      card.id = randomIconArray[i];

      cardInner.classList.add("flip-card-inner");
      cardFront.classList.add("flip-card-front");
      cardBack.classList.add("flip-card-back");
      card.classList.add("flip-card");

      cardBack.append(icon);
      cardInner.append(cardFront);
      cardInner.append(cardBack);
      card.append(cardInner);
      cardGrid.append(card);
    }
  });
})();