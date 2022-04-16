//variables

//get day and time
var today = moment().format("MMM Do YY");
var hour = parseInt(moment().format("HH"));
var rowEl = $(".row");
var saveButton = $(".saveBtn");

// var hour = 12;

//display day and time
$("#currentDay").text(today);
$("#currentTime").text(hour);

var localStorageEvents = localStorage.getItem("Events");
if (localStorageEvents) {
  console.log("THERES EVENTS");
  localStorageEvents = JSON.parse(localStorageEvents);
  savedEvents = localStorageEvents;
  for (let i = 0; i < savedEvents.length; i++) {
    console.log(savedEvents[i].id);
    var rowParagraph = $("#" + savedEvents[i].id).children("p");
    console.log(rowParagraph);
    if ($("#" + savedEvents[i].id)) {
      $("#" + savedEvents[i].id)
        .children("p")
        .text(savedEvents[i].event);
    }
  }
} else {
  console.log("NO EVENTS");
  var savedEvents = [{}];
}

var giveClasses = function () {
  for (let i = 9; i <= 17; i++) {
    // console.log(i);
    // console.log($("#" + i).attr("id"));

    if ($("#" + i).attr("id") < hour) {
      //   console.log("LOWER!");
      $("#" + i)
        .children("p")
        .addClass("past");
    } else if ($("#" + i).attr("id") == hour) {
      //   console.log("MATCHES");

      $("#" + i)
        .children("p")
        .addClass("present");
    }
    if ($("#" + i).attr("id") > hour) {
      //   console.log("greater");
      $("#" + i)
        .children("p")
        .addClass("future");
    }
  }
};
giveClasses();

rowEl.on("click", "p", function () {
  console.log($(this).text());
  // get current text of p element
  var currentText = $(this).text().trim();

  // replace p element with a new textarea
  var textInput = $("<textarea>")
    .addClass("list-group-item col-9 description")
    .val(currentText);
  $(this).replaceWith(textInput);

  // auto focus new element
  textInput.trigger("focus");
});

rowEl.on("blur", "textarea", function () {
  // get current value of textarea
  // get current value of textarea
  var text = $(this).val();

  // recreate p element
  var taskP = $("<p>").addClass("list-group-item col-9 description").text(text);

  // replace textarea with new content
  $(this).replaceWith(taskP);

  giveClasses();
});

saveButton.on("click", function () {
  // console.log("clicked!");
  // console.log($(this).prev().text());
  var userEventText = $(this).prev().text();
  // console.log($(this).parent().attr("id"));
  var userEventId = $(this).parent().attr("id");
  var userEventData = {
    id: userEventId,
    event: userEventText,
  };
  savedEvents.push(userEventData);
  localStorage.setItem("Events", JSON.stringify(savedEvents));
});
