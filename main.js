const startButton = document.querySelector(".start-button");
const timer = document.querySelector(".timer");
const counter = document.querySelector(".counter");
const playGround = document.querySelector(".play-ground");
const bgm = document.getElementById("bg");
const carrotSound = document.getElementById('carrot-sound');
const bugSound = document.getElementById('bug-sound');
const winSound = document.getElementById('win-sound');
const retryButton = document.querySelector(".retry");
const bugs = document.querySelectorAll(".bug");



startButton.addEventListener('click', gameStart);

let isGamePlaying = false;
function gameStart() {
  isGamePlaying = true;
  countDown();
  addIcons();
  bgm.currentTime = 0;
  bgm.play();
  counter.innerText = 10;
  retryButton.style.display = "none";
  startButton.style.display = "none";
}

let timeLeft = 60;
timer.textContent = formatTime(timeLeft);

function formatTime(timeLeft) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = Math.floor(timeLeft % 60);
  return (
    String(minutes).padStart(2, '0') + ':' +
    String(seconds).padStart(2, '0')
  );
}
let countdownInterval;
function countDown() {
  countdownInterval = setInterval(() => {
    timeLeft--;
    timer.textContent = formatTime(timeLeft);
    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      timer.textContent = `game over`;
    }
  }, 1000);
}

function carrotCount() {
  const carrots = document.querySelectorAll(".carrot");
  const numberCarrot = carrots.length;
  counter.innerText = numberCarrot;

  if (numberCarrot <= 0) {
    const winMessage = document.createElement("p");
    winMessage.textContent = "You Win!";
    playGround.appendChild(winMessage);
    winSound.play();
    gameEnd();
  }
}


let id = 0;
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function addIcons(count = 10) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < count; i++) {
    fragment.appendChild(createCarrot());
    fragment.appendChild(createBug());
  }
  playGround.appendChild(fragment);
}

function createCarrot() {
  const carrot = document.createElement('span');
  const randomTop = getRandomInt(0, 150);
  const randomLeft = getRandomInt(0, 610);
  carrot.classList.add('carrot');
  carrot.dataset.id = id;
  carrot.style.top = `${randomTop}px`;
  carrot.style.left = `${randomLeft}px`;
  carrot.innerHTML = `<img src="img/carrot.png" alt="carrot" />`;
  id++;
  return carrot;
}
function createBug() {
  const bug = document.createElement('span');
  const randomTop = getRandomInt(0, 150);
  const randomLeft = getRandomInt(0, 610);
  bug.classList.add('bug');
  bug.dataset.id = id;
  bug.style.top = `${randomTop}px`;
  bug.style.left = `${randomLeft}px`;
  bug.innerHTML = `<img src="img/bug.png" alt="bug"/>`;
  id++;
  return bug;
}


playGround.addEventListener('click', (event) => {
  if (!isGamePlaying) return;
  const target = event.target.closest('.carrot');
  if (!target) return;
  carrotSound.play();
  target.remove();
  carrotCount();
});

playGround.addEventListener('click', (event) => {
  if (!isGamePlaying) return;
  const target = event.target.closest('.bug');
  if (!target) return;
  const gameoverMessage = document.createElement("p");
  gameoverMessage.textContent = "Ouch!";
  playGround.appendChild(gameoverMessage);
  bugSound.play();
  gameEnd();
});


function gameEnd() {
  clearInterval(countdownInterval);
  bgm.pause();
  startButton.style.display = "none";
  retryButton.style.display = "inline-block";
  isGamePlaying = false;
}

function gameRetry() {
  timeLeft = 60;
  playGround.innerHTML = '';
  gameStart();
}

retryButton.addEventListener('click', gameRetry);