import { app, BrowserWindow, screen } from 'electron';
import * as path from 'path';

class BlinkerApp {
  private reminderWindow: BrowserWindow | null = null;

  constructor() {
    app.whenReady().then(() => {
      this.createReminderWindow();
      
      setInterval(() => {
        this.showReminder();
      }, 1200000); 
      
      setTimeout(() => {
        this.showReminder();
      }, 5000);
    });

    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        this.createReminderWindow();
      }
    });
  }

  private createReminderWindow(): void {
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.workAreaSize;

    this.reminderWindow = new BrowserWindow({
      width: 320,
      height: 200,
      x: width - 340,
      y: height - 220, 
      alwaysOnTop: true,
      skipTaskbar: true,
      resizable: false,
      minimizable: false,
      maximizable: false,
      closable: false,
      frame: false,
      show: false, 
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
      }
    });

    this.reminderWindow.loadFile(path.join(__dirname, '../src/reminder.html'));
  }

  private showReminder(): void {
    if (this.reminderWindow) {
      this.reminderWindow.show();
      this.reminderWindow.focus();
    }
  }
}

new BlinkerApp(); 