$(document).ready(function() {
  const maxTweetLength = 140;
  $('#tweet-text').on('input', function() {
  let remainingCharacters = maxTweetLength - $(this).val().length;
  $(this).next('.tweet-footer').children('.counter').text(remainingCharacters);
  let output = $(this).next().children('output')
  if (remainingCharacters < 0) {
  output.addClass('counter-red');
  }
  if (remainingCharacters >= 0) {
  output.removeClass('counter-red');
  }
  output.text(remainingCharacters);
  })
})