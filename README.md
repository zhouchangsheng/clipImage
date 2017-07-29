## 裁剪图片


> 你可以使用这个插件，按照在配置对象中定义的尺寸在不失真情况下进行图片裁切。



### 介绍
你可以使用这个插件，按照在配置对象中定义的尺寸在不失真情况下进行图片裁切。这个插件有操作和显示两个部分，在操作区，你可以拖拽或缩放裁剪框，裁剪框的宽高比和目标图片尺寸宽高比一致且有使图片不失真的最小宽高；显示区实时响应操作区的拖拽和缩放等动作，将裁剪框中的图像按照配置对象中的尺寸显示出来。

### 示例
[plunker-clipImage](https://plnkr.co/OX2No8ymIwDLs7P7huuR)

### 用法
#### 1.实例化

在使用之前，首先实例化一个对象。有两种实例化方式，一种是 `new ClipImage(option,callback)`，另一种首先实例化 `var clipImage = new ClipImage()`然后调用`clipImage.init(option,callback)`。你要传递一个不可缺省的配置对象 `option`和一个可选的回调函数 `callback`，回掉函数在实例化出错时被调用，如果出错而且回掉函数缺省，则上下文会输出错误信息到控制台。


```javascript
var option = {
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
    },
    url:"http://www.xxx.com/xx.png",
    scalePoint:{
        size:8,
        color:"blue"
    }
};
var callback = function(err){
    //err logic
};

// one
var clipImage = new ClipImage(option,callback)

// another
var clipImage = new ClipImage();
clipImage.init(option,callback);
```


---
**初始化参数（option[,callback]**

**option**<br/>
参数类型：`object`<br/>
参数描述：用来提供目标图片尺寸、模式、操作元素、缩放点配置；配置对象有5个参数<br/>

**callback** <br/>
参数类型：`function`<br/>
参数描述：用来当实例化出现错误时反馈给调用处，如果函数缺省，当发生错误时，执行上下文将会错误信息输出到控制台；回掉函数中有错误对象`err`参数。<br/>

------

**初始化参数—option**

**mode** <br/>
数据类型：`string`<br/>
数据可选：必须参数；<br/>
数据描述：用来指定目标图像的形状：`circle`（裁剪框圆形-显示区圆形）、`rect`（裁剪框矩形-显示区矩形）、`circleToRect`（裁剪框圆形-显示区正方形）<br/>

**distPic** <br/>
数据类型：`object`<br/>
数据可选：必须参数<br/>
数据描述：用来指定目标图像尺寸`width`、`height`和`size`<br/>


**elements**<br/>
数据类型：`object`<br/>
数据可选：必须参数<br/>
数据描述：用来提供dom中的元素，即容器元素`wrapper`、操作区面板`panel`、显示区面板`showPanel`<br/>

**url**<br/>
数据类型：`string`<br/>
数据可选：可选参数<br/>
数据描述：图片地址，用来在实例化时在操作区显示要裁剪图片<br/>

**scalePoint**<br/>
数据类型：`object`<br/>
数据可选：可选参数<br/>
数据描述：用来指定裁剪框拉伸点大小和颜色；有`size`和`color`两个属性

---

**初始化参数—option—>distPic**

**width**<br/>
数据类型：`number`<br/>
数据可选：-<br/>
数据描述：当`mode`为`rect`时`distPic`的属性值，也就是目标矩形图形的宽<br/>

**height**<br/>
数据类型：`number`<br/>
数据可选：-<br/>
数据描述：当`mode`为`rect`时`distPic`的属性值，也就是目标矩形图形的高<br/>

**size**<br/>
数据类型：`number`<br/>
数据可选：-<br/>
数据描述：当`mode`为`circle`或`circleToRect`时`distPic`的属性值，也就是目标圆形半径或正方形边长（2*size）<br/>

---

**初始化参数—option—> elements**

**wrapper** <br/>
数据类型：`object`<br/>
数据可选：必须参数<br/>
数据描述：容器元素用来包裹操作区面板，拥有`value`、高`height`、宽`width`三个属性。<br/>

**panel** <br/>
数据类型：`string`or`htmlDOM`<br/>
数据可选：必须参数<br/>
数据描述：用来提供操作区面板，值类型是canvas元素ID或dom节点对象<br/>

**showPanel** <br/>
数据类型：`string`or`htmlDOM`<br/>
数据可选：必须参数<br/>
数据描述：用来提供显示区面板，值类型是canvas元素ID或dom节点对象

---

**初始化参数—option—> elements—>wrapper**

**value**<br/>
数据类型：`string`or`htmlDOM`<br/>
数据可选：必须参数<br/>
数据描述：容器元素要是块级元素或内联块元素，用来包裹操作区元素`panel`<br/>

**width**<br/>
数据类型：`number`<br/>
数据可选：可选参数<br/>
数据描述：如果缺省且没有通过属性设置宽度则会出错，否则会覆盖之前或默认的宽度<br/>

**height**<br/>
数据类型：`number`<br/>
数据可选：可选参数<br/>
数据描述：如果缺省且没有通过属性设置高度则会出错，否则会覆盖之前或默认的高度<br/>

---

**初始化参数—option—> scalePoint**

**size**<br/>
数据类型：`number`<br/>
数据可选：必须参数<br/>
数据描述：裁剪框拉伸点大小<br/>

**color**<br/>
数据类型：`string`<br/>
数据可选：必须参数<br/>
数据描述：裁剪框拉伸点颜色<br/>

---

**初始化参数—callback( err )**

**err**<br/>
参数类型：`object`<br/>
参数描述：用来提供错误码和错误信息；错误信息对象有两个键(`errType`和`errMsg`)值对 <br/>

---

**初始化参数—callback—err**

**errType** <br/>
参数类型：`number`<br/>
参数描述：错误码，每一个错误对应一个错误码<br/>

**errMsg**<br/>
参数类型：`string`<br/>
参数描述：错误信息<br/>

---




#### 2.更换裁剪图片
通常情况下，当选择的图片不符合条件或者就像更换正在裁剪的图片时，这里提供了`changeImgUrl`方法去更改图片地址，这个方法是在一开始实例化后`clipImage`对象的一个属性方法。

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
---

**方法参数（ url[,callback] ）**

**url**<br/>
参数类型：`string`<br/>
参数描述：提供在操作区显示要裁剪图片地址源<br/>

**callback**<br/>
参数类型：`function`<br/>
参数描述：用来获取错误信息`err`，当callback没有定义时，且错误发生时，会将错误信息打印到控制台<br/>

---

**初始化参数—callback( err )**

**err**<br/>
参数类型：`object`<br/>
参数描述：用来提供错误码和错误信息；错误信息对象有两个键(`errType`和`errMsg`)值对 <br/>

---

**初始化参数—callback—err**

**errType** <br/>
参数类型：`number`<br/>
参数描述：错误码，每一个错误对应一个错误码<br/>

**errMsg**<br/>
参数类型：`string`<br/>
参数描述：错误信息<br/>

---


#### 3.获取裁剪图片
之后，你可以通过调用已经实例化对象的方法`saveImage`去获取裁剪框中的图像。目前获取图像的格式支持base64或[blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob)对象。

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
---

**方法参数（ type[,callback] )**

**type**<br/>
参数类型：`string`<br/>
参数描述：字符串（'blob'或'base64'），用来提供生成目标图像的数据类型

**callback**<br/>
参数类型：`function`<br/>
参数描述：用来获取生成的目标图像或错误信息，当有图像数据时，错误信息为`null`，当有错误信息时，图像数据为`null`,回调函数的两个参数分别是`err`和`data`<br/>

---

**方法参数—callback( err,data )**

**err**<br/>
参数类型：`object`<br/>
参数描述：用来提供错误码和错误信息；错误信息对象有两个键(`errType`和`errMsg`)值对 <br/>

**data**<br/>
参数类型：`blob`or`string`<br/>
参数描述：base64字符串或[blob](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)对象；用来提供已裁剪好的图像数据<br/>

---

**方法参数—callback—err**

**errType** <br/>
参数类型：`number`<br/>
参数描述：错误码，每一个错误对应一个错误码<br/>

**errMsg**<br/>
参数类型：`string`<br/>
参数描述：错误信息<br/>

---

#### 4.错误码

|errType|errMsg|
|:--:|--|
|1000|param of 'option' was missing|
|1001|param of 'option' was expected to be object|
|1010|'option.mode' was missing|
|1011|'option.mode' was expected to be string |
|1012|'option.mode' was expected to be string which is one of rect or circle or cirlcleToRect|
|1020|'option.distPic' was missing|
|1021|'option.distPic' was expected to be object|
|1022|'option.distPic.width' was missing|
|1023|'option.distPic.width' was expected to be number|
|1024|'option.distPic.height' was misssing|
|1025|'option.distPic.height' was expected to be number|
|1026|'option.distPic.size' was missing|
|1027|'option.distPic.size' was expected to be number|
|1030|'option.elements' was missing
|1031|'option.elements' was expected to be object|
|1032|'option.elements.wrapper' was missing|
|1033|'option.elements.wrapper' was expected to be object|
|1034|'option.elements.wrapper.value' was missing|
|1035|'option.elements.wrapper.value' was expected to be string of div's id or HTMLDIVDOM|
|1036|'option.elements.wrapper.width' was expected to be number|
|1037|'option.elements.wrapper.height' was expected to be number|
|1038|'option.elements.panel' was missing|
|1039|'option.elements.panel' was expected to be string of canvas's id or HTMLCANVASDOM|
|1040|'option.elements.showPanel' was missing|
|1041|'option.elements.showPanel' was expected to be string of canvas's id or HTMLCANVASDOM|
|1050|'option.url' was expected to be string'|
|1060|'option.scalePoint' was expected to be object|
|1061|'option.scalePoint.color' was missing|
|1062|'option.scalePoint.color' was expected to be string|
|1063|'option.scalePoint.size' was missing|
|1064|'option.scalePoint.size' was expected to be number|
|1070|'callback' was expected to be function|
|1080|'url' was missing|
|1081|'url' was expected to be string|
|1082|'url' was invalid|
|1090|'type' was missing|
|1091|'type' was expected to be string|
|1092|'type' was expected to be string which is one of blob or base64|
|1100|'saveImage' Failed.|
