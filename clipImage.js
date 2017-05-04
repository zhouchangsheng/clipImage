/**
 * Created by jerry_zhou on 2017/4/29.
 */
var clipImage = {
    init: function(options,callback) {
        var errObj={};

        if(!options){
            errObj.errType= 0;
            errObj.errMsg = 'Error(init option is missing):this clipImage options is not defined when initing';

            callback instanceof Function?callback(errObj):(function(){
                console.error(errObj.errMsg);
            })();
            return;
        }

        if(options.distPic){
            if(typeof options.distPic.width !=='number'){
                errObj.errType = 2;
                errObj.errMsg = 'Error(property of type is error):the [width] type of distPic\'property is expected to be number';

                callback instanceof Function?callback(errObj):(function(){
                    console.error(errObj.errMsg);
                })();
                return;
            }

            if(typeof options.distPic.height !=='number'){
                errObj.errType = 2;
                errObj.errMsg = 'Error(property of type is error):the [height] type of distPic\'property is expected to be number';

                callback instanceof Function?callback(errObj):(function(){
                    console.error(errObj.errMsg);
                })();
                return;
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
                if(typeof options.elements.wrapper.name!=='string'){
                    errObj.errType = 2;
                    errObj.errMsg = 'Error(property of type is error):the [name] type of wrapper\'property is expected to be string';

                    callback instanceof Function?callback(errObj):(function(){
                        console.error(errObj.errMsg);
                    })();
                    return;
                }

                if(typeof options.elements.wrapper.width!=='number'){
                    errObj.errType = 2;
                    errObj.errMsg = 'Error(property of type is error):the [width] type of wrapper\'property is expected to be number';

                    callback instanceof Function?callback(errObj):(function(){
                        console.error(errObj.errMsg);
                    })();
                    return;
                }

                if(typeof options.elements.wrapper.height!=='number'){
                    errObj.errType = 2;
                    errObj.errMsg = 'Error(property of type is error):the [height] type of wrapper\'property is expected to be number';

                    callback instanceof Function?callback(errObj):(function(){
                        console.error(errObj.errMsg);
                    })();
                    return;
                }

                if(typeof options.elements.panel!=='string'){
                    errObj.errType = 2;
                    errObj.errMsg = 'Error(property of type is error):the [panel] type of elements\'property is expected to be string';

                    callback instanceof Function?callback(errObj):(function(){
                        console.error(errObj.errMsg);
                    })();
                    return;
                }

                if(typeof options.elements.cutPanel!=='string'){
                    errObj.errType = 2;
                    errObj.errMsg = 'Error(property of type is error):the [cutPanel] type of elements\'property is expected to be string';

                    callback instanceof Function?callback(errObj):(function(){
                        console.error(errObj.errMsg);
                    })();
                    return;
                }

                if(typeof options.elements.showPanel!=='string'){
                    errObj.errType = 2;
                    errObj.errMsg = 'Error(property of type is error):the [showPanel] type of elements\'property is expected to be string';

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
        t.wrapper = document.getElementById(options.elements.wrapper.name);
        t.panel = document.getElementById(options.elements.panel);
        t.showPanel = document.getElementById(options.elements.showPanel);
        t.cutPanel = document.getElementById(options.elements.cutPanel);

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

        if(!t.cutPanel){
            errObj.errType = 3;
            errObj.errMsg = 'Error(element was not found):[cutPanel] element is not defined in options object when initing';
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
        t.distPic = options.distPic;

        t.showPanel.setAttribute('width',t.distPic.width);
        t.showPanel.setAttribute('height',t.distPic.height);

        t.wrapper.style.width = options.elements.wrapper.width+'px';
        t.wrapper.style.position='relative';
        t.wrapper.style.height = options.elements.wrapper.height+'px';

        t.panel.style.position ='absolute';
        t.cutPanel.style.position = 'absolute';
        t.cutPanel.style.zIndex = 999;
        t.cutPanel.style.display = 'none';
        t.cutPanel.style.top = '0px';
        t.cutPanel.style.left = '0px';


        //初始化图片基本参数
        t.bgPagePos = {
            x: 0,
            y: 0,
            height: 0,
            width: 0
        };




        t.drag();

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
    },
    changeImgUrl: function(url,callback) {
        this.paintImage(url,callback)
    },
    saveImage:function(callback){
        //绘制剪切后的图片：
        var t = this;
        var errObj = {};
        var base64 = '';

        try{
            base64 = t.showPanel.toDataURL();
        }catch(e){
            errObj.errType = 5;
            errObj.errMsg = e.message;
        }finally{
            if(base64){
                callback?callback(null,base64):true;
            }else{
                callback?callback(errObj):(function(){
                    console.error(errObj.errMsg);
                })()
            }
        }
    },
    paintImage: function(url,callback) {
        var t = this;
        var createCanvas = t.panel.getContext("2d");

        var img = new Image();

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

        //把传进来的图片进行等比例缩放
        img.onload = function(){
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
            t.imgHeight = img.height;
            t.imgWidth = img.width;

            //图片的坐标
            t.bgPagePos.x = (t.wrapper.offsetWidth - t.bgPagePos.width) / 2 + 'px';
            t.bgPagePos.y = (t.wrapper.offsetHeight - t.bgPagePos.height) / 2 + 'px';

            t.panel.height = t.bgPagePos.height;
            t.panel.width = t.bgPagePos.width;
            t.panel.style.left = t.bgPagePos.x;
            t.panel.style.top = t.bgPagePos.y;


            createCanvas.drawImage(img,0,0,img.width,img.height,0,0,t.bgPagePos.width,t.bgPagePos.height);//没用直接插入背景图片而用canvas绘制图片，是为了调整所需框内图片的大小

            t.img = img;

            t.clipPos.x = t.clipPos.y = 0;
            t.clipImg();
        };
    },
    clipImg: function() {
        var t = this;

        //绘制遮罩层：
        t.cutPanel.height = t.bgPagePos.height;
        t.cutPanel.width = t.bgPagePos.width;
        t.cutPanel.style.display = 'block';
        t.cutPanel.style.left = t.bgPagePos.x;
        t.cutPanel.style.top = t.bgPagePos.y;

        var cover = t.cutPanel.getContext("2d");
        cover.fillStyle = "rgba(0, 0, 0, 0.5)";
        cover.fillRect (0,0, t.bgPagePos.width, t.bgPagePos.height);
        cover.clearRect(t.clipPos.x, t.clipPos.y, t.clipPos.width,t.clipPos.height);

        cover.fillStyle = t.scalePoint.color;
        cover.fillRect(t.clipPos.x, t.clipPos.y,t.scalePoint.size,t.scalePoint.size);
        cover.fillRect(t.clipPos.x, t.clipPos.y+t.clipPos.height-t.scalePoint.size,t.scalePoint.size,t.scalePoint.size);
        cover.fillRect(t.clipPos.x+t.clipPos.width-t.scalePoint.size, t.clipPos.y,t.scalePoint.size,t.scalePoint.size);
        cover.fillRect(t.clipPos.x+t.clipPos.width-t.scalePoint.size, t.clipPos.y+t.clipPos.height-t.scalePoint.size,t.scalePoint.size,t.scalePoint.size);


        var distCanvasContext  = t.showPanel.getContext('2d');
        distCanvasContext.drawImage(t.img,t.clipPos.x/t.imgScale,t.clipPos.y/t.imgScale,t.clipPos.width/t.imgScale,t.clipPos.height/t.imgScale,0,0,t.distPic.width,t.distPic.height);
    },
    drag: function() {
        var t = this;
        var draging = false;
        var resizing = false;
        var _startPos = null;

        //判断鼠标是否在四个点
        var mouseInScalePointLeft = false;
        var mouseInScalePointRight = false;
        var mouseInScalePointTop= false;
        var mouseInScalePointBottom = false;
        var mouseInClipArea = false;
        var mouseInScalePoint = false;

        //判断裁剪框是否达到边界
        var clipInEdgeLeft = false;
        var clipInEdgeRight = false;
        var clipInEdgeTop = false;
        var clipInEdgeBottom = false;

        //判断四个点是否可以缩放
        var clipScaleLeft = false;
        var clipScaleRight = false;
        var clipScaleTop = false;
        var clipScaleBottom = false;

        t.cutPanel.onmousemove = function(e) {
            e = e || window.event;

            if ( e.pageX == null && e.clientX != null ) {

                var doc = document.documentElement, body = document.body;

                e.pageX = e.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
                e.pageY = e.clientY + (doc && doc.scrollTop || body && body.scrollTop);
            }

            //获取鼠标到背景图片的距离
            var _mousePos = {
                left: e.pageX - ( t.wrapper.offsetLeft + this.offsetLeft ),
                top: e.pageY - ( t.wrapper.offsetTop + this.offsetTop )
            };

            mouseInScalePointLeft = _mousePos.left >= t.clipPos.x && _mousePos.left <= t.clipPos.x + t.scalePoint.size;
            mouseInScalePointRight = _mousePos.left>=t.clipPos.x+t.clipPos.width-t.scalePoint.size&&_mousePos.left<=t.clipPos.x+t.clipPos.width;
            mouseInScalePointTop=  _mousePos.top >= t.clipPos.y && _mousePos.top <= t.clipPos.y + t.scalePoint.size;
            mouseInScalePointBottom = _mousePos.top >= t.clipPos.y+t.clipPos.height-t.scalePoint.size && _mousePos.top <= t.clipPos.y + t.clipPos.height;
            mouseInClipArea = _mousePos.left > t.clipPos.x && _mousePos.left < t.clipPos.x + t.clipPos.width && _mousePos.top > t.clipPos.y && _mousePos.top < t.clipPos.y + t.clipPos.height;
            mouseInScalePoint = (mouseInScalePointLeft&&mouseInScalePointTop)||(mouseInScalePointRight&&mouseInScalePointTop)
                ||(mouseInScalePointRight&&mouseInScalePointBottom)||(mouseInScalePointLeft&&mouseInScalePointBottom);


            //判断鼠标是否在裁剪区域里面：
            if ( mouseInClipArea ) {
                if((mouseInScalePointLeft&&mouseInScalePointTop)||(mouseInScalePointRight&&mouseInScalePointBottom)){
                    this.style.cursor = 'nw-resize';
                }else if((mouseInScalePointLeft&&mouseInScalePointBottom)||(mouseInScalePointRight&&mouseInScalePointTop)){
                    this.style.cursor ='sw-resize';
                }else{
                    this.style.cursor = 'move';
                }

                this.onmousedown = function(){
                    draging = true;
                    resizing = mouseInScalePoint?true:false;
                    //记录上一次截图的坐标
                    t.ex = t.clipPos.x;
                    t.ey = t.clipPos.y;

                    t.mouseLastX = _mousePos.left;
                    t.mouseLastY = _mousePos.top;

                    //记录鼠标按下时候的坐标
                    _startPos = {
                        left: e.pageX - ( t.wrapper.offsetLeft + this.offsetLeft ),
                        top: e.pageY - ( t.wrapper.offsetTop + this.offsetTop )
                    }
                };


                if (draging) {
                    clipInEdgeLeft = t.clipPos.x>0||(t.clipPos.x<=0&&_mousePos.left - t.mouseLastX>0);
                    clipInEdgeBottom = t.clipPos.y+t.clipPos.height<t.bgPagePos.height||t.clipPos.y+t.clipPos.height>=t.bgPagePos.height&&_mousePos.top-t.mouseLastY<0;
                    clipInEdgeTop = t.clipPos.y>0||(t.clipPos.y<=0&&_mousePos.top - t.mouseLastY>0);
                    clipInEdgeRight = t.clipPos.x+t.clipPos.width<t.bgPagePos.width||t.clipPos.x+t.clipPos.width>=t.bgPagePos.width&&_mousePos.left-t.mouseLastX<0;

                    clipScaleLeft = t.clipPos.width>t.clipPos.minWidth||(t.clipPos.width<=t.clipPos.minWidth&&_mousePos.left-t.mouseLastX<0);
                    clipScaleRight = t.clipPos.width>t.clipPos.minWidth||(t.clipPos.width<=t.clipPos.minWidth&&_mousePos.left-t.mouseLastX>0);
                    clipScaleTop = t.clipPos.height>t.clipPos.minHeight||(t.clipPos.height<=t.clipPos.minHeight&&_mousePos.top-t.mouseLastY<0);
                    clipScaleBottom = t.clipPos.height>t.clipPos.minHeight||(t.clipPos.height<=t.clipPos.minHeight&&_mousePos.top-t.mouseLastY>0);

                    if(resizing){
                        //t.clipPos.width>t.clipPos.minWidth&&t.clipPos.height>t.clipPos.minHeight
                        if(mouseInScalePointBottom&&mouseInScalePointLeft&&clipInEdgeLeft&&clipInEdgeBottom&&clipScaleBottom&&clipScaleLeft){
                            //左下
                            t.clipPos.width +=  t.mouseLastX-_mousePos.left;
                            //t.clipPos.height += _mousePos.top-t.mouseLastY;
                            t.clipPos.height += t.mouseLastX-_mousePos.left;
                            t.clipPos.x += _mousePos.left-t.mouseLastX;
                        }else if(mouseInScalePointBottom&&mouseInScalePointRight&&clipInEdgeBottom&&clipInEdgeRight&&clipScaleBottom&&clipScaleRight){
                            //右下
                            //img.width*t.imgScale/img.height
                            t.clipPos.width +=  _mousePos.left-t.mouseLastX;
                            //t.clipPos.height += _mousePos.top-t.mouseLastY;
                            t.clipPos.height += _mousePos.left-t.mouseLastX;
                        }else if(mouseInScalePointTop&&mouseInScalePointLeft&&clipInEdgeTop&&clipInEdgeLeft&&clipScaleTop&&clipScaleLeft){
                            //左上
                            t.clipPos.width +=  t.mouseLastX-_mousePos.left;
                            //t.clipPos.height += (t.mouseLastY-_mousePos.top);
                            t.clipPos.height += t.mouseLastX-_mousePos.left;
                            t.clipPos.y += _mousePos.left-t.mouseLastX;
                            //t.clipPos.y += _mousePos.top-t.mouseLastY;
                            t.clipPos.x += _mousePos.left-t.mouseLastX;
                        }else if(mouseInScalePointTop&&mouseInScalePointRight&&clipInEdgeTop&&clipInEdgeRight&&clipScaleTop&&clipScaleRight){
                            //右上
                            t.clipPos.width +=  _mousePos.left-t.mouseLastX;
                            //t.clipPos.height += t.mouseLastY-_mousePos.top;
                            t.clipPos.height += _mousePos.left-t.mouseLastX;
                            //t.clipPos.y += _mousePos.top-t.mouseLastY;
                            t.clipPos.y += t.mouseLastX-_mousePos.left;
                        }
                    }else {
                        //移动时裁剪区域的坐标 = 上次记录的定位 + (当前鼠标的位置 - 按下鼠标的位置)，裁剪区域不能超出遮罩层的区域;
                        if ( t.ex + ( _mousePos.left - _startPos.left ) < 0 ) {
                            t.clipPos.x = 0;
                        } else if ( t.ex + ( _mousePos.left - _startPos.left ) + t.clipPos.width > t.bgPagePos.width ) {
                            t.clipPos.x = t.bgPagePos.width - t.clipPos.width;
                        } else {
                            if(!mouseInScalePoint){
                                //t.clipPos.x = t.ex + ( _mousePos.left - _startPos.left );
                                t.clipPos.x += _mousePos.left - t.mouseLastX;
                            }

                        }

                        if (t.ey + ( _mousePos.top - _startPos.top ) < 0) {
                            t.clipPos.y = 0;
                        } else if ( t.ey + ( _mousePos.top - _startPos.top ) + t.clipPos.height > t.bgPagePos.height ) {
                            t.clipPos.y = t.bgPagePos.height - t.clipPos.height;
                        } else {

                            if(!mouseInScalePoint){
                                //t.clipPos.y = t.ey + ( _mousePos.top - _startPos.top );
                                t.clipPos.y += _mousePos.top - t.mouseLastY;
                            }

                        }
                    }

                    t.clipImg();
                }

                document.body.onmouseup = function() {
                    draging = false;
                    document.onmousemove = null;
                    document.onmouseup = null;
                };

                t.mouseLastX = _mousePos.left;
                t.mouseLastY = _mousePos.top;

            }else{
                this.style.cursor = 'auto';
            }

        };
    }
};
