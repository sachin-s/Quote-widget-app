const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");
const ipc = electron.ipcMain;
const globalShortcut = electron.globalShortcut;
const shell = electron.shell;
let winone;
console.log("Running from main.js");
function createWindow() {
    winone = new BrowserWindow({
        height:300,width:500,frame:false,
          webPreferences:{
            nodeIntegration: true,
            enableRemoteModule: true,
            preload: path.join(__dirname, 'index.js'),
        },show:false
    });
    
    winone.loadURL(url.format({
        pathname: path.join(__dirname, 'views/index.html'),
        protocol: 'file',
        slashes: true
    }));
    
    //winone.webContents.openDevTools();
    
    winone.on('closed', () => {
        win = null;
    })
    winone.on('ready-to-show',()=>{
        winone.show();
    });
    globalShortcut.register('Alt+1',function(){
        winone.show();
    })
}

app.on('ready', function(){
    createWindow();
});
app.on('window-all-closed', () => {
    if (process.platform != 'darwin') {
        app.quit()
    }
});
app.on('activate', () => {
    if (win === null) {
        createWindow()
    }

});
app.on('will-quit',()=>{
    globalShortcut.unregisterAll();
    shell.beep();
})
ipc.on('close-app',()=>{
    if (process.platform != 'darwin') {
        app.quit()
    }
})