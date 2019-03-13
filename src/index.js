const Player = require('./player');
const Game = require('./game');

// Constant values declarations
let startPos = 0, endPos = 39, maxLocation = 40, minPlayerNum = 2, maxPlayerNum = 8, maxRound = 20;

let playerNames = ['Horse', 'Car'];

//Go 0 +200, Go To Jail 30, Income Tax 4 10% fino a max 200, Luxury Tax 38 -75

checkResult = Game.checkPlayerNumber(playerNames, minPlayerNum, maxPlayerNum);

if (checkResult.requestValid) {
    console.log(checkResult.message);
    // Player order selection
    playerNames = Game.playerOrder(playerNames);

    // Player object initialization
    let players = [];
        
    players = Player.initPlayers(playerNames, maxRound);

    Game.playGame(players, maxRound, maxLocation);
        

}//game end