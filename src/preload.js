/**
 * The preload script runs before. It has access to web APIs
 * as well as Electron's renderer process modules and some
 * polyfilled Node.js functions.
 *
 * https://www.electronjs.org/docs/latest/tutorial/sandbox
 */
const {contextBridge} = require('electron');
const ipcRenderer = require('electron').ipcRenderer;
const readline = require('readline')
const path = require('path')
const fs = require('fs')
const rl = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, 'words.inf')),
    output: process.stdout,
    terminal: false
});



async function init(){
  let words = []
  for await (let line of rl){
    words.push(line)
  }
  contextBridge.exposeInMainWorld(
      'keyboard', {
          // From main to render
          isClick: (callback) => {
              ipcRenderer.on('isClick', callback)
            },
          // getWords: async () => {return await ipcRenderer.invoke('words')}
          getWords: words
        });
}

init();

  // Mousetrap.unbind('4', () => { console.log('4') });
