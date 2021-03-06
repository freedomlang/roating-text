function Rotating() {
  // Define option defaults
  var defaults = {
    className: 'rword',
    time: 4000
  }

  // Create options by extending defaults with the passed in arugments
  if (arguments[0] && typeof arguments[0] === "object") {
    this.options = extendDefaults(defaults, arguments[0]);
  }


  // Utility method to extend defaults with user options
  function extendDefaults(source, properties) {
    var property;
    for (property in properties) {
      if (properties.hasOwnProperty(property)) {
        source[property] = properties[property];
      }
    }
    return source;
  }

  var words = document.getElementsByClassName(this.options.className);
  var wordArray = [];
  var currentWord = 0;
  words[currentWord].style.opacity = 1;

  function splitLetters(word) { //split the words to letters
    var content = word.innerHTML;
    word.innerHTML = '';
    var letters = [];
    for (var i = 0; i < content.length; i++) {
      var letter = document.createElement('span');
      letter.className = 'letter';
      letter.innerHTML = content.charAt(i);
      if (letter.innerHTML === " ") //if the letter is a blank, then add a class to it
      {
        letter.className += " blank";
      }
      letter.setAttribute("base-class", letter.className); //store the base class of the element
      word.appendChild(letter);
      letters.push(letter);
    }
    wordArray.push(letters); //store the elements to the array
  }

  function animateLetterOut(cw, i, num) {
    setTimeout(function() { //get the base class and add a class we need
      cw[i].className = cw[i].attributes['base-class'].value + ' out';
    }, (num - i) * 80);
  }

  function animateLetterIn(nw, i, num) {
    setTimeout(function() {
      nw[i].className = nw[i].attributes['base-class'].value + ' in';
    }, 340 + ((num - i) * 80));
  }

  function changeWord() {
    var cw = wordArray[currentWord];
    var nw = currentWord == words.length - 1 ? wordArray[0] : wordArray[currentWord + 1]; //if there is only one word, then the word will be the next word
    for (var i = 0; i < cw.length; i++) {
      animateLetterOut(cw, i, cw.length);
    }
    for (var i = 0; i < nw.length; i++) {
      nw[i].className = 'letter behind'; //make sure the element is at the right station.
      nw[0].parentElement.style.opacity = 1;
      animateLetterIn(nw, i, nw.length);
    }
    currentWord = (currentWord == wordArray.length - 1) ? 0 : currentWord + 1;
  }

  this.init = function() {
    for (var i = 0; i < words.length; i++) {
      splitLetters(words[i]);
    }
    changeWord();
    setInterval(changeWord, this.options.time);
  }

  this.init();
};