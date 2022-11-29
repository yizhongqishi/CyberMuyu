/**
 * The preload script runs before. It has access to web APIs
 * as well as Electron's renderer process modules and some
 * polyfilled Node.js functions.
 *
 * https://www.electronjs.org/docs/latest/tutorial/sandbox
 */
const {contextBridge, app, Menu } = require('electron');
const ipcRenderer = require('electron').ipcRenderer;
const readline = require('readline')
const path = require('path')
const fs = require('fs')

const rl = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, 'words.inf')),
    crlfDelay: Infinity,
    terminal: false
});

async function init(){
  let words = [];
  for await (const line of rl){
    words.push(line);
  }
  rl.close();

  contextBridge.exposeInMainWorld(
      'keyboard', {
          // From main to render
          isClick: (callback) => {
              ipcRenderer.on('isClick', callback)
            },
          getWords:() =>{
            return words;
          }
    });
    contextBridge.exposeInMainWorld(
        'mouse', {
            // From main to render
            moving: (e, {mouseX, mouseY}) => {
                ipcRenderer.send('windowMoving', {mouseX, mouseY})
              },
            context: () =>{
              ipcRenderer.send('context', )
            }
      });
}

init();
