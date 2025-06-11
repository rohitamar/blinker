let countdown = 20;
let timer = null;
let isActive = false;

window.addEventListener('DOMContentLoaded', () => {
    startCountdown();
});

function startCountdown() {
    if (isActive) return;
    
    isActive = true;
    countdown = 20;
    updateDisplay();
    
    timer = setInterval(() => {
        countdown--;
        updateDisplay();
        
        if (countdown <= 0) {
            completeBreak();
        }
    }, 1000);
}

function updateDisplay() {
    const countdownEl = document.getElementById('countdown');
    const progressFill = document.getElementById('progressFill');
    
    if (countdownEl) {
        countdownEl.textContent = countdown;
    }
    
    if (progressFill) {
        const progress = ((20 - countdown) / 20) * 100;
        progressFill.style.width = `${progress}%`;
    }
}

function completeBreak() {
    clearTimer();
    hideWindow();
}

function skipBreak() {
    clearTimer();
    hideWindow();
}

function clearTimer() {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
    isActive = false;
}

function hideWindow() {
    console.log('hiding window');
    if (window.require) {
        const { ipcRenderer } = window.require('electron');
        ipcRenderer.send('hide-window');
    }
}