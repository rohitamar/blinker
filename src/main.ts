import { app, BrowserWindow, screen, ipcMain } from 'electron';
import * as path from 'path';

class BlinkerApp {
    private reminderWindow: BrowserWindow | null = null;

    constructor() {
        app.whenReady().then(() => {
            this.createReminderWindow();

            // setInterval(() => {
            //     this.showReminder();
            // }, 1200000);

           this.showReminder();
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
        
        ipcMain.on('hide-window', () => {
            if (this.reminderWindow) {
                this.reminderWindow.hide();
            }
        });
    }

    private showReminder(): void {
        if (this.reminderWindow) {
            this.reminderWindow.show();
            this.reminderWindow.focus();
        }
    }
}

new BlinkerApp(); 