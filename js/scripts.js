//Business Logic
//Game Objects
function Game() {
  this.scoreboard = new Scoreboard();
  this.die = new Die();
  this.turnPoints = 0;
  this.activePlayer;
}

Game.prototype.reset = function(pointGoal) {
  this.scoreboard.player1Score = 0;
  this.scoreboard.player2Score = 0;
  this.turnPoints = 0;
  this.scoreboard = new Scoreboard(pointGoal);
}

Game.prototype.playerSwitch = function() {
  if (this.activePlayer === 'player1') {
    this.activePlayer = 'player2';
  } else {
    this.activePlayer = 'player1';
  }
}

function Scoreboard(pointGoal) {
  this.player1Score = 0;
  this.player2Score = 0;
  this.pointGoal = pointGoal;
}

Scoreboard.prototype.addScore = function(player, points) {
  if (player === 'player1') {
    this.player1Score += points;
  } else {
    this.player2Score += points;
  }
}

Scoreboard.prototype.winDetect = function() {
  if (this.player1Score >= this.pointGoal || this.player2Score >= this.pointGoal) {
    return true;
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

function nextTurn() {
  game.turnPoints = 0;
  game.playerSwitch();
  displayTurnPoints();
  displayScore();
  displayActivePlayer();
}

function roll() {
  const dieRoll = game.die.roll();
  displayDieRoll(dieRoll);
  if (dieRoll === 1) {
    $(".busted").show();
    nextTurn();
  } else {
    $(".busted").hide();
    game.turnPoints += dieRoll;
  }
  displayTurnPoints();
}

function hold() {
  game.scoreboard.addScore(game.activePlayer, game.turnPoints);
  if (game.scoreboard.winDetect()) {
    displayScore();
    winner();
  } else {
    nextTurn();
  }
}

function newGame(pointGoal) {
  game.reset(pointGoal);
  game.activePlayer = firstPlayer();
  $(".player1Winner").hide();
  $(".player2Winner").hide();
  displayActivePlayer();
  displayTurnPoints();
  displayScore();
}

//UI Logic
const gatherNewGameInputs = function() {
  const pointGoal = parseInt($("select#pointGoal").val());
  return [pointGoal];
}

const winner = function() {
  if (game.scoreboard.player1Score >= game.scoreboard.pointGoal) {
    $(".player1Winner").show();
  } else {
    $(".player2Winner").show();
  }
  $(".diceInterface").hide();
}

const displayActivePlayer = function() {
  playerDisplay = $(".player")
  if (game.activePlayer === 'player1') {
    playerNum = "1";
  } else {
    playerNum = "2";
  }
  playerDisplay.text(playerNum);
}

const displayTurnPoints = function() {
  $(".displayTurnScore").text(game.turnPoints);
}

const displayDieRoll = function(dieRoll) {
  $(".picDie").hide();
  if (dieRoll > 0) {
    $(`#side${dieRoll}`).show();
  }
}

const displayScore = function() {
  $(".player1TotalScore").text(game.scoreboard.player1Score);
  $(".player2TotalScore").text(game.scoreboard.player2Score);
}

$(document).ready(function() {
  $("#startGame").click(function(event) {
    event.preventDefault();
    const playerInput = gatherNewGameInputs();
    $(".gameInterface").show();
    $(".diceInterface").show();
    newGame(playerInput[0]);
  })
  $("#roll").click(function(event) {
    event.preventDefault();
    roll();
  })
  $("#hold").click(function(event) {
    event.preventDefault();
    hold();
  })
})