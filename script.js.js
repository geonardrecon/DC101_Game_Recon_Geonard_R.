const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const startBtn = document.getElementById('start');

let score = 0;
let timeLeft = 30;
let gameActive = false;
let timer;
let moleTimer;

function randomHole() {
    const index = Math.floor(Math.random() * holes.length);
    return holes[index];
}

function popUp() {
    const hole = randomHole();
    const mole = hole.querySelector('.mole');
    mole.classList.add('up');
    setTimeout(() => {
        mole.classList.remove('up');
    }, 1000); // Mole stays up for 1 second
}

function startGame() {
    if (gameActive) return;
    gameActive = true;
    score = 0;
    timeLeft = 30;
    scoreEl.textContent = score;
    timeEl.textContent = timeLeft;
    startBtn.disabled = true;

    timer = setInterval(() => {
        timeLeft--;
        timeEl.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            clearInterval(moleTimer);
            gameActive = false;
            startBtn.disabled = false;
            alert(`Game Over! Final Score: ${score}`);
        }
    }, 1000);

    moleTimer = setInterval(() => {
        if (gameActive) popUp();
    }, 1500); // New mole every 1.5 seconds
}

moles.forEach(mole => {
    mole.addEventListener('click', () => {
        if (!mole.classList.contains('up') || !gameActive) return;
        score++;
        scoreEl.textContent = score;
        mole.classList.remove('up');
    });
});

startBtn.addEventListener('click', startGame);