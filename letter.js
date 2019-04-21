function Letter(strVal) {

  this.strVal = strVal;
  this.booVal = false;

  this.toString = function () {
    if (this.booVal) {
      return this.strVal;
    } else if (!this.booVal) {
      return "_";
    } else if (this.strVal === " ") {
      return " ";
    };
  };

  this.checkVal = function (userGuess) {
    if (userGuess.toUpperCase() === this.strVal) {
      this.booVal = true;
      return true;
    } else {
      return false;
    };
  };

};

module.exports = Letter;