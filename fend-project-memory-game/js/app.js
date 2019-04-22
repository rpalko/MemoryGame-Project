
const allCards = [ 'fa-diamond', 'fa-diamond','fa-paper-plane-o', 'fa-paper-plane-o',
                'fa-anchor', 'fa-anchor', 'fa-bolt', 'fa-bolt',
                'fa-cube', 'fa-cube', 'fa-leaf', 'fa-leaf',
                'fa-bicycle', 'fa-bicycle', 'fa-bomb', 'fa-bomb'
              ]; // List of cards.



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



const deck = document.querySelector('.deck');
let startGameButton = document.querySelector('.start-button');

startGameButton.addEventListener('click', function(evt) {
    deck.classList.remove('noClick');
    clockReset();
    movesReset();
    cardsReset();
    starsReset();
    startTimer();
}); // Start button that starts the timer and allows the user to begin turning over cards.



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




// Global Variables
const cards = document.querySelectorAll('.card');
let seconds = 0;
let minutes = 0;
let interval = null;
let timerStatus = "off";
let openCards = [];
let matchedCards = [];
let moves = 0;
let movesInnerHTML = document.querySelector(".moves");
let timeInnerHTML = document.querySelector(".clock")
const starsList = document.querySelectorAll('.stars li');




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
        matchedCards.push(openCards[0]);
        matchedCards.push(openCards[1]);
        console.log(matchedCards.length);
        addMoves();
        checkMoves();
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
          checkMoves();
          openCards=[];
        }, 1000);
        // If the cards are not the same, they will flip back over, and the user has the chance to try again.
        // If two cards are clicked this will count as one move.
      }
  });
}




function timer () {
    seconds++;
    if (seconds/60 ===1) {
      seconds = 0;
      minutes++;

      if (minutes/60 === 1){
        minutes = 0;
      }
    }
    if (seconds < 10) {
      stringSeconds = "0" + seconds.toString();
    } else {
      stringSeconds = seconds;
    }
    if (minutes < 10) {
      stringMinutes = "0" + minutes.toString();
    } else {
      stringMinutes = minutes;
    }
  document.getElementById('clock').innerHTML = stringMinutes + ":" + stringSeconds;
}

function startTimer() {
    if(timerStatus === "off") {
        interval = window.setInterval(timer, 1000);
    }
}






function addMoves() {
  moves++;
  const movesText = document.querySelector('.moves');
  movesText.innerHTML = moves;
} // When this function is called a move will be added to the scoreboard.


let starsLeft = 3;

function checkMoves() {
  if (moves === 10 || moves === 20 || moves === 30) {
    removeStar();
    starsLeft -= 1;
  }
} // Removes a star based on the number of moves.


function removeStar () {
  for (let star of starsList) {
    if (star.className !== 'hide-star') {
      star.classList.add('hide-star');
      break;
    }
  }
} // Remove star function


function stopTimer() {
     window.clearInterval(interval);
     timerStatus = "off";
 } // Stops timer.



document.querySelector('.restart').addEventListener("click", restartGame);
function restartGame () {
  cardsReset();
  clockReset();
  movesReset ();
  starsReset ();
  startTimer();

} // Restarts the game.


function cardsReset () {
    const cards = document.querySelectorAll('.deck li');
    for (let card of cards) {
      card.className = 'card';
      card.style.pointerEvents = "auto";
    }
}// Cards are reset.


function clockReset () {
    stopTimer ();
    let clock = document.querySelector('.clock');
    clock.textContent = "00:00";
    seconds = 0;
    minutes = 0;
} // Resets the clock.

function movesReset () {
    moves = 0;
    document.querySelector('.moves').innerHTML = moves;
} // Resets the moves.

function starsReset () {
    stars = 0;
      const starList = document.querySelectorAll('.stars li');
      for (star of starList) {
        star.style.visibility= 'visible';
      }
} // Resets the stars.





function openModal () {
    const modal = document.querySelector('.modal-background');
    modal.style.visibility = 'visible';
    addModalStats();
}

deck.addEventListener('click', function (e) {
    if (matchedCards.length === 16) {
      openModal();
    }
});

function addModalStats () {
    let starStats = document.querySelector('.modal-stars');
    let movesStats = document.querySelector('.modal-moves');
    let timeStats = document.querySelector('.modal-time');
    let time = document.getElementById("clock").innerHTML;

    starStats.innerHTML = `Stars left: = ${starsLeft}`;
    movesStats.innerHTML = `Moves made: = ${moves}`;
    timeStats.innerHTML = `Time: = ${time}`

} // Adds the user's game statistics to the modal.




document.querySelector('.reset-button').addEventListener("click", restartButton);

function restartButton () {
    const modal = document.querySelector('.modal-background');
    modal.style.visibility = 'hidden';
    matchedCards = [];
    restartGame ();
}
