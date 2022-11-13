

window.onload = function() {
	//定义点击出现文字类
	function ClickFrontShow() {
		//定义所需文字和颜色
		this.fron = ['功德 +1'];
		this.colo = ['#FFFFFF'];
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
	}

	//定义初始化
	ClickFrontShow.prototype.init = function(frontArray, colorArray) {
		//自定义颜色和字体
		this.fron = frontArray || this.fron;
		this.colo = colorArray || this.colo;

		this.listenMouse();
		window.keyboard.isclick((event, click) => {
			let width = this.elBody.clientWidth||this.elBody.offsetWidth;
			let height = this.elBody.clientHeight||this.elBody.offsetHeight;
			this.click(width * 0.8, height * 0.2);
		})
	}

	ClickFrontShow.prototype.click = function (x, y){
		var self = this;
		this.muyu.currentTime=0;
		this.muyu.play();
		randomBJ = 1*Math.random();
		// 等以后有想法了加个彩蛋
		GD++;
		MY.style.transform = 'scale(0.9)';
		self.cls = (self.cls + 1) % 300;
		//创建文字
		self.createFront(self.cls);
		let el = document.getElementsByClassName(self.cls)[0];
		el.style.left = x + 'px';
		el.style.top =  y + 'px';

		//过时改变
		setTimeout(function() {
			el.style.opacity = 0;
			el.style.top = el.offsetTop - 100 + 'px';
			MY.style.transform = 'scale(1)'
		}, 100);

		//过时清除
		setTimeout(function() {
			self.elBody.removeChild(el);
		}, 1000);
	}

	//创建文字
	ClickFrontShow.prototype.createFront = function (classname) {
		var self = this;
		let ospan = document.createElement('span');
		//设置样式
		let cssText = "position:absolute;width: auto; height: 20px; cursor: default; transform: translate(-50%,-50%); font-weight: bold; opacity: 1; z-index: 1000; transition: 1s;white-space:nowrap";
		let randomFront = self.fron[this.index];
		let randomColor = self.colo[Math.round(Math.random()*(self.colo.length-1))];
		//字体下标增1
		self.index = (self.index + 1) % self.fron.length;
		//向body中添加元素
		self.elBody.appendChild(ospan);
		//绑定一个classname
		ospan.className = String(classname);
		//添加样式
		ospan.style.cssText = cssText + "-moz-user-select: none;-webkit-user-select: none;-ms-user-select: none;user-select: none;"
		ospan.style.color = randomColor;
		ospan.innerHTML = randomFront;
	}

	ClickFrontShow.prototype.listenMouse = function() {
		var self = this;
		//鼠标点击事件
		var MYclick = document.getElementById("MYC")
		MYclick.onclick = function(e) {
			self.click(e.clientX, e.clientY);
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
