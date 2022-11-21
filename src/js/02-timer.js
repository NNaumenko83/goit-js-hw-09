// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

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
      Notify.failure('Please choose a date in the future', {
        width: '280px',
        position: 'center-top',
      });
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
