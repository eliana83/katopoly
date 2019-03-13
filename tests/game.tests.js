const expect = require('chai').expect;
const game = require('../src/game');

describe('Game Tests', () => {
    it('should return false is player number is less than 2', () => {
      const playerNames = ['One'];
      const minPlayerNum = 2;
      const maxPlayerNum = 8;
      const result = game.checkPlayerNumber(playerNames, minPlayerNum, maxPlayerNum);
      expect(result).to.have.property('requestValid', false);
      expect(result).to.have.property('message', 'Minimum player number is 2, maximum player number is 8');
    });

    it('should return false if player number is more than 8', () => {
      const playerNames = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven','Eight','Nine'];
      const minPlayerNum = 2;
      const maxPlayerNum = 8;
      const result = game.checkPlayerNumber(playerNames, minPlayerNum, maxPlayerNum);
      expect(result).to.have.property('requestValid', false);
      expect(result).to.have.property('message', 'Minimum player number is 2, maximum player number is 8');
      });

    it('should return true if player number is between 2 and 8', () => {
      const playerNames = ['One', 'Two'];
      const minPlayerNum = 2;
      const maxPlayerNum = 8;
      const result = game.checkPlayerNumber(playerNames, minPlayerNum, maxPlayerNum);
      expect(result).to.have.property('requestValid', true);
      expect(result).to.have.property('message', 'Let\'s play');
      });

    it('should return an array with the same size of the input', () => {
      const playerNames = ['One', 'Two', 'Three'];
      const result = game.playerOrder(playerNames);
      expect(result.length).to.equal(playerNames.length);
      });

    it('should return an array containing the same elements as the input', () => {
      const playerNames = ['One', 'Two', 'Three'];
      const result = game.playerOrder(playerNames);
      expect(result).to.include(playerNames[0]);
      expect(result).to.include(playerNames[1]);
      expect(result).to.include(playerNames[2]);
    });

    it('should return an array containing the same elements as the input', () => {
      const playerNames = ['Horse', 'Car'];
      const result = game.playerOrder(playerNames);
      expect(result).to.include(playerNames[0]);
      expect(result).to.include(playerNames[1]);
    });

    it('should return round = 20', () => {
      const players = [{
        name: 'Horse',
        prevPosition: 0,
        currentPosition: 0,
        balance: 0,
        round: 0
       },
       {
         name: 'Car',
         prevPosition: 0,
         currentPosition: 0,
         balance: 0,
         round: 0
       } ];
      const maxRound = 20;
      const maxLocation = 40;
      const result = game.playGame(players, maxRound, maxLocation);
      expect(result).to.have.property('roundNumber', maxRound);
    });
    
    it('Both players should play 20 rounds', () => {
      const players = [{
        name: 'Horse',
        prevPosition: 0,
        currentPosition: 0,
        balance: 0,
        round: 0
       },
       {
         name: 'Car',
         prevPosition: 0,
         currentPosition: 0,
         balance: 0,
         round: 0
       } ];
       const maxRound = 20;
       const maxLocation = 40;
      const result = game.playGame(players, maxRound, maxLocation);
      expect(players[0].round).to.equal(maxRound);
      expect(players[1].round).to.equal(maxRound);
    });
    
    // Go check
    it('when Player lands on Go, their balance should increase by $200', () => {
      const player = {
        name: 'Horse',
        prevPosition: 0,
        currentPosition: 0,
        balance: 50,
        round: 0
       }
      game.checkLandingPosition(player);
      expect(player).to.have.property('balance', 250);
    });

    it('when Player lands on a position different from go, their balance should not change', () => {
      const player = {
        name: 'Horse',
        prevPosition: 1,
        currentPosition: 7,
        balance: 50,
        round: 0
       }
      game.checkLandingPosition(player);
      expect(player).to.have.property('balance', 50);
    });
    
    it('when Player passes over on Go, their balance should increase by $200', () => {
      const player = {
        name: 'Horse',
        prevPosition: 38,
        currentPosition: 3,
        balance: 50,
        round: 0
       }
      game.checkLandingPosition(player);
      expect(player).to.have.property('balance', 250);
    });

    it('when Player starts on go and does not land or pass over go, their balance should not change', () => {
      const player = {
        name: 'Horse',
        prevPosition: 0,
        currentPosition: 7,
        balance: 50,
        round: 0
       }
      game.checkLandingPosition(player);
      expect(player).to.have.property('balance', 50);
    });

    // Go to jail check
    it('when Player starts before Go To Jail, lands on Go To Jail, ends up on Just Visiting, their balance should not change', () => {
      const player = {
        name: 'Horse',
        prevPosition: 25,
        currentPosition: 30,
        balance: 50,
        round: 0
       }
      game.checkLandingPosition(player);
      expect(player).to.have.property('balance', 50);
      expect(player).to.have.property('currentPosition', 10);
    });

    it('when Player starts before Go To Jail and passes over Go To Jail, their balance should not change and they should land on correct position', () => {
      const player = {
        name: 'Horse',
        prevPosition: 25,
        currentPosition: 32,
        balance: 50,
        round: 0
       }
      game.checkLandingPosition(player);
      expect(player).to.have.property('balance', 50);
      expect(player).to.have.property('currentPosition', 32);
    });


    // Income Tax check
    it('when Player with balance $1800 lands on Income Tax, their balance should decrease by $180 ', () => {
      const player = {
        name: 'Horse',
        prevPosition: 2,
        currentPosition: 4,
        balance: 1800,
        round: 0
       }
      game.checkLandingPosition(player);
      expect(player).to.have.property('balance', 1800 -180);
    });

    it('when Player with balance $2200 lands on Income Tax, their balance should decrease by $200 ', () => {
      const player = {
        name: 'Horse',
        prevPosition: 2,
        currentPosition: 4,
        balance: 2200,
        round: 0
       }
      game.checkLandingPosition(player);
      expect(player).to.have.property('balance', 2000);
    });

    it('when Player with balance $0 lands on Income Tax, their balance should not decrease ', () => {
      const player = {
        name: 'Horse',
        prevPosition: 2,
        currentPosition: 4,
        balance: 0,
        round: 0
       }
      game.checkLandingPosition(player);
      expect(player).to.have.property('balance', 0);
    });

    it('when Player with balance $2000 lands on Income Tax, their balance should decrease by $200 ', () => {
      const player = {
        name: 'Horse',
        prevPosition: 2,
        currentPosition: 4,
        balance: 2000,
        round: 0
       }
      game.checkLandingPosition(player);
      expect(player).to.have.property('balance', 1800);
    });

    it('when Player passes over Income Tax, their balance should not decrease ', () => {
      const player = {
        name: 'Horse',
        prevPosition: 2,
        currentPosition: 5,
        balance: 700,
        round: 0
       }
      game.checkLandingPosition(player);
      expect(player).to.have.property('balance', 700);
    });

    // Luxury Tax check
    it('when Player lands on Luxury Tax, their balance should decrease by $75 ', () => {
      const player = {
        name: 'Horse',
        prevPosition: 32,
        currentPosition: 38,
        balance: 2000,
        round: 0
       }
      game.checkLandingPosition(player);
      expect(player).to.have.property('balance', 2000 -75);
    });
    it('when Player passes Luxury Tax, their balance should not change ', () => {
      const player = {
        name: 'Horse',
        prevPosition: 32,
        currentPosition: 39,
        balance: 2000,
        round: 0
       }
      game.checkLandingPosition(player);
      expect(player).to.have.property('balance', 2000);
    });
});

