(function(){


const difficulty = document.querySelectorAll('.difficulty');
const startGame = document.getElementById('start');
const cardGrid = document.querySelector('.card-grid');
const elementStart = document.querySelectorAll('.start-items');
const gameControls = document.querySelectorAll('.game-controls');
let timer = document.querySelector("#timer");
let minutesLabel = document.getElementById("minutes");
let secondsLabel = document.getElementById("seconds");

const iconArray = ['gem','bolt','anchor','fish','crown','dragon','moon', 'heart','tree'];
let randomIconArray =[];

let levelSelected = null;
let numberOfCards = null;
let numberMovesMade = 0;
let numberMatchesLeft = null;
let totalSeconds = 0;
let click1 = null;
let click2 = null;


/**
 * Set # of cards based on levelSelected 
 */
function setNumberOfCards(){
    switch(levelSelected){
        case 'easy':
            numberOfCards = 6;
            break;
        case 'medium':
            numberOfCards = 12;
            break;
        case 'hard':
            numberOfCards = 18;
            break;
        default: numberOfCards = 6;
    };
};


/**
 * Create random array of icon names based on numberOfCards
 */
function randomIcons(){
    if (randomIconArray.length > 0){
        randomIconArray.length=0;
    };
    
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


/**
 * Create a div for every card with the icon inside
 */
function createCards(){

    for (let i = 0; i < numberOfCards; i++){
        let card = document.createElement('div');
        let cardInner = document.createElement('div');
        let cardFront = document.createElement('div');
        let cardBack = document.createElement('div');
        let icon = document.createElement('i');

        icon.classList.add('fas');
        icon.classList.add(`fa-${randomIconArray[i]}`);
        cardFront.id = randomIconArray[i];

        cardInner.classList.add('flip-card-inner');
        cardFront.classList.add('flip-card-front');
        cardBack.classList.add('flip-card-back');
        card.classList.add('flip-card');
        
        cardBack.append(icon);
        cardInner.append(cardFront);
        cardInner.append(cardBack);
        card.append(cardInner);
        cardGrid.append(card);
    };
}


function cardsMismatch(card1,card2){
    card1.parentNode.style.transform = "rotateY(0deg)";
    card2.parentNode.style.transform = "rotateY(0deg)";
    numberMovesMade += 1;
    document.getElementById('moves-made').innerText = numberMovesMade;
}


function cardsMatch(card1,card2){
    card1.parentNode.classList.add('visibility-hidden');
    card2.parentNode.classList.add('visibility-hidden');

    numberMatchesLeft -= 1;
    document.getElementById('matches-left').innerText = numberMatchesLeft;

    numberMovesMade += 1;
    document.getElementById('moves-made').innerText = numberMovesMade;

    //If number matches = 0 show congrats screen
    if(numberMatchesLeft===0){
        updateCongratsScreen();
    }
    
}


function updateCongratsScreen(){
    cardGrid.classList.add('display-none');
    document.querySelector('.popup').classList.remove('display-none');
    document.getElementById("startMatches").innerText = numberOfCards/2;
    document.getElementById("finalMove").innerText = numberMovesMade;
    document.getElementById("totalMinutes").innerText = minutesLabel.innerText;
    document.getElementById("totalSeconds").innerText = secondsLabel.innerText;
}

/**
 * Function that starts the timer when the game starts
 */
const startTimer = () => {
    const setTime = () => {
    //I added this code in here (although not used yet) but maybe useful for when the game restarts.
       if (numberMatchesLeft === 0) {
       clearInterval(refreshTimer);
      }
      ++totalSeconds;
      secondsLabel.innerHTML = pad(totalSeconds % 60);
      minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
    };
  
    let refreshTimer = setInterval(setTime, 1000);
    let pad = (val) => {
      let valString = val + "";
      if (valString.length < 2) {
        return "0" + valString;
      } else {
        return valString;
      }
    };
  };


/**
 * Deletes any existing cards in cardGrid area
 */
function clearCards() {
    let cards = document.querySelectorAll(".flip-card");
    if (cards.length > 0) {
      for (let card of cards) {
        // let childCard = cardGrid.firstChild;
        cardGrid.remove(card);
      }
    }
}  


/**
 * 
 */
difficulty.forEach(level => level.addEventListener('click',(event) => {
    //if level has been picked already, undo previous color 
    if(levelSelected){
        document.getElementById(`${levelSelected}`).classList.remove('buttonSelectBackground');
        
    }
    //Otherwise set background and read in difficulty level
    event.target.classList.add('buttonSelectBackground');
    levelSelected = event.target.id;

}));


/**
 * 
 */
startGame.addEventListener('click',() => {
    //If cards exist then exit event
    let cards = document.querySelectorAll('.flip-card');
    if (cards.length > 0){
        
    }else{
        //Hide start-items
        elementStart.forEach(element => {
            element.classList.add("display-none");
        });

        //Unhide game controls
        gameControls.forEach(element => {
            element.classList.remove("display-none");
        });

        //Call Number of Cards function
        setNumberOfCards();
        
        //Run random icon function to get new random array
        randomIcons();

        //Set initial # of matches at start
        numberMatchesLeft = numberOfCards/2;
        document.getElementById('matches-left').innerText = numberMatchesLeft;

        //Start timer when game is started
        startTimer();

        //Create new cards
        createCards();
        
    }

});


/**
 * 
 */
cardGrid.addEventListener("click", (event) => {
    if(event.target===cardGrid){

    } else {
        event.target.parentNode.style.transform = "rotateY(180deg)";
        // event.target.childNode.style.transform = "rotateY(180deg)";
        if(click1 && click2){
            click1 = event.target;
            click2 = null;
        } else{
            if (!click1){
                click1 = event.target;
            }
            else if (!click2){
                click2 = event.target;
        
                setTimeout( () => {
                    if(click1.id !== click2.id){
                        cardsMismatch(click1, click2);
                    }else{
                        cardsMatch(click1, click2);
                    }
                }, 1000);
            }
        }
    }
    
})
  
})();