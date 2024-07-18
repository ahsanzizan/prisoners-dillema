class PrisonersDilemma {
  constructor() {
    this.payoffMatrix = {
      cooperate: {
        cooperate: [3, 3],
        defect: [0, 5],
      },
      defect: {
        cooperate: [5, 0],
        defect: [1, 1],
      },
    };
  }

  // Simulate a single round
  playRound(player1Choice, player2Choice) {
    const player1Payoff = this.payoffMatrix[player1Choice][player2Choice][0];
    const player2Payoff = this.payoffMatrix[player1Choice][player2Choice][1];
    return [player1Payoff, player2Payoff];
  }

  // Run the game for a specified number of rounds and with given strategies
  runGame(rounds, player1Strategy, player2Strategy) {
    let player1Total = 0;
    let player2Total = 0;
    let player1LastChoice = null;
    let player2LastChoice = null;

    for (let i = 0; i < rounds; i++) {
      const player1Choice = player1Strategy(
        player1LastChoice,
        player2LastChoice
      );
      const player2Choice = player2Strategy(
        player2LastChoice,
        player1LastChoice
      );

      const [player1Payoff, player2Payoff] = this.playRound(
        player1Choice,
        player2Choice
      );
      player1Total += player1Payoff;
      player2Total += player2Payoff;

      player1LastChoice = player1Choice;
      player2LastChoice = player2Choice;

      console.log(`Round ${i + 1}:`);
      console.log(`  Player 1 choice: ${player1Choice}`);
      console.log(`  Player 2 choice: ${player2Choice}`);
      console.log(
        `  Payoff - Player 1: ${player1Payoff}, Player 2: ${player2Payoff}`
      );
    }

    console.log(`\nTotal payoff after ${rounds} rounds:`);
    console.log(`  Player 1: ${player1Total}`);
    console.log(`  Player 2: ${player2Total}`);
  }
}

// Strategy: Always Cooperate
function alwaysCooperate() {
  return "cooperate";
}

// Strategy: Always Defect
function alwaysDefect() {
  return "defect";
}

// Strategy: Tit for Tat
function titForTat(lastOpponentChoice) {
  if (lastOpponentChoice === null) {
    return "cooperate";
  }
  return lastOpponentChoice;
}

// Strategy: Random Choice
function randomChoice() {
  return Math.random() < 0.5 ? "cooperate" : "defect";
}


// Create a new game and run it for 10 rounds with different strategies
const game = new PrisonersDilemma();

console.log("Always Cooperate vs Always Defect:");
game.runGame(10, alwaysCooperate, alwaysDefect);

console.log("\nTit for Tat vs Random Choice:");
game.runGame(10, titForTat, randomChoice);
