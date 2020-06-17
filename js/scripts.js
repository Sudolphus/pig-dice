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
  let rollAgain = true;
  while (rollAgain) {
    let dieRoll = game.die.roll();
    if (dieResult(dieRoll)) {
      turnPoints += dieRoll;
    } else {
      turnPoints = 0;
      rollAgain = false;
    }
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
  while (true) {
    const turnPoints = turn(game);
    game.scoreboard.addScore(activePlayer, turnPoints);
    if (game.scoreboard.winDetect()) {
      break;
    }
    activePlayer = playerSwitch(activePlayer);
  }
}
//logic rolling a die, adding the score, detecting a one, play or pass



//logic for the user interface- button for die roll, button for play/pass, showing computer turn to player.


