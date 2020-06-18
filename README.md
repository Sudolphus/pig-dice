# _Pig Dice_

#### _An App for Pigs, 06.17.2020_

#### By _**Micheal Hansen & Teresa Rosinski**_

## Description

_An app that can play the game of Pig Dice, a simple die rolling game. In Pig Dice, a player rolls a die and scores the points shown, then decides whether to keep rolling or hold. A player may roll as many times as they like, but if they roll a one, they lose all points scored that turn, and must pass the die. First player to 100 wins the game._

## Specifications

| Spec | Input | Output |
| :-------------     | :------------- | :------------- |
| **Homepage** | User opens index.html | Homepage with game interface |
| **Program defines a game object containing a scorecard and a die** | User input: None necessary | Output: {scorecard, die} |
| **Program defines a scorecard that keeps track of each player's score** | User input: None necessary | Output: {player: 0, computer: 0} |
| **Program can add points to a player's score** | User input: player + 3 | Output: {player: 3, computer: 0} |
| **Program can detect if a player has a winning score of 100** | Program input: {Player: 103, Computer: 87} | Output: Player Wins! |
| **Program defines a die object** | User input: None necessary | Output: {} |
| **Die object has roll method that returns 1-6** | User input: die.roll() | Output: 4 |
| **Program initializes a new game when a player start** | User input: Clicks New Game Button | Output: Game starts |
| **Program determines whether player or computer goes first through random generation** | User input: None necessary | Output: Player Starts |
| **Program allows active player to roll a die and determine results** | User input: Clicks Roll | Output: 4 -> +4 Points |
| **Program keeps track of points scored in a turn** | User input: None necessary | Output: turn points: 4 |
| **Program allows player to decide to hold or roll again, unless a 1 is rolled** | User input: Player rolls | Output: Roll Again or Hold? |
| **Program adds turn points to a players score when they hold** | User input: Clicks Hold | Output: {player: 4, computer: 0} |
| **Program resets turn points to 0 and ends turn if a 1 is rolled** | User input: Rolls 1 | Output: Points=0, end turn |
| **Program loops until a winner is determined** | User input: None necessary | Output: Next Turn |

## Setup/Installation Requirements

Software Requirements
1. Internet browser
2. A code editor like VSCode or Atom to view or edit the codebase.

Open by downloading:
1. Download this repository onto your computer by clicking the 'clone or download button'
2. Double click index.html to open it in your web browser

Open via Bash/GitBash:
1. Clone this repository onto your computer:
`git clone https://github.com/Sudolphus/pig-dice`
2. Navigate into the `pig-dice` directory in Visual Studio Code or preferred text editor
`code .`
3. Open index.html in Chrome or preferred browser:
`open index.html`

#### To see my live website go to https://sudolphus.github.io/pig-dice/!


## Known Bugs

_None Currently Known_

## Support and contact details

_Please reach out through my GitHub account._

## Technologies Used

* _HTML_
* _CSS (including Bootstrap)_
* _JavaScript (including jQuery)_
* _VSCode_

### License

MIT License.

Copyright (c) 2020 **_Micheal Hansen & Teresa Rosinski_**
