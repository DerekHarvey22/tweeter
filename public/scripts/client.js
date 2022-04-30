/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(function() {
//implement redner tweets function
// loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
const renderTweets = function(tweets) {
  for (const post of tweets) {
    console.log(post)
    $('.tweets-container').append(createTweetElement(post));
  }
}
//implement createTweetelement function
const createTweetElement = function (post) {
  
  return $(
      `<article class="post">
        <header class="post-header">
          <div id ="user">
            <i img src="${post.user.avatars}" alt="Profile picture"></i>
            <h2 id='username'> "${post.user.name}" </h2>
          </div>
            <h2 id="userID">${post.user.handle}</h2>
        </header>
        <p>
        ${post.content.text}
        </p>
      <footer>
        <p><small>${timeago.format(post.created_at)}</small></p>
        <div id="user-interaction">
          <i class="fa-solid fa-flag"></i>
              <i class="fa-solid fa-retweet"></i>
              <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
      </article>`
  )
}
//form submission using jquery
const postTweet = function(event) {
  event.preventDefault();
  const formData = $(this).serialize();
  console.log(formData)
  $.ajax({
    method: "POST",
    data: formData,
    url: "/tweets"
  })
}
$("form").submit(postTweet);

const loadTweets = function () {
  $.ajax('./tweets', { method: 'GET'})
  .then(function (data) {
    renderTweets(data)
  })
}
loadTweets()
})




