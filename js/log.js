function list() {
    var tar = getClass(document.getElementById("note"), "date");
    for (var i = 0; i < tar.length; i++) {
        tar[i].nextSibling.nextSibling.timer = null;
        tar[i].onclick = function() {
            openLog(this, tar);
        }
    }
    openLog(tar[0], tar); /*打开第一个列表*/
}

function goToTop() { /*回到顶部*/
    var gTT = document.getElementById('gototop').childNodes[1];
    gTT.onclick = function() {
        setLocate(0, 200);
        return false;
    }
}

function openLog(sourceObj, parent) {
    var dateThis = sourceObj;
    var dateGroup = parent;
    var hideObj = dateThis.nextSibling.nextSibling;
    var openGroup = getClass(dateThis.parentNode.parentNode, "date open");
    var locate = $('#note').offset().top;
    if (dateThis.className == "date open") { /*关闭*/
        if (dateThis.style.position == 'fixed') {
            setLocate(locate, 100);
        }
        dateThis.className = "date";
        listAction(hideObj, 0);
    } else { /*打开*/
        if (openGroup.length != 0 && openGroup[0].style.position == 'fixed') {
            setLocate(locate, 100);
        }
        for (var i = 0; i < dateGroup.length; i++) {
            dateGroup[i].className = "date";
            listAction(dateGroup[i].nextSibling.nextSibling, 0);
        }
        dateThis.className = "date open";
        listAction(hideObj, 'auto');
    }
}

/*列表动画*/
function listAction(obj, tarValue) {
    clearInterval(obj.timer);
    if (tarValue == 'auto') {
        tarValue = obj.scrollHeight;
    }
    obj.timer = setInterval(function() {
        var cur = parseInt(getStyle(obj, 'height')); /*获取实时高度*/
        var speed = (tarValue - cur) / 10;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        if (tarValue == cur) {
            clearInterval(obj.timer);
            obj.timer = null;
        } else {
            obj.style.height = cur + speed + "px";
        }
    }, 10);
}

/*固定元素*/
function makeFixed() {
    var fixedGroup = getClass(document.getElementById('note'), 'date');
    var iHeight = fixedGroup[0].offsetHeight;
    var iTop = [];
    var noteHeight = [];
    for (var i = 0; i < fixedGroup.length; i++) {
        iTop[i] = fixedGroup[i].offsetTop;
        noteHeight[i] = fixedGroup[i].nextSibling.nextSibling.scrollHeight; /*notegroup高度*/
    }
    window.onscroll = function() {
        var sTop = document.documentElement.scrollTop || document.body.scrollTop;
        for (var i = 0; i < fixedGroup.length; i++) {
            var noteThis = fixedGroup[i].nextSibling.nextSibling; /*notegroup*/
            if (fixedGroup[i].getBoundingClientRect().top < 0 && fixedGroup[i].className == 'date open') {
                fixedGroup[i].style.position = "fixed";
                fixedGroup[i].style.top = "0px";
                fixedGroup[i].style.zIndex = "1000";
                noteThis.style.marginTop = iHeight + "px";
            }
            if (fixedGroup[i].className == 'date' || (iTop[i] - sTop > 0 && fixedGroup[i].style.position == "fixed") || sTop > noteHeight[i] + noteThis.offsetTop - iHeight) {
                fixedGroup[i].style.position = "relative";
                fixedGroup[i].style.zIndex = "1";
                noteThis.style.marginTop = "0px";
            }
        }
    }
}

/*背景固定*/
function setBackgroundFixed() {
    if (!navigator.userAgent.match(/(iPhone|iPad|iPod|Android|iOS|Microsoft Lumia|Nokia|BlackBerry)/i)) {
        var header = document.getElementsByTagName("header")[0].style.backgroundAttachment = "fixed";
    }
}

function getClass(obj, className) {
    if (obj.getElementsByClassName) {
        return obj.getElementsByClassName(className);
    } else {
        var tags = obj.getElementsByTagName("div");
        var tagArr = [];
        for (var i = 0; i < tags.length; i++) {
            if (tags[i].class == className) {
                tagArr[tagArr.length] = tags[i];
            }
        }
        return tagArr;
    }
}

/*动态替换li符号*/
function changeListType() {
    var oList = document.getElementsByTagName("ol");
    var Num = 0;
    for (var i = 0; i < oList.length; i++) {
        Num = oList[i].getElementsByTagName("li").length;
        if (Num == 1) {
            oList[i].style.listStyleType = "circle";
        }
    }
}

/*获取样式*/
function getStyle(obj, attr) {
    return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];
}

/*悬浮显示文字*/
function addDashed() {
    var dashtxt = getClass(document.getElementById('note'), 'add_dash');
    for (var i = 0; i < dashtxt.length; i++) {
        if (navigator.userAgent.match(/(iPhone|iPad|iPod|Android|iOS|Microsoft Lumia|Nokia|BlackBerry)/i)) {
            dashtxt[i].style.MozUserSelect = 'none';
            dashtxt[i].style.WebkitUserSelect = 'none';
            dashtxt[i].ontouchstart = function() {
                var insert = this.nextSibling.nextSibling;
                listAction(insert, 'auto');
            }
            dashtxt[i].ontouchend = function() {
                var insert = this.nextSibling.nextSibling;
                listAction(insert, 0);
            }
            dashtxt[i].onselectstart = function() {
                return false;
            }
        } else {
            dashtxt[i].onmouseover = function() {
                var insert = this.nextSibling.nextSibling;
                listAction(insert, 'auto');
            }
            dashtxt[i].onmouseout = function() {
                var insert = this.nextSibling.nextSibling;
                listAction(insert, 0);
            }
        }
    }
}

/*定位*/
function setLocate(locationPoint, time) {
    $('html,body').animate({
        scrollTop: locationPoint
    }, time);
}

/*立即执行*/
changeListType();
setBackgroundFixed();
list();
goToTop();
makeFixed();
addDashed();