const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");
const ipc = electron.ipcMain;
const Menu = electron.Menu;
let win;
console.log("Running from main.js");
function createWindow() {
    winone = new BrowserWindow({
        //height:300,width:500,frame:false,
          webPreferences:{
              nodeIntegration:true
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
   
}

app.on('ready', function(){
    createWindow();
    const template = [
        {
        label:'demo',
        submenu:[
            {
                label:'submenu1',
                click:function(){
                    console.log('you clicked submenu1');
                }
            },
            {
                label:'submenu2',
                click:function(){
                    console.log('you clicked submenu2');
                }
            },
            {type:'separator'},
            {
                label:'help',
                click:function(){
                    electron.shell.openExternal('https://electronjs.org/');
                }
            },
            {
                label:'exit',
                click:function(){
                    app.quit();
                }
            }
        ]
    }
   
]
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
});
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
ipc.on('close-app',()=>{
    if (process.platform != 'dawin') {
        app.quit()
    }
})