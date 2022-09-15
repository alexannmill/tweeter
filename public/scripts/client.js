/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(function () {

  const $tweetContainer = $("#tweet-container");
  const $form = $("#form");


  $form.submit((event) => {
    event.preventDefault();
    const text = $("#tweet-text").val()
    //validation of text
    if (text === "" || null) {
     return alert("Not enough Characters")
    }
    if (text.length > 141){
      return alert("Over Character Limit")
    }
    const configData = $form.serialize();
    $.post("/tweets", configData)
    $.ajax({
      type: "GET",
      url: "/tweets",
      success: (data) => 
        loadTweets()
      })
    })
    
  const createTweetElement = (data) => {
    let $tweet = $(`
    <article class="tweet">
      <header class="tweetheader">
        <div class="tweetimgname">
          <img src=${data.user.avatars}>
          <span class="name">${data.user.name}</span>
        </div>
        <span class="handle">${data.user.handle}</span>
      </header>
      <p>
        ${data.content.text}
      </p>
      <footer class="tweetfooter">
        <h6 class="timeago">${timeago.format(data.created_at)}</h6>
        <div class="tweeticons">
          <i class="fa-sharp fa-solid fa-flag"></i>
          <i class="fa-sharp fa-solid fa-retweet"></i>
          <i class="fa-sharp fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>
      `);
    return $tweet;
  };
      
  const $renderTweet = (data) => {
    $tweetContainer.empty();
    data.forEach((tweet) => {
      const $tweet = createTweetElement(tweet);
      $tweetContainer.prepend($tweet);
    });
  };
      
  const loadTweets = () => {
    $.ajax({
      type: "GET",
      url: "/tweets",
      success: (data) => {
        $renderTweet(data);
      }
    })
  };
  loadTweets()      
});
 
