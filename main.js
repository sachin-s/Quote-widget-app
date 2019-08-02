const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");
const ipc = electron.ipcMain;
const Menu = electron.Menu;
const MenuItem = electron.MenuItem;
const globalShortcut = electron.globalShortcut;
const shell = electron.shell;
let winone;
console.log("Running from main.js");
function createWindow() {
    winone = new BrowserWindow({
        height:300,width:500,frame:false,
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
    globalShortcut.register('Alt+1',function(){
        winone.show();
    })
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
                },accelerator:'CmdorCtrl + Shift + H'
            },
            {
                label:'exit',
                click:function(){
                    app.quit();
                }
            }
        ]
    },{
        label:'Edit',
        submenu:[
            {role:'undo'},
            {role:'redo'},
            {type:'separator'},
            {role:'copy'},
            {role:'cut'},
            {role:'paste'},
            {role:'pasteandmatchstyle'},
            {role:'delete'},
            {role:'selectall'}
        ]
    }
   
]
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    const ctxMenu = new Menu();
    ctxMenu.append(new MenuItem({
        label:'Hello',
        submenu:[{
            label:'submenu1',
            click:function(){
                console.log('clicked submenu1');
            }
        },
        {
            label:'submenu2',
            click:function(){
                console.log('clicked submenu2');
            }
        }
    ]
    }));
    ctxMenu.append(new MenuItem({role:'copy'}));
    ctxMenu.append(new MenuItem({role:'cut'}));
    ctxMenu.append(new MenuItem({role:'paste'}));
    ctxMenu.append(new MenuItem({role:'selectall'}));
    winone.webContents.on('context-menu',function(e,params){
        ctxMenu.popup(winone,params.x,params.y);
    });
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
app.on('will-quit',()=>{
    globalShortcut.unregisterAll();
    shell.beep();
})
ipc.on('close-app',()=>{
    if (process.platform != 'dawin') {
        app.quit()
    }
})