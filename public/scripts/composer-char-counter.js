$(document).ready(function () {
  $("#tweet-text").keyup(function () {
    let chars = $(this).val().length
    let initalChars = 140
    let currentChars = initalChars - chars
    $('.counter').text(currentChars).toggleClass('warning', currentChars < 0)
   
  })
})