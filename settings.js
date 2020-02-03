const inputForm = document.getElementById('input-form')
const timePeriodMinutes = document.getElementById('time-period-minutes')
const timePeriodSeconds = document.getElementById('time-period-seconds')
const gracePeriodForm = document.getElementById('grace-period')
const timerActiveInput = document.getElementById('timer-active-input')

console.log('timer is:',timerActiveInput.checked)

const parseTimePeriod = timeInSeconds => {
  console.log(timeInSeconds)
  const minutes = Math.floor(timeInSeconds / 60)
  const seconds = timeInSeconds % 60
  return [minutes, seconds]
}

const loadInitialValues = () => {
  browser.storage.local.get()
  .then((obj) => {
    console.log('loadInitialValues',obj)
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
  const timeInSeconds = (timePeriodMinutes.value * 6) + timePeriodSeconds.value
  browser.storage.local.set({
    timePeriod: timeInSeconds,
    gracePeriod: gracePeriodForm.value
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
