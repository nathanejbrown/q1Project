function checkForSuccess(input) {
  $('#successOrFail').empty();
  if (input.success === true) {
    $('#successOrFail').text('Sent!');
  } else {
    $('#successOrFail').text('Something went wrong, please try again');
  }
  $('#successOrFail').css('visibility', 'visible');
}

function isPhoneNumber(number) {
  var numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  if (number.length !== 10) {
    return false;
  }
  for (x = 0; x < 10; x++) {
    if (numbers.indexOf(number[x]) === -1)
    return false;
  }
  return true;
}

function onlyAllowOneWord (input) {
  input = input.split(' ');
  if (input.length !== 1) {
    return false;
  } else return true;
}
