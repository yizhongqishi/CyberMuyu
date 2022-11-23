function getRandomColor(){
	const rgb = []
	for (let i = 0; i < 3; ++i) {
			let color = Math.floor(Math.random() * 256).toString(16)
			color = color.length == 1 ? '0' + color : color
			rgb.push(color)
	}
	return '#' + rgb.join('')
}

window.onload = function() {
	//定义点击出现文字类
	function ClickFrontShow() {
		//定义所需文字和颜色
		this.fron = ['功德 +1'];
		// this.colo = ['#FFFFFF', '#FF0000', '#00FF00', '#00FFFF','#000000','#0000FF'];
		//获取body元素
		this.elBody = document.getElementById("MYC");
		//初始化randomNum
		this.randomNum = null;
		//初始化标语组下标
		this.index = 0;
		//初始化className
		this.cls = 0;
		this.muyu = new Audio("../sound/muyu.mp3");
		this.buddha = new Audio("");
		let width = this.elBody.clientWidth||this.elBody.offsetWidth;
		this.elBody.style.fontSize = 0.1 * width + 'px';
	}

	//定义初始化
	ClickFrontShow.prototype.init = function() {
		// this.fron = frontArray || this.fron;
		// this.colo = colorArray || this.colo;
		var self = this;
		// this.listenMouse();
		window.keyboard.isClick((event, click) => {
			let width = this.elBody.clientWidth||this.elBody.offsetWidth;
			let height = this.elBody.clientHeight||this.elBody.offsetHeight;
			this.click(width * 0.6, height * 0.2);
		});


		// window.keyboard.getWords().then((words) => {
		// 	self.fron = [words];
		// });

		self.fron = window.keyboard.getWords;
		// console.log(self.fron);

		// console.log(
		// window.keyboard.getWords((event, words) => {
		// 	console.log("get");
		// })
	// );
		// console.log(window.keyboard.getWords);

	}

	ClickFrontShow.prototype.click = function (x, y){
		var self = this;
		this.muyu.currentTime=0;
		this.muyu.play();
		// 等以后有想法了加个彩蛋
		GD++;
		// 图片缩一下
		MY.style.transform = 'scale(0.9)';
		this.cls = (this.cls + 1) % 300;
		//创建文字
		this.createFront(this.cls);
		console.log(this.elBody.style.fontSize);
		let el = document.getElementsByClassName(this.cls)[0];
		el.style.left = x + 'px';
		el.style.top =  y + 'px';

		//过时改变
		setTimeout(function() {
			el.style.opacity = 0;
			el.style.top = el.offsetTop - 100 + 'px';
			// 图片恢复
			MY.style.transform = 'scale(1)'
		}, 100);

		//过时清除
		setTimeout(function() {
			self.elBody.removeChild(el);
		}, 1000);
	}

	//创建文字
	ClickFrontShow.prototype.createFront = function (classname) {
		let ospan = document.createElement('span');
		//设置样式
		let cssText = "position:absolute;width: auto; height: 20px; cursor: default; transform: translate(-50%,-50%); font-weight: bold; opacity: 1; z-index: 1000; transition: 1s;white-space:nowrap";
		let randomFront = this.fron[this.index].substring(0, 8);
		let randomColor = getRandomColor();
		//字体下标增1
		this.index = Math.floor(Math.random() * this.fron.length);
		//向body中添加元素
		this.elBody.appendChild(ospan);
		//绑定一个classname
		ospan.className = String(classname);
		//添加样式
		ospan.style.cssText = cssText + "-moz-user-select: none;-webkit-user-select: none;-ms-user-select: none;user-select: none;"
		ospan.style.color = randomColor;
		ospan.innerHTML = randomFront;
	}

	ClickFrontShow.prototype.listenMouse = function() {
		//鼠标点击事件
		var MYclick = document.getElementById("MYC")
		MYclick.onclick = function(e) {
			this.click(e.clientX, e.clientY);
		}
	}


	var GD = 0;
	var frontShow = new ClickFrontShow();
	frontShow.init();

	// function doSomething(){
	// 	console.log("press");
	// }
	// window.addEventListener('keyup', doSomething, true);

}
