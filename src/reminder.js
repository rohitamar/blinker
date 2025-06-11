let countdown = 20;
let timer = null;
let isActive = false;

// Start countdown when window loads
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
    logBreak(true); // Log as completed
    hideWindow();
}

function skipBreak() {
    clearTimer();
    logBreak(false); // Log as skipped
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
    // In a real Electron app, you'd communicate with the main process
    // For now, we'll just hide the window (this will be enhanced later)
    if (window.require) {
        const { remote } = window.require('electron');
        const currentWindow = remote.getCurrentWindow();
        currentWindow.hide();
    }
}

function logBreak(completed) {
    // This will be enhanced later to save to a file or database
    const timestamp = new Date().toISOString();
    console.log(`Break ${completed ? 'completed' : 'skipped'} at ${timestamp}`);
    
    // Store in localStorage for now (will be enhanced later)
    const breaks = JSON.parse(localStorage.getItem('breaks') || '[]');
    breaks.push({
        timestamp,
        completed,
        duration: completed ? 20 : (20 - countdown)
    });
    localStorage.setItem('breaks', JSON.stringify(breaks));
} 