/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(function() {

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
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
            <i img src="${escape(post.user.avatars)}" alt="Profile picture"></i>
            <h2 id='username'> "${escape(post.user.name)}" </h2>
          </div>
            <h2 id="userID">${escape(post.user.handle)}</h2>
        </header>
        <p>
        ${escape(post.content.text)}
        </p>
      <footer>
        <p><small>${timeago.format(escape(post.created_at))}</small></p>
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

const loadTweets = function () {
  $.ajax('./tweets', { method: 'GET'})
  .then(function (data) {
$('.counter').text('140');
$('#tweet-text').val('');

    renderTweets(data)
  })
}
loadTweets()


const postTweet = function(event) {
  event.preventDefault();
  const formData = $(this).serialize();
  const newTweet = formData.slice(5);

  if (!newTweet) {
    alert("You have a keyboard, don't be afraid to use it!")
    return
  }
  if (newTweet.length > 140 ) {
    alert("Please keep you post to under 140 characters.")
    return
  }
  console.log(formData)
  $.ajax({
    method: "POST",
    data: formData,
    url: "/tweets"
  })
  .then(() => {
    loadTweets();
  })
}
$("form").submit(postTweet);
})






