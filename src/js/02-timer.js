import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/material_blue.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const dateTimePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');

const daysSpan = document.querySelector('span[data-days]');
const hoursSpan = document.querySelector('span[data-hours]');
const minutesSpan = document.querySelector('span[data-minutes]');
const secondsSpan = document.querySelector('span[data-seconds]');

startBtn.setAttribute('disabled', 'true');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() <= new Date().getTime()) {
      startBtn.setAttribute('disabled', 'true');
      Notify.warning('Please choose a date in the future');
    } else {
      startBtn.removeAttribute('disabled');
    }
  },
};

const fp = flatpickr('#datetime-picker', options);

startBtn.addEventListener('click', startCountdown);

console.log(fp.selectedDates[0]);

function startCountdown() {
  const timerId = setInterval(() => {
    const msRemaining = fp.selectedDates[0].getTime() - new Date().getTime();
    if (msRemaining > 0) {
      updateCounter(convertMs(msRemaining));
    } else {
      clearInterval(timerId);
    }
  }, 1000);
}

function updateCounter({ days, hours, minutes, seconds }) {
  daysSpan.innerHTML = addLeadingZero(days);
  hoursSpan.innerHTML = addLeadingZero(hours);
  minutesSpan.innerHTML = addLeadingZero(minutes);
  secondsSpan.innerHTML = addLeadingZero(seconds);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const addLeadingZero = value =>
  value <= 9 ? value.toString().padStart(2, '0') : value;
