/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function () {
  const $tweetContainer = $("#tweet-container");
  const $form = $("#form");
  const $post = $(".post");
  $("#CharEmpty").hide();
  $("#CharLimit").hide();
  $(".new-tweet").hide();
  // $("#scroll").hide();

  // form submit, prevent refresh
  $form.submit((event) => {
    event.preventDefault();
    const text = $("#tweet-text").val();
    //conditions and error handling
    if (text === "" || null) {
      $("#CharEmpty").slideDown();
      setTimeout(() => {
        $("#CharEmpty").slideUp();
      }, 4000);
      return;
    }
    if (text.length > 140) {
      $("#CharLimit").slideDown();
      setTimeout(() => {
        $("#CharLimit").slideUp();
      }, 4000);
      return;
    }
    //config of form data and post
    const configData = $form.serialize();
    $.post("/tweets", configData);
    //Ajax get req for tweet db after post
    $.ajax({
      type: "GET",
      url: "/tweets",
      success: () => loadTweets(),
    });
    $("#tweet-text").val("")
  });
//toggle new tweet
  $post.on("click" , () => {
    $(".new-tweet").slideDown()
    $("#tweet-text").focus()
  })
  //creating tweet box for new post via appending
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
    ${escape(data.content.text)}
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
  // protection from xss attacks
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  // render of tweet db and new tweet
  const $renderTweet = (data) => {
    $tweetContainer.empty();
    data.forEach((tweet) => {
      const $tweet = createTweetElement(tweet);
      $tweetContainer.prepend($tweet);
    });
  };
  //Ajax GET for tweet db on page load
  const loadTweets = () => {
    $.ajax({
      type: "GET",
      url: "/tweets",
      success: (data) => {
        $renderTweet(data);
      },
    });
  };
  
  loadTweets();
});

// Scroll Button, Not functional
  // $(window).scroll(function() {
  //   if($(this).scrollTop() > 100) {
  //     $("#scroll").fadeIn();
  //   } else {
  //     $("#scroll").fadeOut();
  //   }
  // $("a#scroll").click(function() {
  //   $("body,html").animate({
  //     scrollTop: 0
  //   }, 200);
  //     return false;
  //   });
  // })