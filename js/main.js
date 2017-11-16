'use strict'
console.log('Meme Generator');

var gImgObjs = [
    { id: 1, name: 'Ancient Aliens', url: 'img/memes/Ancient-Aliens.jpg', keywords: ['human'] },
    { id: 2, name: 'Bad Luck Brian', url: 'img/memes/Bad-Luck-Brian.jpg', keywords: ['human','sweater','braces','redhead'] },
    { id: 3, name: 'Business Cat', url: 'img/memes/Business-Cat.jpg', keywords: ['animal','cute'] },
    { id: 4, name: 'Confession Bear', url: 'img/memes/Confession-Bear.jpg', keywords: ['animal','cute','sad'] },
    { id: 5, name: 'First World Problems', url: 'img/memes/First-World-Problems.jpg', keywords: ['human','sad','cynic','sarcastic'] },
    { id: 6, name: 'Not Sure If', url: 'img/memes/Not-Sure-If.jpg', keywords: ['cartoon','fry','futurama'] },
    { id: 7, name: 'One Does Not Simply', url: 'img/memes/One-Does-Not-Simply.jpg', keywords: ['human','sean','bean','lord of the rings','boromir'] },
    { id: 8, name: 'Third World Skeptical Kid', url: 'img/memes/Third-World-Skeptical-Kid.jpg', keywords: ['problem','human','black','african'] },
    { id: 9, name: 'X Everywhere', url: 'img/memes/X-Everywhere.jpg', keywords: ['cartoon','buzz','woody','toy story'] },
]

function init() {
    renderImages();
}

//This function takes the name of the img object and iserts it to the keywords
function expandKeywords() {
    gImgObjs.forEach(function(img) {
        var nameKeywords = img.name.split(' ');
        var newKws = nameKeywords.concat(img.keywords);
        newKws = newKws.map(function(keyword){
            return keyword.toLowerCase();
        })
    });
}

//This function renders the img objects to the DOM
function renderImages() {
    expandKeywords();
    var elGallery = document.querySelector('.gallery')
    var strHtml = '';
    gImgObjs.forEach(function stringToHtml(imgObj) {
        strHtml += `
        <li>
        <img src="${imgObj.url}" alt="${imgObj.name}">
        <p>${imgObj.name}</p>
        // <a href="lmgtfy/${imgObj.name}">About this meme</a>
    </li>`})
    elGallery.innerHTML = strHtml;
}