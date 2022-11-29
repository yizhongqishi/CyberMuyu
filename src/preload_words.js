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

function init(){

  contextBridge.exposeInMainWorld(
      'words', {
          getWords: async () => {
            let words = [];
            for await (const line of rl){
              words.push(line);
            }
            return words;
          },
          save: (words) => {
            var data = '';
            for (let word of words){
              if (word !== ""){
                data = data + word +'\n';
              }
            }
            console.log(data);
            fs.writeFile(path.join(__dirname, 'words.inf'), data,  function(err) {
             if (err) {
                 return console.error(err);
             }
            });
          }
    });

}

init();
