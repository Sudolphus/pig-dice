//Business Logic
//Game Objects
function Game() {
  this.scoreboard = new Scoreboard();
  this.die = new Die();
}

function Scoreboard() {
  this.player1Score = 0;
  this.player2Score = 0;
}

Scoreboard.prototype.addScore = function(player, points) {
  if (player === 'player1') {
    this.player1Score += points;
  } else {
    this.player2Score += points;
  }
}

Scoreboard.prototype.winDetect = function() {
  if (this.player1Score >= 100) {
    return "player 1 wins";
  } else if (this.player2Score >= 100) {
    return "player 2 wins";
  } else {
    return false;
  }
}

function Die() {
}

Die.prototype.roll = function() {
  return Math.floor(Math.random()*6+1);
}

//Game Logic
function firstPlayer() {
  const coin = Math.floor(Math.random()*2+1);
  if (coin === 1) {
    return "player1";
  } else if (coin === 2) {
    return "player2";
  }
}

function dieResult(dieRoll) {
  if (dieRoll === 1) {
    return false;
  } else {
    return true;
  }
}

function turn(game) {
  let turnPoints = 0;
  displayTurnPoints(turnPoints);
  let rollAgain = true;
  while (rollAgain) {
    let dieRoll = game.die.roll();
    displayDieRoll(dieRoll);
    if (dieResult(dieRoll)) {
      turnPoints += dieRoll;
    } else {
      turnPoints = 0;
      rollAgain = false;
    }
    displayTurnPoints(turnPoints);
    if (rollAgain) {
      rollAgain = confirm("Roll Again?");
    }
  }
  return turnPoints;
}

function playerSwitch(activePlayer) {
  if (activePlayer === 'player1') {
    return 'player2';
  } else {
    return 'player1';
  }
}

function newGame() {
  let game = new Game();
  let activePlayer = firstPlayer();
  displayActivePlayer(activePlayer);
  while (true) {
    const turnPoints = turn(game);
    game.scoreboard.addScore(activePlayer, turnPoints);
    displayScores(game.scoreboard);
    if (game.scoreboard.winDetect()) {
      break;
    }
    activePlayer = playerSwitch(activePlayer);
    displayActivePlayer(activePlayer);
  }
}

//UI Logic
const displayActivePlayer = function(activePlayer) {
  playerDisplay = $(".player")
  if (activePlayer === 'player1') {
    playerNum = "1";
  } else {
    playerNum = "2";
  }
  playerDisplay.text(playerNum);
}

const displayTurnPoints = function(turnPoints) {
  $(".displayTurnScore").text(turnPoints);
}

const displayDieRoll = function(dieRoll) {
  $(".picDie").hide();
  $(`#side${dieRoll}`).show();
}

const displayScore = function(scoreboard) {
  $(".player1TotalScore").text(scoreboard.player1Score);
  $(".player2TotalScore").text(scoreboard.player2Score);
}

$(document).ready(function() {
  $("#startGame").click(function(event) {
    event.preventDefault();
    newGame();
  })
})