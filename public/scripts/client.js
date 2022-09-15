/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// const {
//   createTweetElement,
//   escape,
//   $renderTweet,
//   loadTweets,
//   } = require(".../tweeter/server/lib/util/data-helpers.js")

$(function () {
  const $tweetContainer = $("#tweet-container");
  const $form = $("#form");
  $("#CharEmpty").hide()
  $("#CharLimit").hide()

  $form.submit((event) => {
    event.preventDefault();
    const text = $("#tweet-text").val();
    //validation of text
    
    if (text === "" || null) {
      $("#CharEmpty").slideDown();
      setTimeout(() => {
        $("#CharEmpty").slideUp()
      }, 4000); ;
    }
    if (text.length > 140) {
    $("#CharLimit").slideDown();
    setTimeout(() => {
      $("#CharLimit").slideUp()
    }, 4000); ;
    }
    
    const configData = $form.serialize();
    $.post("/tweets", configData);
    $.ajax({
      type: "GET",
      url: "/tweets",
      success: () => loadTweets(),
    });
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
    
    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
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
      },
    });
  };
  loadTweets();
});
    //     const errCheck = error(text)
    //     console.log('errCheck:', errCheck)
    //     const errMessage = errMsg(errCheck)
    //     console.log('errMessage:', errMessage)
        
    //     const errMsg = (errCheck) => {
    //    const $message = error(text)
    //    if (!message){
    //      return
    //     }
    //     $(".error-handling").append(`
    //     <div class=invalid>
    //     <p>${message}</p>
    //     </div>
    //     `)
    //     $message.slideDown(200);
    //   }
      
    //   const error = (text) => {
    //   let errorMsg = null
    //   if (text === "" || null) {
    //     errorMsg = "Invalid Entry"
    //   } 
    //   if (text.length > 141) {
    //     errorMsg = "Over Character Limit"
    //   } 
    //   return errorMsg
    // }