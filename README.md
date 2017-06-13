#### ClipImage

> You can keep the pixels to clip image with the plugin by setting size that expected in the config object.

##### Introduction
You can keep the pixels to clip image  with the plugin by setting size that expected in the config object.The plugin have two area that are operation and presentation,you can drag or scale the clip box that it's ratio of size is consistent with expectation and it have a minimum to keep picture clipped clear in the operation area,and presentation area show real-time picture expected to have fixed size provided in config object.

##### Usage
###### 1.Instantiating   

Firstly,you have to instantiate before using it.There have two ways,one is `new ClipImage(option,callback)`,another is firstly `var clipImage = new ClipImage()`and then `clipImage.init(option,callback)`.You have to pass a config `option` object that is necessary and an optional `callback` which will be called when error occurs on the instantiation,this process will print error message if error occurs and `callback` has not been passed.

- Create ClipImage with config object

```html
<html>
```

```javascript
var clipImage = new ClipImage({
    mode:"rect",
    distPic:{
        width:976,
        height:480
    },
    elements:{
        wrapper:{
            value:"WRAPPER"
        },
        panel:"PANEL",
        showPanel:"SHOWPANELs"
    } 
})
```

- Create ClipImage,and then init

###### 2.Change image source   
In general,we have to change image that is under clipping while image selected was not in keep with restriction or just wanna alter it,then,there is a way to support handling it via invoking `changeImgUrl` of `clipImage` which was instantiated at the beginning.   

```javascript 
clipImage.changeImgUrl(url,callback)

#example
var url = 'http://www.xxx.com/xx.png';
clipImage.changeImgUrl(url,function(err){ 
    if(err){
     //error handle logic
    }
})
```
|param|dataType|description|
|--|--|--|
|url|string(base64\|uri)\|object([blob](https://developer.mozilla.org/en-US/docs/Web/API/URL))|Necessary.the `url` must be valid as img htmlDOM`src` attribute,otherwise,context will execute relevant logic,as bellow.|
|callback|function(err)|Optional.It's used to obtain object consisted of `errType`and `errMsg`,so as to customize error tooltip information  .The context will print warning to console if `callback` was not passed,otherwise,passing a object to `callback` when error resulted from invalid url param occurs. |

###### 3.get image clipped   
After that,you may invoke `saveImage` of `clipImage` which was instantiated at the beginning to get image data whose type include
blob and base64.

```javascript 
clipImage.saveImage(type,callback)

#example
clipImage.saveImage('blob',function(err,data){ 
    if(err){
     //error handle logic
    }else{
     //image handle logic
    }
})
```
|param|dataType|description|
|--|--|--|
|type|string('[blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob)'\|'base64')|Necessary.At present,only two string`type` are supported,i.e,`blob`and`base64`. otherwise error will occur if type not defined or other string,as below.|
|callback|function(err,data)|Optional.It's used to obtain  image clipped,and have two params of err which is error object consisted of `errType`and `errMsg`,and data which is image clipped .The context will print warning to console if `callback` was not passed and error occurs,otherwise,passing a object to `callback` when error resulted from invalid `type` string occurs.

