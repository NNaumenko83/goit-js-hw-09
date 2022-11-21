function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  startButton: document.querySelector('[data-start]'),
  stopButton: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

let timerId = null;

console.log(refs.body);

refs.startButton.addEventListener('click', onStartButtonClick);
refs.stopButton.addEventListener('click', onStopButtonClick);

function onStartButtonClick(e) {
  updateBackgroundColor();

  timerId = setInterval(changeBackgroundColor, 1000);
  e.currentTarget.disabled = true;
}

const changeBackgroundColor = () => {
  updateBackgroundColor();
};

function onStopButtonClick() {
  refs.startButton.disabled = false;
  clearInterval(timerId);
}

function updateBackgroundColor() {
  const color = getRandomHexColor();
  refs.body.style.backgroundColor = color;
}
