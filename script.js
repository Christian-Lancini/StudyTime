// Get the time for the salute

const hours = new Date().getHours();
const insertTime = document.getElementById('salute');

if (hours <= 12){
    insertTime.innerText = "Good morning...";
} else if(hours <= 18) {
    insertTime.innerText = "Good afteroon...";
} else if (hours <= 22){
    insertTime.innerText = "Good evening...";
} else {
    insertTime.innerText = " It's late... "
};

// Time for clock
const clock = document.getElementById('clock');

// SetInterval for reloading every second
setInterval(() => {
    const hours = new Date().getHours();
    const minutes = new Date().getMinutes();
    if (minutes < 10){
        let time = hours + ":0" + minutes 
        clock.innerText = time;
    } else {
        let time = hours + ":" + minutes 
        clock.innerText = time;
    }
}, 1000)


// Timer logic

const increaseButton = document.getElementById('increase');
const decreaseButton = document.getElementById('decrease');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('resetTimer')
const timer = document.getElementById('timer');

let timerInterval = null;
let timerOn = false;

let mins = 5;
timer.innerText = "0" + mins + ":00";

// When the timer is on, you can't use the increase/decrease button

increaseButton.addEventListener("click", function(){
    if (timerOn == false){
        mins += 1;
        if (mins > 9){
            timer.innerText = mins + ":00";
        } else {
            timer.innerText = "0" + mins + ":00";
        }
    }
});

decreaseButton.addEventListener("click", function(){
    if (timerOn == false){
        if (mins > 1){
            mins -= 1;
            if (mins >= 10){
                timer.innerText = mins + ":00";
            } else {
                timer.innerText = "0" + mins + ":00";
            }
        } 
    }
})

resetButton.addEventListener("click", function(){
    timerOn = false;
    if (timerInterval !== null){
        clearInterval(timerInterval);
        timerInterval = null;
    }
    if (mins>10){
        timer.innerText = mins + ":00";
    } else {
        timer.innerText = "0" + mins + ":00";
    }
})

// the heart of the timer, using two conditions to check whether to insert 0 or not

function startTimer(minutes){
    let minInsec = 60 * minutes;

    timerInterval = setInterval(() => { 
        const min = Math.floor(minInsec / 60);
        const sec = minInsec % 60;
        if (min == 0 && sec == 0){
            timer.innerText = "Timer Ended!"
            clearInterval(timerInterval);
        } else {
           if(min <= 9){
                if(sec <= 9){
                    timer.innerText = "0" + min + ":" + "0" + sec;
                } else {
                    timer.innerText = "0" + min + ":" + sec;
                }
            } else {
                if (sec <= 9){
                    timer.innerText = min + ":" + "0" + sec;
                } else {
                    timer.innerText = min + ":" + sec;
                }
            }
        }
        minInsec -= 1;
    }, 1000);
};

startButton.addEventListener("click", function(){
    timerOn = true;
    startTimer(mins);
});



// Task, without localStorage, for temporary use only

const showTasks = document.getElementById('showTasks');
const addTask = document.getElementById('addTask');  
let nameTasks = [];

addTask.addEventListener("click", function(){
    const nameTask = document.getElementById('nameTask').value; 
    nameTasks.push(nameTask);
    showTasks.innerHTML = ''
    if (nameTasks.length < 5){
        for(let i = 0; i < nameTasks.length; i++){
            showTasks.innerHTML += `<div class="task" id="task_${i}"><p class="taskName">${nameTasks[i]}</p><button class="deleteTaskBtn" onclick="deleteTask(${i})">X</button></div>`;
        }
    } else {
        showTasks.innerHTML += "<p id='limit'> Task limit ( Reload the page for resetting )</p>";
    }
});

function deleteTask(n){
    nameTasks.pop(n);
    document.getElementById(`task_${n}`).remove();  
}

// Notepad with LocalStorage

const saveNotes = document.getElementById('save');
const loadNotes = document.getElementById('load');
const showNotes = document.getElementById('showNotes');

let loaded = false; 

saveNotes.addEventListener("click", function(){
    if (localStorage.length == 0 ){
        const pageValue = document.getElementById('notepad').value;
        localStorage.setItem('page_0', pageValue);
    } else if (localStorage.length > 10){
        alert('Limits of page')
    } else {
        const pageValue = document.getElementById('notepad').value;
        let x = 0;
        for(let i = 0; i < localStorage.length; i++){
            x = i;
        }
        localStorage.setItem(`page_${x+1}`, pageValue);
    }

});


loadNotes.addEventListener("click", function(){
    if (localStorage.length == 0){
        loadNotes.innerText = "Hide";
        loaded = false;
    } else if(loaded == true){
        loadNotes.innerText = 'Load';  
        showNotes.innerHTML = ``; 
        loaded = false;
    } else {
        loadNotes.innerText = 'Hide';
        for(let i = 1; i < localStorage.length; i++){
            showNotes.innerHTML += `<div id="ListPages"><a class="loadPage" id='page${i}' onclick="loadPageFunc(${i})">Page ${i}</a></div>`; 
        }
        loaded = true;
    }
});

// load page 

const loadPageLink = document.getElementsByClassName('laodPage');

// pass the item number via the URL

function loadPageFunc(n){
    window.location.href = `pages/pages.html?n=${n}`;
}




// dark mode logic | Default: off

const buttonTheme = document.getElementById('themeBtn');
let darkmode = localStorage.getItem('dark');
localStorage.setItem('dark', 'off');

if (darkmode === "on"){
        document.body.classList.add('darkmode');
        localStorage.setItem('dark', 'on');

}

buttonTheme.addEventListener("click", function() {
    let darkmode = localStorage.getItem('dark');
    if (darkmode === "off"){
        document.body.classList.add('darkmode');
        localStorage.setItem('dark', 'on');

    } else {
        document.body.classList.remove('darkmode');
        localStorage.setItem('dark', 'off');
    }
})


