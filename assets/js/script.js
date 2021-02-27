let currentDayHolderEl = $('#currentDay');
let hourEl = $('.hour-block');
let currentHour = moment().format('H');
let events = [];
// console.log(moment().format('h'));
// console.log(hourEl);
// console.log(hourEl[0]);

// hourEl[0].classList.add("bg-secondary");
// console.log(hourEl.parent());


// Function to populate current day on page load
let setTime = function() {
    let currentDayTime = moment().format("MMM Do YYYY");
    // console.log(currentDayTime);
    // console.log(currentDayHolderEl[0]);
    currentDayHolderEl[0].innerHTML = currentDayTime;
}

// Properly color timeslots on page load
for (i=0; i < hourEl.length; i++) {
    let currentEl = hourEl[i];
    let currentElHour = parseInt(currentEl.getAttribute('data-value'));
    // console.log(currentElHour);
    // console.log(currentHour);
    // console.log(currentEl.getAttribute('data-value'));
    if( currentElHour < currentHour) {
        currentEl.classList.add('bg-secondary');
        // console.log("Secondary");
    } else if (currentElHour == currentHour) {
        currentEl.classList.add('bg-success');
        // console.log("Success");    
    } else {
        currentEl.classList.add('bg-primary');
        // console.log("Primary");
    }
}

setTime();