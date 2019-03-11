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
        position: 0,
        round: 0
       },
       {
         name: 'Car',
         position: 0,
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
        position: 0,
        round: 0
       },
       {
         name: 'Car',
         position: 0,
         round: 0
       } ];
       const maxRound = 20;
       const maxLocation = 40;
      const result = game.playGame(players, maxRound, maxLocation);
      expect(players[0].round).to.equal(maxRound);
      expect(players[1].round).to.equal(maxRound);
    });
    
    

});

