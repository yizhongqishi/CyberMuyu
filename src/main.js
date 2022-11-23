// Modules to control application life and create native browser window
const {app, BrowserWindow, Menu, ipcMain} = require('electron')
// const {globalShortcut} = require('electron')
const path = require('path')
const ioHook = require('iohook')
const fs = require('fs')
const readline = require('readline')

var width;
var dic = new Array();
const rl = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, 'config.inf')),
    output: process.stdout,
    terminal: false
});

function form(value){
  if (value < 100) return 100;
  if (value > 500) return 500;
  return value;
}

function createWindow () {
  // Create the browser window.

  // console.log(Object.keys(dic));
  var width = form(parseInt(dic["width"]));
  const mainWindow = new BrowserWindow({
    // 应当允许用户选择
    width: width,
    height: width,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    alwaysOnTop: true,
    frame: false,
    transparent: true
  })
  // and load the index.html of the app.
  mainWindow.setMenu(null);
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
  return mainWindow
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  for await (let line of rl){
    let words = line.split(':');
    dic[words[0]] = words[1];
  }
  rl.close();

  ipcMain.handle('words', async ()=>{
    return dic['words'];
  });

  window = createWindow();
  // window.webContents.send('words', dic['words']);
  ioHook.on('keydown', (event) => {
    console.log("====keyboard===>>>", event);
    window.webContents.send('isClick', true);
  });
  ioHook.start();
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
