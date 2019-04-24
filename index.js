const Word = require("./word.js");
const inquirer = require("inquirer");
const pokemon = require("pokemon");
const chalk = require("chalk");
const log = console.log;

const words = pokemon.all();
var score = 0;
var shinyScore = 0;
var guessLeft = 10;

function init() {

  score = 0;
  shinyScore = 0;

  log(chalk.yellow(`\n\n██████╗  ██████╗ ██╗  ██╗███████╗███╗   ███╗ ██████╗ ███╗   ██╗`));
  log(chalk.yellow(`██╔══██╗██╔═══██╗██║ ██╔╝██╔════╝████╗ ████║██╔═══██╗████╗  ██║`));
  log(chalk.yellow(`██████╔╝██║   ██║█████╔╝ █████╗  ██╔████╔██║██║   ██║██╔██╗ ██║`));
  log(chalk.yellow(`██╔═══╝ ██║   ██║██╔═██╗ ██╔══╝  ██║╚██╔╝██║██║   ██║██║╚██╗██║`));
  log(chalk.yellow(`██║     ╚██████╔╝██║  ██╗███████╗██║ ╚═╝ ██║╚██████╔╝██║ ╚████║`));
  log(chalk.yellow(`╚═╝      ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═══╝`));
  log(chalk.yellow(`                     GOTTA CATCH 'EM ALL!                      `));
  log(chalk.green(`\nINSTRUCTIONS`));
  log(chalk.green(`1. Type a 'single' letter into the prompt to attempt a catch of that letter...`));
  log(chalk.green("2. You only have 10 pokeballs to try and 'catch' the Pokemon's full name..."));
  log(chalk.green("3. A successful catch returns a Pokeball to you..."));
  log(chalk.green("4. An unsuccessful catch causes you to lose a Pokeball..."));
  log(chalk.green("5. If you fail to catch the Pokemon's full name, you lose..."));
  log(chalk.green("6. Shiny Pokemon exist.\n\n"));

  newRound()

};

function newRound() {

  guessLeft = 10;
  let word = words[Math.floor(Math.random() * words.length)];
  let guessWord = new Word(word.toUpperCase());
  guessWord.letterArray = [];
  guessWord.wordArr = [];
  guessWord.returnString();
  guessWord.toString();
  guessWord.display();
  guessLetter(guessWord);

};

function guessLetter(guessWord) {

  if (guessLeft < 1) {

    console.log("\n\nYou're out of Pokeballs...\n\n");
    console.log(`${guessWord.word} ran away!\n\n`)
    continueGame();

  } else if (guessLeft > 0) {

    inquirer.prompt([{
        name: "guess",
        message: "Guess a Letter: "
      }])
      .then(data => {

        let userGuess = data.guess.toUpperCase();

        if (Number.isInteger(data.guess)) {
          userGuess = data.guess;
        };

        console.log(`\n\n`)

        if (userGuess == guessWord.word) {

          console.log("PERFECT CATCH! You guessed the entire Pokemon's name!\n");
          log(chalk.red(`        ▄███████████▄`));
          log(chalk.red(`     ▄██▓▓▓▓▓▓▓▓▓▓▓▓▓██▄`));
          log(chalk.red(`  ▄█▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓█▄`));
          log(chalk.red(` ██▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓██`));
          log(chalk.red(`██▓▓▓▓▓▓▓▓▓███████▓▓▓▓▓▓▓▓▓██`));
          log(chalk.red(`██▓▓▓▓▓▓▓▓██     ██▓▓▓▓▓▓▓▓██`));
          log(chalk.white(`███████████   █   ███████████`));
          log(chalk.white(`██░░░░░░░░██     ██░░░░░░░░██`));
          log(chalk.white(`██░░░░░░░░░███████░░░░░░░░░██`));
          log(chalk.white(` ██░░░░░░░░░░░░░░░░░░░░░░░██`));
          log(chalk.white(`   ▀█░░░░░░░░░░░░░░░░░░░█▀`));
          log(chalk.white(`     ▀██░░░░░░░░░░░░░██▀`));
          log(chalk.white(`        ▀███████████▀`));
          console.log(`\n*SHINY*${guessWord.word} joins the team!\n\n`);
          shinyScore++;
          score++;
          console.log(`You have successfully captured a Pokemon!\nTotal Count: ${score}\n\nShiny Count: ${shinyScore}\n`);
          guessWord.letterArray = [];
          guessWord.wordArr = [];
          continueGame();

        } else if (Number.isInteger(userGuess)) {

          console.log(`\n--THAT WOULD BE A NUMBER--`);
          console.log(`\nguesses left: ${guessLeft}\n`);
          checkGuess(guessWord, userGuess);

        } else if (userGuess === "") {

          console.log(`\n--NOTHING? THAT SEEMS POSSIBLE--`);
          console.log(`\nguesses left: ${guessLeft}\n`);
          checkGuess(guessWord, userGuess);

        } else {

          checkGuess(guessWord, userGuess);

        };
      });
  };
};

function continueGame() {
  inquirer.prompt([{
    name: "continue",
    type: "list",
    message: "Play the game again?",
    choices: ["Yes", "No"]
  }]).then(res => {
    if (res.continue === "Yes") {
      newRound();
    } else if (res.continue === "No") {
      console.log("\n\nWe're blasting off again!\n\nThanks for playing!\n\n");
    };
  });
};

function checkGuess(guessWord, userGuess) {
  guessWord.checkIt(userGuess);

  if (!guessWord.wordArr.includes(userGuess)) {

    guessLeft--;
    console.log(`You threw a Pokeball...\n\n(╯°□°)╯︵◓\n\n`)
    console.log(`\nPokeballs left: ${guessLeft}\n`);
    guessWord.display();
    guessLetter(guessWord);

  } else {
    guessWord.display();
    guessLetter(guessWord);
  }
  var compareWord = "";

  guessWord.letterArray.forEach(function (thing) {
    let lettersPull = thing.toString();
    compareWord += lettersPull;
  })

  if (guessWord.word == compareWord) {
    log(`\n${guessWord.word} joins the team!\n`);
    log(chalk.red(`        ▄███████████▄`));
    log(chalk.red(`     ▄██▓▓▓▓▓▓▓▓▓▓▓▓▓██▄`));
    log(chalk.red(`  ▄█▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓█▄`));
    log(chalk.red(` ██▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓██`));
    log(chalk.red(`██▓▓▓▓▓▓▓▓▓███████▓▓▓▓▓▓▓▓▓██`));
    log(chalk.red(`██▓▓▓▓▓▓▓▓██     ██▓▓▓▓▓▓▓▓██`));
    log(chalk.white(`███████████   █   ███████████`));
    log(chalk.white(`██░░░░░░░░██     ██░░░░░░░░██`));
    log(chalk.white(`██░░░░░░░░░███████░░░░░░░░░██`));
    log(chalk.white(` ██░░░░░░░░░░░░░░░░░░░░░░░██`));
    log(chalk.white(`   ▀█░░░░░░░░░░░░░░░░░░░█▀`));
    log(chalk.white(`     ▀██░░░░░░░░░░░░░██▀`));
    log(chalk.white(`        ▀███████████▀`));
    log(`\n\n`);
    score++;
    console.log(`You have successfully captured ${guessWord.word}!\nTotal Count: ${score}\n\nShiny Count: ${shinyScore}\n`)
    guessWord.letterArray = [];
    guessWord.wordArr = [];
    continueGame();
  };
};

init();