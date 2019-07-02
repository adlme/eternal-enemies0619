'use strict';

function main() {
    var mainElement = document.querySelector('#site-main');    
    function buildDom(html) {
            mainElement.innerHTML = html;
            return mainElement;
    };    

    function createSplashScreen() {
        var splashScreen = buildDom(` 
        <section>
            <h1>Eternal Enemies</h1>
            <button>Start</button>
        </section>
        `);
        var startButton = splashScreen.querySelector('button');
        startButton.addEventListener('click', createGameScreen);
    };

    function createGameScreen() {
            var gameScreen = buildDom(`
            <section>
                <canvas width="400" height="400"></canvas>
            </section>
            `);
        // crear instancia de la constructora, no usas la FC porque quieres el objeto que ésta te crea
        var canvas = document.querySelector('canvas');
        var gameInstance = new Game(canvas);
        gameInstance.gameOverCallback(createGameOverScreen);
        gameInstance.startGame();
        document.addEventListener('keydown',function(event) {
            if(event.key === 'ArrowDown') {
                gameInstance.player.setDirection(1);
            } else if(event.key === 'ArrowUp') {
                gameInstance.player.setDirection(-1);
            }
            });
        // setTimeout(createGameOverScreen, 3000);
    };

    function createGameOverScreen() {
        var gameOverScreen = buildDom(`
            <section>    
                <h1>Game Over</h1>
                <button>Restart</button>
            </section>
        `);
        var restartButton = gameOverScreen.querySelector('button');
        restartButton.addEventListener('click', createSplashScreen);
    };

createSplashScreen();

};

window.addEventListener('load', main)