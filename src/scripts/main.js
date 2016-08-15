/*jshint esversion: 6 */
const WORDSTOIGNORE = ['it', 'if', 'then', 'the', 'and', 'but', 'or', 'so', 'is', 'my', 'this', 'here', 'a', 'by', 'any', 'would', 'with', 'how', 'as', 'to', 'of', 'got', 'i', 'there', 'on', 'your', 'for', 'they','are','all', 'you'];

var partsOfSpeech = [];
var favorites = [];

function getAjaxData (word) {
  return new Promise(function(resolve, reject) {
    $.ajax ({
      url: 'https://words.bighugelabs.com/api/2/ba781178cf379a7f5ea7f60910ce5521/' + word + '/json',
      method: 'GET',
      dataType: 'json'
    }).done(function(data) {
      resolve(processData(data));
    }).fail(function(error) {
      var badWords = localStorage.getItem('wordArray').split(',');
      if (badWords.indexOf(word) === -1) {
        badWords.push(word);
      }
      localStorage.setItem('wordArray', badWords);
      resolve(word);
      console.log(error);
    });
  });
}

function processData(data) {
  for (var pos in data) {
    partsOfSpeech.push(pos);
  }
  var randomPos = partsOfSpeech[randomIndex(partsOfSpeech)];
  if (data[randomPos].hasOwnProperty('syn')) {
    var filler = 'syn';
    var randomWord = randomIndex(data[randomPos].syn);
  } else {
    var filler = 'sim';
    var randomWord = randomIndex(data[randomPos].sim);
  }
  var newWord = data[randomPos][filler][randomWord];
  partsOfSpeech = [];
  return newWord;
}

function randomIndex (array) {
  if (array.length === undefined) {
    console.log(array);
  } else {
    return Math.floor(Math.random() * (array.length));
  }
}

function TextMessage (number, message) {
  this.number = number;
  this.message = message;
}

function sendTextMessage(object) {
  return new Promise(function(resolve, reject) {
    $.ajax ({
      url: 'https://textbelt.com/text',
      method: 'POST',
      data: object
    }).done(function(info) {
      checkForSuccess(info);
    }).fail(function(error) {
      console.log(error);
    });
  });
}
