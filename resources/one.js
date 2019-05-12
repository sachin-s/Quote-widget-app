console.log('from one.js');

const BrowserWindow = require('electron').remote.BrowserWindow;
const path = require('path');
const url = require('url');

const newWindowBtn = document.getElementById('newWindowBtn');
newWindowBtn.addEventListener('click',function(event){
    let winthree = new BrowserWindow(
        {
            webPreferences : {
                nodeIntegration: true
            }
        }
    );
    winthree.loadURL(url.format({
        pathname: path.join(__dirname, '../views/three.html'),
        protocol: 'file',
        slashes: true
    }));
    winthree.webContents.openDevTools();
});