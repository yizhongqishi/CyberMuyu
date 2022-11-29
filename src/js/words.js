
window.onload = function() {
  var elBody = document.getElementById("dic");
  let button = document.createElement('button');
  button.innerText = "New One"
  elBody.appendChild(button);
  window.words.getWords().then((words) => {
    console.log(words);
    for (let word of words){
      let ospan = document.createElement('div');
      let word_span = document.createElement('span');
      word_span.setAttribute("contenteditable", true)
      word_span.className = "word";
      word_span.innerHTML = word;
      ospan.appendChild(word_span);
      elBody.insertBefore(ospan, button);
    }
    button.onclick = () => {
      let ospan = document.createElement('div');
      let word_span = document.createElement('span');
      word_span.setAttribute("contenteditable", true);
      word_span.innerHTML = "功德++";
      word_span.className = "word";
      ospan.appendChild(word_span);
      elBody.insertBefore(ospan, button);
    }
  });
}

window.onbeforeunload = function() {
  var spans = document.getElementsByClassName('word');
  let words = new Array();
  for (let i = 0; i < spans.length; i++){
    let word = spans[i].innerHTML;
    words.push(word);
  }
  window.words.save(words);
}
