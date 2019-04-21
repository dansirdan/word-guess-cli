const Word = require("./word.js");
const inquirer = require("inquirer");
const pokemon = require("pokemon");

const words = pokemon.all();
var score = 0;
var shinyScore = 0;
var guessLeft = 10;

function init() {
  score = 0;
  console.log(`\n--?WHO'S THAT POKEMON?--\n`)
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
    console.log("\nGAME OVER\n")
    continueGame();

  } else if (guessLeft > 0) {

    inquirer.prompt([{
        name: "guess",
        message: "\nGuess a Letter: "
      }])
      .then(data => {
        let userGuess = data.guess.toUpperCase();
        console.log(`\n\n`)

        if (userGuess == guessWord.word) {

          console.log("PERFECT CATCH! You guessed the entire Pokemon's name!");
          console.log(`\n*SHINY*${guessWord.word} joins the team!\n`);
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
  guessWord.display();

  if (!guessWord.wordArr.includes(userGuess)) {

    guessLeft--;
    console.log(`Oh shoot, you were so close!`)
    console.log(`\nguesses left: ${guessLeft}\n`);
    guessWord.display();
    guessLetter(guessWord);

  } else {
    guessLetter(guessWord);
  }
  var compareWord = "";

  guessWord.letterArray.forEach(function (thing) {
    let lettersPull = thing.toString();
    compareWord += lettersPull;
  })

  if (guessWord.word == compareWord) {
    console.log(`\n\n${guessWord.word} joins the team!\n\n`);
    score++;
    console.log(`You have successfully captured a Pokemon!\nTotal Count: ${score}\n\nShiny Count: ${shinyScore}`)
    guessWord.letterArray = [];
    guessWord.wordArr = [];
    continueGame();
  };
};

init();