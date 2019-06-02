'use strict';

import '../css/index.css';

const mainScript = document.createElement('script');
const stylesheet = document.createElement('link');

mainScript.src = 'main.js';
mainScript.async = true;

stylesheet.href = 'index.css';
stylesheet.rel = 'stylesheet';

function load(element) {
    return new Promise(function(loaded) {
        element.addEventListener('load', function() {
            loaded();
        });
    });
}

window.addEventListener('load', function() {
    document.head.appendChild(mainScript);
    document.head.appendChild(stylesheet);

    Promise.all([
        load(mainScript),
        load(stylesheet)
    ]).then(function() {
        const mainElement = document.getElementById('main');

        if (mainElement && Elm && Elm.Main && Elm.Main.init) {
            Elm.Main.init({
                node: mainElement
            });
        }
    });
});