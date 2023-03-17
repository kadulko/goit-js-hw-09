const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let timerId;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

stopBtn.setAttribute('disabled', 'true');

startBtn.addEventListener('click', changeBackground);

function changeBackground() {
  startBtn.setAttribute('disabled', 'true');
  stopBtn.removeAttribute('disabled');
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

stopBtn.addEventListener('click', ceaseChangeBackground);

function ceaseChangeBackground() {
  clearInterval(timerId);
  startBtn.removeAttribute('disabled');
  stopBtn.setAttribute('disabled', 'true');
}
