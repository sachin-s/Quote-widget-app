const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");



let win;
console.log("Running from main.js");
function createWindow() {
    winone = new BrowserWindow({
        height:150,width:500,frame:false,
          webPreferences:{
              nodeIntegration:true
        },show:false
    });
    
    winone.loadURL(url.format({
        pathname: path.join(__dirname, 'views/index.html'),
        protocol: 'file',
        slashes: true
    }));
    
    winone.webContents.openDevTools();
    
    winone.on('closed', () => {
        win = null;
    })
    winone.on('ready-to-show',()=>{
        winone.show();
    });
   
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