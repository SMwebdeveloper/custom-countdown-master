const countdownForm = document.getElementById("countdownForm");
const inputContainer = document.getElementById("input-container");
const dateEl = document.getElementById("date-picker");

const countdownEl = document.getElementById("countdown");
const countdownElTitle = document.getElementById("countdown-title");
const countdownBtn = document.getElementById("countdown-button");
const timeElements = document.querySelectorAll("span");

const completeEl = document.getElementById("complete");
const completeElInfo = document.getElementById("complete-info");
const completeBtn = document.getElementById("complete-button");

let countdownTitle = "";
let countdownDate = "";
let countdownValue = Date;
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
// set date input Min with Today's Date
const today = new Date().toISOString().split("T");

dateEl.setAttribute("min", today);

// Populate Countdown / Complete []
function updateDOM() {
  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;
    console.log("distance", distance);

    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);
    console.log(days, hours, minutes, seconds);

    // Hide Input
    inputContainer.hidden = true;

    // if the countdown has ended, show complete
    if (distance < 0) {
      countdownEl.hidden = true;
      clearInterval(countdownActive);
      completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
      completeEl.hidden = false;
    } else {
      // Else, show the countdown in progress
      countdownElTitle.textContent = `${countdownTitle}`;
      timeElements[0].textContent = `${days}`;
      timeElements[1].textContent = `${hours}`;
      timeElements[2].textContent = `${minutes}`;
      timeElements[3].textContent = `${seconds}`;
      inputContainer.hidden = true;
      countdownEl.hidden = false; 
    }
  }, second);
}

// Take value from Form Input
function updateCountdown(e) {
  e.preventDefault();
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;
  savedCountdown = {
    title:countdownTitle,
    date:countdownDate,
  }
  localStorage.setItem('countdown', JSON.stringify(savedCountdown))
  // Check for valid date
  if (countdownDate === "") {
    alert("Please select a date for thecountdown.");
  } else {
    // Get number version of current Date, updateDOM
    countdownValue = new Date(countdownDate).getTime();
    console.log(countdownValue);
    updateDOM();
  }
}

// Reset All Values
function reset() {
  // Hide Countdowns, show Input
  countdownEl.hidden = true;
  inputContainer.hidden = false;
  // Stop the countdown
  clearInterval(countdownActive);
  // Reset values
  countdownTitle = "";
  countdownDate = "";
  localStorage.removeItem('countdown')
}

// Event Listener
function restorePreviousCountdown() {
  // Get countdown from localStorage if available
  if (localStorage.getItem('countdown')) {
    inputContainer.hidden = true;
    savedCountdown = JSON.parse(localStorage.getItem('countdown'))
    countdownTitle = savedCountdown.title;
    countdownEl = savedCountdown.date;
    countdownValue = new Date(countdownDate).getItem()
    updateDOM()
  }
}
// add event listener
countdownForm.addEventListener("submit", updateCountdown);
countdownBtn.addEventListener("click", reset);

// On load, check localStorage
restorePreviousCountdown()