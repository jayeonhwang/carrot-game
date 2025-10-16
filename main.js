const startButton = document.querySelector(".start-button");
const timer = document.querySelector(".timer");
const counter = document.querySelector(".counter");
const playGround = document.querySelector(".play-ground");
const bgm = document.getElementById("bg");
const carrotSound = document.getElementById('carrot-sound');
const bugSound = document.getElementById('bug-sound');
const winSound = document.getElementById('win-sound');

// make Start button function
// timer run
// create carrot and bugs
// count shows up (carrot number)
// play music


startButton.addEventListener('click', () => {
  countDown();
  addIcons();
  bgm.currentTime = 0;
  bgm.play();
});

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
    clearInterval(countdownInterval);
    bgm.pause();
    winSound.play();
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
  const target = event.target.closest('.carrot');
  if (!target) return;
  carrotSound.play();
  target.remove();
  carrotCount();
});

playGround.addEventListener('click', (event) => {
  const target = event.target.closest('.bug');
  if (!target) return;
  const gameoverMessage = document.createElement("p");
  gameoverMessage.textContent = "Ouch!";
  playGround.appendChild(gameoverMessage);
  clearInterval(countdownInterval);
  bgm.pause();
  bugSound.play();
});





// 누르면 자워짐 소리남
// 누르면 게임 오버 소리남



