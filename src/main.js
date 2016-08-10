/*jshint esversion: 6 */
const WORDSTOIGNORE = ['it', 'if', 'then', 'the', 'and', 'but', 'or', 'so', 'is', 'my', 'this', 'here', 'a', 'by', 'any', 'would', 'with', 'how', 'as', 'to', 'of', 'got', 'i', 'there', 'on', 'your', 'for', 'they','are','all', 'The'];

var partsOfSpeech = [];

$('#inputSentence').on('submit', function(event) {
    event.preventDefault();
    var sentence = $('textarea[name=sentence]').val().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").split(' ');
    var newSentence = [];
    sentence.forEach(function(word) {
        if (WORDSTOIGNORE.indexOf(word.toLowerCase()) > -1) {
          newSentence.push(Promise.resolve(word));
        } else {
          newSentence.push(getAjaxData(word.toLowerCase()));
        }
      });
    Promise.all(newSentence).then(function(combinationOfWords) {
      combinationOfWords = combinationOfWords.join(' ') + '.';
      combinationOfWords = combinationOfWords.charAt(0).toUpperCase() + combinationOfWords.slice(1);
      $('.answer h2').text('Your Tribbianified sentence is: ' + combinationOfWords);
      $('.answer').css('visibility', 'visible');
      $('#lastSentence').css('visibility', 'hidden');
      localStorage.setItem('lastSentence', combinationOfWords);
    });
  });

$('#getLastSentence').on('submit', function(event) {
  event.preventDefault();
  var last = localStorage.getItem('lastSentence');
  $('#lastSentence').text('Your last Tribbianified sentence was: "' + last + '"');
  $('#lastSentence').css('visibility', 'visible');
  $('.answer').css('visibility', 'hidden');
});

function getAjaxData (word) {
  return new Promise(function(resolve, reject) {
    $.ajax ({
      url: 'http://words.bighugelabs.com/api/2/ba781178cf379a7f5ea7f60910ce5521/' + word + '/json',
      method: 'GET',
      dataType: 'json'
    }).done(function(data) {
      console.log(data);
      resolve(processData(data));
    }).fail(function(error) {
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

$('#texter').on('submit', function(event) {
  event.preventDefault();
  var phone = $('input[name=number]').val();
  var text = 'Here is your Tribbianified sentence! ' + $('.answer h2').text();
  console.log('text', text);
  var message = new TextMessage(phone, text);
  console.log('message', message);
  sendTextMessage(message);
});

function TextMessage (number, message) {
  this.number = number;
  this.message = message;
}
function sendTextMessage(object) {
  return new Promise(function(resolve, reject) {
    $.ajax ({
      url: 'http://textbelt.com/text',
      method: 'POST',
      data: object
    }).done(function(info) {
      if (info.success === true) {
        $('#successOrFail').text('Sent!');
      } else {
        $('#successOrFail').text('Something went wrong, please try again');
      }
    }).fail(function(error) {
      console.log(error);
    });
  });
}
