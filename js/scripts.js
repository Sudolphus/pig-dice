//Business Logic
//Game Objects
function Game() {
  this.die = new Die();
}

Game.prototype.reset = function(pointGoal, dieNumber, playAgainstAI) {
  this.scoreboard = new Scoreboard(pointGoal);
  this.scoreboard.player1Score = 0;
  this.scoreboard.player2Score = 0;
  this.turnPoints = 0;
  this.dieNumber = dieNumber;
  this.AI = playAgainstAI;
  this.AILimit = 20+(10*(this.dieNumber-1));
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
  displayDieRoll(0);
  displayTurnPoints();
  displayScore();
  displayActivePlayer();
  if (game.AI && game.activePlayer === 'player2') {
    AIturn();
  }
}

function roll() {
  let bustFlag = false;
  const busted = $(".busted");
  for (let i = 0; i < game.dieNumber; i++) {
    const dieRoll = game.die.roll();
    displayDieRoll(dieRoll);
    if (dieRoll === 1) {
      bustFlag = true;
      break;
    } else {
      busted.hide();
      game.turnPoints += dieRoll;
    }
  }
  if (bustFlag) {
    busted.show();
    nextTurn();
  } else {
    displayTurnPoints();
  }
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

function newGame(pointGoal, dieNumber, playAgainstAI) {
  game.reset(pointGoal, dieNumber, playAgainstAI);
  game.activePlayer = firstPlayer();
  $(".player1Winner").hide();
  $(".player2Winner").hide();
  displayActivePlayer();
  displayTurnPoints();
  displayScore();
  if (game.AI && game.activePlayer === "player2") {
    AIturn();
  }
}

const AIturn = function() {
  let bustFlag = false;
  let resultsString = '';
  while (game.turnPoints < game.AILimit && bustFlag === false && game.turnPoints+game.scoreboard.player2Score < game.scoreboard.pointGoal) {
    let dieArray = [];
    for (let i = 0; i < game.dieNumber; i++) {
      dieArray.push(game.die.roll());
    }
    for (const die of dieArray) {
      if (die >= 2) {
        game.turnPoints += die;
        resultsString += '<p>AI rolled ' + die + ' for a total of ' + game.turnPoints + "<br></p>";
      } else {
        game.turnPoints = 0;
        resultsString += "<p>AI rolled a 1! Busted!</p>";
        bustFlag = true;
        break;
      }
    }
  }
  displayAITurn(resultsString);
  if (!bustFlag) {
    hold();
  } else {
    nextTurn();
  }
}

//UI Logic
const gatherNewGameInputs = function() {
  const pointGoal = parseInt($("select#pointGoal").val());
  const dieNumber = parseInt($("select#dieNumber").val());
  return [pointGoal, dieNumber];
}

const winner = function() {
  if (game.scoreboard.player1Score >= game.scoreboard.pointGoal) {
    $(".player1Winner").show();
  } else {
    $(".player2Winner").show();
  }
  $(".diceInterface").hide();
  $(".winnerInterface").removeClass('col-md-6');
  $(".diceInterface").removeClass('col-md-6');
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
  const dieHeader = $("#resultHeader");
  if (dieRoll === 0) {
    dieHeader.empty();
  }
  if (dieRoll > 0) {
    dieHeader.append(`<img src="img/Dice${dieRoll}.jpg" alt="Picture of a die">`)
  }
}

const displayScore = function() {
  $(".player1TotalScore").text(game.scoreboard.player1Score);
  $(".player2TotalScore").text(game.scoreboard.player2Score);
}

const displayAITurn = function(resultsString) {
  resultsOutput = $('.resultsString');
  resultsOutput.empty();
  resultsOutput.html(resultsString);
}

const beginGame = function(playAgainstAI) {
  const playerInput = gatherNewGameInputs();
  const dieInterface = $(".diceInterface");
  $(".resultsString").empty();
  $(".winnerInterface").addClass('col-md-6');
  $(".gameInterface").show();
  dieInterface.addClass('col-md-6');
  dieInterface.show();
  newGame(playerInput[0], playerInput[1], playAgainstAI);
}

$(document).ready(function() {
  $("#startGameHuman").click(function(event) {
    event.preventDefault();
    beginGame(false);
  })
  $("#startGameAI").click(function(event) {
    event.preventDefault();
    beginGame(true);
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