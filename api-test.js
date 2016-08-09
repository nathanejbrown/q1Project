var wordsToIgnore = ['it', 'if', 'then', 'the', 'and', 'but', 'or', 'so'];
var partsOfSpeech = [];


$('form').on('submit', function(event) {
  event.preventDefault();
  var sentence = $('input').val().replace(/\./g, '').split(' ');
  console.log(sentence);
  console.log(getAjaxData(sentence));
});
  // $.ajax ({
  //   url: 'http://words.bighugelabs.com/api/2/ba781178cf379a7f5ea7f60910ce5521/' + word + '/json',
  //   method: 'GET',
  //   dataType: 'json'
  // }).done(function(stuff) {
  //   console.log(stuff);
  //   for (pos in stuff) {
  //     $('#pos').append('<option value="' + pos + '">' + pos + '</option>')
  //   }
  //   var partOfSpeech = $('#pos').val();
  //   console.log('pos', stuff.partOfSpeech);
  //   for (type in thingsToAppend) {
  //     $('#synOrAnt').append('<option value="' + type + '">' + type + '</option>')
  //   }
  //   $('#synonyms').text(partOfSpeech);
    // thingsToAppend.forEach(function(word) {
    //   $('#syn').append('<li>' + word + '</li>')
    // })
    // if (antonyms === undefined) {
    //   $('#ant').text('There are no antonyms for ' + word + '.');
    // }
    // else {
    //   antonyms.forEach(function(word) {
    //     $('#onyms').append('<li>' + word + '</li>')
    //   })
    // }
//   }).fail(function (err) {
//     console.log('err', err);
//   })
// })
function getAjaxData (word) {
  $.ajax ({
    url: 'http://words.bighugelabs.com/api/2/ba781178cf379a7f5ea7f60910ce5521/' + word + '/json',
    method: 'GET',
    dataType: 'json'
  }).done(function(data) {
    var info = data;
    for (pos in data) {
      partsOfSpeech.push(pos);
    }
    var random = Math.floor(Math.random() * (partsOfSpeech.length-1));
    console.log(info[partsOfSpeech[random]].syn);
    var pos = partsOfSpeech[random];
    // console.log(info[pos][syn]);
    // var newWord = partsOfSpeech[random].syn[Math.floor(Math.random()*partsOfSpeech[random].syn.length-1)];
    // return newWord;
    })
}
