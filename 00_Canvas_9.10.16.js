/**
 * Created by Ivan Minchev on 9.10.2016 г..
 */
function init() {
    let ctx = document.getElementById("canvas").getContext("2d");
    let wolfImgTopRight = document.getElementById('wolfTopRight');
    let wolfImgBottomRight = document.getElementById('wolfBottomRight');
    let wolfImgTopLeft = document.getElementById('wolfTopLeft');
    let wolfImgBottomLeft = document.getElementById('wolfBottomLeft');
    //let chickenImgLeft = document.getElementById('chickenLeft');
    let wolfTopRight = {x: 150, y:70, w: 100, h: 78};
    let wolfBottomRight = {x: 150, y:70, w: 100, h: 78};
    let wolfTopLeft = {x: 50, y: 70, w: 100, h: 78};
    let wolfBottomLeft = {x: 50, y: 70, w: 100, h: 78};
    let moveSpeed = 10;
   // debugger;

    window.addEventListener('keydown', kbdHangler);

    function kbdHangler(event){
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
        ctx.clearRect(0, 0, 745, 470)
        ctx.drawImage(wolfImgTopRight, wolfTopRight.x, wolfTopRight.y, wolfTopRight.w, wolfTopRight.h);

    }

    function drawBottomRight() {
        ctx.clearRect(0, 0, 745, 470)
        ctx.drawImage(wolfImgBottomRight, wolfBottomRight.x, wolfBottomRight.y, wolfBottomRight.w, wolfBottomRight.h);
    }

    function drawTopLeft(){
        ctx.clearRect(0, 0, 745, 470)

        ctx.drawImage(wolfImgTopLeft, wolfTopLeft.x, wolfTopLeft.y, wolfTopLeft.w, wolfTopLeft.h);
        //c.fillRect(x, y, width, height);
    }

    function drawBottomLeft(){
        ctx.clearRect(0, 0, 745, 470)
        ctx.drawImage(wolfImgBottomLeft, wolfBottomLeft.x, wolfBottomLeft.y, wolfBottomLeft.w, wolfBottomLeft.h);
        //c.fillRect(x, y, width, height);
    }
}

init();

//setInterval(render, 20);