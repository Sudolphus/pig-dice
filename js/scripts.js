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

Scoreboard.prototype.addScore(player, points) {
  if (player === 'player1') {
    this.player1Score += points;
  } else {
    this.player2Score += points;
  }
}

Scoreboard.prototype.winDetect() {
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

Die.prototype.roll() {
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

function newGame() {
  let game = new Game();
  const firstPlayer = firstPlayer();
  
}
//logic rolling a die, adding the score, detecting a one, play or pass



//logic for the user interface- button for die roll, button for play/pass, showing computer turn to player.


