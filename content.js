
// Time until student is finished
let studentTime = 300
// Grace period before hard finish
let gracePeriod = 90
// Sets to true once the user switches to the blog's tab from somewhere else
let studentHasStarted = false

// Create variables for timer and clock
let timer = studentTime
let clock

// Declare and style timerBar and warningClock
const timerBar = document.createElement('div')
timerBar.style.width = "100%"
timerBar.style.height = "10px"
timerBar.style.position = "fixed"
timerBar.style.background = "blue"
timerBar.style.left = '0'
timerBar.style.top = '0'
timerBar.style.zIndex = '1000'
timerBar.style.transition = 'width 1s linear'

const warningClock = document.createElement('span')
warningClock.style.opacity = '0'
warningClock.style.position = "fixed"
warningClock.style.background = "white"
warningClock.style.right = '0'
warningClock.style.top = '0'
warningClock.style.zIndex = '1000'
warningClock.style.transition = 'opacity 1s'
warningClock.style.padding = '0.5em'
warningClock.style.color = 'red'
warningClock.style.fontSize = '1em'
warningClock.style.margin = '1em'
warningClock.style.fontWeight = 'bold'
warningClock.style.border = 'solid red 2px'
warningClock.style.borderRadius = '5px'
warningClock.style.transition = 'opacity 2s'

// Replace all text with Time up!
const clearPage = () => {
  Array.from(document.querySelectorAll('p')).forEach(p => p.innerText = '')
  Array.from(document.querySelectorAll('figcaption')).forEach(figcaption => figcaption.innerText = '')
  Array.from(document.querySelectorAll('img')).forEach(img => img.parentNode.removeChild(img))
}

// Fires each second while timer is positive
const timerTicksDown = () => {
  timer -= 1
  timerBar.style.width = `${(timer / studentTime) * 120}%`
  warningClock.innerText = `You are ${Math.floor((timer * -1)/60)}:${(timer * -1) % 60 >= 10 ? '' : '0'}${(timer * -1) % 60} over`
  if (timer < 0) {
    warningClock.style.opacity = '1'
  }
}

// Fires when timer hits absolute time up
const timerFinish = () => {
  clearInterval(clock)
  warningClock.innerText = 'Time up!'
  clearPage()
}

// Ticks on timer interval
const timerTick = () => {
  if (timer > gracePeriod * -1) {
    timerTicksDown()
  } else {
    timerFinish()
  }
}

// Begins / resets the timer
const handleFocus = () => {
  if (!studentHasStarted) {
    timer = studentTime
  }
  clock = setInterval(timerTick, 1000)
  studentHasStarted = true
}

// Stops the timer, fires when window is out of focus
const handleUnfocus = () => {
  // clearInterval(clock)
  // if (timer > 0) warningClock.style.opacity = '0'
}

// Handles changes depending on whether document is in focus or not
const handleVisibilityChange = () => {
  if (!document.hidden) {
    handleFocus()
  } else {
    handleUnfocus()
  }
}

const handleError = (msg) => {
  console.log(msg)
}

const getSync = (obj) => {
  // Check to see if timer is on before committing
  if (obj.timerActive === 'on') {
    // Set variables to new values
    if (obj.timePeriod) studentTime = obj.timePeriod
    if (obj.gracePeriod) gracePeriod = obj.gracePeriod
    // Add various elements
    document.body.appendChild(timerBar)
    document.body.appendChild(warningClock)
    // Add event on refocus
    document.addEventListener("visibilitychange", handleVisibilityChange)
  }
}

const handleDOMContentLoaded = () => {
  // Events to fire once everything is declared
  chrome.storage.local.get()
  .then(getSync, handleError)
}

// Fire off main script
handleDOMContentLoaded()
