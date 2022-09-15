"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      simulateDelay(() => {
        db.tweets.push(newTweet);
        callback(null, true);
      });
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      simulateDelay(() => {
        const sortNewestFirst = (a, b) => a.created_at - b.created_at;
        callback(null, db.tweets.sort(sortNewestFirst));
      });
    }

  };
}
// const createTweetElement = (data) => {
//   let $tweet = $(`
//   <article class="tweet">
//     <header class="tweetheader">
//       <div class="tweetimgname">
//         <img src=${data.user.avatars}>
//         <span class="name">${data.user.name}</span>
//       </div>
//       <span class="handle">${data.user.handle}</span>
//     </header>
//     <p>
//       ${escape(data.content.text)}
//     </p>
//     <footer class="tweetfooter">
//       <h6 class="timeago">${timeago.format(data.created_at)}</h6>
//       <div class="tweeticons">
//         <i class="fa-sharp fa-solid fa-flag"></i>
//         <i class="fa-sharp fa-solid fa-retweet"></i>
//         <i class="fa-sharp fa-solid fa-heart"></i>
//       </div>
//     </footer>
//   </article>
//     `);
//   return $tweet;
// };

// const escape = function (str) {
//   let div = document.createElement("div");
//   div.appendChild(document.createTextNode(str));
//   return div.innerHTML;
// };

// const $renderTweet = (data) => {
//   $tweetContainer.empty();
//   data.forEach((tweet) => {
//     const $tweet = createTweetElement(tweet);
//     $tweetContainer.prepend($tweet);
//   });
// };

// const loadTweets = () => {
//   $.ajax({
//     type: "GET",
//     url: "/tweets",
//     success: (data) => {
//       $renderTweet(data);
//     },
//   });
// };


// module.exports = {
// createTweetElement,
// escape,
// $renderTweet,
// loadTweets,
// configData,
// }