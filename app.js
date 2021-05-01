let canvas;
let canvasContext;
let ballX = 50;
let ballSpeedX = 10;


window.onload = function () {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    let framesPerSecond = 30;
    setInterval(() => {
        moveEverything ();
        drawEverything();
    }, 1000/framesPerSecond);  
}

function moveEverything () {
    ballX = ballX + ballSpeedX;
     if (ballX > canvas.width) {
         ballSpeedX = -ballSpeedX;
     }
     if (ballX < 0) {
         ballSpeedX = -ballSpeedX
     }
}

function drawEverything() {
   
    colorRect(0,0,canvas.width, canvas.height, 'black');
    colorRect(0, 210, 10, 100, 'white');
    colorCircle(ballX, 150, 10, 'white')
}

function colorCircle(centerX, centerY, radius, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    canvasContext.fill();

}
function colorRect (leftX, topY, width, height, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);

}