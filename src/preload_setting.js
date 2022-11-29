const {contextBridge, app, Menu } = require('electron');
const ipcRenderer = require('electron').ipcRenderer;
const readline = require('readline')
const path = require('path')
const fs = require('fs')

const rl = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, 'config.inf')),
    // output: process.stdout,
    crlfDelay: Infinity,
    terminal: false
});

function init(){

  contextBridge.exposeInMainWorld(
      'settings', {
          getSettings: async () => {
            let settings = new Map();
            for await (let line of rl){
              let words = line.replaceAll(" ","").split(':');
              if (words.length === 2){
                settings.set(words[0],words[1]);
              }
            }
            return settings;
          },
          save: (maps) => {
            var data = '';
            if (maps.size === 0){
              maps.set("width", "300");
              maps.set('img',"");
              maps.set("sound","");
            }
            for (let key of maps.keys()){
              data = data + key + " : " + maps.get(key) + '\n';
            }
            console.log(data);
            fs.writeFile(path.join(__dirname, 'config.inf'), data,  function(err) {
             if (err) {
                 return console.error(err);
             }
            });
          }
    });

}

init();
