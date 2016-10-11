/**
 * Created by Ivan Minchev on 9.10.2016 г..
 */
let wolfTopRight = {x: 150, y:50, w: 50, h: 60};
let wolfBottomRight = {x: 150, y:50, w: 50, h: 60};
let wolfTopLeft = {x: 100, y: 50, w: 50, h: 60};
let wolfBottomLeft = {x: 100, y: 50, w: 50, h: 60};
let eggTopLeft = {x: 73, y: 36, w: 5, h:7};
let eggTopRight = {x: 225, y: 36, w: 5, h:7};
let eggBottomRight = {x: 225, y: 65, w: 5, h:7};
let eggBottomLeft = {x: 73, y: 65, w: 5, h:7};

function init() {
    let ctx = document.getElementById("canvas").getContext("2d");
    let wolfImgTopRight = document.getElementById('wolfTopRight');
    let wolfImgBottomRight = document.getElementById('wolfBottomRight');
    let wolfImgTopLeft = document.getElementById('wolfTopLeft');
    let wolfImgBottomLeft = document.getElementById('wolfBottomLeft');
    let egg = document.getElementById('theEgg');
    //let chickenImgLeft = document.getElementById('chickenLeft');

    let caught = false;
    let score = 0;
    let positionToFallFrom = 1;
    // debugger;

    window.addEventListener('keydown', kbdHandler);

    setInterval(fallingEggs, 400);
    function kbdHandler(event){
        //console.log(event.code);
        switch(event.code){
            case 'Numpad7': drawTopLeft();
                break;
            case 'Numpad9': drawTopRight();
                break;
            case 'Numpad1': drawBottomLeft();
                break;

            case 'Numpad3': drawBottomRight();
                break;
        }
        //draw();
    }


    function drawTopRight() {
        ctx.clearRect(100, 50, 110, 60);
        ctx.drawImage(wolfImgTopRight, wolfTopRight.x, wolfTopRight.y, wolfTopRight.w, wolfTopRight.h);

    }

    function drawBottomRight() {
        ctx.clearRect(100, 50, 110, 60);
        ctx.drawImage(wolfImgBottomRight, wolfBottomRight.x, wolfBottomRight.y, wolfBottomRight.w, wolfBottomRight.h);
    }

    function drawTopLeft(){
        ctx.clearRect(100, 50, 120, 60);

        ctx.drawImage(wolfImgTopLeft, wolfTopLeft.x, wolfTopLeft.y, wolfTopLeft.w, wolfTopLeft.h);
        //c.fillRect(x, y, width, height);
    }

    function drawBottomLeft(){
        ctx.clearRect(100, 50, 120, 60);
        ctx.drawImage(wolfImgBottomLeft, wolfBottomLeft.x, wolfBottomLeft.y, wolfBottomLeft.w, wolfBottomLeft.h);
        //c.fillRect(x, y, width, height);
    }

    function fallingEggs(position) {
        position = parseInt(Math.random() * (4)) + 1;
        if (position === 1) {
            animate(eggTopLeft, 5, 3, wolfTopLeft.x);
        } else if (position === 2) {
            animate(eggTopRight, -5, 3, wolfTopRight.x);
        } else if (position === 3) {
            animate(eggBottomRight, -5, 3, wolfBottomRight.x);
        } else {
            animate(eggBottomLeft, 5, 3, wolfBottomLeft.x);
        }

    }
    function animate(eggToFall, moveRateX, moveRateY, wolfCoordinateX) {
        let originalEgg = eggToFall;
        eggToFall.x += moveRateX;
        eggToFall.y += moveRateY;
        if(eggToFall === eggBottomLeft || eggToFall === eggTopLeft) {
            if(eggToFall.x >= wolfCoordinateX ){
                if (eggToFall === eggBottomLeft) {
                    clear(eggToFall, -moveRateX, -moveRateY);
                    eggToFall.x = 73;
                    eggToFall.y = 65;

                } else {
                    clear(eggToFall, -moveRateX, -moveRateY);
                    eggToFall.x = 73;
                    eggToFall.y = 36;
                }
                fallingEggs();
            } else {
                ctx.drawImage(egg, eggToFall.x, eggToFall.y, eggToFall.w, eggToFall.h);

            }
            clear(eggToFall, -moveRateX, -moveRateY);
        } else if (eggToFall === eggTopRight || eggToFall === eggBottomRight) {
            if(eggToFall.x < wolfCoordinateX + 50 ){
                if (eggToFall === eggTopRight) {
                    clear(eggToFall, -moveRateX, -moveRateY);
                    eggToFall.x = 225;
                    eggToFall.y = 36;
                } else {
                    clear(eggToFall, -moveRateX, -moveRateY);
                    eggToFall.x = 225;
                    eggToFall.y =65;
                }
                fallingEggs();
            } else {
                ctx.drawImage(egg, eggToFall.x, eggToFall.y, eggToFall.w, eggToFall.h);;
            }
            clear(eggToFall, -moveRateX, -moveRateY);
        }

    }
    function clear(eggToFall, offsetX, offsetY) {
        ctx.clearRect(eggToFall.x + offsetX, eggToFall.y + offsetY, eggToFall.w, eggToFall.h+1);
    }

    function resetEgg(eggToReset, originalEgg) {
        eggToReset.x = originalEgg.x;
        eggToReset.y = originalEgg.y;
    }
}

init();

//setInterval(render, 20);