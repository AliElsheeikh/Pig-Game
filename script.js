'use strict';
//go to "screenshots/pig-game-flowchart.png" to understand the structure
//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const dice = document.querySelector('.dice');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

let score, currentScore, activePlayer, playing;

//Starting condition
const init = function () {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  dice.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer == 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

//----------------------------------------------------------------
//btn Roll
btnRoll.addEventListener('click', function () {
  if (playing) {

    //Generate random dice roll 
    const ranDice = Math.floor(Math.random() * 6) + 1;

    //Display dice roll
    dice.classList.remove('hidden');
    dice.src = `image/dice-${ranDice}.png`;

    //chick for rolled 1
    if (ranDice != 1) {
      //add dice to current score player
      currentScore += ranDice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;

    } else {
      //switch to next player 
      switchPlayer();


    }
  }

});

//----------------------------------------------------------------
//btn Hold
btnHold.addEventListener('click', function () {
  if (playing) {

    //add current score to active player
    score[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent = score[activePlayer];

    //chick if player's score >=100
    if (score[activePlayer] >= 100) {
      playing = false;
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
      dice.classList.add('hidden');
      btnHold.removeEventListener('click');

    } else {
      switchPlayer();

    }

  }

});

//----------------------------------------------------------------
btnNew.addEventListener('click', init);