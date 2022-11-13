// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const {globalShortcut} = require('electron')
const electronIpcMain = require('electron').ipcMain;
const path = require('path')
const ioHook = require('iohook')




function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    }
  })
// mainWindow.webContents.openDevTools()
  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'))

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
  return mainWindow
}
// app.on('ready', createWindow);
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  window = createWindow();

  // var keyboard = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z','SPACE','ENTER','0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  // const ret = globalShortcut.registerAll(keyboard, () => {
  //   console.log('ENTER is pressed');
  //
  // })
  ioHook.on('keydown', (event) => {
    console.log("====keyboard===>>>", event);
    window.webContents.send('isclick', true);
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
