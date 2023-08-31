$(document).ready (function () {

  //grab all btns with .saveBtn; on click => save the input and time. Time goes after the parent of save btn (div with id of the hour it represents)
  let saveBtn = $('.saveBtn');
  saveBtn.on('click', function() {
    var item = $(this).siblings('.description').val();
    var time = $(this).parent().attr('id');
    localStorage.setItem(time, item);
  });

//getting current time and date
  var today = dayjs();

  //setting background color according to current hour
  const timeCheck = () => {
    //only grabbing the hour of the current time
    let hour = today.hour();

    //loop to grab each .time-block div's id.
    $('.time-block').each(function(){
      //turn the id into an array of strings
      let arrHourID = $(this).attr('id').split("-", [2]);
      //string to number
      arrHourID = parseInt(arrHourID[1]);
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

//set textarea to last saved entry if any. Specifies which text areas to target and with what saved item.
$('#hour-9 .description').val(localStorage.getItem('hour-9'));
$('#hour-10 .description').val(localStorage.getItem('hour-10'));
$('#hour-11 .description').val(localStorage.getItem('hour-11'));
$('#hour-12 .description').val(localStorage.getItem('hour-12'));
$('#hour-13 .description').val(localStorage.getItem('hour-13'));
$('#hour-14 .description').val(localStorage.getItem('hour-14'));
$('#hour-15 .description').val(localStorage.getItem('hour-15'));
$('#hour-16 .description').val(localStorage.getItem('hour-16'));
$('#hour-17 .description').val(localStorage.getItem('hour-17'));


//Display date and time at the header
  $('#currentDay').text(today.format('dddd, MMM D YYYY'));

  //call timeCheck fxn to run once CSS loads
  timeCheck();
})

