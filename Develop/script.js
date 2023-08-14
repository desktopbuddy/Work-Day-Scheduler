// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  var timeBlocksEl = $('#time-blocks');
  var timeBlockEl; // time block element
  var inputs; // Local storage key
  var timeBlockId; // time block id
  var textVal; // input text

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  timeBlocksEl.on('click', '.saveBtn', function (event) {
    // Get text input and hour id of saved item
    timeBlockEl = $(this).parent(); // time block element of the button clicked
    timeBlockId = timeBlockEl.attr('id'); // corresponding time block id of button
    textVal = timeBlockEl.children('textarea').val() // corresponding text input
    console.log(textVal);

    // if textVal is not empty/null
    if (textVal) {
      // Load local storage
      inputs = JSON.parse(localStorage.getItem("inputs") || "[]");
      console.log(inputs);

      // Update
      // TODO: replace text for existing id
      var inputObj = {
        "id": timeBlockId,
        "text": textVal
      }
      inputs.push(inputObj);
      console.log(inputs); 

      localStorage.setItem("inputs", JSON.stringify(inputs));
    }
  });


  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  var currentHour = parseInt(dayjs().format('H'));
  console.log(timeBlocksEl.children()[1]);

  for (i = 0; i < timeBlocksEl.children().length; i++) {
    // Get id of timeblock
    var iTimeBlockEl = timeBlocksEl.children().eq(i);
    // Get hour from id
    var hourNumber = parseInt(iTimeBlockEl.attr('id').substring(5));

    // Apply past, present, future class
    if(currentHour > hourNumber) {
      iTimeBlockEl.addClass('past');
    } else if(currentHour == hourNumber) {
      iTimeBlockEl.addClass('present');
    } else if(currentHour < hourNumber) {
      iTimeBlockEl.addClass('future');
    }
  }

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  inputs = JSON.parse(localStorage.getItem("inputs"));
  for (i = 0; i < inputs.length; i++) {
    timeBlockId = inputs[i]['id'];
    textVal = inputs[i]['text'];
    timeBlockEl = $("#"+timeBlockId);

    // update textarea on the page
    timeBlockEl.children('textarea').text(textVal);
  }

  // TODO: Add code to display the current date in the header of the page.
  let currentDate = new Date();
  let cDay = currentDate.getDate();
  let cMonth = currentDate.getMonth() + 1;
  let cYear = currentDate.getFullYear();
  $("#currentDay").text(cMonth + "/" + cDay + "/" + cYear);
});
