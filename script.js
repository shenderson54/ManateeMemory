(function(){


// Create a variable for the difficulty buttons so we can read which one is picked, make an empty level selection variable to save the selection
const difficulty = document.querySelectorAll('.difficulty');
let levelSelected = null;

//Listening to each difficulty button 
difficulty.forEach(level => level.addEventListener('click',(event) => {
    //if new page and no level is selected yet- then set level selected to what was picked and add a background color to show selection
    if(!levelSelected){
        event.target.classList.add('orangeBackground');
        levelSelected = event.target.getAttribute('id')
    }
    
    //if not new page and difficulty has been set before, undo background selection and reset the level to the new value.
    else{
        document.getElementById(`${levelSelected}`).classList.remove('orangeBackground');
        event.target.classList.add('orangeBackground');
        levelSelected = event.target.getAttribute('id');
    }
}))

// Set # of cards switch statement based on levelSelected (hardcode for now)
const numberOfCards = 6;
const startGame = document.getElementById('start');
const cardGrid = document.querySelector('.card-grid');
startGame.addEventListener('click',() => {

    for (let i = 0; i < numberOfCards; i++){
        let card = document.createElement('div');
        // if (i === randomCell){
        //     card.setAttribute('id','ICONTYPE');
        // };
        card.classList.add('cardBack');
        cardGrid.append(card);
    }

});

})();