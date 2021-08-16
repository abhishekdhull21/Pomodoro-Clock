//session time var
var sessionInc = document.getElementById("session_inc");
var sessionDec = document.getElementById("session_dec");
var sessionLbl = document.getElementById("session_lbl");
var sessionTime = 20;
var sessionCounter = 1;

// break time var
var breakDec = document.getElementById("break_dec");
var breakInc = document.getElementById("break_inc");
var breakLbl = document.getElementById("break_lbl");
var breakTime = 5;

//action btn var 
var btnPause = document.getElementById("btn_pause");
var btnReset = document.getElementById("btn_reset");

//podomo label var
var podomoLbl = document.getElementById("podomo_lbl");
var statusLbl = document.getElementById("status_lbl");

//session btn listner
sessionInc.addEventListener("click", changeSessionTime);
sessionDec.addEventListener("click", changeSessionTime);

//break btn listner
breakInc.addEventListener("click", changeBreakTime);
breakDec.addEventListener("click", changeBreakTime);

//action btn listner
btnPause.addEventListener("click", startTimer);
btnReset.addEventListener("click", resetTimer);
var intervalId = 0;
//function to increment session time

function changeSessionTime(event) {
    if (event.srcElement == sessionInc) {
        sessionTime += 5;
    }
    if (event.srcElement == sessionDec) {
        if (sessionTime > 0)
            sessionTime--;
    }

    sessionLbl.innerHTML = sessionTime + " min";

}

//function to increment break time

function changeBreakTime(event) {
    if (event.srcElement == breakInc) {
        breakTime++;
    }
    if (event.srcElement == breakDec) {
        if (breakTime > 0)
            breakTime--;
    }

    breakLbl.innerHTML = breakTime + " min";

}

//function action btn's

function startTimer(event) {
    if (event.srcElement == btnPause) {
        console.log(btnPause.value);
        if (btnPause.value == "start") {
            countdown(sessionTime * 60, breakTime * 60);
            btnPause.innerHTML = "Pause"
            btnPause.value = "pause";
        }
        else {

            btnPause.innerHTML = "Start";
            btnPause.value = "start";
        }
    }

}

//function for countdown
function countdown(timeInSec, breakTimeSec) {
    disableBtn(true);
    intervalId = setInterval(function () {
        if (timeInSec > 0) {
            timeInSec--;
            podomoLbl.style.color = "#197e84";
            statusLbl.innerHTML = "Session " + sessionCounter;
            var sec = timeInSec % 60;
            var min = parseInt(timeInSec / 60);
            podomoLbl.innerHTML = min + " : " + sec;
        }
        else if (breakTimeSec > 0) {
            podomoLbl.style.color = "#c45e3d";
            breakTimeSec--;
            statusLbl.innerHTML = "!! Break !!"
            var sec = breakTimeSec % 60;
            var min = parseInt(breakTimeSec / 60);
            podomoLbl.innerHTML = min + " : " + sec;
        }
        else {
            timeInSec = sessionTime * 60;
            breakTimeSec = breakTime * 60;
            sessionCounter++;
        }
    }, 1000);
}

//funtion to reset the timer
function resetTimer() {
    clearInterval(intervalId);
    disableBtn(false);
    podomoLbl.innerHTML = sessionTime + " : " + 00;
}

//funtion to disabled action btn
function disableBtn(state) {

    sessionDec.disabled = state;
    sessionInc.disabled = state;
    breakDec.disabled = state;
    breakInc.disabled = state;

}
