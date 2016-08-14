window.onload = function() {
    document.getElementById('warning').style.display = "none";

    var dataInt = getData(53);
    var oParent = document.getElementsByTagName('main')[0];
    var loaded = preload(oParent, dataInt, 22);
    waterfall('main', 'pin');
    setInterval("waterfall('main', 'pin')", 1000);

    window.onscroll = function() {
        if (checkscrollside()) {
            for (var i = loaded; i < dataInt.data.length; i++) {
                var oPin = document.createElement('div');
                oPin.className = 'pin';
                oParent.appendChild(oPin);
                var oBox = document.createElement('div');
                oBox.className = 'box';
                oPin.appendChild(oBox);
                var oImg = document.createElement('img');
                oImg.src = 'img' + '/waterfall/' + dataInt.data[i].src;
                oBox.appendChild(oImg);
            }
            waterfall('main', 'pin');
        };
    }
}

function preload(parent, dataInt, num) {
    for (var i = 0; i < num; i++) {
        var oPin = document.createElement('div');
        oPin.className = 'pin';
        parent.appendChild(oPin);
        var oBox = document.createElement('div');
        oBox.className = 'box';
        oPin.appendChild(oBox);
        var oImg = document.createElement('img');
        oImg.src = 'img' + '/waterfall/' + dataInt.data[i].src;
        oBox.appendChild(oImg);
    }
    return i;
}

function waterfall(parent, pin) {
    var oParent = document.getElementById(parent) || document.getElementsByTagName(parent)[0]; // 父级对象
    var aPin = getClassObj(oParent, pin); // 获取存储块框pin的数组aPin
    var iPinW = aPin[0].offsetWidth; // 一个pin的宽
    var num = Math.floor(document.documentElement.clientWidth / iPinW); //每行中能容纳的pin个数
    oParent.style.cssText = 'width:' + iPinW * num + 'px;';

    var pinHArr = []; // 每列pin的高度和
    for (var i = 0; i < aPin.length; i++) {
        var pinH = aPin[i].offsetHeight;
        if (i < num) {
            pinHArr[i] = pinH; //将首行pin个数存入数组
        } else {
            var minH = Math.min.apply(null, pinHArr); //获取数组pinHArr最小值
            var minHIndex = getminHIndex(pinHArr, minH);
            aPin[i].style.position = 'absolute';
            aPin[i].style.top = minH + 'px';
            aPin[i].style.left = aPin[minHIndex].offsetLeft + 'px';
            //最小高元素的高 + aPin[i]块框高
            pinHArr[minHIndex] += aPin[i].offsetHeight; //更新列高
        }
    }
}

//get Class
function getClassObj(parent, className) {
    if (document.getElementsByClassName) {
        var pinS = document.getElementsByClassName(className);
    } else {
        var obj = parent.getElementsByTagName('*');
        var pinS = [];
        for (var i = 0; i < obj.length; i++) {
            if (obj[i].className == className) {
                pinS.push(obj[i]);
            }
        };
    }
    return pinS;
}
/****
 *获取 pin高度 最小值的索引index
 */
function getminHIndex(arr, minH) {
    for (var i in arr) {
        if (arr[i] == minH) {
            return i;
        }
    }
}


function checkscrollside() {
    var oParent = document.getElementById('main');
    var aPin = getClassObj(oParent, 'pin');
    var lastPinH = aPin[aPin.length - 1].offsetTop + Math.floor(aPin[aPin.length - 1].offsetHeight / 2);
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var documentH = document.documentElement.clientHeight; //页面高度
    return (lastPinH < scrollTop + documentH) ? true : false;
}

function getData(num) {
    var dataValue = {};
    var dataInt = {
        'data': []
    };
    var data = new Array;
    for (var i = 0; i < num; i++) {
        dataValue = {
            'src': i + 1 + '.jpg'
        };
        data[i] = dataValue;
    }
    dataInt.data = data;
    return dataInt;
}