const allCards = [ 'fa-diamond', 'fa-diamond',
                'fa-paper-plane-o', 'fa-paper-plane-o',
                'fa-anchor', 'fa-anchor',
                'fa-bolt', 'fa-bolt',
                'fa-cube', 'fa-cube',
                'fa-leaf', 'fa-leaf',
                'fa-bicycle', 'fa-bicycle',
                'fa-bomb', 'fa-bomb'
              ];



function generateCard(aCard) {
    return`<li class="card"><i class="fa ${aCard}"></i></li>`;
}

function startGame() {
    let deck = document.querySelector('.deck');
    let cardHTML = shuffle(allCards).map(function(xCard){
      return generateCard(xCard);
    });
    deck.innerHTML = cardHTML.join('');
}
startGame(); // Generates all cards, shuffles them, and adds them to the gameboard.


function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
} // Shuffle function from http://stackoverflow.com/a/2450976

const cards = document.querySelectorAll('.card');
let openCards = [];
let moves = 0;


/*function startTimer() {
  time = 0;
  let clockID = setTimeOut (() => {
    time++;
    console.log('1 second has passed');
  }, 1000);
}
startTimer(); // Starts the timer for the game.
*/

function addMoves() {
  moves++;
  const movesText = document.querySelector('.moves');
  movesText.innerHTML = moves;
} // When this function is called a move will be added to the scoreboard.


  for (let card of cards) {
    card.addEventListener('click', function(evt) {

      if (openCards.length < 2) {
        card.classList.add('open', 'show');
        openCards.push(card);
        this.style.pointerEvents = "none";
      } // If only two separate cards are clicked, they will flip.

      if(openCards.length === 2 && openCards[0].firstElementChild.className === openCards[1].firstElementChild.className){
        openCards[0].classList.add('match');
        openCards[1].classList.add('match');
        addMoves();
        openCards = [];
        // If the two cards are the same, the class 'match' will be added to each card, transforming each card to indicate they are a match.
        // If two cards are clicked this will count as 1 move.

      } else if (openCards.length === 2 && openCards[0].firstElementChild.className != openCards[1].firstElementChild.className){
        setTimeout(function remove(){
          openCards[0].classList.remove('open', 'show');
          openCards[1].classList.remove('open', 'show');
          openCards[0].style.pointerEvents = "auto";
          openCards[1].style.pointerEvents = "auto";
          addMoves();
          openCards=[];
        }, 1000);
        // If the cards are not the same, they will flip back over, and the user has the chance to try again.
        // If two cards are clicked this will count as one move.
      }
  });
}




let restart = document.querySelector(".restart");

restart.addEventListener("click", function (e) {
  startGame();
  let moves = 0;
}); // When the restart button is clicked it will refresh the game board and return to the original game layout.




function gameOver() {

} // If user finds all matches

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
