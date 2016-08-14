function attachment() { /*针对移动端阻止背景固定*/
    if (!navigator.userAgent.match(/(iPhone|iPad|iPod|Android|iOS|Microsoft Lumia|Nokia|BlackBerry)/i)) {
        document.getElementsByTagName("header")[0].style.backgroundAttachment = "fixed";
    }
}

/*设置页面元素*/
function setDec() {
    var body = document.getElementsByTagName('body')[0]; /*body*/

    var headGroup = getClass(body, "note", "div"); /*设置头像*/
    for (var i = 0; i < headGroup.length; i++) {
        var head = document.createElement("div");
        head.className = "myhead-portrait";
        headGroup[i].insertBefore(head, headGroup[i].firstChild);
    }

    var hideGroup = getClass(body, "hidden", "div"); /*设置渐变*/
    for (var i = 0; i < hideGroup.length; i++) {
        var dec = document.createElement("div");
        dec.className = "dec";
        hideGroup[i].insertBefore(dec, hideGroup[i].lastChild.nextSibling);
    }

    for (var i = 0; i < hideGroup.length; i++) {
        hideGroup[i].timer = null; /*初始化定时器*/
        var btn = document.createElement("a"); /*设置按钮*/
        var txt = document.createTextNode("展开全文");
        btn.appendChild(txt);
        btn.className = "close_open";
        insertAfter(btn, hideGroup[i]);
    }
    var btnGroup = getClass(body, "close_open", "a");
    for (var i = 0; i < btnGroup.length; i++) {
        btnGroup[i].onclick = function() {
            openShutManager(this); /*设置按钮事件*/
        }
    }

    var date = getClass(body, "date", "div"); /*设置空白*/
    for (var i = 0; i < date.length - 1; i++) {
        var blankspace = document.createElement("div");
        blankspace.className = "blankspace2";
        if (date[i].innerHTML != date[i + 1].innerHTML) {
            insertAfter(blankspace, date[i].parentNode);
        }
    }
}

/*insertAfter*/
function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

/*羊*/
function setSheep(sheepArr) {
    for (var i = 0; i < sheepArr.length; i++) {
        var iTar = document.getElementById('journal-' + sheepArr[i]);
        iTar.getElementsByTagName('h2')[0].className = "sheep";
    }

}

/*启动懒加载*/
function replacement(obj) {
    var replace = obj.getElementsByClassName('unlimited');
    for (var i = 0; i < replace.length; i++) {
        var oSrc = replace[i].getAttribute('preloaded');
        if (oSrc != null) {
            replace[i].setAttribute('data-echo', oSrc);
            replace[i].removeAttribute('preloaded');
        }
    }
}

/*展开列表事件*/
function openShutManager(oSourceObj) {
    var sourceObj = oSourceObj;
    var targetObj = sourceObj.parentNode;
    var hideObj = getClass(targetObj, "hidden", "*")[0];
    var locatePoint = $(targetObj).offset().top - 20; /*jQ获取日志+上边距到页面顶端距离*/
    var openTip = "收起全文";
    var shutTip = "展开全文";
    var dec = getClass(targetObj, "dec", "div")[0];
    if (sourceObj.innerHTML == openTip) { /*关*/
        if (hideObj.getBoundingClientRect().top< 0) {
            /*如果日志完全进入浏览器区域*/
            setLocate(locatePoint, 100);
        }
        blogAction(hideObj, 230);
        if (openTip && shutTip) {
            sourceObj.innerHTML = shutTip;
        }
        dec.style.display = "block";
    } else { /*开*/
        replacement(hideObj);
        blogAction(hideObj, 'auto');
        dec.style.display = "none";
        echo.init({
            offset: 150,
            throttle: 200,
            unload: false,
            callback: function(element, op) {
                console.log(element, 'has been', op + 'ed')
            }
        });
        if (openTip && shutTip) {
            sourceObj.innerHTML = openTip;
        }
    }
}

/*博客动画*/
function blogAction(obj, tarValue) {
    clearInterval(obj.timer);
    var flag = 0;
    if (tarValue == 'auto') {
        tarValue = obj.scrollHeight;
        flag = 1;
    }
    obj.timer = setInterval(function() {
        var cur = parseInt(getStyle(obj, 'height'));
        var speed = (tarValue - cur) / 10;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        if (tarValue == cur) {
            clearInterval(obj.timer);
            if (flag == 1) {
                obj.style.height = 'auto';
            }
            obj.timer = null;
        } else {
            obj.style.height = cur + speed + "px";
        }
    }, 10);
}

/*获取样式*/
function getStyle(obj, attr) {
    return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];
}

/*定位*/
function setLocate(locationPoint, time) {
    $('html,body').animate({
        scrollTop: locationPoint
    }, time);
}

/*getClass*/
function getClass(obj, className, tagName) {
    if (obj.getElementsByClassName) {
        return obj.getElementsByClassName(className);
    } else {
        var tags = obj.getElementsByTagName(tagName);
        var tagArr = [];
        for (var i = 0; i < tags.length; i++) {
            if (tags[i].class == className) {
                tagArr[tagArr.length] = tags[i];
            }
        }
        return tagArr;
    }
}

/*月份列表事件*/
function monthList() {
    var titlegroup = getClass(document.getElementById("talk"), "monthtitle", "div");
    if (navigator.userAgent.indexOf("Edge") >= 0) {
        var blurgroup = getClass(document.getElementsByTagName("body")[0], "blur", "*");
    } else {
        var blurgroup = document.getElementById("all");
    }
    var monthclass = document.getElementById("month-class");
    var month = getClass(monthclass, "month", "div");
    var close = document.getElementById("closebuttom");
    for (var i = 0; i < titlegroup.length; i++) {
        titlegroup[i].onclick = function() {
            if (navigator.userAgent.indexOf("Edge") >= 0) {
                for (var j = 0; j < blurgroup.length; j++) {
                    blurgroup[j].style.filter = "blur(5px)";
                }
            } else {
                blurgroup.className = "blured";
            }
            monthclass.style.visibility = "visible";
            monthclass.style.opacity = "1";
            monthclass.style.transform = "scale(1)";
        }
    }
    for (var i = 0; i < month.length; i++) {
        month[i].onclick = function() {
            if (navigator.userAgent.indexOf("Edge") >= 0) {
                for (var j = 0; j < blurgroup.length; j++) {
                    blurgroup[j].style.filter = "blur(0px)";
                }
            } else {
                blurgroup.className = "";
            }
            monthclass.style.visibility = "hidden";
            monthclass.style.opacity = "0";
            monthclass.style.transform = "scale(0.96)";
        }
    }
    close.onclick = function() {
        if (navigator.userAgent.indexOf("Edge") >= 0) {
            for (var j = 0; j < blurgroup.length; j++) {
                blurgroup[j].style.filter = "blur(0px)";
            }
        } else {
            blurgroup.className = "";
        }
        monthclass.style.visibility = "hidden";
        monthclass.style.opacity = "0";
        monthclass.style.transform = "scale(0.96)";
    }
}

function goToTop() { /*回到顶部*/
    var gTT = document.getElementById('gototop').childNodes[1];
    gTT.onclick = function() {
        setLocate(0, 200);
        return false;
    }
}

/*onload事件*/
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            if (oldonload) {
                oldonload();
            }
            func();
        }
    }
}

addLoadEvent(monthList);
addLoadEvent(attachment);
addLoadEvent(setDec);
addLoadEvent(goToTop);