const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");



let win;
console.log("Running from main.js");
function createWindow() {
    winone = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    });
    
    winone.loadURL(url.format({
        pathname: path.join(__dirname, 'views/one.html'),
        protocol: 'file',
        slashes: true
    }));
    

    
    winone.on('closed', () => {
        win = null;
    })
   
}
app.on('ready', createWindow);
app.on('window-all-closed', () => {
    if (process.platform != 'dawin') {
        app.quit()
    }
});
app.on('activate', () => {
    if (win === null) {
        createWindow()
    }

});