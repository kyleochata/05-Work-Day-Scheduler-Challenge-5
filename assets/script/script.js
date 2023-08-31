// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
/*
```md
GIVEN I am using a daily planner to create a schedule
WHEN I open the planner
THEN the current day is displayed at the top of the calendar
WHEN I scroll down
THEN I am presented with timeblocks for standard business hours
WHEN I view the timeblocks for that day
THEN each timeblock is color coded to indicate whether it is in the past, present, or future
WHEN I click into a timeblock
THEN I can enter an event
WHEN I click the save button for that timeblock
THEN the text for that event is saved in local storage
WHEN I refresh the page
THEN the saved events persist
```
*/

$(document).ready (function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //grab all btns with .saveBtn; on click => save the input and time. Time goes after the parent of save btn (div with id of the hour it represents)
  let saveBtn = $('.saveBtn');
  saveBtn.on('click', function() {
    var item = $(this).siblings('.description').val();
    var time = $(this).parent().attr('id');
    console.log(time);
    localStorage.setItem(JSON.stringify(time), JSON.stringify(item));
  });

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  var today = dayjs();


  const timeCheck = () => {
    let hour = today.hour();

    //loop to grab each .time-block div's id.
    $('.time-block').each(function(){
      //turn the id into an array of strings
      let arrHourID = $(this).attr('id').split("-", [2]);
      console.log(arrHourID);
      //string to number
      arrHourID = parseInt(arrHourID[1]);
      console.log(arrHourID);
      //if conditions to set the background colors
      if (hour === arrHourID) {
        $(this).removeClass('past');
        $(this).removeClass('future');
        $(this).addClass('present')
      } else if (hour < arrHourID) {
        $(this).removeClass('past');
        $(this).removeClass('present');
        $(this).addClass('future');
      } else {
          $(this).removeClass('present');
          $(this).removeClass('future');
          $(this).addClass('past');
        }
      }
    )
  }

  // console.log(hour);
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

$('#hour-9 .description').val(localStorage.getItem('hour-9'));
$('#hour-10 .description').val(localStorage.getItem('hour-10'));
$('#hour-11 .description').val(localStorage.getItem('hour-11'));
$('#hour-12 .description').val(localStorage.getItem('hour-12'));
$('#hour-13 .description').val(localStorage.getItem('hour-13'));
$('#hour-14 .description').val(localStorage.getItem('hour-14'));
$('#hour-15 .description').val(localStorage.getItem('hour-15'));
$('#hour-16 .description').val(localStorage.getItem('hour-16'));
$('#hour-17 .description').val(localStorage.getItem('hour-17'));


  // TODO: Add code to display the current date in the header of the page.

  $('#currentDay').text(today.format('dddd, MMM D YYYY [at] hh:mm:ss a'));

  timeCheck();
})

