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
    { id: 10, name: 'Y-U-No', url: 'img/memes/Y-U-No.jpg', keywords: ['cartoon', 'angry'] },
]

var gKeywords = {};

var gUserPrefs = { imgId: 1, align: 'center', pos: 150, fillColor: 'white', fontSize: 30, font: 'Arial', shadowBlur: 0 }

function init() {
    getKeywordsMap()
    renderImages(gImgObjs);
    renderCanvas()
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

expandKeywords();

//This function renders the img objects and the popular keywords to the DOM
function renderImages(ImgObjs) {
    expandKeywords();
    var elGallery = document.querySelector('.gallery')
    var strHtml = '';
    ImgObjs.forEach(function stringToHtml(imgObj) {
        strHtml += `
        <li>
        <img src="${imgObj.url}" alt="${imgObj.name}" class="img-${imgObj.id}" onclick="changeStep('step-two',${imgObj.id})"/>
        <p>${imgObj.name}</p>
        // <a href="lmgtfy/${imgObj.name}">About this meme</a>
    </li>`})
    elGallery.innerHTML = strHtml;
    var elPopular = document.querySelector('.popular-keywords')
    var popularStrHmnl = ''
    for (var key in gKeywords) {
        popularStrHmnl += `<h6 onclick="filterBySearch('${key}')" style="font-size: ${gKeywords[key].count}em">${key}<h6/>`
        elPopular.innerHTML = popularStrHmnl;
    }
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

function changeStep(step, imgId) {
    var step1 = document.querySelector('.step-one');
    var elTopText = document.querySelector('.top-txt');
    var elBottomText = document.querySelector('.bottom-txt');
    elTopText.value = 'top meme text'
    elBottomText.value = ''
    if (step1.classList.contains('show') && !imgId) {
        imgId = 10;
        elTopText.value = 'y u no'
        elBottomText.value = 'choose image?'
    }
    var elPrevStep = document.querySelector('.show');
    elPrevStep.classList.remove('show')
    var elCurrStep = document.querySelector('.' + step + '')
    elCurrStep.classList.add('show')
    gUserPrefs.imgId = imgId;
    if (imgId) renderCanvas();
}

function renderCanvas() {
    var canvas = document.querySelector('canvas');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var img = document.querySelector('.img-' + gUserPrefs.imgId + '');
    img.onload = function () {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    ctx.font = gUserPrefs.fontSize + "px " + gUserPrefs.font;
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 4;
    ctx.fillStyle = gUserPrefs.fillColor;
    ctx.textAlign = gUserPrefs.align;
    ctx.shadowColor = 'black'
    ctx.shadowBlur = gUserPrefs.shadowBlur;
    var topText = document.querySelector('.top-txt').value;
    ctx.strokeText(topText, gUserPrefs.pos, 50);
    ctx.fillText(topText, gUserPrefs.pos, 50);
    var bottomText = document.querySelector('.bottom-txt').value;
    ctx.strokeText(bottomText, gUserPrefs.pos, 150);
    ctx.fillText(bottomText, gUserPrefs.pos, 150);
}

function alignText(align) {
    var pos;
    switch (align) {
        case 'start':
            pos = 0;
            break;
        case 'end':
            pos = 300;
            break;
        default:
            pos = 150;
            break;
    }
    gUserPrefs.align = align;
    gUserPrefs.pos = pos;
}

function changeFontSize(op) {
    if (op === '+') {
        gUserPrefs.fontSize++
    } else {
        gUserPrefs.fontSize--
    }
}

function changeTextColor() {
    var color = document.querySelector('.fill-color').value;
    gUserPrefs.fillColor = color;
    renderCanvas()
}

function toggleShadow() {
    if (gUserPrefs.shadowBlur === 0) {
        gUserPrefs.shadowBlur = 5;
    } else {
        gUserPrefs.shadowBlur = 0;
    }
}

function changeFont() {
    var font = document.querySelector('.font-family').value;
    gUserPrefs.font = font;
    renderCanvas()
}

function addUserImg() {
    var elName = document.querySelector('.usersImgName').value
    var elUrl = document.querySelector('.usersImgUrl').value
    var newImgObj = { id: gImgObjs.length + 1, name: elName, url: elUrl, keywords: elName }
    gImgObjs.push(newImgObj)
    gUserPrefs.imgId = gImgObjs.length;
    renderImages(gImgObjs)
    changeStep('step-two', gImgObjs.length)
}

function deleteText() {
    var elTopText = document.querySelector('.top-txt');
    elTopText.value = '';
    renderCanvas();
}

function downloadImg(elLink) {
    var canvas = document.querySelector('canves')
	var image = new Image();
	image.src = canvas.toDataURL("image/png");
	return image;
}
