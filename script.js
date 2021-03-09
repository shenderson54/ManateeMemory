(function(){


// Read in level difficulty buttons and create variable to store selection
const difficulty = document.querySelectorAll('.difficulty');
let levelSelected = null;


difficulty.forEach(level => level.addEventListener('click',(event) => {
    //if no level is selected yet- then set level and highlight selection orange
    if(!levelSelected){
        event.target.classList.add('orangeBackground');
        levelSelected = event.target.getAttribute('id')
    }
    
    //if level has been picked already, undo previous color and reset for new level
    else{
        document.getElementById(`${levelSelected}`).classList.remove('orangeBackground');
        event.target.classList.add('orangeBackground');
        levelSelected = event.target.getAttribute('id');
    }
}))

// Set # of cards switch statement based on levelSelected (hardcode for now)
const numberOfCards = 6;




//Need function to make a random array with doubles of icons, and mixed in a random order...
const iconArray = ['diamond','diamond', 'bolt','bolt', 'anchor','anchor'];




//Read in start button and section for cards to be created in
const startGame = document.getElementById('start');
const cardGrid = document.querySelector('.card-grid');

startGame.addEventListener('click',() => {
    //for every card needed, create a div for it with an icon inside
    for (let i = 0; i < numberOfCards; i++){
        let card = document.createElement('div');
        let icon = document.createElement('i');

        icon.setAttribute('class', `fa fa-${iconArray[i]}`);
        card.setAttribute('id',iconArray[i]);
        card.classList.add('cardBack');
        
        card.append(icon);
        cardGrid.append(card);
    }

});

})();