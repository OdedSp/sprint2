'use strict';
console.log('dragon ball');


function dragElement(id) {
    var elmnt = document.querySelector('.div-' + id + '')
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.querySelector('.' + elmnt.class + '.input-' + id + '')) {
        document.querySelector('.' + elmnt.class + '.input-' + id + '').onmousedown = dragMouseDown;
    } else {
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        getLoc()
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }

    function getLoc() {
        gCanvasInfo.texts[id - 1].posX = elmnt.offsetLeft - gCanvas.offsetLeft + 20;
        gCanvasInfo.texts[id - 1].posY = elmnt.offsetTop - gCanvas.offsetTop + 40;
        renderCanvas()
    }

}


