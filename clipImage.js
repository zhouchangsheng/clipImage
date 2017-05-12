/**
 * @author jerry_zhou(zhou chang sheng)
 * @description 根据想要的尺寸裁剪图片
 */

/**
 * @constructor ClipImage
 * */
function ClipImage(options,callback){
	arguments.length>0?this.init(options,callback):true;
}

/**
 * @description 初始化签检查options参数
 * */
ClipImage.prototype.checkOptionBeforeInit = function(options,callback){

};

/**
 * @description 初始化
 * */
ClipImage.prototype.init = function(options,callback){
	var errObj={};

	if(!options){
		errObj.errType= 0;
		errObj.errMsg = 'Error(init option is missing):this clipImage options is not defined when initing';

		callback instanceof Function?callback(errObj):(function(){
				console.error(errObj.errMsg);
			})();
		return;
	}

	if(options.mode&&typeof options.mode!=='string'){
		errObj.errType = 2;
		errObj.errMsg = 'Error(property of type is error):the [mode] type is expected to be string';

		callback instanceof Function?callback(errObj):(function(){
				console.error(errObj.errMsg);
			})();
		return;
	}else if(options.mode!=='rect'&&options.mode!=='circle'&&options.mode!=='circleToRect'){
		errObj.errType = 4;
		errObj.errMsg = 'Error(property of type is error):the [mode] type is expected to be string that is either rect or circle';

		callback instanceof Function?callback(errObj):(function(){
				console.error(errObj.errMsg);
			})();
		return;
	}else if(!options.mode){
		errObj.errType= 1;
		errObj.errMsg = 'Error(property is missing):[mode] is not defined in options object when initing';

		callback instanceof Function?callback(errObj):(function(){
				console.error(errObj.errMsg);
			})();
		return;
	}

	if(options.distPic){
		if(options.mode==='rect'){
			if(typeof options.distPic.width !=='number'){
				errObj.errType = 2;
				errObj.errMsg = 'Error(property of type is error):the [width] type of distPic\'property is expected to be number with mode of rect';

				callback instanceof Function?callback(errObj):(function(){
						console.error(errObj.errMsg);
					})();
				return;
			}

			if(typeof options.distPic.height !=='number'){
				errObj.errType = 2;
				errObj.errMsg = 'Error(property of type is error):the [height] type of distPic\'property is expected to be number with mode of rect';

				callback instanceof Function?callback(errObj):(function(){
						console.error(errObj.errMsg);
					})();
				return;
			}
		}else{
			if(typeof options.distPic.size !=='number'){
				errObj.errType = 2;
				errObj.errMsg = 'Error(property of type is error):the [size] type of distPic\'property is expected to be number with mode of circle';

				callback instanceof Function?callback(errObj):(function(){
						console.error(errObj.errMsg);
					})();
				return;
			}
		}

	}else{
		errObj.errType= 1;
		errObj.errMsg = 'Error(property is missing):[distPic] is not defined in options object when initing';

		callback instanceof Function?callback(errObj):(function(){
				console.error(errObj.errMsg);
			})();
		return;
	}

	if(options.elements){
		if(options.elements.wrapper){
			if(typeof options.elements.wrapper.value!=='string'&&!options.elements.wrapper.value.tagName){
				errObj.errType = 2;
				errObj.errMsg = 'Error(property of type is error):the [value] type of wrapper\'property is expected to be string or htmlObject';

				callback instanceof Function?callback(errObj):(function(){
						console.error(errObj.errMsg);
					})();
				return;
			}

			if(typeof options.elements.panel!=='string'&&!options.elements.panel.tagName){
				errObj.errType = 2;
				errObj.errMsg = 'Error(property of type is error):the [panel] type of elements\'property is expected to be string or htmlObj';

				callback instanceof Function?callback(errObj):(function(){
						console.error(errObj.errMsg);
					})();
				return;
			}

			if(typeof options.elements.showPanel!=='string'&&!options.elements.showPanel.tagName){
				errObj.errType = 2;
				errObj.errMsg = 'Error(property of type is error):the [showPanel] type of elements\'property is expected to be string or htmlObject';

				callback instanceof Function?callback(errObj):(function(){
						console.error(errObj.errMsg);
					})();
				return;
			}
		}else{
			errObj.errType= 1;
			errObj.errMsg = 'Error(property is missing):[elements] is not defined in options object when initing';

			callback instanceof Function?callback(errObj):(function(){
					console.error(errObj.errMsg);
				})();
			return;
		}
	}else{
		errObj.errType= 1;
		errObj.errMsg = 'Error(property is missing):[elements] is not defined in options object when initing';

		callback instanceof Function?callback(errObj):(function(){
				console.error(errObj.errMsg);
			})();
		return;
	}



	var t = this;

	if(typeof options.elements.wrapper.value ==='string'){
		t.wrapper = document.getElementById(options.elements.wrapper.value);
	}else{
		t.wrapper = options.elements.wrapper.value
	}

	if(typeof options.elements.panel ==='string'){
		t.panel = document.getElementById(options.elements.panel);
	}else{
		t.panel = options.elements.panel;
	}

	if(typeof options.elements.showPanel ==='string'){
		t.showPanel = document.getElementById(options.elements.showPanel);
	}else{
		t.showPanel = options.elements.showPanel;
	}

	if(typeof options.elements.cutPanel ==='string'){
		t.cutPanel = document.getElementById(options.elements.cutPanel);
	}else{
		t.cutPanel = options.elements.cutPanel;
	}





	if(!t.wrapper){
		errObj.errType = 3;
		errObj.errMsg = 'Error(element was not found):[wrapper] element is not defined in options object when initing';
		callback?callback(errObj):(function(){
				console.error(errObj.errMsg);
			})();
		return;
	}

	if(!t.panel){
		errObj.errType = 3;
		errObj.errMsg = 'Error(element was not found):[panel] element is not defined in options object when initing';
		callback?callback(errObj):(function(){
				console.error(errObj.errMsg);
			})();
		return;
	}

	if(!t.showPanel){
		errObj.errType = 3;
		errObj.errMsg = 'Error(element was not found):[showPanel] element is not defined in options object when initing';
		callback?callback(errObj):(function(){
				console.error(errObj.errMsg);
			})();
		return;
	}



	t.scalePoint = {
		color:'blue',
		size:10,
	};

	t.clipPos = {    //裁剪框的默认尺寸与定位
		x: 0,
		y: 0,
		height: 100,
		width: 200,
	};
	t.distPic = {};
	t.mode = options.mode[0].toUpperCase()+options.mode.substr(1);



	if(t.mode==='Rect'){
		t.distPic.width = options.distPic.width;
		t.distPic.height = options.distPic.height;
		t.showPanel.setAttribute('width',t.distPic.width);
		t.showPanel.setAttribute('height',t.distPic.height);
	}else if(t.mode==='Circle'||t.mode==='CircleToRect'){
		t.distPic.size = options.distPic.size;
		t.showPanel.setAttribute('width',t.distPic.size*2);
		t.showPanel.setAttribute('height',t.distPic.size*2);

	}






	//t.wrapper.style.width = options.elements.wrapper.width+'px';
	t.wrapper.style.position='relative';
	//t.wrapper.style.height = options.elements.wrapper.height+'px';

	t.panel.style.position ='absolute';
	t.panel.style.maxWidth = '100%';


	//初始化图片基本参数
	t.bgPagePos = {
		x: 0,
		y: 0,
		height: 0,
		width: 0
	};




	t.drag();

	if(options.hasOwnProperty('scalePoint')){
		if(typeof options.scalePoint==='object'){
			if(typeof options.scalePoint.size !=='number'){
				errObj.errType = 2;
				errObj.errMsg = 'Error(property of type is error):the [size] type of scalePoint is expected to be number';

				callback instanceof Function?callback(errObj):(function(){
						console.error(errObj.errMsg);
					})();
				return;
			}

			if(typeof options.scalePoint.color !=='string'){
				errObj.errType = 2;
				errObj.errMsg = 'Error(property of type is error):the [color] type of color is expected to be string';

				callback instanceof Function?callback(errObj):(function(){
						console.error(errObj.errMsg);
					})();
				return;
			}

			t.scalePoint.size = options.scalePoint.size;
			t.scalePoint.color = options.scalePoint.color;
		}else{
			errObj.errType= 1;
			errObj.errMsg = 'Error(property of type is error):[scalePoint] is expected to be object in options object when initing';

			callback instanceof Function?callback(errObj):(function(){
					console.error(errObj.errMsg);
				})();
			return;
		}
	}

	if(options.hasOwnProperty('url')){
		if(typeof options.url === 'string'){
			t.changeImgUrl(options.url,callback);
		}else{
			errObj.errType= 1;
			errObj.errMsg = 'Error(property of type is error):[url] is expected to be string in options object when initing';

			callback instanceof Function?callback(errObj):(function(){
					console.error(errObj.errMsg);
				})();
		}
	}
};


/**
 * @name changeImgUrl
 * @module clipImg
 * @param url { string } 图片地址
 * @param callback { function } 回调函数，传出可能出错信息
 * @description 更换url,重新绘制原始图片
 * */
ClipImage.prototype.changeImgUrl = function(url,callback){
	this.paintImage(url,callback);
};

/**
 * @name saveImage
 * @module clipImg
 * @param type { string } 字符串，
 * @param callback { function } 回调函数，传出可能出错信息
 * @description 保存图片,
 * */
ClipImage.prototype.saveImage = function(type,callback){
	//绘制剪切后的图片：
	var t = this;
	var errObj = null;
	var data = '';

	try{
		if(type==='base64'){
			data = t.showPanel.toDataURL();
			callback?callback(null,data):true;
		}else if(type==='blob'){
			if(!!t.showPanel.toBlob){
				t.showPanel.toBlob(function(blob){
					blob.name = Date.now()+'.png';
					blob.lastModified = Date.now();
					callback?callback(null,blob):true;
				}, "image/png",0.95)
			}else if(!!t.showPanel.msToBlob){
				var blob = t.showPanel.msToBlob();
				blob.name = Date.now()+'.png';
				blob.lastModified = Date.now();
				callback?callback(null,blob):true;
			}
		}

	}catch(e){
		errObj ={};
		errObj.errType = 5;
		errObj.errMsg = e.message;
	}finally{
		if(errObj){
			callback?callback(errObj):(function(){
					console.error(errObj.errMsg);
				})()
		}
	}
};

/**
 * @name paintImage
 * @module clipImg
 * @description 响应url绘制原图像
 * */
ClipImage.prototype.paintImage = function(url,callback){
	var t = this;
	var img = new Image();
	var paintCalculate = function(){
		//等比例缩放图片(如果图片宽高都比容器小，则绘制的图片宽高 = 原图片的宽高。)
		//如果图片的宽度或者高度比容器大，则宽度或者高度 = 容器的宽度或者高度，另一高度或者宽度则等比例缩放

		//t.bgPagePos.width：绘制后图片的宽度;
		//t.bgPagePos.height：绘制后图片的高度;
		//t.bgPagePos.x：绘制后图片的X轴;
		//t.bgPagePos.y：绘制后图片的Y轴
		if ( img.width < t.wrapper.offsetWidth && img.height < t.wrapper.offsetHeight) {
			t.bgPagePos.width = img.width;
			t.bgPagePos.height = img.height;
			t.imgScale = 1;

		} else {
			var pWidth = img.width / (img.height / t.wrapper.offsetHeight);
			var pHeight = img.height / (img.width / t.wrapper.offsetWidth);

			if(img.width > img.height){
				t.bgPagePos.width = t.wrapper.offsetWidth;
			}else{
				t.bgPagePos.width = pWidth;
			}

			if(img.height > img.width){
				t.bgPagePos.height = t.wrapper.offsetHeight;
			}else{
				t.bgPagePos.height = pHeight;
			}

			t.imgScale=t.bgPagePos.width/img.width;
		}

		t.clipPos.minHeight = t.clipPos.height =  t.imgScale*t.distPic.height;
		t.clipPos.minWidth = t.clipPos.width = t.imgScale*t.distPic.width;
		t.clipPos.minSize = t.clipPos.size = t.imgScale*t.distPic.size;
		t.imgHeight = img.height;
		t.imgWidth = img.width;

		//图片的坐标
		t.bgPagePos.x = (t.wrapper.offsetWidth - t.bgPagePos.width) / 2 + 'px';
		t.bgPagePos.y = (t.wrapper.offsetHeight - t.bgPagePos.height) / 2 + 'px';

		t.panel.height = t.bgPagePos.height;
		t.panel.width = t.bgPagePos.width;
		t.panel.style.left = t.bgPagePos.x;
		t.panel.style.top = t.bgPagePos.y;
	};

	img.src = url;
	img.crossOrigin = "Anonymous";


	img.onerror = function(error){
		var errObj = {};
		errObj.errType = 4;
		errObj.errMsg = "Error(url was invalid):the url value was not the valid image of url";
		callback?callback(errObj):(function(){
				console.error('error',errObj.errMsg);
			})();

	};


	img.onload = function(){
		t.clipPos.x = t.clipPos.y = 0;
		paintCalculate();
		//createCanvas.drawImage(img,0,0,img.width,img.height,0,0,t.bgPagePos.width,t.bgPagePos.height);//没用直接插入背景图片而用canvas绘制图片，是为了调整所需框内图片的大小

		t.img = img;
		t.clipImg();

	};
};

/**
 * @name clipImgRect
 * @module clipImg
 * @description 将矩形选区绘制矩形图像
 * */
ClipImage.prototype.clipImgRect = function(){
	var t = this;
	var canvasCtx = t.panel.getContext('2d');

	var maskCanvas = document.createElement('canvas');
	maskCanvas.width = t.bgPagePos.width;
	maskCanvas.height = t.bgPagePos.height;
	var maskCtx = maskCanvas.getContext('2d');
	maskCtx.fillStyle = "rgba(0, 0, 0, 0.5)";
	maskCtx.fillRect (0,0, t.bgPagePos.width, t.bgPagePos.height);
	maskCtx.clearRect(t.clipPos.x, t.clipPos.y, t.clipPos.width,t.clipPos.height);

	maskCtx.fillStyle = t.scalePoint.color;
	//cover.fillRect(t.clipPos.x, t.clipPos.y,t.scalePoint.size,t.scalePoint.size);
	maskCtx.beginPath();
	maskCtx.moveTo(t.clipPos.x+t.clipPos.width,t.clipPos.y+t.clipPos.height-t.scalePoint.size);
	maskCtx.lineTo(t.clipPos.x+t.clipPos.width,t.clipPos.y+t.clipPos.height);
	maskCtx.lineTo(t.clipPos.x+t.clipPos.width-t.scalePoint.size,t.clipPos.y+t.clipPos.height);
	maskCtx.closePath();
	maskCtx.fill();

	canvasCtx.drawImage(t.img,0,0,t.img.width,t.img.height,0,0,t.bgPagePos.width,t.bgPagePos.height);
	canvasCtx.drawImage(maskCanvas,0,0);

	var distCanvasContext  = t.showPanel.getContext('2d');
	distCanvasContext.drawImage(t.img,t.clipPos.x/t.imgScale,t.clipPos.y/t.imgScale,t.clipPos.width/t.imgScale,t.clipPos.height/t.imgScale,0,0,t.distPic.width,t.distPic.height);

};

/**
 * @name clipImgCircle
 * @module clipImg
 * @description 将圆形选区绘制圆形图像（四角透明）
 * */
ClipImage.prototype.clipImgCircle = function(){
	var t = this;
	var canvas = t.panel;
	var canvasContext = canvas.getContext('2d');

	canvasContext.clearRect(0,0,t.bgPagePos.width,t.bgPagePos.height);
	canvasContext.drawImage(t.img,0,0,t.img.width,t.img.height,0,0,t.bgPagePos.width,t.bgPagePos.height);

	var resizeCanvas = document.createElement('canvas');
	resizeCanvas.width = canvas.width;
	resizeCanvas.height = canvas.height;
	var resizeCanvasContext = resizeCanvas.getContext('2d');
	resizeCanvasContext.fillStyle = t.scalePoint.color;
	//maskCtx.fillRect(t.clipPos.x+2*t.clipPos.size-t.scalePoint.size, t.clipPos.y+2*t.clipPos.size-t.scalePoint.size,t.scalePoint.size,t.scalePoint.size);
	resizeCanvasContext.beginPath();
	resizeCanvasContext.moveTo(t.clipPos.x+2*t.clipPos.size,t.clipPos.y+2*t.clipPos.size-t.scalePoint.size);
	resizeCanvasContext.lineTo(t.clipPos.x+2*t.clipPos.size,t.clipPos.y+2*t.clipPos.size);
	resizeCanvasContext.lineTo(t.clipPos.x+2*t.clipPos.size-t.scalePoint.size,t.clipPos.y+2*t.clipPos.size);
	resizeCanvasContext.closePath();
	resizeCanvasContext.fill();

	var maskCanvas = document.createElement('canvas');
	//t.maskCanvas = maskCanvas;
	maskCanvas.width = canvas.width;
	maskCanvas.height = canvas.height;
	var maskCtx = maskCanvas.getContext('2d');

	maskCtx.fillStyle = "rgba(0, 0, 0, 1)";

	maskCtx.fillRect(0, 0, maskCanvas.width, maskCanvas.height);
	maskCtx.globalCompositeOperation = 'xor';
	maskCtx.arc(t.clipPos.x+t.clipPos.size, t.clipPos.y+t.clipPos.size, t.clipPos.size, 0, 2 * Math.PI);
	maskCtx.fill();



	canvasContext.drawImage(maskCanvas,0,0);
	canvasContext.drawImage(resizeCanvas,0,0);

	var distCanvasContext  = t.showPanel.getContext('2d');

	distCanvasContext.save();
	distCanvasContext.beginPath();
	distCanvasContext.arc(t.distPic.size, t.distPic.size, t.distPic.size, 0, Math.PI * 2, true);
	distCanvasContext.closePath();
	distCanvasContext.clip();

	distCanvasContext.drawImage(t.img,t.clipPos.x/t.imgScale,t.clipPos.y/t.imgScale,t.clipPos.size*2/t.imgScale,t.clipPos.size*2/t.imgScale,0,0,t.distPic.size*2,t.distPic.size*2);

	distCanvasContext.beginPath();
	distCanvasContext.arc(0, 0, t.distPic.size, 0, Math.PI * 2, true);
	distCanvasContext.clip();
	distCanvasContext.closePath();
	distCanvasContext.restore();
};

/**
 * @name clipImgCircleToRect
 * @module clipImg
 * @description 将圆形选区绘制正方形图像
 * */
ClipImage.prototype.clipImgCircleToRect = function(){
	var t = this;
	var canvas = t.panel;
	var canvasContext = canvas.getContext('2d');

	canvasContext.clearRect(0,0,t.bgPagePos.width,t.bgPagePos.height);
	canvasContext.drawImage(t.img,0,0,t.img.width,t.img.height,0,0,t.bgPagePos.width,t.bgPagePos.height);

	var resizeCanvas = document.createElement('canvas');
	resizeCanvas.width = canvas.width;
	resizeCanvas.height = canvas.height;
	var resizeCanvasContext = resizeCanvas.getContext('2d');
	resizeCanvasContext.fillStyle = t.scalePoint.color;
	resizeCanvasContext.beginPath();
	resizeCanvasContext.moveTo(t.clipPos.x+2*t.clipPos.size,t.clipPos.y+2*t.clipPos.size-t.scalePoint.size);
	resizeCanvasContext.lineTo(t.clipPos.x+2*t.clipPos.size,t.clipPos.y+2*t.clipPos.size);
	resizeCanvasContext.lineTo(t.clipPos.x+2*t.clipPos.size-t.scalePoint.size,t.clipPos.y+2*t.clipPos.size);
	resizeCanvasContext.closePath();
	resizeCanvasContext.fill();

	var maskCanvas = document.createElement('canvas');
	maskCanvas.width = canvas.width;
	maskCanvas.height = canvas.height;
	var maskCtx = maskCanvas.getContext('2d');

	maskCtx.fillStyle = "rgba(0, 0, 0, 0.7)";

	maskCtx.fillRect(0, 0, maskCanvas.width, maskCanvas.height);
	maskCtx.globalCompositeOperation = 'xor';
	maskCtx.arc(t.clipPos.x+t.clipPos.size, t.clipPos.y+t.clipPos.size, t.clipPos.size, 0, 2 * Math.PI);
	maskCtx.fill();



	canvasContext.drawImage(maskCanvas,0,0);
	canvasContext.drawImage(resizeCanvas,0,0);


	var distCanvasContext  = t.showPanel.getContext('2d');
	distCanvasContext.drawImage(t.img,t.clipPos.x/t.imgScale,t.clipPos.y/t.imgScale,t.clipPos.size*2/t.imgScale,t.clipPos.size*2/t.imgScale,0,0,t.distPic.size*2,t.distPic.size*2);

};

/**
 * @name clipImg
 * @module clipImg
 * @description 将选区绘制图像,根据mode选择相应的绘制方法
 * */
ClipImage.prototype.clipImg = function(){
	var handlerName = 'clipImg'+this.mode;
	this[handlerName]();
};

/**
 * @name dragRect
 * @module clipImg
 * @description 操作矩形选区（拖拽或缩放）
 * */
ClipImage.prototype.dragRect = function(){
	var t = this;
	var mouse = {};
	var draging = false,resizing = false;
	var inRect = false,inResize = false;
	var isInRect = function(mouse_x,mouse_y,rect_x,rect_y,rect_width,rect_height){
		var result = false;
		if(rect_x<=mouse_x&&mouse_x<=rect_x+rect_width){
			if(rect_y<=mouse_y&&mouse_y<=rect_y+rect_height){
				result =true;
			}
		}
		return result;
	};

	var isInResize = function(mouse_x,mouse_y,rect_x,rect_y,rect_width,rect_height,scale_point_size){
		var result = false;
		if(rect_x+rect_width-scale_point_size<mouse_x&&mouse_x<rect_x+rect_width){
			var littleSize = scale_point_size-(rect_x+rect_width-mouse_x);
			if(rect_y+rect_height-littleSize<mouse_y&&mouse_y<rect_y+rect_height){
				result = true;
			}
		}

		return result;
	}



	t.panel.onmousemove = function(e) {
		e = e || window.event;

		if ( e.pageX == null && e.clientX != null ) {

			var doc = document.documentElement, body = document.body;

			e.pageX = e.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
			e.pageY = e.clientY + (doc && doc.scrollTop || body && body.scrollTop);
		}

		//获取鼠标到背景图片的距离
		mouse.left = e.pageX - ( t.wrapper.offsetLeft + this.offsetLeft );
		mouse.top = e.pageY - ( t.wrapper.offsetTop + this.offsetTop );

		inResize = isInResize(mouse.left,mouse.top,t.clipPos.x,t.clipPos.y,t.clipPos.width,t.clipPos.height,t.scalePoint.size);
		inRect = isInRect(mouse.left,mouse.top,t.clipPos.x,t.clipPos.y,t.clipPos.width,t.clipPos.height);


		//判断鼠标是否在裁剪区域里面：
		if ( inResize||inRect||resizing ) {

			if(inRect&&!inResize){
				this.style.cursor = 'move'
			}
			if(inResize){
				this.style.cursor = 'se-resize'
			}

			if(resizing){
				this.style.cursor = 'se-resize'
			}
			if(draging){
				this.style.cursor = 'move'
			}


			this.onmousedown = function(){
				inRect&&!inResize?draging=true:true;
				inResize?resizing = true:true;
				mouse.mouseLastX = mouse.left;
				mouse.mouseLastY = mouse.top;
			};

			if(draging&&!resizing&&inRect){
				//右移动
				if(mouse.left-mouse.mouseLastX>0&&t.clipPos.x+t.clipPos.width<t.bgPagePos.width&&t.clipPos.x+t.clipPos.width+mouse.left-mouse.mouseLastX<=t.bgPagePos.width){
					t.clipPos.x +=mouse.left-mouse.mouseLastX;
				}else if(t.clipPos.x+t.clipPos.width+mouse.left-mouse.mouseLastX>t.bgPagePos.width){
					t.clipPos.x=t.bgPagePos.width-t.clipPos.width;
				}

				//左移动
				if(mouse.left-mouse.mouseLastX<0&&t.clipPos.x>0&&t.clipPos.x+mouse.left-mouse.mouseLastX>=0){
					t.clipPos.x +=mouse.left-mouse.mouseLastX;
				}else if(t.clipPos.x+mouse.left-mouse.mouseLastX<0){
					t.clipPos.x = 0;
				}

				//下移动
				if(mouse.top-mouse.mouseLastY>0&&t.clipPos.y+t.clipPos.height<t.bgPagePos.height&&t.clipPos.y+t.clipPos.height+mouse.top-mouse.mouseLastY<=t.bgPagePos.height){
					t.clipPos.y +=mouse.top-mouse.mouseLastY;
				}else if(t.clipPos.y+t.clipPos.height+mouse.top-mouse.mouseLastY>t.bgPagePos.height){
					t.clipPos.y = t.bgPagePos.height -t.clipPos.height;
				}

				//上移动
				if(mouse.top-mouse.mouseLastY<0&&t.clipPos.y>0&&t.clipPos.y+mouse.top-mouse.mouseLastY>=0){
					t.clipPos.y +=mouse.top-mouse.mouseLastY;
				}else if(t.clipPos.y+mouse.top-mouse.mouseLastY<0){
					t.clipPos.y = 0;
				}

				t.clipImg();
			}

			if(resizing){
				if(mouse.left-mouse.mouseLastX>0){//放大
					if(t.clipPos.width+t.clipPos.x+mouse.left-mouse.mouseLastX<=t.bgPagePos.width&&t.clipPos.height+t.clipPos.y+(mouse.left-mouse.mouseLastX)*t.distPic.height/t.distPic.width<=t.bgPagePos.height){
						// 纵横均未超出区域

						t.clipPos.width +=  mouse.left-mouse.mouseLastX;
						t.clipPos.height += (mouse.left-mouse.mouseLastX)*t.distPic.height/t.distPic.width;
					}
				}else if(mouse.left-mouse.mouseLastX<0){//缩小
					if(mouse.left-mouse.mouseLastX+t.clipPos.width>=t.clipPos.minWidth&&(mouse.left-mouse.mouseLastX)*t.distPic.height/t.distPic.width+t.clipPos.height>=t.clipPos.minHeight){
						t.clipPos.width +=  mouse.left-mouse.mouseLastX;
						t.clipPos.height += (mouse.left-mouse.mouseLastX)*t.distPic.height/t.distPic.width;
					}

				}
				t.clipImg();
			}


			document.body.onmouseup = function() {
				draging = false;
				resizing = false;
				document.onmousemove = null;
				document.onmouseup = null;
			};

			mouse.mouseLastX = mouse.left;
			mouse.mouseLastY = mouse.top;

		}else{
			this.style.cursor = 'auto';
		}

	};
};

/**
 * @name dragCircleToRect
 * @module clipImg
 * @description 操作圆形选区[生成正方形图片]（拖拽或缩放）
 * */
ClipImage.prototype.dragCircleToRect = function(){
	this.dragCircle();
};

/**
 * @name dragCircle
 * @module clipImg
 * @description 操作圆形选区（拖拽或缩放）
 * */
ClipImage.prototype.dragCircle = function(){
	var t = this;
	var mouse = {};
	var draging = false,resizing = false;
	var inCircle = false,inResize = false;
	var isInCircle = function(mouse_x,mouse_y,circle_x,circle_y,radius){
		var result = false;
		if(mouse_x>=circle_x-radius&&mouse_x<=circle_x+radius){
			var height = Math.sqrt((radius*radius)-(circle_x-mouse_x)*(circle_x-mouse_x));
			if(mouse_y>=circle_y-height&&mouse_y<=circle_y+height){
				result = true;
			}
		}

		return result;
	};

	var isInResize = function(mouse_x,mouse_y,circle_x,circle_y,radius,scale_point_size){
		var result = false;
		if(circle_x+radius-scale_point_size<=mouse_x&&mouse_x<=circle_x+radius){
			var littleSize = scale_point_size-(circle_x+radius-mouse_x);
			if(mouse_y<=circle_y+radius&&mouse_y>=circle_y+radius-littleSize){
				result = true;
			}
		}

		return result;
	};


	t.panel.onmousemove = function(e) {
		e = e || window.event;

		if ( e.pageX == null && e.clientX != null ) {

			var doc = document.documentElement, body = document.body;

			e.pageX = e.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
			e.pageY = e.clientY + (doc && doc.scrollTop || body && body.scrollTop);
		}

		//获取鼠标到背景图片的距离
		mouse.left = e.pageX - ( t.wrapper.offsetLeft + this.offsetLeft );
		mouse.top = e.pageY - ( t.wrapper.offsetTop + this.offsetTop );

		inCircle = isInCircle(mouse.left,mouse.top,t.clipPos.x+t.clipPos.size,t.clipPos.y+t.clipPos.size,t.clipPos.size);
		inResize = isInResize(mouse.left,mouse.top,t.clipPos.x+t.clipPos.size,t.clipPos.y+t.clipPos.size,t.clipPos.size,t.scalePoint.size);



		//判断鼠标是否在裁剪区域里面或缩放区域：
		if ( inResize||inCircle||resizing ) {

			if(inCircle&&!draging&&!resizing){
				this.style.cursor = "move";
			}

			if(inResize&&!resizing&&!draging){
				this.style.cursor = "se-resize";
			}

			if(draging){
				this.style.cursor = "move";
			}

			if(resizing){
				this.style.cursor = "se-resize";
			}

			this.onmousedown = function(){
				mouse.mouseLastX = mouse.left;
				mouse.mouseLastY = mouse.top;

				inCircle?draging = true:true;
				inResize?resizing = true:true;
			};

			if(draging&&inCircle){
				//右移动
				if(mouse.left-mouse.mouseLastX>0&&t.clipPos.x+t.clipPos.size*2+mouse.left-mouse.mouseLastX<=t.bgPagePos.width){
					t.clipPos.x +=mouse.left-mouse.mouseLastX;
				}else if(t.clipPos.x+t.clipPos.size*2+mouse.left-mouse.mouseLastX>t.bgPagePos.width){
					t.clipPos.x=t.bgPagePos.width-t.clipPos.size*2;
				}

				//左移动
				if(mouse.left-mouse.mouseLastX<0&&t.clipPos.x+mouse.left-mouse.mouseLastX>=0){
					t.clipPos.x +=mouse.left-mouse.mouseLastX;
				}else if(t.clipPos.x+mouse.left-mouse.mouseLastX<0){
					t.clipPos.x = 0;
				}

				//下移动
				if(mouse.top-mouse.mouseLastY>0&&t.clipPos.y+t.clipPos.size*2+mouse.top-mouse.mouseLastY<=t.bgPagePos.height){
					t.clipPos.y +=mouse.top-mouse.mouseLastY;
				}else if(t.clipPos.y+t.clipPos.size*2+mouse.top-mouse.mouseLastY>t.bgPagePos.height){
					t.clipPos.y = t.bgPagePos.height -t.clipPos.size*2;
				}

				//上移动
				if(mouse.top-mouse.mouseLastY<0&&t.clipPos.y+mouse.top-mouse.mouseLastY>=0){
					t.clipPos.y +=mouse.top-mouse.mouseLastY;
				}else if(t.clipPos.y+mouse.top-mouse.mouseLastY<0){
					t.clipPos.y = 0;
				}

				t.clipImg();
			}

			if(resizing){

				if(mouse.left-mouse.mouseLastX>0){//放大
					if(t.clipPos.x+(t.clipPos.size+(mouse.left-mouse.mouseLastX)*0.5)*2<=t.bgPagePos.width&&t.clipPos.y+(t.clipPos.size+(mouse.left-mouse.mouseLastX)*0.5)*2<=t.bgPagePos.height){
						t.clipPos.size+=(mouse.left-mouse.mouseLastX)*0.5
					}
				}else if(mouse.left-mouse.mouseLastX<0){//缩小
					if(t.clipPos.size+(mouse.left-mouse.mouseLastX)*0.5>t.clipPos.minSize){
						t.clipPos.size+=(mouse.left-mouse.mouseLastX)*0.5;
					}else if(t.clipPos.size+(mouse.left-mouse.mouseLastX)*0.5<t.clipPos.minSize){
						t.clipPos.size = t.clipPos.minSize;
					}
				}

				t.clipImg();
			}

			document.body.onmouseup = function() {
				draging = false;
				resizing = false;
				document.onmousemove = null;
				document.onmouseup = null;
			};

			mouse.mouseLastX = mouse.left;
			mouse.mouseLastY = mouse.top;

		}else{
			this.style.cursor = 'auto';
		}


	};
};

/**
 * @name drag
 * @module clipImg
 * @description 操作选区（拖拽或缩放）,根据mode选择相应的操作方法
 * */
ClipImage.prototype.drag = function(){
	var handlerName = 'drag'+this.mode;
	this[handlerName]();
};
