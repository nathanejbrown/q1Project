$('#inputSentence').on('submit', function(event) {
    event.preventDefault();
    if (localStorage.getItem('wordArray') === null) {
      localStorage.setItem('wordArray', WORDSTOIGNORE);
    }
    if (localStorage.getItem('faves') === null) {
      localStorage.setItem('faves', favorites);
    }
    var dontUseThese = localStorage.getItem('wordArray').split(',');
    var sentence = $('textarea[name=sentence]').val().replace(/[.,\/#!?$%\^&\*;:{}=\-_\'`~()]/g,'').split(' ');
    localStorage.setItem('original', $('textarea[name=sentence]').val());
    //Easter egg////////////
    if (sentence[0] === 'Kanye' && sentence[1] === 'West') {
      window.location.href = 'https://nathanejbrown.github.io/Kanye/';
    }
    if (sentence[0] === 'Tom' && sentence[1] === 'Brady') {
      $('#returnSentence').text('The greatest goddamn quarterback of all time!');
      $('.answer').css('visibility', 'visible');
    } else {
      var newSentence = [];
      sentence.forEach(function(word) {
          if (dontUseThese.indexOf(word.toLowerCase()) > -1) {
            newSentence.push(Promise.resolve(word));
          } else {
            newSentence.push(getAjaxData(word.toLowerCase()));
          }
        });
      Promise.all(newSentence).then(function(combinationOfWords) {
        combinationOfWords = combinationOfWords.join(' ') + '.';
        combinationOfWords = combinationOfWords.charAt(0).toUpperCase() + combinationOfWords.slice(1);
        $('#returnSentence').text('Your Tribbianified sentence is: "' + combinationOfWords + '"');
        $('.answer').css('visibility', 'visible');
        $('.answer').css('display', 'block');
        $('#lastSentence').css('display', 'none');
        $('#faves').css('display', 'none');
        localStorage.setItem('lastSentence', combinationOfWords);
      });
    }
  });

$('#getLastSentence').on('submit', function(event) {
  event.preventDefault();
  var last = localStorage.getItem('lastSentence');
  var original = localStorage.getItem('original');
  $('#faves').css('display', 'none');
  $('#addToFavorites').css('display', 'none');
  $('#lastSentence').text('Your last Tribbianified sentence was: "' + last + '" The sentence you originally entered was "' + original + '"');
  $('.answer').css('display', 'block');
  $('.answer #lastSentence').css('display', 'block');
  $('#returnSentence').text('');
});

$('#texter').on('submit', function(event) {
  event.preventDefault();
  var phone = $('input[name=number]').val();
  var last = localStorage.getItem('lastSentence');
  var text = 'Here is your Tribbianified sentence! "' + last + '"';
  if (isPhoneNumber(phone)) {
    var message = new TextMessage(phone, text);
    sendTextMessage(message);
  } else {
    $('#successOrFail').text('Your phone number must be ten digits long and include only numbers.');
    $('#successOrFail').css('visiblility', 'visible');
  }

});
$('#addToFavorites').on('click', function(event) {
  event.preventDefault();
  var myFaves = localStorage.getItem('faves').split(',');
  var inputSentence = localStorage.getItem('lastSentence');
  myFaves.push(inputSentence);
  localStorage.setItem('faves', myFaves);
});

$('#viewFavorites').on('click', function(event) {
  event.preventDefault();
  var suchFaves = localStorage.getItem('faves').split(',');
  $('#faves ol').empty();
  suchFaves.forEach(function(favorite) {
    $('#faves ol').append('<li>' + favorite + '</li>');
  })
  $('.answer').css('display', 'none');
  $('#faves').css('display', 'inline');
});
