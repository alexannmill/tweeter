$(document).ready(() => {
  $(".new-tweet").on("input", "textarea",  function(e) { 
    const text = $(this).val().length
    const count = 140 - text
    const form = $(this).parent()
    const section = form.parent()
    const counter = section.find(".counter")
    counter.text(count)
    if (count <=0) {
     $(counter).addClass("overcount")
    } else {
      $(counter).removeClass("overcount")
    }
  });
});


