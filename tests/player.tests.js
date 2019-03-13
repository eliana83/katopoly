const expect = require('chai').expect;
const player = require('../src/player');

describe('Player Tests', () => {
  it('should return position 7 when player on position 0 rolls a total of 7', () => {
    const playerObj = {
      //name = 'One',
      prevPosition : 0,
      currentPosition : 0,
      balance: 0,
      round : 0
    };
    const diceScore = 7;
    const maxLocation = 40;
    player.getNewPosition(playerObj, diceScore, maxLocation);
    expect(playerObj.currentPosition).to.equal(7);
    });

  it('should return position 5 when player on position 39 rolls a total of 6', () => {
    const playerObj = {
      //name = 'One',
      prevPosition : 36,
      currentPosition : 39,
      balance: 0,
      round : 1
    };
    const diceScore = 6
    const maxLocation = 40;
    player.getNewPosition(playerObj, diceScore, maxLocation);
    expect(playerObj.currentPosition).to.equal(5);
   });

   it('should return an array of objects of the same length as the input', () => {
    const playerNames = ['Horse', 'Car'];
    const result = player.initPlayers(playerNames);
    expect(result.length).to.equal(playerNames.length);
  });

  it('should return an array of objects with property name, prevPosition, currentPosition, position and round', () => {
    const playerNames = ['Horse', 'Car'];
    const result = player.initPlayers(playerNames);
    for (let i = 0; i < playerNames.length; i++) {
      expect(result[i]).to.have.property('name', playerNames[i]);
      expect(result[i]).to.have.property('prevPosition');
      expect(result[i]).to.have.property('currentPosition', 0);
      expect(result[i]).to.have.property('round', 0);
    }
  });

  it('should return an array of objects with property balance', () => {
    const playerNames = ['Horse', 'Car'];
    const result = player.initPlayers(playerNames);
    for (let i = 0; i < playerNames.length; i++) {
      expect(result[i]).to.have.property('balance', 0);
    }
  });
});

