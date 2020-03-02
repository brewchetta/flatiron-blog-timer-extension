// Gather elements
const inputForm = document.getElementById('input-form')
const timePeriodMinutes = document.getElementById('time-period-minutes')
const timePeriodSeconds = document.getElementById('time-period-seconds')
const gracePeriodForm = document.getElementById('grace-period')
const timerActiveInput = document.getElementById('timer-active-input')

console.log('timer is:',timerActiveInput.checked)

// Parse time in seconds into minutes and seconds
const parseTimePeriod = timeInSeconds => {
  const minutes = Math.floor(timeInSeconds / 60)
  const seconds = timeInSeconds % 60
  return [minutes, seconds]
}

// Gather local values from browser storage to display
const loadInitialValues = () => {
  browser.storage.local.get()
  .then((obj) => {
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
  browser.storage.local.set({
    timePeriod: timeInSeconds,
    gracePeriod: parseInt(gracePeriodForm.value)
  })
}

const handleToggleActive = () => {
  if (timerActiveInput.checked) {
    browser.storage.local.set({
      timerActive: 'on'
    })} else {
      browser.storage.local.set({
        timerActive: 'off'
    })
  }
}

document.addEventListener('DOMContentLoaded', loadInitialValues)

inputForm.addEventListener('submit', handleSubmit)

timerActiveInput.addEventListener('click', handleToggleActive)
