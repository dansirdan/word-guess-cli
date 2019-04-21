const Letter = require("./letter.js");

function Word(word) {

  this.word = word;
  this.letterArray = [];
  this.wordArr = [];

  this.returnString = function () {
    let guessWord = this.word;
    this.wordArr = guessWord.split("");

    for (let i = 0; i < this.wordArr.length; i++) {

      let rawVal = this.wordArr[i];
      let strVal = rawVal.toUpperCase();
      let newLetter = new Letter(strVal);
      this.letterArray.push(newLetter);
    };
  };

  this.display = function () {
    var placeholder = "";
    this.letterArray.forEach(function (thing) {
      placeholder += " " + thing.toString();
    });
    console.log(placeholder + "\n\n");
  };

  this.checkIt = (userGuess) => {
    // console.log(userGuess);
    for (let i = 0; i < this.letterArray.length; i++) {
      this.letterArray[i].checkVal(userGuess);
    };
  };
};

module.exports = Word;