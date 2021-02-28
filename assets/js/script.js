let currentDayHolderEl = $('#currentDay');
let hourEl = $('.hour-block');
let saveBtnEl = $('.saveBtn');
let currentHour = moment().format('H');
let currentDayTime = moment().format("MMM Do YYYY");
let tasks = [];

// console.log(moment().format('h'));
// console.log(hourEl);
// console.log(hourEl[0]);

// hourEl[0].classList.add("bg-secondary");
// console.log(hourEl.parent());


// Function to populate current day on page load
let setTime = function() {

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

function renderTasksTest() {
    console.log(tasks); 
    var li = document.createElement("li");
    li.textContent = tasks.item;
    // console.log(li);
    // Find parent
    let parentEl = hourEl[(tasks.hour-6)]
    console.log(parentEl);
    parentEl.append(li);
    console.log(parentEl.textContent);  
}

// Render the events as <li> elements
function renderTasks() {
    for(i = 0; i < tasks.length; i++) {
        
        if(tasks[i].dateFor == currentDayTime) {
            let li = document.createElement("li");
            li.textContent = tasks[i].item;
            li.setAttribute("class", "bg-light col-12 m-1 text-align-center p-2 task-item");
  
            //   Funcitonality to add a 'Complete' button should I wish to do so
            //   var button = document.createElement("button");
            //   button.textContent = "Complete ✔️";
            //   button.setAttribute("class", "btn btn-primary col-4 position-absolute end-0 top-0 py-1 align-self-center");
            //   li.appendChild(button);

            //   Identify desired parent list
            let parentEl = $('#events-' + tasks[i].hour)[0];
            // console.log(parentEl);
            parentEl.appendChild(li);
        }    
    }
}

function generateTask(event) {
    // console.log('generator clicked');
    // console.log(event.target);
    // console.log(event.currentTarget);
    // console.log(event.currentTarget.getAttribute('data-value'));
    if(event.target === event.currentTarget) {

        let taskInputEl = document.createElement('input');
        removeBtns();
        taskInputEl.setAttribute("placeholder", "Type new task here...");
        taskInputEl.setAttribute("class", "input-removable m-1 ml-4 p-1");
        taskInputEl.setAttribute("id", "user-input"); 
        taskInputEl.setAttribute("type", "text");   

        let parentEl = event.currentTarget;
        parentEl.prepend(taskInputEl);
    }

}

function removeBtns() {
    let oldBtns = $('.input-removable');
        oldBtns.remove();
}

function removeTasks() {
    let oldBtns = $('.task-item');
        oldBtns.remove();
}

function saveTask() {
    // console.log('task saved');
    let inputEL = $('#user-input');
    // console.log(inputEL[0]);
    // console.log(inputEL[0].value);
    // console.log(inputEL.parent()[0].getAttribute("data-value"));
    let task = {};
    task.hour = inputEL.parent()[0].getAttribute("data-value");
    task.item = inputEL[0].value;
    task.dateFor = currentDayTime;
    // console.log(task);
    tasks.push(task);
    // console.log(tasks);
    setTasks();
    removeBtns();
    removeTasks();
    renderTasks();
}

// Store updated task list
function setTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    
}

// Check for local storage, load up stuff if it's there
function init() {
    let storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if(storedTasks !== null) {
        tasks = storedTasks;
    }
}
  
// Add event listener to generate tasks 
hourEl.on('click', generateTask);
// Add event listener to save tasks
saveBtnEl.on('click', saveTask);
init();
renderTasks();
setTime();