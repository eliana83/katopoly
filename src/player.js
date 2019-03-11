
module.exports = {
    /*
        function getNewPosition(playerPosition, diceScore, maxLocation): returns the position of the player after rolling dices
    
        input: playerPosition            playerPosition before rolling dices
        input: diceScore                 total dice result
        input: maxLocation               total number of locations in the board                  
    
        output: updatedPlayerPosition    updatedPlayerPosition after rolling dices
    */
    getNewPosition(playerPosition, diceScore, maxLocation) {
        let newPlayerPosition = 0;
        newPlayerPosition = (playerPosition + diceScore)%maxLocation;

        //console.log('Old player position = ' + playerPosition);
        
        return newPlayerPosition;
    },

    /*
        function initPlayers(playerNames)   Initialise the players array of objects with player name, position and round
    
        input:  playerNames      array containing player names in the correct order
    
        output: players          array of objects with properties {name: player name, position: player position, round: played round}
    */
    initPlayers(playerNames) {
        let players = [];
        for (let i = 0; i < playerNames.length; i++) {
            players.push( {name : playerNames[i], position : 0, round : 0} );
        }
        return players;
    }
    
};
