// ==UserScript==
// @name         placede manual templates
// @namespace    https://github.com/lahmizzar/rplace
// @version      3
// @description  simple overlay system for r/place based on tt2468's script used overlay picture from r/placeDE
// @author       Lahmizzar
// @match        https://hot-potato.reddit.com/embed*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=reddit.com
// @updateURL    https://github.com/lahmizzar/rplace/raw/main/template_userscript.user.js
// @downloadURL  https://github.com/lahmizzar/rplace/raw/main/template_userscript.user.js
// @grant        none
// @license      GNU GPLv3
// ==/UserScript==

var child = null;

function getImage() {
    const i = document.createElement("img");
    i.src = "https://raw.githubusercontent.com/placeDE/pixel/main/overlay.png?t=" + Date.now();
    i.style = "position: absolute;left: 0;top: 0;image-rendering: pixelated;width: 2000px;height: 2000px;";
    return i;
}

function refreshTemplate() {
    var x = document.getElementsByTagName("mona-lisa-embed")[0].shadowRoot.children[0].getElementsByTagName("mona-lisa-canvas")[0].shadowRoot.children[0];
    if (child) {
        x.removeChild(child);
    }
    child = getImage();
    x.appendChild(child, false);

    console.log("Template has been updated.");
}

function refreshTemplateLoop() {
    refreshTemplate();
    setTimeout(function() { refreshTemplateLoop(); }, 300*1000);
}

(function() {
    function addButton(text, onclick, cssObj) {
        cssObj = cssObj || {position: 'absolute', bottom: '20px', left:'80px', 'z-index': 3, 'background-color': 'white', color: 'black', 'border-color': 'black', height: '36px'}
        let button = document.createElement('button'), btnStyle = button.style
        document.body.appendChild(button)
        button.innerHTML = text
        button.onclick = onclick
        button.classList.add("btnrefresh");
        btnStyle.position = 'absolute'
        Object.keys(cssObj).forEach(key => {btnStyle[key] = cssObj[key]})
        return button
    }

    window.addEventListener('load', () => {
        setTimeout(function() { refreshTemplateLoop(); }, 4000);
        addButton('Update Template', refreshTemplate)
    })
})();
