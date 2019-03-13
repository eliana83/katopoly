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
        function checkLandingPosition(players[p]): the function checks current and previous position of the 
                                                player to verify if they landed on some special positions
                                                (go, go to jail, income tax, luxury tax). Related actions are performed
    
        input: player               single player object.
    */
   checkLandingPosition(player) {
    let goPos = 0, incomeTaxPos = 4, jailPos = 10, goToJailPos = 30, luxuryTaxPos = 38;
    let goAmount = 200, luxuryTaxAmount = 75;

    if ((player.currentPosition < player.prevPosition) || (player.currentPosition === goPos)) {
        player.balance = player.balance + goAmount;
        console.log('Player ' + player.name + ' passed over go, balance = ' + player.balance);
    }
    else {
        switch (player.currentPosition) {
            case goToJailPos: //go to jail
                player.currentPosition = jailPos;
                console.log('Player ' + player.name + ' landed on go to jail')
                break;
            case incomeTaxPos: //income tax
                incomeTaxAmount = computeIncomeTaxAmount(player.balance); //calculate correct amount
                player.balance = player.balance - incomeTaxAmount;
                console.log('Player ' + player.name + ' landed on income tax')
                break;
            case luxuryTaxPos:
                player.balance = player.balance - luxuryTaxAmount;
                console.log('Player ' + player.name + ' landed on Luxury tax, balance = ' + player.balance);
                break;
            //Go 0 +200, Go To Jail 30, Income Tax 4 10% fino a max 200, Luxury Tax 38 -75
            default:
                break;

        }
    }

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
                let doubleDice = true;
                while (doubleDice) {  // Inserted to satisfy this "Player passes go twice during a turn. Their balance increases by $200 each time for a total change of $400." (Player should be very lucky!)
                    doubleDice = false;
                    firstDiceValue = diceRoll();
                    secondDiceValue = diceRoll();
                    
                    if (firstDiceValue === secondDiceValue) {
                        doubleDice = true;
                        console.log('Double dice value! You can roll again!')
                    }
                    diceScore = firstDiceValue + secondDiceValue; 
                    //players[p].position = Player.getNewPosition(players[p].position, diceScore, maxLocation);
                    Player.getNewPosition(players[p], diceScore, maxLocation);

                    this.checkLandingPosition(players[p]); 

                    players[p].round = round;
                    // console.log('Player ' + players[p].pName + ' scored ' + diceScore + ' and is moving to position ' + players[p].position);
                
                } //while doubleDice
            } // player end
        } // round end
        return { roundNumber: round };

    } ,

     

    
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

   /*
        function computeIncomeTaxAmount(player.balance): returns the correct tax amount to be payed
    
        input: player.balance               player current balance
        
        output: taxAmount                   tax amount to be payed
    */
    function computeIncomeTaxAmount(balance) {
        let maxTaxAmount = 200;
        let taxAmount = 0;
        let taxPercentage = 10/100;

        if (balance === 0) {
            taxAmount = 0;
        }
        else {
            taxAmount = balance * taxPercentage;
            if (taxAmount > maxTaxAmount) {
                taxAmount = maxTaxAmount;       
            }
        }
        console.log('Player balance = ' + balance + ' Tax amount = ' + taxAmount);
        return taxAmount;
                //Income Tax 4 10% fino a max 200, Luxury Tax 38 -75
           
    }
