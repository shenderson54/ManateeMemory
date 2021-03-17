/* eslint-disable */
(function () {
  const difficulty = document.querySelectorAll('.difficulty');
  const startGame = document.getElementById('start');
  const cardGrid = document.querySelector('.card-grid');
  const elementStart = document.querySelectorAll('.start-items');
  const gameControls = document.querySelectorAll('.game-controls');
  const pauseButton = document.querySelector('.pause');
  const startOvrBtn = document.querySelector('.reset-button');
  const playAgainButton = document.getElementById('play-again');
  const minutesLabel = document.getElementById('minutes');
  const secondsLabel = document.getElementById('seconds');
  let pause = false;

  const iconArray = [
    'gem',
    'bolt',
    'anchor',
    'fish',
    'crown',
    'dragon',
    'moon',
    'heart',
    'tree',
    'dove',
  ];
  const randomIconArray = [];

  let levelSelected = null;
  let numberOfCards = null;
  let numberMovesMade = 0;
  let numberMatchesLeft = null;
  let totalSeconds = 0;
  let click1 = null;
  let click2 = null;
  let animationRunning = null;

  //  Set # of cards based on levelSelected
  function setNumberOfCards() {
    switch (levelSelected) {
      case 'easy':
        numberOfCards = 6;
        break;
      case 'medium':
        numberOfCards = 12;
        break;
      case 'hard':
        numberOfCards = 20;
        break;
      default:
        numberOfCards = 6;
        levelSelected = 'easy';
    }
  }

  //  Create random array of icon names based on numberOfCards
  function randomIcons() {
    if (randomIconArray.length > 0) {
      randomIconArray.length = 0;
    }

    //  Add doubles of each icon until number of cards is met
    for (let i = 0; i < numberOfCards / 2; i++) {
      randomIconArray.push(iconArray[i]);
      randomIconArray.push(iconArray[i]);
    }

    //  Randomly mix up the icons using a shuffle algorithm
    for (let i = 0; i < randomIconArray.length - 1; i++) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = randomIconArray[i];
      randomIconArray[i] = randomIconArray[j];
      randomIconArray[j] = temp;
    }
  }

  /**
   * Create a div for every card with the icon inside
   */
  function createCards() {
    for (let i = 0; i < numberOfCards; i++) {
      const card = document.createElement('div');
      const cardInner = document.createElement('div');
      const cardFront = document.createElement('div');
      const cardBack = document.createElement('div');
      const icon = document.createElement('i');

      icon.classList.add('fas');
      icon.classList.add(`fa-${randomIconArray[i]}`);
      cardFront.id = randomIconArray[i];
      icon.setAttribute('alt', `${cardFront.id}`);

      cardInner.classList.add('flip-card-inner');
      cardFront.classList.add('flip-card-front');
      cardBack.classList.add('flip-card-back');
      cardBack.classList.add(`${levelSelected}`);
      card.classList.add('flip-card');
      card.classList.add(`${levelSelected}`);
      cardGrid.classList.add(`${levelSelected}`);
      cardBack.append(icon);
      cardInner.append(cardFront);
      cardInner.append(cardBack);
      card.append(cardInner);
      cardGrid.append(card);
    }
  }

  function pauseResume() {
    if (!pause) {
      //  console.log ('paused')
      document.getElementById('pauseButton').innerText = 'Resume';
      pause = true;
    } else {
      //  console.log ('unpaused');
      startTimer();
      document.getElementById('pauseButton').innerText = 'Pause';
      pause = false;
    }
  }

  //  function that starts the timer when the game starts
  const startTimer = () => {
    const pad = (val) => {
      let valString = val + '';
      if (valString.length < 2) {
        return '0' + valString;
      } else {
        return valString;
      }
    };
    
    const setTime = () => {
      //  Checks for pause
      if (numberMatchesLeft === 0 || pause === true) {
        clearInterval(refreshTimer);
      }
      ++totalSeconds;
      secondsLabel.innerHTML = pad(totalSeconds % 60);
      minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
    };

    let refreshTimer = setInterval(setTime, 1000);
  };

  function updateCongratsScreen() {
    cardGrid.classList.add('display-none');
    document.querySelector('.popup').classList.remove('display-none');
    document.getElementById('startMatches').innerText = numberOfCards / 2;
    document.getElementById('finalMove').innerText = numberMovesMade;
    document.getElementById('totalMinutes').innerText = minutesLabel.innerText;
    document.getElementById('totalSeconds').innerText = secondsLabel.innerText;
    confetti.start(1200, 150);
  }

  function cardsMismatch(card1, card2) {
    card1.parentNode.style.transform = 'rotateY(0deg)';
    card2.parentNode.style.transform = 'rotateY(0deg)';

    numberMovesMade += 1;
    document.getElementById('moves-made').innerText = numberMovesMade;
  }

  function cardsMatch(card1, card2) {
    card1.parentNode.classList.add('visibility-hidden');
    card2.parentNode.classList.add('visibility-hidden');

    numberMatchesLeft -= 1;
    document.getElementById('matches-left').innerText = numberMatchesLeft;

    numberMovesMade += 1;
    document.getElementById('moves-made').innerText = numberMovesMade;

    //  If number matches = 0 show congrats screen
    if (numberMatchesLeft === 0) {
      updateCongratsScreen();
    }
  }

  difficulty.forEach((level) =>
    level.addEventListener('click', (event) => {
      if (levelSelected) {
        document
          .getElementById(`${levelSelected}`)
          .classList.remove('buttonSelectBackground');
      }
      //  Otherwise set background and read in difficulty level
      event.target.classList.add('buttonSelectBackground');
      levelSelected = event.target.id;
    }));

  startGame.addEventListener('click', () => {
    //  If cards exist then exit event
    const cards = document.querySelectorAll('.flip-card');
    if (cards.length > 0) {
    } else {
      //  Show game-controls and hide start-items
      elementStart.forEach((element) => {
        element.classList.add('display-none');
      });
      gameControls.forEach((element) => {
        element.classList.remove('display-none');
      });

      //  Call Number of Cards function
      setNumberOfCards();

      //  Run random icon function to get new random array
      randomIcons();

      //  Start timer when game is started
      startTimer();

      //  Set initial # of matches at start
      numberMatchesLeft = numberOfCards / 2;
      document.getElementById('matches-left').innerText = numberMatchesLeft;

      //  Create a div for every card with the icon inside
      createCards();
    }
  });

  //  Click matching logic
  cardGrid.addEventListener('click', (event) => {
    if (pause === true) {
      startTimer();
      document.getElementById('pauseButton').innerText = 'Pause';
      pause = false;
    }
    if (
      event.target === cardGrid
      || animationRunning
      || event.target.parentNode.className === `card-grid ${levelSelected}`
    ) {
      //  If click is not exactly on a card or animation is ongoing, don't do anything
    } else {
      event.target.parentNode.style.transform = 'rotateY(180deg)';
      if (click1 && click2) {
        click1 = event.target;
        click2 = null;
      } else {
        if (!click1) {
          click1 = event.target;
        } else if (!click2) {
          click2 = event.target;
          animationRunning = true;
          setTimeout(() => {
            if (click1.id !== click2.id) {
              cardsMismatch(click1, click2);
            } else {
              cardsMatch(click1, click2);
            }
            animationRunning = false;
          }, 1000);
        }
      }
    }
  });

  //  Pause resume Timer
  pauseButton.addEventListener('click', () => {
    pauseResume();
  });

  //  Start game over
  startOvrBtn.addEventListener('click', () => {
    location.reload();
  });

  //  Play again button, same as start over button
  playAgainButton.addEventListener('click', () => {
    location.reload();
  });
})();
