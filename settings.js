// Get sync function
const handleGetSync = callback => {
  try {
    browser.storage.local.get()
    .then(callback, console.error)
  }
  catch (e) {console.warning(e)}
  try {
    chrome.storage.local.get(null, callback)
  }
  catch (e) {console.warning(e)}
}

// Set sync function
const handleSetSync = object => {
  try {
    browser.storage.local.set(object)
  }
  catch(e){console.warning(e)}

  try {
    chrome.storage.local.set(object)
  }
  catch(e){console.warning(e)}
}

// Gather elements
const inputForm = document.getElementById('input-form')
const timePeriodMinutes = document.getElementById('time-period-minutes')
const timePeriodSeconds = document.getElementById('time-period-seconds')
const gracePeriodForm = document.getElementById('grace-period')
const timerActiveInput = document.getElementById('timer-active-input')

// Parse time in seconds into minutes and seconds
const parseTimePeriod = timeInSeconds => {
  const minutes = Math.floor(timeInSeconds / 60)
  const seconds = timeInSeconds % 60
  return [minutes, seconds]
}

// Gather local values from browser storage to display
const loadInitialValues = () => {
  handleGetSync((obj) => {
    if (obj.timePeriod) {
      const [minutes, seconds] = parseTimePeriod(obj.timePeriod)
      timePeriodMinutes.value = minutes
      timePeriodSeconds.value = seconds
    }
    if (obj.gracePeriod) gracePeriodForm.value = obj.gracePeriod
    if (obj.timerActive && obj.timerActive === 'on') timerActiveInput.checked = true
  })
}

const handleSubmit = () => {
  const timeInSeconds = (parseInt(timePeriodMinutes.value) * 60) + parseInt(timePeriodSeconds.value)
  handleSetSync({
    timePeriod: timeInSeconds,
    gracePeriod: parseInt(gracePeriodForm.value)
  })
}

const handleToggleActive = () => {
  if (timerActiveInput.checked) {
    handleSetSync({timerActive: 'on'})
  } else {
    handleSetSync({timerActive: 'off'})
  }
}

document.addEventListener('DOMContentLoaded', loadInitialValues)

inputForm.addEventListener('submit', handleSubmit)

timerActiveInput.addEventListener('click', handleToggleActive)
