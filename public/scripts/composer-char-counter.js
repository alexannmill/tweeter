$(document).ready(() => {
  $(".new-tweet").on("keyup", "textarea", function(e) { 
      console.log(this);
      console.log(this.textLength);
    const text = this.textLength
    const count = 140 - text
    $(".counter").text(count)
    // while (count >=0) {
      
    // }
    });

});