/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(function () {
  const $tweetContainer = $("#tweet-container");
  const $form = $("#form");

  const data = [
    {
      user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@SirIsaac",
      },
      content: {
        text: "If I have seen further it is by standing on the shoulders of giants",
      },
      created_at: 1461116232227,
    },
    {
      user: {
        name: "Descartes",
        avatars: "https://i.imgur.com/nlhLi3I.png",
        handle: "@rd",
      },
      content: {
        text: "Je pense , donc je suis",
      },
      created_at: 1461113959088,
    },
  ];

  $form.submit((event) => {
    event.preventDefault();
    $.ajax({
      type: "GET",
      url: "/tweets",
      success: () => {
        const configData = $form.serialize();
        $.post("/tweets", configData);
        console.log(configData);
      },
    });
  });

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
          <h6 class="timestamp">${data.created_at}</h6>
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
      const $renderTweet = createTweetElement(tweet);
      $tweetContainer.append($renderTweet);
    });
  };
  $renderTweet(data);

});