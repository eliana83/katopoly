const expect = require('chai').expect;
const player = require('../src/player');

describe('Player Tests', () => {
  it('should return position 7 when player on position 0 rolls a total of 7', () => {
    const playerPosition = 0;
    const diceScore = 7;
    const maxLocation = 40;
    const result = player.getNewPosition(playerPosition, diceScore, maxLocation);
    expect(result).to.equal(7);
    });

  it('should return position 5 when player on position 39 rolls a total of 6', () => {
    const playerPosition = 39;
    const diceScore = 6
    const maxLocation = 40;
    const result = player.getNewPosition(playerPosition, diceScore, maxLocation);
    expect(result).to.equal(5);
   });

   it('should return an array of objects of the same length as the input', () => {
    const playerNames = ['Horse', 'Car'];
    const result = player.initPlayers(playerNames);
    expect(result.length).to.equal(playerNames.length);
  });

  it('should return an array of objects with property name, position and round', () => {
    const playerNames = ['Horse', 'Car'];
    const result = player.initPlayers(playerNames);
    for (let i = 0; i < playerNames.length; i++) {
      expect(result[i]).to.have.property('name', playerNames[i]);
      expect(result[i]).to.have.property('position', 0);
      expect(result[i]).to.have.property('round', 0);
    }
  });
});

