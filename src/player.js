
module.exports = {
    /*
        function getNewPosition(player, diceScore, maxLocation): updates current position and previous position of the player after rolling dices
    
        input: player                    player object
        input: diceScore                 total dice result
        input: maxLocation               total number of locations in the board                  
    
    */
    getNewPosition(player, diceScore, maxLocation) {
        player.prevPosition = player.currentPosition;
        player.currentPosition = (player.prevPosition + diceScore)%maxLocation;

        //console.log('Old player position = ' + player.prevPosition + ' New player position = ' + player.currentPosition);
        
    },

    /*
        function initPlayers(playerNames)   Initialise the players array of objects with player name, previous position, current position, balance and round
    
        input:  playerNames      array containing player names in the correct order
    
        output: players          array of objects with properties {name: player name, position: player position, round: played round}
    */
    initPlayers(playerNames) {
        let players = [];
        for (let i = 0; i < playerNames.length; i++) {
            players.push( {name : playerNames[i], prevPosition : -1, currentPosition : 0, balance : 0, round : 0} );
        }
        return players;
    }
    
};
