// Modules to control application life and create native browser window
const {app, BrowserWindow, Menu, MenuItem, ipcMain, screen, shell} = require('electron')
// const {globalShortcut} = require('electron')
const path = require('path')
const ioHook = require('iohook')
const fs = require('fs')
const readline = require('readline')


var menu = Menu();


var width;
var dic = new Array();
const rl = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, 'config.inf')),
    crlfDelay: Infinity,
    terminal: false
});


function form(value){
  if (!value) return 200;
  if (value < 100) return 100;
  if (value > 500) return 500;
  return value;
}

function createWindow () {
  // Create the browser window.
  var width = form(parseInt(dic["width"]));
  const mainWindow = new BrowserWindow({
    // 应当允许用户选择
    width: width,
    // resizable: false,
    height: width,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    alwaysOnTop: true,
    frame: false,
    transparent: true,
  })
  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'html/index.html'));
  mainWindow.setResizable(false)
  mainWindow.setMaximizable(false)
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  return mainWindow
}
app.whenReady().then(async () => {
  for await (let line of rl){
    let words = line.replaceAll(" ","").split(':');
    dic[words[0]] = words[1];
  }
  rl.close();
  //
  // ipcMain.handle('words', async ()=>{
  //   return dic['words'];
  // });

  window = createWindow();

  ioHook.on('keydown', (event) => {
    console.log("====keyboard===>>>", event);
    window.webContents.send('isClick', true);
  });
  ioHook.start();
  // 阻止标题栏菜单
  window.hookWindowMessage(278, function (e) {
        window.setEnabled(false);
        setTimeout(() => {
            window.setEnabled(true);
        }, 100)
        return true;
    })

  ipcMain.on('windowMoving', (e, {mouseX, mouseY}) => {
    const { x, y } = screen.getCursorScreenPoint()
    window.setPosition(x - mouseX, y - mouseY);
  });


  menu.append(new MenuItem({ label: 'Setting', click: () => {
    console.log("Setting");
    newwin = new BrowserWindow({
          width: 300,
          height: 200,
          // frame:false,
          webPreferences: {
            preload: path.join(__dirname, 'preload_setting.js'),
          },
          parent: window, //win是主窗口
      })
    // newwin.webContents.openDevTools();
    newwin.setMenu(null);
    newwin.loadURL(path.join(__dirname,'html/setting.html')); //new.html是新开窗口的渲染进程
    newwin.on('closed',()=>{newwin = null;
        console.log("closed");
        app.relaunch();
        app.exit();
      });
  }
}));
  menu.append(new MenuItem({ type: 'separator' }));
  menu.append(new MenuItem({ label: 'Words', click: () => {
    console.log("Words");
    newwin = new BrowserWindow({
          width: 300,
          height: 500,
          // frame:false,
          webPreferences: {
            preload: path.join(__dirname, 'preload_words.js'),
          },
          parent: window, //win是主窗口
      })
      // newwin.webContents.openDevTools()
      newwin.setMenu(null);
      newwin.loadURL(path.join(__dirname,'html/words.html')); //new.html是新开窗口的渲染进程
      newwin.on('closed',()=>{newwin = null;
        console.log("closed");
        app.relaunch();
        app.exit();
      })
  }
  }));
  menu.append(new MenuItem({ type: 'separator' }));
  menu.append(new MenuItem({ label: 'Check the Path', click: () => {
    shell.openPath(path.join(__dirname));
  } }));
  menu.append(new MenuItem({ type: 'separator' }));
  menu.append(new MenuItem({ label: 'Exit', click: () => {app.quit()} }));

  ipcMain.on('context', (event) => {
    menu.popup(BrowserWindow.fromWebContents(event.sender))
  })
});

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
