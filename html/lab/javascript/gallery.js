        /*图片库*/
        function prepareGallery() {
            if (!document.getElementById) return false;
            if (!document.getElementsByTagName) return false;
            if (!document.getElementById("imagegallery")) return false;
            var gallery = document.getElementById("imagegallery");
            var links = gallery.getElementsByTagName("a");
            for (var i = 0; i < links.length; i++) {
                links[i].onclick = function() {
                    showPic(this);
                    return false;
                }
            }
        }

        function showPic(whichpic) {
            var source = whichpic.getAttribute("href");
            var placeholder = document.getElementById("placeholder");
            placeholder.setAttribute("src", source);
            var text = whichpic.getAttribute("title");
            var description = document.getElementById("description");
            description.firstChild.nodeValue = text;
        }

        window.onload = prepareGallery;

        function addLoadEvent(func) {
            var oldonload = window.onload;
            if (typeof window.onload != 'function') {
                window.onload = func;
            } else {
                window.onload = function() {
                    oldonload();
                    func();
                }
            }
        }

        addLoadEvent(prepareGallery);

        /*窗口弹出*/
        function prepareLinks() {
            if (!document.getElementsByTagName) return false;
            var links = document.getElementsByTagName("a");
            for (var i = 0; i < links.length; i++) {
                if (links[i].getAttribute("class") == "popup") {
                    links[i].onclick = function() {
                        popUp(this.getAttribute("href"));
                        return false;
                    }
                }
            }
        }


        function popUp(winURL) {
            window.open(winURL, "popup", "width=900,height=480");
        }

        addLoadEvent(prepareLinks);