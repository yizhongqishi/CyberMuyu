
window.onload = function() {
  var elBody = document.getElementById("dic");
  window.settings.getSettings().then((settings) => {
    for (let key of settings.keys()){
      let ospan = document.createElement('div');
      ospan.className = "map";
      let key_span = document.createElement('span');
      key_span.className = "key";
      key_span.innerHTML = key;
      ospan.appendChild(key_span);
      let split = document.createElement('span');
      split.innerHTML = ' : ';
      ospan.appendChild(split);
      let input = document.createElement('span');
      input.setAttribute("contenteditable", true)
      input.innerHTML = settings.get(key);
      input.className = "value";
      ospan.appendChild(input);
      elBody.appendChild(ospan);
    }
  });
}

window.onbeforeunload = function() {
  var divs = document.getElementsByClassName('map');
  let map = new Map();
  for (let i = 0; i < divs.length; i++){
    let key = divs[i].getElementsByClassName('key')[0].innerText;
    let value = divs[i].getElementsByClassName('value')[0].innerText;
    map.set(key, value);
  }
  // console.log(map);
  window.settings.save(map);
//   var e = window.event;
// 　e.returnValue=("确定离开当前页面吗？");
}
