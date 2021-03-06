// Get sync function
const handleGetSync = callback => {
  try {
    browser.storage.local.get()
    .then(callback, console.error)
  }
  catch (e) {console.warn(e)}
  try {
    chrome.storage.local.get(null, callback)
  }
  catch (e) {console.warn(e)}
}

// Time until student is finished
let studentTime = 300
// Grace period before hard finish
let gracePeriod = 90
// Sets to true once the user switches to the blog's tab from somewhere else
let studentHasStarted = false

// Create variables for timer and clock
let timer = studentTime
let clock

// To declare styles on elements below
const declareStyles = (styleObj, element) => {
  Object.keys(styleObj).forEach(k => element.style[k] = styleObj[k])
}

// Declare and style timerBar and warningClock
const timerBar = document.createElement('div')
const timerStyle = {
  width: "100%", height: "4px", position: "fixed", background: "#13B4E7", left: "0", top: "0", zIndex: "1000", transition: "width 1s linear"
}
declareStyles(timerStyle, timerBar)

const warningClock = document.createElement('span')
warningStyle = {
  opacity: "0", position: "fixed", background: "white", right: "1em", top: "1em", zIndex: "1000", transition: "opacity 1s", padding: "0.5em", color: "red", fontSize: "1em", fontWeight: "bold", border: "solid red 2px", borderRadius: "5px", transition: "opacity 2s, font-size 2s, border-width 2s"
}
declareStyles(warningStyle, warningClock)

// Fires each second while timer is positive
const timerTicksDown = () => {
  timer -= 1
  timerBar.style.width = `${(timer / studentTime) * 105}%`
  warningClock.innerText = `You are ${Math.floor((timer * -1)/60)}:${(timer * -1) % 60 >= 10 ? '' : '0'}${(timer * -1) % 60} over`
  if (timer < 0) {
    warningClock.style.opacity = '1'
  }
}

// Fires when timer hits absolute time up
const timerFinish = () => {
  clearInterval(clock)
  warningClock.innerText = 'Time up!'
  warningClock.style.fontSize = "6em"
  warningClock.style.borderWidth = "12px"
}

// Ticks on timer interval
const timerTick = () => {
  timer > gracePeriod * -1 ? timerTicksDown() : timerFinish()
}

// Begins the timer
const handleFocus = () => {
  handleGetSync(obj => {
    if (!studentHasStarted && obj.timerActive === 'on') {
      if (obj.timePeriod) studentTime = obj.timePeriod
      if (obj.gracePeriod) gracePeriod = obj.gracePeriod
      timer = studentTime
      clock = setInterval(timerTick, 1000)
      studentHasStarted = true
    }
  })
}

// Fires when window is out of focus
const handleUnfocus = () => {
  // Leaving in for posterity
}

// Handles visibility changes (switching to or away from the tab)
const handleVisibilityChange = () => {
  !document.hidden ? handleFocus() : handleUnfocus()
}

const handleDOMContentLoaded = () => {
  // Append elements
  document.body.appendChild(timerBar)
  document.body.appendChild(warningClock)
  // Add visibility change event
  document.addEventListener("visibilitychange", handleVisibilityChange)
}

// Fire off main script
handleDOMContentLoaded()
