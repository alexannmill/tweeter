/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetData ={
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
};


const createTweetElement = () => {
  const $tweet = $(`
  <img src=${tweetData.user.avatars}>
  <span class="name>${tweetData.user.name}</span>
  <span class="handle">${tweetData.user.handle}</span>
    <article class="tweetbody">${tweetData.content}</article>
    <h6 class=timestamp>${tweetData.created_at}`
  )
  return
};

const $tweet = $(`<article class="tweetbody">Hello world</article>`);
const $tweet1 = $(`<article class="tweetbody">Hello world</article>`).text;
// const $tweet = createTweetElement(tweetData)
console.log($tweet);

// $('#tweets-box').append($tweet)