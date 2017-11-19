'use strict'
console.log('Meme Generator');

var gImgObjs = [
    { id: 1, name: 'Ancient-Aliens', url: 'img/memes/Ancient-Aliens.jpg', keywords: ['human'] },
    { id: 2, name: 'Bad-Luck-Brian', url: 'img/memes/Bad-Luck-Brian.jpg', keywords: ['human', 'sweater', 'braces', 'redhead'] },
    { id: 3, name: 'Business-Cat', url: 'img/memes/Business-Cat.jpg', keywords: ['animal', 'cute'] },
    { id: 4, name: 'Confession-Bear', url: 'img/memes/Confession-Bear.jpg', keywords: ['animal', 'cute', 'sad'] },
    { id: 5, name: 'First-World-Problems', url: 'img/memes/First-World-Problems.jpg', keywords: ['human', 'sad', 'cynic', 'sarcastic'] },
    { id: 6, name: 'Not-Sure-If', url: 'img/memes/Not-Sure-If.jpg', keywords: ['cartoon', 'fry', 'futurama'] },
    { id: 7, name: 'One-Does-Not-Simply', url: 'img/memes/One-Does-Not-Simply.jpg', keywords: ['human', 'sean', 'bean', 'lord of the rings', 'boromir'] },
    { id: 8, name: 'Third-World-Skeptical-Kid', url: 'img/memes/Third-World-Skeptical-Kid.jpg', keywords: ['problem', 'human', 'black', 'african'] },
    { id: 9, name: 'X-Everywhere', url: 'img/memes/X-Everywhere.jpg', keywords: ['cartoon', 'buzz', 'woody', 'toy story'] },
    { id: 10, name: 'Y-U-No', url: 'img/memes/Y-U-No.jpg', keywords: ['cartoon', 'angry', 'rage'] },
]

var gKeywords = {};

var gCanvasInfo = { imgId: 1, texts: [] }

var gCurrinput;

var gCanvas = document.querySelector('canvas');

function init() {
    getKeywordsMap()
    renderImages(gImgObjs);
    renderCanvas()
    expandKeywords();
}

//This function takes the name of the img object and iserts it to the keywords
function expandKeywords() {
    gImgObjs.forEach(function (img) {
        var nameKeywords = img.name.split('-');
        var newKws = nameKeywords.concat(img.keywords);
        newKws = newKws.map(function (keyword) {
            return keyword.toLowerCase();
        })
    });
}

//This function renders the img objects and the popular keywords to the DOM
function renderImages(ImgObjs) {
    expandKeywords();
    var elGallery = document.querySelector('.gallery')
    var strHtml = '';
    ImgObjs.forEach(function stringToHtml(imgObj) {
        strHtml += `
        <div class="meme-card">
        <li>
        <img src="${imgObj.url}" alt="${imgObj.name}" class="img-${imgObj.id}" onclick="changeStep('step-two',${imgObj.id})"/>
        <p>${imgObj.name}</p><br>
        </li>
        </div>`
        renderKeywords()        
    })
    elGallery.innerHTML = strHtml;
}

function getKeywordsMap() {
    gImgObjs.forEach(function (imgObj) {
        var imgKeys = imgObj.keywords;
        imgKeys.forEach(function (key) {
            if (!gKeywords[key]) gKeywords[key] = { count: 0, imgObjs: [] };
            gKeywords[key].count++;
            gKeywords[key].imgObjs.push(imgObj);
        })
    })
}

function filterBySearch(userKey, ev) {
    if (ev) {
        if (ev.keyCode !== 13) return;
    }
    if (!userKey) var userKey = document.querySelector('.search').value;
    var filterdImgs = gKeywords[userKey].imgObjs;
    renderImages(filterdImgs);
}
function renderKeywords() {
    var elContainer = document.querySelector('.popular-keywords')
    var strHTML = '';
    for (var key in gKeywords) {
        strHTML += `<h6 onclick="filterBySearch('${key}')" style="font-size: ${gKeywords[key].count}em">${key}<h6/>`
        elContainer.innerHTML = strHTML;
    }
}
function changeStep(step, imgId) {
    var elPrevStep = document.querySelector('.show');
    elPrevStep.classList.remove('show')
    var elCurrStep = document.querySelector('.' + step + '')
    elCurrStep.classList.add('show')
    gCanvasInfo.imgId = imgId;
    if (imgId) renderCanvas();
    addInput()
}

function renderCanvas() {
    var canvas = gCanvas;
    var ctx = canvas.getContext('2d');
    var img = document.querySelector('.img-' + gCanvasInfo.imgId + '');
    var canvasHeight = img.naturalHeight;
    var canvasWidth = img.naturalWidth;
    canvas.height = canvasHeight;
    canvas.width = canvasWidth;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    gCanvasInfo.texts.forEach(function (input, idx) {
        ctx.font = gCanvasInfo.texts[idx].fontSize + "px " + gCanvasInfo.texts[idx].font;
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 4;
        ctx.fillStyle = gCanvasInfo.texts[idx].fillColor;
        ctx.textAlign = gCanvasInfo.texts[idx].align;
        ctx.shadowColor = 'black'
        ctx.shadowBlur = gCanvasInfo.texts[idx].shadowBlur;
        var currText = gCanvasInfo.texts[idx].content
        ctx.strokeText(currText.toUpperCase(), gCanvasInfo.texts[idx].posX, gCanvasInfo.texts[idx].posY);
        ctx.fillText(currText.toUpperCase(), gCanvasInfo.texts[idx].posX, gCanvasInfo.texts[idx].posY);
    })
}

function alignText(align) {
    var canvas = gCanvas;
    var pos;
    switch (align) {
        case 'start':
            pos = 10;
            break;
        case 'end':
            pos = canvas.width - 10;
            break;
        default:
            pos = canvas.width / 2;
            break;
    }
    gCanvasInfo.texts[gCurrinput].align = align;
    gCanvasInfo.texts[gCurrinput].posX = pos;
}

function changeFontSize(op) {
    var currInput = document.activeElement
    if (op === '+') {
        gCanvasInfo.texts[gCurrinput].fontSize++
    } else {
        gCanvasInfo.texts[gCurrinput].fontSize--
    }
}

function changeTextColor() {
    var color = document.querySelector('.fill-color').value;
    gCanvasInfo.texts[gCurrinput].fillColor = color;
    renderCanvas()
}

function toggleShadow() {
    if (gCanvasInfo.texts[gCurrinput].shadowBlur === 0) {
        gCanvasInfo.texts[gCurrinput].shadowBlur = 5;
    } else {
        gCanvasInfo.texts[gCurrinput].shadowBlur = 0;
    }
}

function changeFont() {
    var font = document.querySelector('.font-family').value;
    gCanvasInfo.texts[gCurrinput].font = font;
    renderCanvas()
}

function addUserImg() {
    var elName = document.querySelector('.usersImgName').value
    var elUrl = document.querySelector('.usersImgUrl').value
    var newImgObj = { id: gImgObjs.length + 1, name: elName, url: elUrl, keywords: elName }
    gImgObjs.push(newImgObj)
    gCanvasInfo.texts[gCurrinput].imgId = gImgObjs.length;
    renderImages(gImgObjs)
    changeStep('step-two', gImgObjs.length)
}

function deleteText() {
    var elCurrText = document.querySelector('.top-txt');
    elTopText.value = '';
    renderCanvas();
}
function changeTextHeight(operator, lineId) {
    if (operator === '+') gCanvasInfo.texts[gCurrinput].posY -= 10;
    else gCanvasInfo.texts[gCurrinput].posY += 10;
    renderCanvas();
}

function downloadImg(elLink) {
    elLink.href = gCanvas.toDataURL();
    elLink.download = 'myMeme.jpg';
}

function addInput() {
    gCanvasInfo.texts.push(
        { content: '', posX: 100, posY: 100, align: 'left', fillColor: 'white', fontSize: 30, font: 'Arial', shadowBlur: 0 }
    )
    var input = document.createElement('input');
    input.setAttribute('class', 'input-' + gCanvasInfo.texts.length + '');
    input.setAttribute('oninput', 'updateTxt(' + gCanvasInfo.texts.length + ')');
    input.setAttribute('onfocus', 'setCurrInput(' + gCanvasInfo.texts.length + ')');
    input.autofocus = true;
    var div = document.createElement('div');
    div.setAttribute('onmousedown', 'dragElement(' + gCanvasInfo.texts.length + ')')
    div.setAttribute('onTap', 'dragElement(' + gCanvasInfo.texts.length + ')')
    div.setAttribute('onTap', 'dragElement(' + gCanvasInfo.texts.length + ')')
    div.setAttribute('class', 'div-' + gCanvasInfo.texts.length + '')
    div.appendChild(input)
    var inputsContainer = document.querySelector('.inputs-container').appendChild(div);
    dragElement(gCanvasInfo.texts.length)
    addInputMobile()
}
function addInputMobile() {
    var input = document.createElement('input');
    input.setAttribute('class', 'mobile-input-' + gCanvasInfo.texts.length + '');
    input.setAttribute('oninput', 'mobileUpdateTxt(' + gCanvasInfo.texts.length + ')');
    input.setAttribute('onfocus', 'setCurrInput(' + gCanvasInfo.texts.length + ')');
    var inputsContainerMobile = document.querySelector('.inputs-container-mobile').appendChild(input);
}

function updateTxt(id) {
    var value = document.querySelector('.input-' + id + '').value
    gCanvasInfo.texts[id - 1].content = value;
    renderCanvas()
}
function mobileUpdateTxt(id) {
    var value = document.querySelector('.mobile-input-' + id + '').value
    gCanvasInfo.texts[id - 1].content = value;
    renderCanvas()
}

function setCurrInput(inputId) {
    gCurrinput = inputId - 1
}