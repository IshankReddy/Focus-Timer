let timer;
let timeLeft;
let isWorking = true;

const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const workDurationInput = document.getElementById('workDuration');
const breakDurationInput = document.getElementById('breakDuration');
const timerSound = document.getElementById('timerSound');

function startTimer() {
    if (timer) clearInterval(timer);
    
    timeLeft = isWorking ? workDurationInput.value * 60 : breakDurationInput.value * 60;
    updateTimerDisplay();

    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft === 0) {
            clearInterval(timer);
            timerSound.play();
            isWorking = !isWorking;
            startTimer();
        }
    }, 1000);

    startBtn.textContent = 'Pause';
    startBtn.onclick = pauseTimer;
}

function pauseTimer() {
    clearInterval(timer);
    startBtn.textContent = 'Resume';
    startBtn.onclick = startTimer;
}

function resetTimer() {
    clearInterval(timer);
    isWorking = true;
    timeLeft = workDurationInput.value * 60;
    updateTimerDisplay();
    startBtn.textContent = 'Start';
    startBtn.onclick = startTimer;
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const seconds = (timeLeft % 60).toString().padStart(2, '0');
    timerDisplay.textContent = `${minutes}:${seconds}`;
}

startBtn.onclick = startTimer;
resetBtn.onclick = resetTimer;

workDurationInput.onchange = resetTimer;
breakDurationInput.onchange = resetTimer;

resetTimer();