/*jshint esversion: 6 */
const WORDSTOIGNORE = ['it', 'if', 'then', 'the', 'and', 'but', 'or', 'so', 'is', 'my', 'this', 'here', 'a', 'by', 'any', 'would', 'with', 'how', 'as', 'to', 'of', 'got', 'i', 'there', 'on', 'your', 'for', 'they','are','all', 'you'];

var partsOfSpeech = [];
var favorites = [];

// $('#inputSentence').on('submit', function(event) {
//     event.preventDefault();
//     if (localStorage.getItem('wordArray') === null) {
//       localStorage.setItem('wordArray', WORDSTOIGNORE);
//     }
//     if (localStorage.getItem('faves') === null) {
//       localStorage.setItem('faves', favorites);
//     }
//     var dontUseThese = localStorage.getItem('wordArray').split(',');
//     var sentence = $('textarea[name=sentence]').val().replace(/[.,\/#!?$%\^&\*;:{}=\-_\'`~()]/g,'').split(' ');
//     localStorage.setItem('original', $('textarea[name=sentence]').val());
//     //Easter egg////////////
//     if (sentence[0] === 'Kanye' && sentence[1] === 'West') {
//       window.location.href = 'https://nathanejbrown.github.io/Kanye/';
//     }
//     if (sentence[0] === 'Tom' && sentence[1] === 'Brady') {
//       $('#returnSentence').text('The greatest goddamn quarterback of all time!');
//       $('.answer').css('visibility', 'visible');
//     } else {
//       var newSentence = [];
//       sentence.forEach(function(word) {
//           if (dontUseThese.indexOf(word.toLowerCase()) > -1) {
//             newSentence.push(Promise.resolve(word));
//           } else {
//             newSentence.push(getAjaxData(word.toLowerCase()));
//           }
//         });
//       Promise.all(newSentence).then(function(combinationOfWords) {
//         combinationOfWords = combinationOfWords.join(' ') + '.';
//         combinationOfWords = combinationOfWords.charAt(0).toUpperCase() + combinationOfWords.slice(1);
//         $('#returnSentence').text('Your Tribbianified sentence is: "' + combinationOfWords + '"');
//         $('.answer').css('visibility', 'visible');
//         $('.answer').css('display', 'block');
//         $('#lastSentence').css('display', 'none');
//         $('#faves').css('display', 'none');
//         localStorage.setItem('lastSentence', combinationOfWords);
//       });
//     }
//   });
//
// $('#getLastSentence').on('submit', function(event) {
//   event.preventDefault();
//   var last = localStorage.getItem('lastSentence');
//   var original = localStorage.getItem('original');
//   $('#faves').css('display', 'none');
//   $('#favorites').css('display', 'none');
//   $('#lastSentence').text('Your last Tribbianified sentence was: "' + last + '" The sentence you originally entered was "' + original + '"');
//   $('.answer').css('display', 'block');
//   $('.answer #lastSentence').css('display', 'block');
//   $('#returnSentence').text('');
// });

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

// $('#texter').on('submit', function(event) {
//   event.preventDefault();
//   var phone = $('input[name=number]').val();
//   var text = 'Here is your Tribbianified sentence! ' + $('#returnSentence').text();
//   if (isPhoneNumber(phone)) {
//     var message = new TextMessage(phone, text);
//     sendTextMessage(message);
//   } else {
//     $('#successOrFail').text('Your phone number must be ten digits long and include only numbers.');
//     $('#successOrFail').css('visiblility', 'visible');
//   }
//
// });
// $('#addToFavorites').on('click', function(event) {
//   event.preventDefault();
//   var myFaves = localStorage.getItem('faves').split(',');
//   var inputSentence = localStorage.getItem('lastSentence');
//   myFaves.push(inputSentence);
//   localStorage.setItem('faves', myFaves);
// });
//
// $('#viewFavorites').on('click', function(event) {
//   event.preventDefault();
//   var suchFaves = localStorage.getItem('faves').split(',');
//   suchFaves.forEach(function(favorite) {
//     $('#faves ol').append('<li>' + favorite + '</li>');
//   })
//   $('.answer').css('display', 'none');
//   $('#faves').css('display', 'block');
// });


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

// function checkForSuccess(input) {
//   $('#successOrFail').empty();
//   if (input.success === true) {
//     $('#successOrFail').text('Sent!');
//   } else {
//     $('#successOrFail').text('Something went wrong, please try again');
//   }
//   $('#successOrFail').css('visibility', 'visible');
// }
//
// function isPhoneNumber(number) {
//   var numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
//   if (number.length !== 10) {
//     return false;
//   }
//   for (x = 0; x < 10; x++) {
//     if (numbers.indexOf(number[x]) === -1)
//     return false;
//   }
//   return true;
// }
