window.onload = function() {
    document.getElementById('warning').style.display = "none";

    var oParent = document.getElementsByTagName('main')[0];
    oParent.style.columnWidth = "260px";
    oParent.style.columnGap = "15px";

    var dataInt = getData(53);
    var loaded = preload(oParent, dataInt, 22);

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


function checkscrollside() {
    var oParent = document.getElementById('main');
    var aPin = document.getElementsByClassName('pin');
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