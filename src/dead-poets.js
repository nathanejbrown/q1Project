var partsOfSpeech = [];

$('#inputWord').on('submit', function(event) {
  event.preventDefault();
  var word = $('input[name=word]').val();
  if (onlyAllowOneWord(word)) {
    getAjaxData(word).then(function(synonyms) {
      $('.betterWords').css('visibility', 'visible');
      $('#synonyms').text('');
      synonyms.forEach(function(word) {
        $('#synonyms').append('<li>' + word + '</li>');
      })
    });
  } else {
    $('.betterWords').css('visibility', 'visible');
    $('.betterWords h2').text('Sorry, your input must be only one word in length.')
  }
});


function getAjaxData (word) {
  return new Promise(function(resolve, reject) {
    $.ajax ({
    url: 'http://words.bighugelabs.com/api/2/ba781178cf379a7f5ea7f60910ce5521/' + word + '/json',
    method: 'GET',
    dataType: 'json'
  }).done(function(data) {
    resolve(processData(data));
  }).fail(function(error) {
    console.log(error);
  });
})
}

function processData(data) {
  for (var pos in data) {
    partsOfSpeech.push(pos);
  }
    var randomPos = partsOfSpeech[randomIndex(partsOfSpeech)];
    var synonyms = data[randomPos].syn;
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
