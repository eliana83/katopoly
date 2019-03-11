const Player = require('./player');


module.exports = {
    /*  function checkPlayerNumber(playerNames, minPlayerNum, maxPlayerNum): check on the number of players
       
        input: playerNames       array containing player names
        input: minPlayerNum      minimum number of players
        input: maxPlayerNum      maximum number of players

        output: requestValid     true if check ok, false if nok
        output: message          output message
    */
    checkPlayerNumber(playerNames, minPlayerNum, maxPlayerNum) {
        if ((playerNames.length < minPlayerNum) || (playerNames.length > maxPlayerNum)) {
            outputMsg = 'Minimum player number is ' + minPlayerNum + ', maximum player number is ' + maxPlayerNum;
            return { requestValid: false, message: outputMsg };
        }
        else {
            outputMsg = 'Let\'s play';
            return { requestValid: true, message: outputMsg };
        }
    },

    /*
        function playerOrder(playerNames): determines the player order by rolling dices
    
        input: playerNames           array of the player names
    
        output: newNames             array of the player names in play order
    */
    playerOrder(playerNames) {
        let playerNum = playerNames.length;
        let diceValues = [];
        
        for (let i = 0; i < playerNum; i++) {
        diceValues.push(diceRoll());
        }
        
        let newNames = [];
        
        for (let i = 0; i < diceValues.length; i++) {
            maxValue = Math.max.apply(null, diceValues); // find the maximum in the array
            // console.log(maxValue);
            maxIdx = diceValues.indexOf(maxValue, 0);
            // console.log(typeof maxIdx);
            diceValues[maxIdx] = 0;
            newNames.push(playerNames[maxIdx]);
            
            // console.log('maxIdx = ' + maxIdx);
        }
    
        console.log('Player order is the following:');
        for (let i = 0; i < playerNum; i++) {
            console.log('-' + newNames[i]);
        }
        
        return newNames;
    } ,  


     /*
        function playGame(players, maxRound, maxLocation): let's play
    
        input: players              array of objects containing player names in correct order, position and round
        input: maxRound             maximum number of allowed rounds
        input: maxLocation          maximum number of locations in the board     
    
        output: roundNumber         last played round number
    */
    playGame(players, maxRound, maxLocation) {
        let round = 0

        for (rr = 1; rr <= maxRound; rr++) {
            round = rr;
            console.log('\nRound ' + round);
    
            for (let p = 0; p < players.length; p++) { 
                firstDiceValue = diceRoll();
                secondDiceValue = diceRoll();
                diceScore = firstDiceValue + secondDiceValue; 
                players[p].position = Player.getNewPosition(players[p].position, diceScore, maxLocation);
                players[p].round = round;
                console.log('Player ' + players[p].name + ' scored ' + diceScore + ' and is moving to position ' + players[p].position);
    
            } // player end
        } // round end
        return { roundNumber: round };

    }
};


/*
    function diceRoll(): returns the value of a dice roll
 
    input: no args
 
    output: diceValue between 1 and 6
*/
function diceRoll() {
    let minDiceVal = 1, maxDiceVal = 6;
    let diceValue = Math.floor(Math.random() * (maxDiceVal - minDiceVal + 1)) + minDiceVal;
    return diceValue;
  }