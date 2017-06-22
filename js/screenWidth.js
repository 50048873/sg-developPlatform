(function(doc, win) {
    var screenWidth = 0, size = 'M', root = doc.documentElement;
    if (window.screen && screen.width) {
        screenWidth = screen.width;
        if (screenWidth >= 1920) {
            // 超大屏，例如iMac
            size = 'L';
        } else if (screenWidth < 768) {
            // 小屏，如手机
            size = 'S';
        }
    }
    // 标记CSS
    /*if (root.className) { 
    	root.className += ' ' + size;
    } else { 
    	root.className = size;
    }*/
    // 标记JS
    win.SIZE = size; 
})(document, window);