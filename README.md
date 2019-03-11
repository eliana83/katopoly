katopoly
========

Yet another javascript implementation of Monopoly(R) Kata

## Release 1: Basic Board and Player Movement 
For this first release, we want to be able to support the basic player movement. All players start on the first location. The players' order is initially determined randomly and then maintained for the remainder of the game. Each player takes a turn, during which they roll a pair of dice, move from their current location to a destination calculated based on their current location plus the roll of the dice. The board has a total of 40 locations. When the player reaches the end of the board, s/he starts back at the beginning again. Since this version is so simple, we'll simply play a total of 20 rounds, where a round means every player takes a turn.

#### As a player, I can take a turn so that I can move around the board.
* Player on beginning location (numbered 0), rolls 7, ends up on location 7
* Player on location numbered 39, rolls 6, ends up on location 5

#### As a game, I execute 20 rounds so that I can complete a game.
* Create a game with two players named Horse and Car.
* Try to create a game with < 2 or > 8 players. When attempting to play the game, it will fail.
* Create a game with two players named Horse and Car. Within creating 100 games, both orders [Horse, Car] and [car, horse] occur.

#### As a game, I can have between 2 and 8 players with an initial random ordering.
* Create a game and play, verify that the total rounds was 20 and that each player played 20 rounds.
* Create a game and play, verify that in every round the order of the players remained the same.


## Release 2: Go, Go To Jail, Income Tax, Luxury Tax 
When a player lands on go, they receive $200. When a player passes go, they receive $200. Note they get the money at the time they land on or pass over go, not the next turn. The do not get any money for leaving go (e.g. during the first turn or if they landed on go the previous turn). When a player lands on go to jail, they are moved directly to "Just Visiting". They do not receive any money for passing go since they went directly to just visiting. Note that we are making this simple for now, we deal with the details of jail later. When a player lands on Income Tax, they must pay 20% of their net worth or $200, whichever is the smaller amount (a simplified version of the rule). When a player lands on luxury tax, they must pay $75.

#### As a player, when I land on go I get $200 as my salary for staying in the game.
* During a turn a Player lands on Go and their balance increases by $200.
* During a turn a Player lands on some "normal" location and their balance does not change.

#### As a player, I receive $200 when I pass over Go.
* Player starts before Go near the end of the Board, rolls enough to pass Go. The - - Player's balance increases by $200.
* Player starts on Go, takes a turn where the Player does not additionally land on or pass over Go. Their balance remains unchanged.
* Player passes go twice during a turn. Their balance increases by $200 each time for a total change of $400.

#### As a Player, when I land on Go To Jail during a turn I move directly to Just Visiting.
* Player starts before Go To Jail, lands on Go To Jail, ends up on Just Visiting and their balance is unchanged.
* Player starts before Go To Jail, rolls enough to pass over Go To Jail but not enough to land on or pass over go. Their balance is unchanged and they end up where the should based on what they rolled.

#### As a Player, landing on Income Tax forces me to pay the smaller of 10% of my total worth or $200.
* During a turn, a Player with an initial total worth of $1800 lands on Income Tax. The balance decreases by $180.
* During a turn, a Player with an initial total worth of $2200 lands on Income Tax. The balance decreases by $200.
* During a turn, a Player with an initial total worth of $0 lands on Income Tax. The balance decreases by $0.
* During a turn, a Player with an initial total worth of $2000 lands on Income Tax. The balance decreases by $200.
* During a turn, a Player passes over Income Tax. Nothing happens.

#### As a Player, when I land on Luxury Tax, I pay $75.
* Player takes a turn and lands on Luxury tax. Their balance decreases by $75.
* Player passes Luxury Tax during a turn. Their balance is unchanged.
