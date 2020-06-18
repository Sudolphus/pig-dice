//Business Logic
//Game Objects
function Game() {
  this.scoreboard = new Scoreboard();
  this.die = new Die();
  this.activePlayer;
}

Game.prototype.reset() {
  this.scoreboard.player1Score = 0;
  this.scoreboard.player2Score = 0;
}

Game.prototype.playerSwitch() {
  if (this.activePlayer === 'player1') {
    this.activePlayer = 'player2';
  } else {
    this.activePlayer = 'player1';
  }
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
let game = new Game();

function firstPlayer() {
  if (Math.random() > .5) {
    return "player1";
  } else {
    return "player2";
  }
}

function newGame() {
  game.reset();
  game.activePlayer = firstPlayer();
  displayActivePlayer();
}

//UI Logic
const displayActivePlayer = function() {
  playerDisplay = $(".player")
  if (game.activePlayer === 'player1') {
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