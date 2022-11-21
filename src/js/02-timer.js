// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  datetimePicker: document.querySelector('#datetime-picker'),
  dateTime: document.querySelector('#datetime-picker'),
  startButton: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.startButton.disabled = true;

refs.startButton.addEventListener('click', onStartButtonClick);
refs.s;

function onStartButtonClick() {
  timer.start();
}

// ОБ'ЄКТ ОПЦІЙ ДО flatpickr
const options = {
  enableTime: true,
  // Enables time picker

  time_24hr: true,
  //   Enables time picker

  defaultDate: new Date(),
  //   Sets the initial selected date(s).

  minuteIncrement: 1,
  //   Adjusts the step for the minute input (incl. scrolling)

  onClose(selectedDates) {
    const currentDate = Date.now();
    const choosedtDate = selectedDates[0].getTime();

    if (currentDate >= choosedtDate) {
      refs.startButton.disabled = true;
      alert('Please choose a date in the future');
      return;
    }
    refs.startButton.disabled = false;
  },
  //   Function(s) to trigger on every time the calendar is closed. See Events API
};

// ІНІЦІАЛІЗУЄМО flatpickr
const fp = flatpickr('#datetime-picker', options);

const timer = {
  intervalId: null,

  start() {
    const finishTime = fp.selectedDates[0].getTime();
    const currentTime = Date.now();
    const deltaTime = finishTime - currentTime;
    const time = convertMs(deltaTime);

    updateTime(time);

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = finishTime - currentTime;
      console.log(deltaTime);
      const time = convertMs(deltaTime);

      if (finishTime - currentTime <= 0) {
        clearInterval(this.intervalId);

        return;
      }

      updateTime(time);
    }, 1000);
  },
};

function addLeadingZero(value) {
  if (value.length >= 3) {
    return;
  }
  return String(value).padStart(2, '0');
}

function updateTime({ days, hours, minutes, seconds }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

/* <input type="text" id="datetime-picker" />
    <button type="button" data-start>Start</button>

    <div class="timer">
      <div class="field">
        <span class="value" data-days>00</span>
        <span class="label">Days</span>
      </div>
      <div class="field">
        <span class="value" data-hours>00</span>
        <span class="label">Hours</span>
      </div>
      <div class="field">
        <span class="value" data-minutes>00</span>
        <span class="label">Minutes</span>
      </div>
      <div class="field">
        <span class="value" data-seconds>00</span>
        <span class="label">Seconds</span>
      </div> */

// const date1 = Date.now();

// console.log(date1);

// // console.log(date.getTime());

// setTimeout(() => {
//   const date2 = Date.now();
//   console.log(date1);
//   console.log(date2);
//   console.log(date2 - date1);
// }, 3000);
