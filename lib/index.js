/**
 * @author jerry_zhou(zhou chang sheng)
 * @description 根据想要的尺寸裁剪图片
 * @version 1.0.6
 */

if(typeof module !=='undefined'&&
    typeof exports !== 'undefined'&&
    module.exports === exports){
    module.exports = exports = ClipImage;
}

/**
 * @constructor ClipImage
 * */
function ClipImage(options,callback){
    this.errConfigInit();

    if(arguments.length>0){
        ClipImage.prototype.init.apply(this,arguments)
    }
}

/**
 * @description 错误信息配置
 * */
ClipImage.prototype.errConfigInit = function(){
    this.errConfig = {
        _1000:'param of \'option\' was missing',
        _1001:'param of \'option\' was expected to be object',
        _1010:'\'option.mode\' was missing',
        _1011:'\'option.mode\' was expected to be string',
        _1012:'\'option.mode\' was expected to be string which is one of rect or circle or circleToRect',
        _1020:'\'option.distPic\' was missing',
        _1021:'\'option.distPic\' was expected to be object',
        _1022:'\'option.distPic.width\' was missing',
        _1023:'\'option.distPic.width\' was expected to be number',
        _1024:'\'option.distPic.height\' was missing',
        _1025:'\'option.distPic.height\' was expected to be number',
        _1026:'\'option.distPic.size\' was missing',
        _1027:'\'option.distPic.size\' was expected to be number',
        _1030:'\'option.elements\' was missing',
        _1031:'\'option.elements\' was expected to be object',
        _1032:'\'option.elements.wrapper\' was missing',
        _1033:'\'option.elements.wrapper\' was expected to be object',
        _1034:'\'option.elements.wrapper.value\' was missing',
        _1035:'\'option.elements.wrapper.value\' was expected te be string of div\'s id or HTMLDIVDOM',
        _1036:'\'option.elements.wrapper.width\' was expected to be number',
        _1037:'\'option.elements.wrapper.height\' was expected to be number',
        _1038:'\'option.elements.panel\' was missing',
        _1039:'\'option.elements.panel\' was expected to be string of canvas\'s id or HTMLCANVASDOM',
        _1040:'\'option.elements.showPanel\' was missing',
        _1041:'\'option.elements.showPanel\' was expected to be string of canvas\'s id or HTMLCANVASDOM',
        _1050:'\'option.url\' was expected to be string',
        _1060:'\'option.scalePoint\' was expected to be object',
        _1061:'\'option.scalePoint.color\' was missing',
        _1062:'\'option.scalePoint.color\' was expected to be string',
        _1063:'\'option.scalePoint.size\' was missing',
        _1064:'\'option.scalePoint.size\' was expected to be number',
        _1070:'\'callback\' was expected to be function',
        _1080:'\'url\' was missing',
        _1081:'\'url\' was expected to be string',
        _1082:'\'url\' was invalid',
        _1090:'\'type\' was missing',
        _1091:'\'type\' was expected to be string',
        _1092:'\'type\' was expected to be string which is one of blob or base64',
        _1100:'\'saveImage\'Failed.'
    };


};

/**
 * @description 错误处理函数
 *
 * */
/*ClipImage.prototype.errHandler = function (errType,callback) {
    var err = null;

    if( arguments.length === 2 ){
        if( callback instanceof Function ){
            err = {};
            err.errType = errType;
            err.errMsg = this.errConfig['_'+errType];

            callback(err);
        }else{
            console.error(this.errConfig['_1070']);
        }
    }else if( arguments.length === 1 ){
        console.error(this.errConfig['_'+errType]);
    }



};*/

/**
 * @description 初始化错误验证函数,有错误返回true，否则返回false。
 * */
ClipImage.prototype.initValidator = function(option,callback){
    //验证错误规则
    var validatorConfig = {
        mode:{
            required:true,
            errors:[
                {
                    priority:0,
                    type:1010,//missing
                    validator:function(self,parent,option,callback){//return true if error
                        if( parent.hasOwnProperty('mode')){
                            return false;
                        }

                        callback(this.type);
                        return true;
                    }
                },{
                    priority:1,
                    type:1011,//expected to be string
                    validator:function(self,parent,option,callback){
                        if(typeof  self !=='string' ){
                            callback(this.type);
                            return true;
                        }

                        return false;
                    }
                },{
                    priority:2,
                    type:1012,//expected to be one of circle or rect or circleToRect
                    validator:function(self,parent,option,callback){
                        var enu = ['circle','rect','circleToRect'];
                        if( enu.indexOf(self) === -1 ){
                            callback(this.type);
                            return true;
                        }

                        return false;
                    }
                }
            ]
        },
        distPic:{
            required:true,
            errors:[
                {
                    priority:0,
                    type:1020,//missing
                    validator:function(self,parent,option,callback){
                        if(parent.hasOwnProperty('distPic')){
                            return false;
                        }

                        callback(this.type);
                        return true;
                    }
                },{
                    priority:1,
                    type:1021,//expected to be object
                    validator:function(self,parent,option,callback){
                        if( isNativeObject(self) ){
                            return false;
                        }
                        callback(this.type);
                        return true;
                    }
                }
            ],
            child:{
                height:{
                    required:function(option){
                        if(option.mode ==='rect' ){
                            return true;
                        }
                        return false;
                    },
                    errors:[
                        {
                            priority:0,
                            type:1024,
                            validator:function(self,parent,option,callback){
                                if( parent.hasOwnProperty('height')){
                                    return false;
                                }

                                callback(this.type);
                                return true;
                            }
                        },{
                            priority:1,
                            type:1025,
                            validator:function (self,parent,option,callback) {
                                if(typeof self === 'number'){
                                    return false;
                                }

                                callback(this.type);
                                return true;
                            }
                        }
                    ]
                },
                width:{
                    required:function(option){
                        if(option.mode ==='rect' ){
                            return true;
                        }
                        return false;
                    },
                    errors:[
                        {
                            priority:0,
                            type:1022,//missing
                            validator:function(self,parent,option,callback){
                                if(parent.hasOwnProperty('width')){
                                    return false;
                                }

                                callback(this.type);
                                return true;
                            }
                        },{
                            priority:1,
                            type:1023,//expected to be number
                            validator:function(self,parent,option,callback){
                                if(typeof self === 'number'){
                                    return false;
                                }

                                callback(this.type);
                                return true;
                            }
                        }
                    ]
                },
                size:{
                    required:function(option){
                        if(option.mode !=='rect' ){
                            return true;
                        }
                        return false;
                    },
                    errors:[
                        {
                            priority:0,
                            type:1026,//missing
                            validator:function(self,parent,option,callback){
                                if(parent.hasOwnProperty('size')){
                                    return false;
                                }

                                callback(this.type);
                                return true;
                            }
                        },{
                            priority:1,
                            type:1027,//expected to be number
                            validator:function(self,parent,option,callback){
                                if(typeof self === 'number'){
                                    return false;
                                }

                                callback(this.type);
                                return true;
                            }
                        }
                    ]
                }
            }
        },
        elements:{
            required:true,
            errors:[
                {
                    priority:0,
                    type:1030,//missing
                    validator:function(self,parent,option,callback){
                        if(parent.hasOwnProperty('elements')){
                            return false;
                        }

                        callback(this.type);
                        return true;
                    }
                },{
                    priority:1,
                    type:1031,//expected to be object
                    validator:function(self,parent,option,callback){
                        if( isNativeObject(self) ){
                            return false;
                        }

                        callback(this.type);
                        return true;
                    }
                }
            ],
            child:{
                wrapper:{
                    required:true,
                    errors:[
                        {
                            priority:0,
                            type:1032,//missing
                            validator:function(self,parent,option,callback){
                                if(parent.hasOwnProperty('wrapper')){
                                    return false;
                                }

                                callback(this.type);
                                return true;
                            }
                        },{
                            priority:1,
                            type:1033,//expected to be object
                            validator:function(self,parent,option,callback){
                                if( isNativeObject(self) ){
                                    return false;
                                }

                                callback(this.type);
                                return true;
                            }
                        }
                    ],
                    child:{
                        value:{
                            required:true,
                            errors:[
                                {
                                    priority:0,
                                    type:1034,//missing
                                    validator:function(self,parent,option,callback){
                                        if(parent.hasOwnProperty('value')){
                                            return false;
                                        }

                                        callback(this.type);
                                        return true;
                                    }
                                },{
                                    priority:1,
                                    type:1035,//expected to be string or htmlDOM
                                    validator:function(self,parent,option,callback){
                                        if(typeof self === 'string' ){
                                            if(document.getElementById(self) &&
                                                document.getElementById(self).nodeName ){
                                                return false;
                                            }
                                            callback(this.type);
                                            return true;

                                        }else if(typeof self === 'object'){
                                            if( self && self.nodeName &&
                                                self.nodeName.toString().toLowerCase() ==='canvas' ){
                                                return false;
                                            }

                                            callback(this.type);
                                            return true;
                                        }


                                        callback(this.type);
                                        return true;
                                    }
                                }
                            ]
                        }
                    }
                },
                panel:{
                    required:true,
                    errors:[
                        {
                            priority:0,
                            type:1038,//missing
                            validator:function(self,parent,option,callback){
                                if(parent.hasOwnProperty('panel')){
                                    return false;
                                }

                                callback(this.type);

                                return true;
                            }
                        },{
                            priority:1,
                            type:1039,//expected to be object
                            validator:function(self,parent,option,callback){
                                if(typeof self === 'string' ){
                                    if(document.getElementById(self) &&
                                        document.getElementById(self).nodeName &&
                                        document.getElementById(self).nodeName.toString().toLowerCase() === 'canvas'){
                                        return false;
                                    }

                                    callback(this.type);
                                    return true;

                                }else if(typeof self === 'object'){
                                    if( self && self.nodeName &&
                                        self.nodeName.toString().toLowerCase() ==='canvas' ){
                                        return false;
                                    }

                                    callback(this.type);
                                    return true;
                                }

                                callback(this.type);
                                return true;
                            }
                        }
                    ]
                },
                showPanel:{
                    required:true,
                    errors:[
                        {
                            priority:0,
                            type:1040,//missing
                            validator:function(self,parent,option,callback){
                                if(parent.hasOwnProperty('showPanel')){
                                    return false;
                                }

                                callback(this.type);
                                return true;
                            }
                        },{
                            priority:1,
                            type:1041,//expected to be object
                            validator:function(self,parent,option,callback){
                                if(typeof self === 'string' ){
                                    if(document.getElementById(self) &&
                                        document.getElementById(self).nodeName &&
                                        document.getElementById(self).nodeName.toString().toLowerCase() === 'canvas'){
                                        return false;
                                    }

                                    callback(this.type);
                                    return true;

                                }else if(typeof self === 'object'){
                                    if( self && self.nodeName &&
                                        self.nodeName.toString().toLowerCase() ==='canvas' ){
                                        return false;
                                    }

                                    callback(this.type);
                                    return true;
                                }

                                callback(this.type);
                                return true;
                            }
                        }
                    ]
                }
            }
        },
        url:{
            required:false,
            errors:[
                {
                    priority:0,
                    type:1050,//expected to be string
                    validator:function(self,parent,option,callback){
                        if( typeof self ==='string'){
                            return false;
                        }

                        callback(this.type);
                        return true;
                    }
                }
            ]
        },
        scalePoint:{
            required:false,
            errors:[
                {
                    priority:0,
                    type:1060,//expected to be object
                    validator:function(self,parent,option,callback){
                        if( isNativeObject(self) ){
                            return false;
                        }

                        callback(this.type);
                        return true;
                    }
                }
            ],
            child:{
                size:{
                    required:true,
                    errors:[
                        {
                            priority:0,
                            type:1063,
                            validator:function(self,parent,option,callback){
                                if(parent.hasOwnProperty('size')){
                                    return false;
                                }

                                callback(this.type);
                                return true;
                            }
                        },{
                            priority:1,
                            type:1064,
                            validator:function(self,parent,option,callback){
                                if( typeof self === 'number' ){
                                    return false;
                                }

                                callback(this.type);
                                return true;
                            }
                        }
                    ]
                },
                color:{
                    required:true,
                    errors:[
                        {
                            priority:0,
                            type:1061,
                            validator:function(self,parent,option,callback){
                                if(parent.hasOwnProperty('color')){
                                    return false;
                                }

                                callback(this.type);
                                return true;
                            }
                        },{
                            priority:1,
                            type:1062,
                            validator:function(self,parent,option,callback){
                                if( typeof self === 'string' ){
                                    return false;
                                }
                                callback(this.type);

                                return true;
                            }
                        }
                    ]
                }
            }
        }
    };
    var clipImage = this;
    var callback = arguments.length >=2 && arguments[1] instanceof Function ? arguments[1]:null;



    /**
     * @description 判断是否是原生object
     * @param obj {object} 待判定对象
     * @return { boolean } 是原生对象返回true，否则返回false
     * */
    function isNativeObject(obj){
        if(obj.constructor &&
            obj.constructor.name &&
            obj.constructor.name.toLowerCase() ==='object' ){
            return true;
        }

        return false;
    }

    /**
     * @description 匹配错误类型，此函数被用在 recurValidator递归验证的错误校验回调函数中
     * @param type { string } option 传递参数不符合规则的错误码
     * */
    function matchType(type){
        var err = null;

        if( callback instanceof Function ){
            err = {};
            err.errType = type;
            err.errMsg = clipImage.errConfig['_'+type];

            callback(err);
        }else{
            console.error(clipImage.errConfig['_'+type]);
        }
    }

    /**
     * @description 递归验证 option 对象（不包括自身）
     * @param source { object} 递归检查对象
     * @param validator { object } 错误校验规则
     * @param option { object } 源对象引用
     * */
    function recurValidator(source,validator,option){
        var key,required,err;

        for( key in validator ){
            if( typeof validator[key].required === 'boolean' ){
                required = validator[key].required ;
            }else if( validator[key].required instanceof Function ){
                required = validator[key].required(option);
            }

            //error validating (required)
            if( required || ((!required) && source.hasOwnProperty(key)) ){
                validator[key].errors.sort(function(err1,err2){
                    return err1.priority - err2.priority;
                });

                err = validator[key].errors.some(function( error ){
                    //console.log(key,error.validator(source[key],source,option,matchType),validator[key])
                    return error.validator(source[key],source,option,matchType)
                });


                if( err ){
                    return true;
                }

            }


            //handling child property
            if( required && validator[key].hasOwnProperty('child') ){
                //required:true
                err = arguments.callee(source[key],validator[key].child,option)
            }else if( !required && source.hasOwnProperty(key) && validator[key].hasOwnProperty('child') ){
                //required:false and source has key
                err = arguments.callee(source[key],validator[key].child,option)
            }

            if(err){ //
                return true;
            }

        }
    }

    var validated;

    if( arguments.length <=0 ){
        console.error(clipImage.errConfig['_1000']);
        validated  = true;
    }else{
        if( arguments.length > 1 && !( arguments[1] instanceof Function) ){
            console.error(clipImage.errConfig['_1070']);
            validated = true;
            return;
        }

        if(isNativeObject(arguments[0])){
            validated = recurValidator(option,validatorConfig,option)
        }else{
            console.error(clipImage.errConfig['_1001']);
            validated = true;
        }

    }

    return validated;
};



/**
 * @description 初始化
 * */
ClipImage.prototype.init = function(options,callback){
    var res = this.initValidator.apply( this,arguments );
    if( res ){
        return;
    }

    var t = this;

    if(typeof options.elements.wrapper.value ==='string'){
        t.wrapper = document.getElementById(options.elements.wrapper.value);
    }else{
        t.wrapper = options.elements.wrapper.value
    }

    if(options.elements.wrapper.hasOwnProperty('height') && options.elements.wrapper.height>0){
        t.wrapper.style.height = options.elements.wrapper.height+'px';
    }

    if(options.elements.wrapper.hasOwnProperty('width') && options.elements.wrapper.width >0){
        t.wrapper.style.width = options.elements.wrapper.width+'px';
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

    if( !t.wrapper.style.height || !t.wrapper.style.width){
        t.wrapper.style.width = '320px';
        t.wrapper.style.height = '220px';
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






    if(options.hasOwnProperty('scalePoint')){
        t.scalePoint.size = options.scalePoint.size;
        t.scalePoint.color = options.scalePoint.color;
    }

    if(options.hasOwnProperty('url')){
        if( arguments.length ===1 ){
            t.paintImage(options.url);
        }else if( arguments.length >1 ){
            t.paintImage(options.url,callback);
        }

    }

    if( options.elements.wrapper.hasOwnProperty('width') ){
        t.wrapper.style.width = options.elements.wrapper.width;
    }

    if( options.elements.wrapper.hasOwnProperty('height') ){
        t.wrapper.style.height = options.elements.wrapper.height;
    }

    t.drag();
};


/**
 * @name changeImgUrl
 * @module clipImg
 * @param url { string } 图片地址
 * @param callback { function } 回调函数，传出可能出错信息
 * @description 更换url,重新绘制原始图片
 * */
ClipImage.prototype.changeImgUrl = function(url,callback){
    this.paintImage.apply(this,arguments);
};


/**
 * @description 保存图像数据错误验证函数,有错误返回true，否则返回false
 * @param type { string } 图像数据类型
 * @param callback { function } 回调函数，用来接收可能产生的错误信息
 * */
ClipImage.prototype.saveImageValidator = function( type,callback ){
    var typeList = ['blob','base64'],exist,validated = false;

    if( arguments.length === 0 ){
        console.error( this.errConfig['_1090'] );
        validated = true;
    }else if( arguments.length >= 1 ){
        if( arguments.length > 1 && !( arguments[1] instanceof Function ) ){
            console.error( this.errConfig['_1070'] );
            validated = true;
            return;
        }

        if( typeof type === 'string' ){
            exist = typeList.indexOf( type ) > -1;
            if(!exist){
                validated = true;
                arguments.length>1 ? callback({
                    errType:1092,
                    errMsg:this.errConfig['_1092']
                }):console.error(this.errConfig['_1092'])
            }
        }else{
            validated = true;
            arguments.length>1?callback({
                errType:1091,
                errMsg:this.errConfig['_1091']
            }):console.error(this.errConfig['_1091'])
        }



    }

    return validated;

};


/**
 * @name saveImage
 * @module clipImg
 * @param type { string } 图像数据格式（base64 | blob），
 * @param callback { function } 回调函数，传出可能出错信息
 * @description 保存图片,
 * */
ClipImage.prototype.saveImage = function(type,callback){
    //绘制剪切后的图片：
    var t = this;
    var data = null;

    var validator = this.saveImageValidator.apply(this,arguments);
    if(validator){
        return;
    }

    try{
        if(type==='base64'){
            data = t.showPanel.toDataURL();
            callback?callback(null,data):console.info(data);
        }else if(type==='blob'){
            if(!!t.showPanel.toBlob){
                t.showPanel.toBlob(function(blob){
                    blob.name = Date.now()+'.png';
                    blob.lastModified = Date.now();
                    callback?callback(null,blob):console.info(blob);
                }, "image/png",0.95)
            }else if(!!t.showPanel.msToBlob){
                var blob = t.showPanel.msToBlob();
                blob.name = Date.now()+'.png';
                blob.lastModified = Date.now();
                callback?callback(null,blob):console.info(blob);
            }
        }

    }catch(e){
        callback?callback({
            errType:1100,
            errMsg:this.errConfig['_1100']+e.message
        }):console.error(this.errConfig['_1100']+e.message)
    }
};

/**
 * @description 绘制图像错误验证函数,有错误返回true，否则返回false
 * @param url { string } 图像地址
 * @param callback { function } 回调函数，用来接收可能产生的错误信息
 * */
ClipImage.prototype.paintImageValidator = function(url,callback){
    var validated = false;

    if( arguments.length === 0 ){
        console.error( this.errConfig['_1080'] );
        validated = true;
    }else if( arguments.length >= 1 ){
        if( arguments.length > 1 && !( arguments[1] instanceof Function ) ){
            console.error( this.errConfig['_1070'] );
            validated = true;
            return;
        }

        if( typeof url !== 'string' ){
            validated = true;
            arguments.length>1?callback({
                errType:1081,
                errMsg:this.errConfig['_1081']
            }):console.error(this.errConfig['_1081'])
        }



    }

    return validated;
};

/**
 * @name paintImage
 * @module clipImg
 * @description 响应url绘制原图像
 * */
ClipImage.prototype.paintImage = function(url,callback){
    var err = this.paintImageValidator.apply(this,arguments);
    if(err){
        return;
    }

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
                t.bgPagePos.width = Math.ceil(pWidth);
            }

            if(img.height > img.width){
                t.bgPagePos.height = t.wrapper.offsetHeight;
            }else{
                t.bgPagePos.height = Math.ceil(pHeight);
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
        callback?callback({
            errType:1082,
            errMsg:t.errConfig['_1082']
        }):(function(){
            console.error('error',t.errConfig['_1082']);
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
    maskCtx.fillStyle = "rgba(0, 0, 0, 0.5)";

    maskCtx.fillRect(0, 0, maskCanvas.width, maskCanvas.height);
    maskCtx.globalCompositeOperation = 'destination-out';
    maskCtx.fillStyle = "rgba(0, 0, 0, 1)";
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

    maskCtx.fillStyle = "rgba(0, 0, 0, 0.5)";

    maskCtx.fillRect(0, 0, maskCanvas.width, maskCanvas.height);
    maskCtx.globalCompositeOperation = 'destination-out';
    maskCtx.fillStyle = "rgba(0, 0, 0, 1)";
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
                if(mouse.left-mouse.mouseLastX>0&&t.clipPos.x+t.clipPos.width+mouse.left-mouse.mouseLastX<=t.bgPagePos.width){
                    t.clipPos.x +=mouse.left-mouse.mouseLastX;
                }else if(t.clipPos.x+t.clipPos.width+mouse.left-mouse.mouseLastX>t.bgPagePos.width){
                    t.clipPos.x=t.bgPagePos.width-t.clipPos.width;
                }

                //左移动
                if(mouse.left-mouse.mouseLastX<0&&t.clipPos.x+mouse.left-mouse.mouseLastX>=0){
                    t.clipPos.x +=mouse.left-mouse.mouseLastX;
                }else if(t.clipPos.x+mouse.left-mouse.mouseLastX<0){
                    t.clipPos.x = 0;
                }

                //下移动
                if(mouse.top-mouse.mouseLastY>0&&t.clipPos.y+t.clipPos.height+mouse.top-mouse.mouseLastY<=t.bgPagePos.height){
                    t.clipPos.y +=mouse.top-mouse.mouseLastY;
                }else if(t.clipPos.y+t.clipPos.height+mouse.top-mouse.mouseLastY>t.bgPagePos.height){
                    t.clipPos.y = t.bgPagePos.height -t.clipPos.height;
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
                    if(t.clipPos.width+t.clipPos.x+mouse.left-mouse.mouseLastX<=t.bgPagePos.width&&t.clipPos.height+t.clipPos.y+(mouse.left-mouse.mouseLastX)*t.distPic.height/t.distPic.width<=t.bgPagePos.height){
                        // 裁剪框宽高均未超出区域
                        t.clipPos.width +=  mouse.left-mouse.mouseLastX;
                        t.clipPos.height += (mouse.left-mouse.mouseLastX)*t.distPic.height/t.distPic.width;
                    }else if(t.clipPos.width+t.clipPos.x+mouse.left-mouse.mouseLastX>t.bgPagePos.width&&t.clipPos.height+t.clipPos.y+(mouse.left-mouse.mouseLastX)*t.distPic.height/t.distPic.width<=t.bgPagePos.height){
                        // 裁剪框宽超出区域；裁剪框高未超出区域
                        t.clipPos.height =(t.bgPagePos.width-t.clipPos.x)*t.distPic.height/t.distPic.width;
                        t.clipPos.width = t.bgPagePos.width-t.clipPos.x;
                    }else if(t.clipPos.width+t.clipPos.x+mouse.left-mouse.mouseLastX<=t.bgPagePos.width&&t.clipPos.height+t.clipPos.y+(mouse.left-mouse.mouseLastX)*t.distPic.height/t.distPic.width>t.bgPagePos.height){
                        // 裁剪框宽未超出区域；裁剪框高超出区域
                        t.clipPos.height =t.bgPagePos.height-t.clipPos.y;
                        t.clipPos.width = (t.bgPagePos.height-t.clipPos.y)*t.distPic.width/t.distPic.height;
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
                    }else{
                        t.clipPos.size = Math.min(t.bgPagePos.width-t.clipPos.x,t.bgPagePos.height-t.clipPos.y)/2;
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



