/**
 * Created by Ivan Minchev on 9.10.2016 г..
 */
let wolfTopRight = {x: 150, y:50, w: 50, h: 60, pos: 'topRight'};
let wolfBottomRight = {x: 150, y:50, w: 50, h: 60, pos: 'bottomRight'};
let wolfTopLeft = {x: 100, y: 50, w: 50, h: 60, pos: 'topLeft'};
let wolfBottomLeft = {x: 100, y: 50, w: 50, h: 60, pos:'bottomLeft'};
let eggTopLeft = {x: 73, y: 36, w: 5, h:7, pos: 'topLeft'};
let eggTopRight = {x: 225, y: 36, w: 5, h:7, pos: 'topRight'};
let eggBottomRight = {x: 225, y: 65, w: 5, h:7, pos: 'bottomRight'};
let eggBottomLeft = {x: 73, y: 65, w: 5, h:7, pos: 'bottomLeft'};

function init() {
    let ctx = document.getElementById("canvas").getContext("2d");
    let wolfImgTopRight = document.getElementById('wolfTopRight');
    let wolfImgBottomRight = document.getElementById('wolfBottomRight');
    let wolfImgTopLeft = document.getElementById('wolfTopLeft');
    let wolfImgBottomLeft = document.getElementById('wolfBottomLeft');
    let egg = document.getElementById('theEgg');
    //let chickenImgLeft = document.getElementById('chickenLeft');


    let score = 0;
    let lives = 3;
    let wolfCurrentPos = '';
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
        ctx.clearRect(98, 50, 102, 60);
        ctx.drawImage(wolfImgTopRight, wolfTopRight.x, wolfTopRight.y, wolfTopRight.w, wolfTopRight.h);
        wolfCurrentPos = wolfTopRight.pos;
    }

    function drawBottomRight() {
        ctx.clearRect(98, 50, 102, 60);
        ctx.drawImage(wolfImgBottomRight, wolfBottomRight.x, wolfBottomRight.y, wolfBottomRight.w, wolfBottomRight.h);
        wolfCurrentPos = wolfBottomRight.pos
    }

    function drawTopLeft(){
        ctx.clearRect(98, 50, 102, 60);
        ctx.drawImage(wolfImgTopLeft, wolfTopLeft.x, wolfTopLeft.y, wolfTopLeft.w, wolfTopLeft.h);
        wolfCurrentPos = wolfTopLeft.pos;
        //c.fillRect(x, y, width, height);
    }

    function drawBottomLeft(){
        ctx.clearRect(98, 50, 102, 60);
        ctx.drawImage(wolfImgBottomLeft, wolfBottomLeft.x, wolfBottomLeft.y, wolfBottomLeft.w, wolfBottomLeft.h);
        wolfCurrentPos = wolfBottomLeft.pos;
        //c.fillRect(x, y, width, height);
    }

    function fallingEggs(position) {
        position = parseInt(Math.random() * (4)) + 1;
        if (position === 1) {
            animate(eggTopLeft, 5, 3, wolfTopLeft, wolfCurrentPos);
        } else if (position === 2) {
            animate(eggTopRight, -5, 3, wolfTopRight, wolfCurrentPos);
        } else if (position === 3) {
            animate(eggBottomRight, -5, 3, wolfBottomRight, wolfCurrentPos);
        } else {
            animate(eggBottomLeft, 5, 3, wolfBottomLeft, wolfCurrentPos);
        }

    }
    function animate(eggToFall, moveRateX, moveRateY, wolfToCheck, wolfPosition) {
        eggToFall.x += moveRateX;
        eggToFall.y += moveRateY;
        if(eggToFall === eggBottomLeft || eggToFall === eggTopLeft) {
            if(eggToFall.x >= wolfToCheck.x ){
                isEggCaught(eggToFall, wolfToCheck, wolfPosition);
                console.log(lives + '-lives');
                console.log(score  + '-score');
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
            if(eggToFall.x < wolfToCheck.x + 50 ){
                isEggCaught(eggToFall, wolfToCheck, wolfPosition);
                console.log(lives + '-lives');
                console.log(score  + '-score');
                if (eggToFall === eggTopRight) {
                    clear(eggToFall, -moveRateX, -moveRateY);
                    eggToFall.x = 225;
                    eggToFall.y = 36;
                } else {
                    clear(eggToFall, -moveRateX, -moveRateY);
                    eggToFall.x = 225;
                    eggToFall.y = 65;
                }
                fallingEggs();
            } else {
                ctx.drawImage(egg, eggToFall.x, eggToFall.y, eggToFall.w, eggToFall.h);
            }
            clear(eggToFall, -moveRateX, -moveRateY);
        }

    }
    function clear(eggToFall, offsetX, offsetY) {
        ctx.clearRect(eggToFall.x + offsetX, eggToFall.y + offsetY, eggToFall.w, eggToFall.h+1);
    }

    function isEggCaught(wolfToCheck, eggToCheck, currentPos) {
        let x = (wolfToCheck.x + 25) - (eggToCheck.x + 2.5);
        let y = (wolfToCheck.y + 30) - (eggToCheck.y + 3.5);
        let distance = Math.sqrt(x * x + y * y);
        if (eggToCheck.pos === currentPos) {
            score ++
        } else {
            lives --;
        }
    }
}

init();

//setInterval(render, 20);