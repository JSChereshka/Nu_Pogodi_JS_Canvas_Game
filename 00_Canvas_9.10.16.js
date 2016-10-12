let buttonPushTopLeft = {x: 6, y: 74, w: 40, h: 40};
let buttonPushTopRight = {x: 255, y: 74, w:40, h: 40};
let buttonPushBotLeft = {x: 6, y: 115, w: 40, h: 40};
let buttonPushBotRight = {x: 255, y: 115, w:40, h: 40};
let wolfTopRight = {x: 150, y:50, w: 50, h: 60, pos: 'topRight'};
let wolfBottomRight = {x: 150, y:50, w: 50, h: 60, pos: 'bottomRight'};
let wolfTopLeft = {x: 100, y: 50, w: 50, h: 60, pos: 'topLeft'};
let wolfBottomLeft = {x: 100, y: 50, w: 50, h: 60, pos:'bottomLeft'};
let eggTopLeft = {x: 73, y: 36, w: 5, h:7, pos: 'topLeft'};
let eggTopRight = {x: 227, y: 34, w: 5, h:7, pos: 'topRight'};
let eggBottomRight = {x: 227, y: 64, w: 5, h:7, pos: 'bottomRight'};
let eggBottomLeft = {x: 73, y: 65, w: 5, h:7, pos: 'bottomLeft'};

function init() {
    let ctx = document.getElementById("canvas").getContext("2d");
    let buttonImg = document.getElementById('button');
    //buttonImg.Scale(2, 2);
    let wolfImgTopRight = document.getElementById('wolfTopRight');
    let wolfImgBottomRight = document.getElementById('wolfBottomRight');
    let wolfImgTopLeft = document.getElementById('wolfTopLeft');
    let wolfImgBottomLeft = document.getElementById('wolfBottomLeft');
    let egg = document.getElementById('theEgg');
    let crackedEgg = document.getElementById('crackedEgg');
    //let chickenImgLeft = document.getElementById('chickenLeft');


    let score = 0;
    let lives = 3;
    let wolfCurrentPos = '';
    // debugger;

    window.addEventListener('keydown', kbdHandler);
    window.addEventListener('keyup', kbuHandler);

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
    }

    function kbuHandler(event){
        switch(event.code){
            case 'Numpad7':
                ctx.clearRect(buttonPushTopLeft.x, buttonPushTopLeft.y, buttonPushTopLeft.w, buttonPushTopLeft.h);
                break;
            case 'Numpad9': console.log('hi');
                ctx.clearRect(buttonPushTopRight.x, buttonPushTopRight.y, buttonPushTopRight.w, buttonPushTopRight.h);
                break;
            case 'Numpad1':
                ctx.clearRect(buttonPushBotLeft.x, buttonPushBotLeft.y, buttonPushBotLeft.w, buttonPushBotLeft.h);
                break;
            case 'Numpad3':
                ctx.clearRect(buttonPushBotRight.x, buttonPushBotRight.y, buttonPushBotRight.w, buttonPushBotRight.h);
                break;

        }
    }


    function drawTopRight() {
        ctx.clearRect(98, 50, 102, 60);
        ctx.drawImage(wolfImgTopRight, wolfTopRight.x, wolfTopRight.y, wolfTopRight.w, wolfTopRight.h);
        ctx.drawImage(buttonImg, buttonPushTopRight.x, buttonPushTopRight.y, buttonPushTopRight.w, buttonPushTopRight.h);
        wolfCurrentPos = wolfTopRight.pos;
    }

    function drawBottomRight() {
        ctx.clearRect(98, 50, 102, 60);
        ctx.drawImage(wolfImgBottomRight, wolfBottomRight.x, wolfBottomRight.y, wolfBottomRight.w, wolfBottomRight.h);
        ctx.drawImage(buttonImg, buttonPushBotRight.x, buttonPushBotRight.y, buttonPushBotRight.w, buttonPushBotRight.h);
        wolfCurrentPos = wolfBottomRight.pos
    }

    function drawTopLeft(){
        ctx.clearRect(98, 50, 102, 60);
        ctx.drawImage(wolfImgTopLeft, wolfTopLeft.x, wolfTopLeft.y, wolfTopLeft.w, wolfTopLeft.h);
        ctx.drawImage(buttonImg, buttonPushTopLeft.x, buttonPushTopLeft.y, buttonPushTopLeft.w, buttonPushTopLeft.h);
        wolfCurrentPos = wolfTopLeft.pos;
        //c.fillRect(x, y, width, height);
    }

    function drawBottomLeft(){
        ctx.clearRect(98, 50, 102, 60);
        ctx.drawImage(wolfImgBottomLeft, wolfBottomLeft.x, wolfBottomLeft.y, wolfBottomLeft.w, wolfBottomLeft.h);
        ctx.drawImage(buttonImg, buttonPushBotLeft.x, buttonPushBotLeft.y, buttonPushBotLeft.w, buttonPushBotLeft.h);
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
            if(eggToFall.x === 98 && wolfToCheck.x === 100){  //Left positions of the wolf have value by axis x == 100;
                if (!(isEggCaught(eggToFall, wolfPosition))){
                    ctx.drawImage(egg, eggToFall.x, eggToFall.y, eggToFall.w, eggToFall.h);
                }
            } else if(eggToFall.x >= wolfToCheck.x ){
                isEggCaught(eggToFall, wolfPosition);
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
            if(eggToFall.x === 202 && wolfToCheck.x + 50 === 200){
                if (!(isEggCaught(eggToFall, wolfPosition))) {
                    ctx.drawImage(egg, eggToFall.x, eggToFall.y, eggToFall.w, eggToFall.h);
                }
            } else if(eggToFall.x < wolfToCheck.x + 50 ){
                isEggCaught(eggToFall, wolfPosition);
                console.log(lives + '-lives');
                console.log(score  + '-score');
                if (eggToFall === eggTopRight) {
                    clear(eggToFall, -moveRateX, -moveRateY);
                    eggToFall.x = 227;
                    eggToFall.y = 34;
                } else {
                    clear(eggToFall, -moveRateX, -moveRateY);
                    eggToFall.x = 227;
                    eggToFall.y = 63;
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

    // The function isEggCaught checks only whether both the wolff and egg are together in top or bottom positions.
    function isEggCaught(eggToCheck, wolfCurrentPos) {
        if(eggToCheck.x == 98){ //critical left side position values check
            if(eggToCheck.pos === wolfCurrentPos){
                score++;
                return true;
            } else {
                return false;
            }
        } else if(eggToCheck.x == 202){ // critical right side position values check
            if(eggToCheck.pos === wolfCurrentPos){
                score++;
                return true;
            } else {
                return false;
            }
        } else if (eggToCheck.pos === wolfCurrentPos) {
            score ++
        } else {
            lives --;
            if(eggToCheck.pos === 'topLeft'){
                ctx.drawImage(crackedEgg, 100, 75, 11 ,7);
                setTimeout(function(){ctx.clearRect(100, 75, 11 ,7)}, 500);//clears cracked egg after 1 second
            }
            if(eggToCheck.pos === 'bottomLeft'){
                ctx.drawImage(crackedEgg, 100, 100, 11 ,7);
                setTimeout(function(){ctx.clearRect(100, 100, 11 ,7)}, 500);//clears cracked egg after 1 second
            }
            if (eggToCheck.pos === 'topRight'){
                ctx.drawImage(crackedEgg, 190, 75, 11 ,7);
                setTimeout(function(){ctx.clearRect(190, 75, 11 ,7)}, 500);//clears cracked egg after 1 second
            }
            if (eggToCheck.pos === 'bottomRight'){
                ctx.drawImage(crackedEgg, 190, 100, 11 ,7);
                setTimeout(function(){ctx.clearRect(190, 100, 11 ,7)}, 500);//clears cracked egg after 1 second
            }
        }
    }
}

init();