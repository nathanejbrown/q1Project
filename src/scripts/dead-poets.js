var partsOfSpeech = [];
const WORDSTOIGNORE = [];
var wordsToAvoid = [];

$(document).ready(function() {
  if (localStorage.getItem('wordArray') === null) {
    localStorage.setItem('wordArray', WORDSTOIGNORE);
  }
  wordsToAvoid = localStorage.getItem('wordArray').split(',');
});

$('#inputWord').on('submit', function(event) {
  event.preventDefault();
  var word = $('input[name=word]').val();
  if (wordsToAvoid.indexOf(word) > -1) {
    $('.betterWords').css('visibility', 'hidden');
    $('#error-message').text('The word you submitted did not return any results.');
    $('#error-message').css('visibility', 'visible');
  }
  else if (onlyAllowOneWord(word)) {
    getAjaxData(word).then(function(synonyms) {
      $('#error-message').text('');
      $('.betterWords').css('visibility', 'visible');
      $('#synonyms').text('');
      synonyms.forEach(function(word) {
        $('#synonyms').append('<li>' + word + '</li>');
      });
    });
  } else {
    $('#error-message').css('visibility', 'visible');
    $('#error-message').text('Sorry, your input must be only one word in length.');
  }
});

function getAjaxData (word) {
  return new Promise(function(resolve, reject) {
    $.ajax ({
      url: 'https://words.bighugelabs.com/api/2/ba781178cf379a7f5ea7f60910ce5521/' + word + '/json',
      method: 'GET',
      dataType: 'json'
    }).done(function(data) {
      console.log(data);
      resolve(processData(data));
    }).fail(function(error) {
      $('.betterWords').css('visibility', 'hidden');
      $('#error-message').text('The word you submitted did not return any results.');
      $('#error-message').css('visibility', 'visible');
      var wordsToAvoid = localStorage.getItem('wordArray').split(',');
      if (wordsToAvoid.indexOf(word) === -1) {
        wordsToAvoid.push(word);
        localStorage.setItem('wordArray', wordsToAvoid);
      }
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
    var synonyms = data[randomPos].syn;
  } else {
    var synonyms = data[randomPos].sim;
  }
  partsOfSpeech = [];
  return synonyms;
}

function randomIndex (array) {
  return Math.floor(Math.random() * (array.length));
}

//Form validation

function onlyAllowOneWord (input) {
  input = input.split(' ');
  if (input.length !== 1) {
    return false;
  } else return true;
}
